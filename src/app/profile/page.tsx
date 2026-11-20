import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  
  if (!session) redirect("/signin?reason=login-required");

  const { user } = session;

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-base-content/60">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} image={user.image} size={56} />
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-base-content/60">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </section>

      <section className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="mb-4 font-semibold">তথ্য</h2>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-base-content/60">নাম</dt>
            <dd className="font-medium">{user.name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-base-content/60">ইমেইল</dt>
            <dd className="font-medium">{user.email}</dd>
          </div>
        </dl>

        <Link
          href="/profile/update"
          className="btn btn-primary mt-5 w-full shadow-md"
        >
          তথ্য আপডেট করুন
        </Link>
      </section>
    </div>
  );
}