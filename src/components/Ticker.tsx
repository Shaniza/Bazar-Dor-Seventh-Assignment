import { TProduct } from "@/types";
import { changeColor, changeText, priceUnitText } from "@/lib/format";

export default function Ticker({ products }: { products: TProduct[] }) {
  // তালিকা দুবার, যাতে ফাঁক ছাড়া অসীম ঘোরে
  const items = [...products, ...products];

  return (
    <div
      className="overflow-hidden border-b border-base-300 bg-base-100 py-2"
      aria-label="আজকের পণ্যের দামের তালিকা"
    >
      <ul className="flex w-max animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
        {items.map((p, index) => (
          <li
            key={`${p.id}-${index}`}
            className="flex shrink-0 items-center gap-1.5 border-r border-base-300 px-4 text-xs"
          >
            <span>{p.image}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span className="text-base-content/70">
              {priceUnitText(p.today, p.unit)}
            </span>
            <span className={changeColor[p.change.dir]}>
              {changeText(p.change)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}