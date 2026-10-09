import Link from "next/link";

export default function NotFound() {
  return (
    <main data-testid="not-found" className="ambient-bg flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-4xl font-bold text-white">Product not found</h1>
      <p className="text-slate-400">The product you requested does not exist.</p>
      <Link href="/" className="text-indigo-300 underline">Return to the store</Link>
    </main>
  );
}
