"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { products } from "@/data/products";
import { Header } from "@/components/Header";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function FavoritesPage() {
  const { user, loading } = useContext(AuthContext);
  const { favorites } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, router, user]);

  if (loading || !user) {
    return <main data-testid="loading" className="ambient-bg min-h-screen" />;
  }

  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  return (
    <div className="ambient-bg min-h-screen">
      <Header />
      <main data-testid="favorites-page" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-white">My Favorites</h1>
        {favoriteProducts.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteProducts.map((product) => (
              <article key={product.id} data-testid="favorite-item" className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                <div>
                  <Link href={`/products/${product.id}`} className="font-semibold text-white hover:text-indigo-300">{product.name}</Link>
                  <p className="mt-1 text-indigo-400">${product.price.toFixed(2)}</p>
                </div>
                <FavoriteButton productId={product.id} />
              </article>
            ))}
          </div>
        ) : (
          <p data-testid="favorites-empty" className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 text-center text-slate-400">You have not saved any favorites yet.</p>
        )}
      </main>
    </div>
  );
}
