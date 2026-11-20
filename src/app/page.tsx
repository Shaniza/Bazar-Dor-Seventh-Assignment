import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import { getAllProducts } from "@/lib/api";
import { changeColor, toBn } from "@/lib/format";
import { getFallers, getRisers } from "@/lib/products";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-6xl space-y-10 px-4 pb-12">
        <ProductSection
          title={
            <>
              <span className={changeColor.up}>▲</span> আজ দাম বেড়েছে
            </>
          }
          products={getRisers(products)}
        />

        <ProductSection
          title={
            <>
              <span className={changeColor.down}>▼</span> আজ দাম কমেছে
            </>
          }
          products={getFallers(products)}
        />

        <ProductSection
          id="সব-পণ্য"
          title="সব পণ্য"
          subtitle={`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`}
          products={products}
        />
      </div>
    </>
  );
}