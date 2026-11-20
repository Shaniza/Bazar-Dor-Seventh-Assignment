import { TProduct } from "@/types";
import ProductCard from "./ProductCard";

type Props = {
  id?: string;
  title: React.ReactNode;
  subtitle?: string;
  products: TProduct[];
};

export default function ProductSection({
  id,
  title,
  subtitle,
  products,
}: Props) {
  return (
    <section id={id} className="scroll-mt-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {subtitle && (
        <p className="mt-1 text-sm text-base-content/60">{subtitle}</p>
      )}

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}