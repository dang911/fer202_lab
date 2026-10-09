import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";

export function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const product = Number.isInteger(id) ? products.find((item) => item.id === id) : undefined;
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}
