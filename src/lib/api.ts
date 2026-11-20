import { TCategory, TProduct } from "@/types";

 
const BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchJson<T>(path: string): Promise<T> {
  let lastError: unknown;

  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`);
      if (res.ok) return (await res.json()) as T;
      lastError = new Error(`HTTP ${res.status}`);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("ডেটা আনা যায়নি");
}

export async function getAllProducts(): Promise<TProduct[]> {
  return fetchJson<TProduct[]>("/products");
}

export async function getProductBySlug(slug: string): Promise<TProduct | null> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByCategory(
  category: string
): Promise<TProduct[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.category === category);
}

export async function getCategories(): Promise<TCategory[]> {
  return fetchJson<TCategory[]>("/categories");
}

export async function getCategoryBySlug(
  slug: string
): Promise<TCategory | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}