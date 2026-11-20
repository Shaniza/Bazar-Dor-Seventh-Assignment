"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type Provider = "google" | "github";

export default function SocialButtons() {
  const [loading, setLoading] = useState<Provider | null>(null);

  const handleSocial = async (provider: Provider) => {
    setLoading(provider);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    // সফল হলে ব্রাউজার provider-এর পেজে চলে যায়, তাই এখানে শুধু এরর দেখাই
    if (error) {
      toast.error(error.message || "লগইন করা যায়নি, আবার চেষ্টা করুন");
      setLoading(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => handleSocial("google")}
        disabled={loading !== null}
        className="btn btn-outline btn-sm gap-2 sm:btn-md"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.5 5.5 0 01-2.39 3.62v3h3.87c2.27-2.09 3.57-5.17 3.57-8.81z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.87-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.29v3.09A12 12 0 0012 24z" />
          <path fill="#FBBC05" d="M5.29 14.29a7.2 7.2 0 010-4.58V6.62H1.29a12 12 0 000 10.76l4-3.09z" />
          <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.59 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0A12 12 0 001.29 6.62l4 3.09C6.23 6.88 8.88 4.77 12 4.77z" />
        </svg>
        Google দিয়ে চালিয়ে যান
      </button>

      <button
        type="button"
        onClick={() => handleSocial("github")}
        disabled={loading !== null}
        className="btn btn-outline btn-sm gap-2 sm:btn-md"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
        </svg>
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}