import { TProduct } from "@/types";

export type SortKey = "default" | "asc" | "desc";

 
export function sortProducts(products: TProduct[], key: SortKey): TProduct[] {
  if (key === "default") return products;
  return [...products].sort((a, b) =>
    key === "asc" ? a.today - b.today : b.today - a.today
  );
}