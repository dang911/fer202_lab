import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="ambient-bg min-h-screen flex flex-col justify-between">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex-1">
        {/* Hero Section */}
        <section className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Curated Tech Collection
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Discover Exceptional <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Hardware & Gear</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Elevate your workspace and lifestyle with top-tier technology, thoughtfully engineered for performance and comfort.
          </p>
        </section>

        {/* Product Grid Container */}
        {/* At 375px: 1 col, no horizontal scrolling. At 1280px (xl): 4 cols (at least 3 columns) */}
        <div
          data-testid="product-list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950/60 py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 TechPulse Inc. Lab 2 Demonstration. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-slate-200 transition-colors">Products</Link>
            <Link href="/login" className="hover:text-slate-200 transition-colors">Login</Link>
            <Link href="/register" className="hover:text-slate-200 transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
