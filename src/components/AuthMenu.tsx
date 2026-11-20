"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Avatar from "./Avatar";

export default function AuthMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

 //skeleton
  if (isPending) {
    return (
      <div className="skeleton h-9 w-28 rounded-lg" aria-label="লোড হচ্ছে" />
    );
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { user } = session;
  const firstName = user.name.trim().split(/\s+/)[0];

  
  const closeMenu = () =>
    (document.activeElement as HTMLElement | null)?.blur();

  const handleSignOut = async () => {
    closeMenu();
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি");
      return;
    }
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        tabIndex={0}
        className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-base-200"
        aria-label="প্রোফাইল মেনু"
      >
        <Avatar name={user.name} image={user.image} size={32} />
        <span className="hidden max-w-28 truncate text-sm font-medium sm:block">
          {firstName}
        </span>
        <span className="text-[10px] text-base-content/50">▾</span>
      </button>

      <div
        tabIndex={0}
        className="dropdown-content z-50 mt-2 w-60 rounded-xl border border-base-300 bg-base-100 p-2 shadow-lg"
      >
       
        <div className="px-3 py-2">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs text-base-content/60">{user.email}</p>
        </div>

        <div className="my-1 h-px bg-base-300" />

        <ul className="menu menu-sm w-full p-0">
          <li>
            <Link href="/profile" onClick={closeMenu} className="gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21a8 8 0 0116 0" />
              </svg>
              আমার প্রোফাইল
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={handleSignOut}
              className="gap-2 text-error"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M9 14L4 9l5-5" />
                <path d="M4 9h11a5 5 0 015 5v1" />
              </svg>
              সাইন আউট
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}