"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";
import { isValidEmail, isValidName } from "@/lib/validate";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));
    const confirm = String(form.get("confirm"));

    // validation
    // validation 
    if (!isValidName(name)) {
      toast.error("সঠিক নাম লিখুন (অন্তত ২ অক্ষর, শুধু চিহ্ন চলবে না)");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("সঠিক ইমেইল ঠিকানা দিন (যেমন: you@example.com)");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      toast.error("দুটো পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-1 text-sm text-base-content/60">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="mx-auto w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <label className="block space-y-1">
            <span className="text-sm font-medium">নাম</span>
            <input
              name="name"
              type="text"
              required
              placeholder="যেমন: রহিম উদ্দিন"
              className="input w-full"
            />
          </label>

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
              minLength={8}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="input w-full"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium">পাসওয়ার্ড নিশ্চিত করুন</span>
            <input
              name="confirm"
              type="password"
              required
              placeholder="আবার লিখুন"
              className="input w-full"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full shadow-md"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-base-content/50">
          <span className="h-px flex-1 bg-base-300" />
          অথবা
          <span className="h-px flex-1 bg-base-300" />
        </div>

        <SocialButtons />

        <p className="mt-5 text-center text-sm text-base-content/70">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-semibold text-primary hover:underline">
            সাইন ইন করুন
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