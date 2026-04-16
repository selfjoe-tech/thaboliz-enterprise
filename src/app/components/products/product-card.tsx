import Image from "next/image";
import Link from "next/link";
import { CatalogProduct } from "@/app/lib/actions/catalog";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(price);
}

function getDiscountPercent(price: number, originalPrice?: number | null) {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export default function ProductCard({ product }: { product: CatalogProduct }) {
  const discount = getDiscountPercent(product.price, product.compareAtPrice);

  return (
    <Link
      href={product.href}
      target={product.purchaseMode === "external" ? "_blank" : undefined}
      rel={
        product.purchaseMode === "external"
          ? "noopener noreferrer sponsored"
          : undefined
      }
      className="group block border border-neutral-200 bg-white transition hover:border-neutral-400 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-neutral-200 bg-white">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-contain p-4 transition duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {product.storeName ? (
            <span className="border border-neutral-300 px-2 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-700">
                {product.storeName}
            </span>
            ) : null}

          {product.categories.slice(0, 2).map((category) => (
            <span
              key={category}
              className="text-[11px] uppercase tracking-[0.08em] text-neutral-500"
            >
              {category}
            </span>
          ))}
        </div>

        <h3 className="line-clamp-2 min-h-[44px] text-[14px] font-medium leading-5 text-neutral-900 sm:text-[15px]">
          {product.title}
        </h3>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-2xl font-semibold tracking-tight text-neutral-950">
            {formatPrice(product.price)}
          </span>

          {product.compareAtPrice ? (
            <span className="pb-0.5 text-sm text-neutral-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          ) : null}
        </div>

        <div className="mt-1 min-h-[20px]">
          {discount ? (
            <p className="text-sm font-medium text-green-600">{discount}% off</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}