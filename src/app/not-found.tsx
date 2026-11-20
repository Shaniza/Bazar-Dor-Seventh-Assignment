import Link from "next/link";
import { SearchX, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <span className="flex h-24 w-24 items-center justify-center rounded-full bg-base-100 text-primary shadow-sm">
        <SearchX size={44} strokeWidth={1.5} aria-hidden="true" />
      </span>

      <p className="mt-6 text-5xl font-bold text-primary">৪০৪</p>
      <h1 className="mt-2 text-2xl font-bold">পেজটি পাওয়া যায়নি</h1>
      <p className="mt-2 text-sm text-base-content/70">
        আপনি যে পেজটি খুঁজছেন সেটি নেই, সরিয়ে ফেলা হয়েছে, অথবা লিঙ্কটি ভুল।
      </p>

      <Link href="/" className="btn btn-primary btn-sm mt-6 gap-2 shadow-md sm:btn-md">
        <Home size={16} aria-hidden="true" />
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}