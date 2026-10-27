"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, ReviewFormData } from "@/lib/reviewSchema";
import { useReviews } from "@/contexts/ReviewsContext";
import { useAuth } from "@/contexts/AuthContext";
import { Review } from "@/lib/reviews";
import { Star, MessageSquare, Trash2, Edit3, CheckCircle2, AlertCircle } from "lucide-react";

interface ReviewsSectionProps {
  productId: number;
}

export function ReviewsSection({ productId }: ReviewsSectionProps) {
  const { reviews, myReview, submitReview, updateReview, deleteReview } = useReviews();
  const { user, loading: authLoading } = useAuth();

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editRating, setEditRating] = useState<number>(5);
  const [editComment, setEditComment] = useState<string>("");
  const [editError, setEditError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const count = reviews.length;
  const average =
    count === 0
      ? 0
      : Number((reviews.reduce((acc, r) => acc + r.rating, 0) / count).toFixed(1));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      product_id: productId,
      rating: undefined,
      comment: "",
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    setServerError(null);
    setSuccessMessage(null);
    try {
      await submitReview(data.rating, data.comment);
      setSuccessMessage("Your review has been submitted successfully!");
      reset({ product_id: productId, rating: undefined, comment: "" });
    } catch (err: any) {
      setServerError(err.message || "Failed to submit review");
    }
  };

  const startEdit = (review: Review) => {
    if (editingReviewId === review.id) {
      setEditingReviewId(null);
    } else {
      setEditingReviewId(review.id);
      setEditRating(review.rating);
      setEditComment(review.comment);
      setEditError(null);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);
    const trimmed = editComment.trim();
    if (!trimmed || trimmed.length < 1 || trimmed.length > 500) {
      setEditError("Comment must be between 1 and 500 characters");
      return;
    }
    if (editRating < 1 || editRating > 5) {
      setEditError("Rating must be between 1 and 5");
      return;
    }

    setIsUpdating(true);
    try {
      await updateReview(editRating, trimmed);
      setEditingReviewId(null);
    } catch (err: any) {
      setEditError(err.message || "Failed to update review");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteReview();
    } catch (err: any) {
      alert(err.message || "Failed to delete review");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
      {/* Header & Rating Summary */}
      <div className="mb-8 flex flex-col gap-4 border-b border-slate-800/80 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
            <MessageSquare className="h-6 w-6 text-indigo-400" />
            Customer Reviews
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Real feedback from verified community members
          </p>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/60 px-5 py-3">
          <div className="text-right">
            <div className="text-xs font-medium uppercase tracking-wider text-slate-400">Average Rating</div>
            <div className="flex items-baseline justify-end gap-1">
              <span data-testid="rating-average" className="text-3xl font-extrabold text-white">
                {average}
              </span>
              <span className="text-xs text-slate-500">/ 5</span>
            </div>
          </div>
          <div className="h-10 w-px bg-slate-800" />
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Reviews</div>
            <div className="text-xl font-bold text-indigo-400">
              <span data-testid="review-count">{count}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success banner if review was submitted */}
      {successMessage && (
        <div
          data-testid="review-success"
          className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm font-medium text-emerald-400"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Write a review section */}
      <div className="mb-10">
        {!user ? (
          <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/40 p-6 text-center">
            <p className="text-sm text-slate-400">
              Have you tried this product? Share your experience with others!
            </p>
            <div className="mt-3">
              <Link
                href="/login"
                data-testid="link-login-to-review"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Log in to write a review
              </Link>
            </div>
          </div>
        ) : !myReview ? (
          <form
            data-testid="review-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/60 p-6"
          >
            <h3 className="text-lg font-semibold text-white">Write a Review</h3>

            <input type="hidden" {...register("product_id", { valueAsNumber: true })} value={productId} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Rating <span className="text-indigo-400">*</span>
                </label>
                <select
                  data-testid="input-rating"
                  {...register("rating", { valueAsNumber: true })}
                  defaultValue=""
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Select a rating</option>
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Terrible</option>
                </select>
                {errors.rating && (
                  <p data-testid="error-rating" className="mt-1.5 text-xs font-medium text-rose-400">
                    {errors.rating.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Review Comment <span className="text-indigo-400">*</span>
              </label>
              <textarea
                data-testid="input-comment"
                {...register("comment")}
                placeholder="What did you like or dislike? How does it perform?"
                rows={3}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.comment && (
                <p data-testid="error-comment" className="mt-1.5 text-xs font-medium text-rose-400">
                  {errors.comment.message}
                </p>
              )}
            </div>

            {serverError && (
              <div
                data-testid="error-review"
                className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs font-medium text-rose-400"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            <button
              type="submit"
              data-testid="btn-submit-review"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        ) : null}
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div
            data-testid="reviews-empty"
            className="rounded-xl border border-dashed border-slate-800 bg-slate-950/40 p-8 text-center text-slate-400"
          >
            <MessageSquare className="mx-auto mb-2 h-8 w-8 text-slate-600" />
            <p className="text-sm">No reviews yet for this product.</p>
          </div>
        ) : (
          reviews.map((review) => {
            const isOwnReview = myReview?.id === review.id;
            const isEditing = editingReviewId === review.id;

            return (
              <div
                key={review.id}
                data-testid="review-item"
                className={`rounded-xl border p-5 transition ${
                  isOwnReview
                    ? "border-indigo-500/30 bg-indigo-950/20"
                    : "border-slate-800 bg-slate-950/50"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-indigo-400">
                      {review.author ? review.author.slice(0, 2).toUpperCase() : "??"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span data-testid="review-author" className="font-semibold text-white text-sm">
                          {review.author}
                        </span>
                        {isOwnReview && (
                          <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-300">
                            Your Review
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        {review.created_at ? new Date(review.created_at).toLocaleDateString() : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-amber-400">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span data-testid="review-rating" className="text-sm font-bold">
                      {review.rating}
                    </span>
                  </div>
                </div>

                <p data-testid="review-comment" className="mt-3 text-sm leading-relaxed text-slate-300">
                  {review.comment}
                </p>

                {/* Own review actions */}
                {isOwnReview && (
                  <div className="mt-4 flex items-center gap-3 border-t border-slate-800/80 pt-3">
                    <button
                      type="button"
                      data-testid="btn-edit-review"
                      onClick={() => startEdit(review)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 transition hover:text-indigo-300"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      {isEditing ? "Cancel" : "Edit"}
                    </button>
                    <button
                      type="button"
                      data-testid="btn-delete-review"
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-400 transition hover:text-rose-300 disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}

                {/* Inline edit form */}
                {isOwnReview && isEditing && (
                  <form
                    onSubmit={handleUpdate}
                    className="mt-4 space-y-3 rounded-lg border border-slate-800 bg-slate-900/90 p-4"
                  >
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Update Rating
                      </label>
                      <select
                        value={editRating}
                        onChange={(e) => setEditRating(Number(e.target.value))}
                        className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                      >
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Very Good</option>
                        <option value="3">3 - Average</option>
                        <option value="2">2 - Poor</option>
                        <option value="1">1 - Terrible</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Update Comment
                      </label>
                      <textarea
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        rows={3}
                        className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    {editError && (
                      <p className="text-xs font-medium text-rose-400">{editError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
                    >
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
