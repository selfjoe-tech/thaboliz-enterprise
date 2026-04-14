"use client";

import Image from "next/image";
import Link from "next/link";

type Product = {
  id: string;
  title: string;
  retailer: "Takealot" | "Makro";
  price: number;
  image_url: string | null;
  is_published: boolean;
  is_featured: boolean;
  category_names: string[];
};

export default function TableRow({
  product,
  processingId,
  onDelete,
  onTogglePublish,
  onToggleFeatured,
}: {
  product: Product;
  processingId: string | null;
  onDelete: () => void;
  onTogglePublish: () => void;
  onToggleFeatured: () => void;
}) {
  const busy = processingId === product.id;

  return (
    <tr className="border-b border-border">
      <td className="px-4 py-3">
        <div className="relative h-14 w-14 border border-border bg-background">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              className="object-cover"
            />
          ) : null}
        </div>
      </td>

      <td className="px-4 py-3 font-medium">{product.title}</td>
        <td className="px-4 py-3">
        {product.category_names?.length ? product.category_names.join(", ") : "-"}
        </td>
      <td className="px-4 py-3">{product.retailer}</td>
      <td className="px-4 py-3">R{Number(product.price).toFixed(2)}</td>

      <td className="px-4 py-3">
        <span className="border border-border px-2 py-1 text-xs">
          {product.is_published ? "Published" : "Draft"}
        </span>
      </td>

      <td className="px-4 py-3">
        <span className="border border-border px-2 py-1 text-xs">
          {product.is_featured ? "Featured" : "Standard"}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="border border-border px-3 py-1 text-xs"
          >
            Edit
          </Link>

          <button
            type="button"
            onClick={onTogglePublish}
            disabled={busy}
            className="border border-border px-3 py-1 text-xs"
          >
            {busy ? "..." : product.is_published ? "Unpublish" : "Publish"}
          </button>

          <button
            type="button"
            onClick={onToggleFeatured}
            disabled={busy}
            className="border border-border px-3 py-1 text-xs"
          >
            {busy ? "..." : product.is_featured ? "Unfeature" : "Feature"}
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={busy}
            className="border border-destructive px-3 py-1 text-xs text-destructive"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}