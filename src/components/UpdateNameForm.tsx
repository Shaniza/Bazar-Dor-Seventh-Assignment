"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { isValidName } from "@/lib/validate";

export default function UpdateNameForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();

    if (!isValidName(name)) {
      toast.error("সঠিক নাম লিখুন (অন্তত ২ অক্ষর, শুধু চিহ্ন না)");
      return;
    }
    if (name === currentName) {
      toast.error("নতুন নাম আগের নামের মতোই");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name });
    setLoading(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }

    toast.success("নাম আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <label className="block space-y-1">
        <span className="text-sm font-medium">নাম</span>
        <input
          name="name"
          type="text"
          defaultValue={currentName}
          placeholder="আপনার নতুন নাম"
          className="input w-full"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full shadow-md"
      >
        {loading ? "অপেক্ষা করুন..." : "আপডেট"}
      </button>
    </form>
  );
}