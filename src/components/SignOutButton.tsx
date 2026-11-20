"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    const { error } = await authClient.signOut();
    setLoading(false);

    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি");
      return;
    }

    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className="btn btn-outline btn-error btn-sm"
    >
      {loading ? "অপেক্ষা করুন..." : "↩ সাইন আউট"}
    </button>
  );
}