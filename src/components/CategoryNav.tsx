"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TCategory } from "@/types";

export default function CategoryNav({
  categories,
}: {
  categories: TCategory[];
}) {
  const pathname = usePathname();

  return (
    <nav className="border-t border-base-300" aria-label="পণ্যের বিভাগ">
      <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
        {categories.map((category) => {
          const href = `/category/${category.slug}`;
          const isActive = pathname === href;

          return (
            <li key={category.slug} className="shrink-0">
              <Link
                href={href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm ${
                  isActive
                    ? "bg-primary font-semibold text-primary-content"
                    : "text-base-content/70 hover:bg-base-200"
                }`}
              >
                <span>{category.icon}</span>
                {category.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}