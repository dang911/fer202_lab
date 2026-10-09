import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import { Header } from "@/components/Header";
import { FavoriteButton } from "@/components/FavoriteButton";

interface ProductPageProps {
  params: { id: string };
}

function findProduct(id: string) {
  const numericId = Number(id);
  return Number.isInteger(numericId) ? products.find((product) => product.id === numericId) : undefined;
}

export function generateStaticParams() {
  return products.map((product) => ({ id: String(product.id) }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = findProduct(params.id);
  return { title: product ? `${product.name} | TechPulse` : "Product Not Found | TechPulse" };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = findProduct(params.id);
  if (!product) notFound();

  return (
    <div className="ambient-bg min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
        <article data-testid="product-detail" className="grid gap-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:grid-cols-2 md:p-8">
          <div className="flex min-h-64 items-center justify-center rounded-xl bg-slate-950/60 p-6">
            <Image src={product.image} alt={product.name} width={480} height={480} className="h-auto max-h-96 w-full object-contain" priority />
          </div>
          <div className="flex flex-col items-start gap-5">
            <p data-testid="detail-category" className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300">{product.category}</p>
            <h1 data-testid="detail-name" className="text-3xl font-bold text-white">{product.name}</h1>
            <p data-testid="detail-price" className="text-2xl font-bold text-indigo-400">${product.price.toFixed(2)}</p>
            <p data-testid="detail-description" className="leading-relaxed text-slate-300">{product.description}</p>
            <FavoriteButton productId={product.id} />
          </div>
        </article>
      </main>
    </div>
  );
}
