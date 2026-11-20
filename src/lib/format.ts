import { TProduct } from "@/types";

const bnNumber = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 1 });
const bnPercent = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
 
export const toBn = (value: number) => bnNumber.format(value);

 
export const priceText = (value: number) => `${toBn(value)} টাকা`;

const unitMap: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};
export const unitText = (unit: string) => unitMap[unit] ?? `প্রতি ${unit}`;

const unitShortMap: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const priceUnitText = (price: number, unit: string) =>
  `${toBn(price)} টাকা/${unitShortMap[unit] ?? unit}`;

 
export function changeText(change: TProduct["change"]) {
  const pct = bnPercent.format(Math.abs(change.pct));
  if (change.dir === "up") return `▲ ${pct}%`;
  if (change.dir === "down") return `▼ ${pct}%`;
  return `—${pct}%`;
}

 
export const changeColor: Record<TProduct["change"]["dir"], string> = {
  up: "text-error",
  down: "text-success",
  flat: "text-base-content/60",
};

 
export const changeBadge: Record<TProduct["change"]["dir"], string> = {
  up: "bg-error/10 text-error",
  down: "bg-success/10 text-success",
  flat: "bg-base-200 text-base-content/60",
};

 
export function todayBn() {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}