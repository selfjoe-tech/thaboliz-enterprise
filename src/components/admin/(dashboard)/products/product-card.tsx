"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

type ProductCardProps = {
  product: {
    id: string;
    title: string;
    categoryName: string;
    price: number | null;
    stockQuantity: number | null;
    stockStatus: string;
    status: string;
    inventoryMode: string;
    coverImageUrl: string | null;
  };
  setDeleteId: (id: string) => void;
  onRequestTogglePublish: (id: string, publish: boolean) => void;
};

export default function ProductCard({
  product,
  setDeleteId,
  onRequestTogglePublish,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const stockText =
    product.inventoryMode === "tracked"
      ? `Stock: ${product.stockQuantity ?? 0}`
      : `Stock: ${product.stockStatus.replaceAll("_", " ")}`;

  const isActive = product.status === "active";

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <Link href={`/admin/products/${product.id}/edit`} className="flex gap-4">
        <div className="relative h-24 w-24 flex-shrink-0">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse rounded-lg border border-gray-200 bg-gray-200" />
          )}

          <Image
            src={product.coverImageUrl || "/placeholder.png"}
            alt={product.title}
            fill
            className={`rounded-lg border border-gray-200 object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <div className="line-clamp-1 text-base font-semibold">
                {product.title}
              </div>
              <div className="text-sm text-gray-600">{product.categoryName}</div>
            </div>

            <ChevronRight />
          </div>

          <div>
            <div className="mt-1 font-bold">
              {product.price != null ? `R${product.price.toFixed(2)}` : "-"}
            </div>
            <div className="text-sm text-gray-600">{stockText}</div>

            <span
              className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs ${
                isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
              }`}
            >
              {product.status}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex gap-2">
        <button
          onClick={() => setDeleteId(product.id)}
          className="rounded-md border border-red-300 px-3 py-1 text-xs text-red-600 hover:bg-red-50"
        >
          Delete
        </button>

        <button
          onClick={() => onRequestTogglePublish(product.id, !isActive)}
          className="rounded-md border border-sky-300 px-3 py-1 text-xs text-sky-700 hover:bg-sky-50"
        >
          {isActive ? "Move to draft" : "Activate"}
        </button>
      </div>
    </div>
  );
}