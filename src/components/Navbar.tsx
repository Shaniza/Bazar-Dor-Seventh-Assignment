import Link from "next/link";
import { getCategories } from "@/lib/api";
import { todayBn } from "@/lib/format";
import CategoryNav from "./CategoryNav";
import AuthMenu from "./AuthMenu";
import { ShoppingCart } from "lucide-react";

export default async function Navbar() {
  const categories = await getCategories();

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">

          

          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-content">
            <ShoppingCart size={22} aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold">বাজার দর</span>
            <span className="block text-xs text-base-content/60">
              {todayBn()}
            </span>
          </span>
        </Link>

        <AuthMenu />
      </div>

      <CategoryNav categories={categories} />
    </header>
  );
}