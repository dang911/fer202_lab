import { supabase } from "@/lib/supabaseClient";

export interface Review {
  id: number;
  user_id: string;
  product_id: number;
  rating: number;
  comment: string;
  author: string;
  created_at: string;
}

export interface ProductReviewsData {
  average: number;
  count: number;
  reviews: Review[];
}

export async function getReviewsForProduct(productId: number): Promise<ProductReviewsData> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  if (!supabaseUrl || supabaseUrl.includes("placeholder-project")) {
    return {
      average: 0,
      count: 0,
      reviews: [],
    };
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews for product", productId, error);
    return {
      average: 0,
      count: 0,
      reviews: [],
    };
  }

  const reviews: Review[] = data ?? [];
  const count = reviews.length;
  const average =
    count === 0
      ? 0
      : Number((reviews.reduce((acc, item) => acc + item.rating, 0) / count).toFixed(1));

  return {
    average,
    count,
    reviews,
  };
}
