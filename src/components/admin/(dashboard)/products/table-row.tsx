"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Product = {
  id: string;
  title: string;
  categoryName: string;
  price: number | null;
  stockQuantity: number | null;
  stockStatus: "in_stock" | "out_of_stock" | "preorder";
  status: "draft" | "active" | "archived";
  purchaseMode: "internal" | "external";
  inventoryMode: "tracked" | "untracked";
  coverImageUrl: string | null;
};

type Props = {
  product: Product;
  setDeleteId: (id: string | null) => void;
  onRequestTogglePublish: (id: string, publish: boolean) => void;
  publishingId?: string | null;
};

export default function TableRow({
  product,
  setDeleteId,
  onRequestTogglePublish,
  publishingId,
}: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentlyActive = product.status === "active";
  const isPublishing = publishingId === product.id;

  const stockText =
    product.inventoryMode === "tracked"
      ? String(product.stockQuantity ?? 0)
      : product.stockStatus.replaceAll("_", " ");

  return (
    <tr className="transition-colors hover:bg-gray-50">
      <td className="px-4 py-3">
        <div className="relative h-12 w-12">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse rounded-md border border-gray-200 bg-gray-200" />
          )}

          <Image
            src={product.coverImageUrl || "/placeholder.png"}
            alt={product.title}
            fill
            className={`rounded-md border border-gray-200 object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </td>

      <td className="px-4 py-3 font-medium">{product.title}</td>
      <td className="px-4 py-3">{product.categoryName}</td>
      <td className="px-4 py-3">
        {product.price != null ? `R${product.price.toFixed(2)}` : "-"}
      </td>
      <td className="px-4 py-3">{stockText}</td>
      <td className="px-4 py-3 capitalize">
        {product.purchaseMode} / {product.inventoryMode}
      </td>
      <td className="px-4 py-3">
        <span
          className={`rounded-full px-2 py-0.5 text-xs ${
            product.status === "active"
              ? "bg-green-100 text-green-700"
              : product.status === "archived"
              ? "bg-red-100 text-red-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {product.status}
        </span>
      </td>

      <td className="py-3">
        <div className="inline-flex items-center gap-2">
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="rounded-md border border-gray-300 px-3 py-1 text-xs hover:bg-gray-100"
          >
            Edit
          </Link>

          <button
            onClick={() => setDeleteId(product.id)}
            className="rounded-md border border-red-300 px-3 py-1 text-xs text-red-600 hover:bg-red-50"
          >
            Delete
          </button>

          <button
            onClick={() => onRequestTogglePublish(product.id, !currentlyActive)}
            disabled={isPublishing}
            className={`rounded-md border px-3 py-1 text-xs ${
              currentlyActive
                ? "border-yellow-600 text-yellow-700 hover:bg-yellow-50"
                : "border-sky-600 text-sky-700 hover:bg-sky-50"
            } ${isPublishing ? "cursor-not-allowed opacity-60" : ""}`}
          >
            {isPublishing ? "Processing..." : currentlyActive ? "Move to draft" : "Activate"}
          </button>
        </div>
      </td>
    </tr>
  );
}