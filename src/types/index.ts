export type TCategory = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export type TMarket = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type TProduct = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: TMarket[];
};