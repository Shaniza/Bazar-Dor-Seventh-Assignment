"use client";

import { useState } from "react";
import { TProduct } from "@/types";
import { SortKey, sortProducts } from "@/lib/sort";
import { toBn } from "@/lib/format";
import ProductCard from "./ProductCard";

export default function SortableProducts({
  products,
}: {
  products: TProduct[];
}) {
  const [sort, setSort] = useState<SortKey>("default");
  const sorted = sortProducts(products, sort);

  return (
    <>
      {/* সাজান: ডানদিকে, আলাদা কার্ডে */}
      <div className="flex items-center justify-end gap-2 rounded-2xl border border-base-300 bg-base-100 p-3">
        <label htmlFor="sort" className="text-sm text-base-content/70">
          সাজান:
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="appearance-none rounded-lg border border-base-300 bg-base-100 py-2 pl-3 pr-9 text-sm focus:border-primary focus:outline-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="pointer-events-none absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/60"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <p className="mt-4 text-xs text-base-content/60">
        মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}