import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { reviewSchema } from "@/lib/reviewSchema";
import { products } from "@/data/products";

export async function POST(request: NextRequest) {
  // 1. Authentication check
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: userData, error: authError } = await supabase.auth.getUser(token);
  if (authError || !userData?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Parse JSON body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid input", issues: [{ message: "Invalid JSON" }] },
      { status: 400 }
    );
  }

  // 3. Validation with reviewSchema
  const parseResult = reviewSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parseResult.error.issues },
      { status: 400 }
    );
  }

  const { product_id, rating, comment } = parseResult.data;

  // 4. Product check
  const productExists = products.some((p) => p.id === product_id);
  if (!productExists) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // 5. Insert into reviews using Supabase client created with user's token
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  const userClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  });

  const { data: newReview, error: insertError } = await userClient
    .from("reviews")
    .insert({
      product_id,
      rating,
      comment,
    })
    .select()
    .single();

  if (insertError) {
    if (insertError.code === "23505" || insertError.message?.includes("23505")) {
      return NextResponse.json(
        { error: "You already reviewed this product" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  // 6. Revalidate cached detail page
  revalidatePath("/products/" + product_id);

  return NextResponse.json(newReview, { status: 201 });
}
