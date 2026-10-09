"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main data-testid="error-boundary" className="ambient-bg flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-bold text-white">Something went wrong.</h1>
      <button data-testid="btn-retry" onClick={() => reset()} className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">Try again</button>
    </main>
  );
}
