import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { getReviewsForProduct } from "@/lib/reviews";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = Number(params.id);
  if (!Number.isInteger(productId) || !products.some((p) => p.id === productId)) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const data = await getReviewsForProduct(productId);
  return NextResponse.json(data);
}
