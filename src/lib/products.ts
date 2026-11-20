import { TProduct } from "@/types";

// 6 products whose price incresed the most
export function getRisers(products: TProduct[]): TProduct[] {
  return products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
}

//  6 products whose price decresed the most
export function getFallers(products: TProduct[]): TProduct[] {
  return products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);
}