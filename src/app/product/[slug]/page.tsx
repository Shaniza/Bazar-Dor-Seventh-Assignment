import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";
import {
  avgPriceText,
  changeBadge,
  changeText,
  priceText,
  toBn,
  unitShortText,
  unitText,
} from "@/lib/format";
import { getPriceSummary } from "@/lib/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
 
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=login-required");
  
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const summary = getPriceSummary(product);

   
  const diff = product.today - product.yesterday;
  const diffText =
    diff > 0
      ? `গতকালের তুলনায় আজ দাম বেড়েছে ${toBn(diff)} টাকা`
      : diff < 0
        ? `গতকালের তুলনায় আজ দাম কমেছে ${toBn(Math.abs(diff))} টাকা`
        : "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  const summaryCards = summary
    ? [
        {
          label: "সর্বনিম্ন দাম",
          value: priceText(summary.min),
          color: "text-success",
          note: "সবচেয়ে কম দামের বাজার",
        },
        {
          label: "সর্বোচ্চ দাম",
          value: priceText(summary.max),
          color: "text-error",
          note: "সবচেয়ে বেশি দামের বাজার",
        },
        {
          label: "গড় দাম",
          value: priceText(summary.avg),
          color: "text-success",
          note: `${unitText(product.unit)} এর হিসাব`,
        },
      ]
    : [];

  return (
    <div className="mx-auto max-w-4xl space-y-5 px-4 py-6">
      {/* breadcrumb */}
      <nav
        aria-label="breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-xs text-base-content/60"
      >
        <Link href="/" className="hover:text-primary">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-primary"
        >
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-base-content">{product.nameBn}</span>
      </nav>

      
      <section className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-base-200 text-4xl">
              {product.image}
            </span>
            <div className="space-y-0.5">
              <h1 className="text-2xl font-bold">{product.nameBn}</h1>
              <p className="text-xs text-base-content/60">
                {unitText(product.unit)} · {product.categoryNameBn}
              </p>
              <p className="text-xs text-base-content/70">{diffText}</p>
            </div>
          </div>

          <div className="rounded-xl bg-base-200 px-5 py-3 text-center sm:min-w-32">
            <p className="text-xs text-base-content/60">আজকের দাম</p>
            <p className="text-3xl font-bold leading-tight">
              {toBn(product.today)}
            </p>
            <p className="text-xs text-base-content/60">
              টাকা / {unitShortText(product.unit)}
            </p>
            <span
              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${changeBadge[product.change.dir]}`}
            >
              {changeText(product.change)}
            </span>
          </div>
        </div>
      </section>

       
      {summary && (
        <section className="rounded-2xl border border-base-300 bg-base-100 p-5">
          <h2 className="mb-3 font-bold">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className="rounded-xl border border-base-300 p-3"
              >
                <p className="text-xs text-base-content/60">{card.label}</p>
                <p className={`mt-1 text-lg font-bold ${card.color}`}>
                  {card.value}
                </p>
                <p className="mt-0.5 text-xs text-base-content/50">
                  {card.note}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* বাজারভিত্তিক আজকের দাম */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="mb-3 font-bold">বাজারভিত্তিক আজকের দাম</h2>

        {product.markets.length === 0 ? (
          <p className="text-sm text-base-content/60">
            এই পণ্যের বাজারভিত্তিক তথ্য এখন নেই।
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-base-300">
            <table className="table">
              <thead>
                <tr className="text-xs text-base-content/60">
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বোচ্চ</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((m) => (
                  <tr key={`${m.market}-${m.division}`}>
                    <td className="font-medium">{m.market}</td>
                    <td>{m.division}</td>
                    <td className="text-right">{priceText(m.min)}</td>
                    <td className="text-right">{priceText(m.max)}</td>
                    <td className="text-right font-bold">
                      {avgPriceText((m.min + m.max) / 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}