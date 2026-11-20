import { notFound } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import SortableProducts from "@/components/SortableProducts";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/format";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);

  
  if (!category) notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-8">
      
      <section className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-base-200 text-3xl">
          {category.icon}
        </span>
        <div>
          <h1 className="text-xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-base-content/60">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      {products.length === 0 ? (
        <EmptyState
          title="কোনো পণ্য পাওয়া যায়নি"
          message="এই বিভাগে এখন কোনো পণ্য নেই।"
        />
      ) : (
        <SortableProducts products={products} />
      )}
    </div>
  );
}