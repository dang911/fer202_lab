import React from "react";
import { Product } from "@/data/products";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      data-testid="product-card"
      className="group flex flex-col justify-between overflow-hidden border-slate-800 bg-slate-900/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10"
    >
      <div>
        {/* Product Image Container with consistent aspect ratio */}
        <div className="relative aspect-square w-full overflow-hidden bg-slate-950/60 p-4 flex items-center justify-center border-b border-slate-800/80">
          <img
            data-testid="product-image"
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {product.category && (
            <Badge
              variant="secondary"
              className="absolute top-3 left-3 bg-slate-800/90 text-slate-300 border-slate-700/60 text-xs px-2.5 py-0.5"
            >
              {product.category}
            </Badge>
          )}
          {product.rating && (
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-slate-800/90 px-2 py-0.5 text-xs text-amber-300 border border-slate-700/60">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        {/* Card Header & Content */}
        <CardHeader className="p-5 pb-2">
          <CardTitle
            data-testid="product-name"
            className="text-lg font-bold text-slate-100 transition-colors group-hover:text-indigo-400 line-clamp-1"
          >
            {product.name}
          </CardTitle>
          <CardDescription
            data-testid="product-description"
            className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed"
          >
            {product.description}
          </CardDescription>
        </CardHeader>
      </div>

      {/* Card Footer with Price and Action */}
      <CardFooter className="p-5 pt-3 flex items-center justify-between border-t border-slate-800/50 mt-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Price</span>
          <span
            data-testid="product-price"
            className="text-lg font-extrabold text-indigo-400 tracking-tight"
          >
            {product.price}
          </span>
        </div>
        <Button
          size="sm"
          className="bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm transition-all text-xs font-semibold gap-1.5 px-3 py-1.5"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>Add</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
