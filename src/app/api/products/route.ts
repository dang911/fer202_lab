import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";

export function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim().toLocaleLowerCase() ?? "";
  const category = request.nextUrl.searchParams.get("category")?.trim().toLocaleLowerCase() ?? "";
  const results = products.filter((product) => {
    const matchesQuery =
      !query || product.name.toLocaleLowerCase().includes(query) || product.description.toLocaleLowerCase().includes(query);
    const matchesCategory = !category || product.category.toLocaleLowerCase() === category;
    return matchesQuery && matchesCategory;
  });

  return NextResponse.json(results);
}
