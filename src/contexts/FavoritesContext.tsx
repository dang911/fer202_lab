"use client";

import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";

type FavoritesAction =
  | { type: "SET"; ids: number[] }
  | { type: "ADD"; id: number }
  | { type: "REMOVE"; id: number };

interface FavoritesContextValue {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function favoritesReducer(state: number[], action: FavoritesAction): number[] {
  switch (action.type) {
    case "SET":
      return action.ids;
    case "ADD":
      return state.includes(action.id) ? state : [...state, action.id];
    case "REMOVE":
      return state.filter((id) => id !== action.id);
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [favorites, dispatch] = useReducer(favoritesReducer, []);

  useEffect(() => {
    let active = true;

    if (loading) return;
    if (!user) {
      dispatch({ type: "SET", ids: [] });
      return;
    }

    void supabase
      .from("favorites")
      .select("product_id")
      .then(({ data, error }) => {
        if (error) {
          console.error("Could not load favorites:", error.message);
          return;
        }
        if (active) {
          dispatch({ type: "SET", ids: (data ?? []).map((row) => row.product_id) });
        }
      });

    return () => {
      active = false;
    };
  }, [loading, user]);

  const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback(async (id: number) => {
    if (!user) {
      router.push("/login");
      return;
    }

    const wasFavorite = favorites.includes(id);
    dispatch({ type: wasFavorite ? "REMOVE" : "ADD", id });

    const result = wasFavorite
      ? await supabase.from("favorites").delete().eq("product_id", id).eq("user_id", user.id)
      : await supabase.from("favorites").insert({ product_id: id, user_id: user.id });

    if (result.error) {
      dispatch({ type: wasFavorite ? "ADD" : "REMOVE", id });
      console.error("Could not update favorite:", result.error.message);
    }
  }, [favorites, router, user]);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
}
