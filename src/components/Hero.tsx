import BasketIllustration from "./BasketIllustration";
import { todayBn } from "@/lib/format";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="grid items-center gap-6 rounded-3xl border border-base-300 bg-base-100 p-6 md:grid-cols-[1fr_auto] md:p-10">
        <div className="space-y-4">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {todayBn()}
          </span>

          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="max-w-xl text-sm text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="btn btn-primary btn-sm shadow-md sm:btn-md"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <BasketIllustration />
      </div>
    </section>
  );
}