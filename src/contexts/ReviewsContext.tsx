"use client";

import React, { createContext, useContext, useReducer, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { Review } from "@/lib/reviews";

type ReviewsAction =
  | { type: "SET"; payload: Review[] }
  | { type: "ADD"; payload: Review }
  | { type: "UPDATE"; payload: Review }
  | { type: "REMOVE"; payload: number };

function reviewsReducer(state: Review[], action: ReviewsAction): Review[] {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [action.payload, ...state.filter((r) => r.id !== action.payload.id)];
    case "UPDATE":
      return state.map((r) => (r.id === action.payload.id ? action.payload : r));
    case "REMOVE":
      return state.filter((r) => r.id !== action.payload);
    default:
      return state;
  }
}

export interface ReviewsContextType {
  reviews: Review[];
  myReview: Review | null;
  submitReview: (rating: number, comment: string) => Promise<Review>;
  updateReview: (rating: number, comment: string) => Promise<Review>;
  deleteReview: () => Promise<void>;
}

const ReviewsContext = createContext<ReviewsContextType | null>(null);

export function ReviewsProvider({
  productId,
  initialReviews,
  children,
}: {
  productId: number;
  initialReviews: Review[];
  children: React.ReactNode;
}) {
  const [reviews, dispatch] = useReducer(reviewsReducer, initialReviews);
  const { user, session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    dispatch({ type: "SET", payload: initialReviews });
  }, [initialReviews]);

  const myReview = useMemo(() => {
    if (!user) return null;
    return (
      reviews.find(
        (r) =>
          r.user_id === user.id ||
          (user.email && r.author === user.email.split("@")[0])
      ) || null
    );
  }, [reviews, user]);

  const submitReview = async (rating: number, comment: string): Promise<Review> => {
    let token = session?.access_token;
    if (!token) {
      const { data } = await supabase.auth.getSession();
      token = data.session?.access_token;
    }

    if (!token) {
      throw new Error("Unauthorized");
    }

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: productId,
        rating,
        comment,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to submit review");
    }

    dispatch({ type: "ADD", payload: data });
    router.refresh();
    return data;
  };

  const updateReview = async (rating: number, comment: string): Promise<Review> => {
    if (!myReview) {
      throw new Error("No review found to update");
    }

    const { data, error } = await supabase
      .from("reviews")
      .update({ rating, comment })
      .eq("id", myReview.id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    dispatch({ type: "UPDATE", payload: data });
    router.refresh();
    return data;
  };

  const deleteReview = async (): Promise<void> => {
    if (!myReview) return;
    const previousReviews = [...reviews];
    const targetId = myReview.id;

    // Optimistic delete: remove from state immediately
    dispatch({ type: "REMOVE", payload: targetId });

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", targetId);

    if (error) {
      // Rollback on error
      dispatch({ type: "SET", payload: previousReviews });
      throw new Error(error.message);
    }

    router.refresh();
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        myReview,
        submitReview,
        updateReview,
        deleteReview,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
}
