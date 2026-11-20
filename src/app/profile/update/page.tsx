import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateNameForm from "@/components/UpdateNameForm";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=login-required");

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="mt-1 text-sm text-base-content/60">
          আপনার প্রোফাইলের নাম বদলান।
        </p>
      </div>

      <section className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <UpdateNameForm currentName={session.user.name} />
      </section>

      <Link
        href="/profile"
        className="inline-block text-sm text-base-content/60 hover:text-primary"
      >
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
}