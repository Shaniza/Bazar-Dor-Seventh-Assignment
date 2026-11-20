import Link from "next/link";
import { ShoppingBasket } from "lucide-react";

type Props = {
  title: string;
  message: string;
};

export default function EmptyState({ title, message }: Props) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-base-100 text-primary">
        <ShoppingBasket size={40} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary btn-sm mt-6 sm:btn-md">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}