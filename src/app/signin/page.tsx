"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // without login, puts here
  useEffect(() => {
    if (searchParams.get("reason") === "login-required") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "login-required" });
    }
  }, [searchParams]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(
        error.status === 401
          ? "ইমেইল বা পাসওয়ার্ড ভুল"
          : error.message || "সাইন ইন করা যায়নি"
      );
      return;
    }

    toast.success("সাইন ইন সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">সাইন ইন</h1>
        <p className="mt-1 text-sm text-base-content/60">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="mx-auto w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block space-y-1">
            <span className="text-sm font-medium">ইমেইল</span>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="input w-full"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium">পাসওয়ার্ড</span>
            <input
              name="password"
              type="password"
              required
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="input w-full"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full shadow-md"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-base-content/50">
          <span className="h-px flex-1 bg-base-300" />
          অথবা
          <span className="h-px flex-1 bg-base-300" />
        </div>

        <SocialButtons />

        <p className="mt-5 text-center text-sm text-base-content/70">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <p className="mt-6 text-center text-sm">
        <Link href="/" className="text-base-content/60 hover:text-primary">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}