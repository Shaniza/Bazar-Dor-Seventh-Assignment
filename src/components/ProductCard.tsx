import Link from "next/link";
import { TProduct } from "@/types";
import { changeBadge, changeText, priceText, unitText } from "@/lib/format";

export default function ProductCard({ product }: { product: TProduct }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-xl border border-base-300 bg-base-100 p-4 transition hover:border-primary hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-base-200 text-2xl">
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{product.nameBn}</h3>
          <p className="text-xs text-base-content/60">
            {unitText(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-lg font-bold">{priceText(product.today)}</p>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${changeBadge[product.change.dir]}`}
        >
          {changeText(product.change)}
        </span>
      </div>
    </Link>
  );
}