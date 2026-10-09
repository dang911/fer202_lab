"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";

export function FavoriteButton({ productId }: { productId: number }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(productId);

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      data-testid="btn-favorite"
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={favorite}
      onClick={() => void toggleFavorite(productId)}
      className="border-slate-700 bg-slate-950/80 text-pink-400 hover:bg-pink-500/10"
    >
      <Heart className={favorite ? "h-4 w-4 fill-current" : "h-4 w-4"} />
    </Button>
  );
}
