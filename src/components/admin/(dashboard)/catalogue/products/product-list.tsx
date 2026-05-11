"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ConfirmModal from "@/components/ui/confirm-modal";
import Pagination from "@/components/ui/pagination";
import TableRow from "./table-row";
import {
  deleteCatalogueProductAction,
  toggleCatalogueProductFeaturedAction,
  toggleCatalogueProductPublishAction,
} from "@/app/lib/actions/dashboard-info/catalogue-product";

type Product = {
  id: string;
  title: string;
  retailer: "Takealot" | "Makro";
  price: number;
  image_url: string | null;
  is_published: boolean;
  is_featured: boolean;
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
};

type Category = {
  id: string;
  name: string;
};

export default function ProductListPage({
  initialItems,
  total,
  initialPage,
  initialPageSize,
  categories,
  initialSearch,
  initialCategory,
  initialRetailer,
}: {
  initialItems: Product[];
  total: number;
  initialPage: number;
  initialPageSize: number;
  categories: Category[];
  initialSearch: string;
  initialCategory: string;
  initialRetailer: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [retailer, setRetailer] = useState(initialRetailer);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [publishRequest, setPublishRequest] = useState<{
    id: string;
    publish: boolean;
  } | null>(null);

  const [featureRequest, setFeatureRequest] = useState<{
    id: string;
  } | null>(null);

  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  function pushQuery(params: {
    page?: number;
    pageSize?: number;
    search?: string;
    category?: string;
    retailer?: string;
  }) {
    const qp = new URLSearchParams(searchParams?.toString() ?? "");

    if (params.page !== undefined) qp.set("page", String(params.page));
    if (params.pageSize !== undefined) qp.set("pageSize", String(params.pageSize));

    if (params.search !== undefined) {
      params.search ? qp.set("search", params.search) : qp.delete("search");
    }

    if (params.category !== undefined) {
      params.category && params.category !== "all"
        ? qp.set("category", params.category)
        : qp.delete("category");
    }

    if (params.retailer !== undefined) {
      params.retailer && params.retailer !== "all"
        ? qp.set("retailer", params.retailer)
        : qp.delete("retailer");
    }

    router.push(`${pathname}?${qp.toString()}`);
  }

  const totalPages = Math.max(1, Math.ceil(total / initialPageSize));

  const handleDelete = async () => {
    if (!deleteId) return;

    const previous = items;
    setItems((prev) => prev.filter((item) => item.id !== deleteId));
    setProcessingId(deleteId);

    try {
      const res = await deleteCatalogueProductAction(deleteId);
      if (!res?.success) throw new Error(res?.error || "Delete failed");
      setDeleteId(null);
      router.refresh();
    } catch (error) {
      setItems(previous);
      alert(String(error));
    } finally {
      setProcessingId(null);
    }
  };

  const handlePublish = async () => {
    if (!publishRequest) return;

    const previous = items;
    setProcessingId(publishRequest.id);

    setItems((prev) =>
      prev.map((item) =>
        item.id === publishRequest.id
          ? { ...item, is_published: publishRequest.publish }
          : item
      )
    );

    try {
      const res = await toggleCatalogueProductPublishAction(publishRequest.id);
      if (!res?.success) throw new Error(res?.error || "Failed");
      setPublishRequest(null);
    } catch (error) {
      setItems(previous);
      alert(String(error));
    } finally {
      setProcessingId(null);
    }
  };

  const handleFeature = async () => {
    if (!featureRequest) return;

    const previous = items;
    setProcessingId(featureRequest.id);

    setItems((prev) =>
      prev.map((item) =>
        item.id === featureRequest.id
          ? { ...item, is_featured: !item.is_featured }
          : item
      )
    );

    try {
      const res = await toggleCatalogueProductFeaturedAction(featureRequest.id);
      if (!res?.success) throw new Error(res?.error || "Failed");
      setFeatureRequest(null);
    } catch (error) {
      setItems(previous);
      alert(String(error));
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link
          href="/admin/products/add"
          className="border border-border bg-background px-4 py-2 text-sm font-medium"
        >
          Add Product
        </Link>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <input
          type="text"
          value={search}
          placeholder="Search products..."
          onChange={(e) => {
            setSearch(e.target.value);
            pushQuery({ page: 1, search: e.target.value });
          }}
          className="h-11 border border-input bg-background px-3"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            pushQuery({ page: 1, category: e.target.value });
          }}
          className="h-11 border border-input bg-background px-3"
        >
          <option value="all">All categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={retailer}
          onChange={(e) => {
            setRetailer(e.target.value);
            pushQuery({ page: 1, retailer: e.target.value });
          }}
          className="h-11 border border-input bg-background px-3"
        >
          <option value="all">All retailers</option>
          <option value="Takealot">Takealot</option>
          <option value="Makro">Makro</option>
        </select>

        <select
          value={initialPageSize}
          onChange={(e) =>
            pushQuery({ page: 1, pageSize: Number(e.target.value) })
          }
          className="h-11 border border-input bg-background px-3"
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
        </select>
      </div>

      <div className="overflow-x-auto border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Retailer</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Featured</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((product) => (
              <TableRow
                key={product.id}
                product={product}
                processingId={processingId}
                onDelete={() => setDeleteId(product.id)}
                onTogglePublish={() =>
                  setPublishRequest({
                    id: product.id,
                    publish: !product.is_published,
                  })
                }
                onToggleFeatured={() => setFeatureRequest({ id: product.id })}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <Pagination
          currentPage={initialPage}
          totalPages={totalPages}
          onPageChange={(page) => pushQuery({ page })}
        />
      </div>

      <ConfirmModal
        open={!!deleteId}
        title="Delete product?"
        description="This will permanently delete the product."
        confirmLabel="Delete"
        confirmIntent="danger"
        isProcessing={processingId === deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />

      <ConfirmModal
        open={!!publishRequest}
        title={publishRequest?.publish ? "Publish product?" : "Unpublish product?"}
        description={
          publishRequest?.publish
            ? "This product will appear on the storefront."
            : "This product will be hidden from the storefront."
        }
        confirmLabel={publishRequest?.publish ? "Publish" : "Unpublish"}
        confirmIntent="primary"
        isProcessing={processingId === publishRequest?.id}
        onClose={() => setPublishRequest(null)}
        onConfirm={handlePublish}
      />

      <ConfirmModal
        open={!!featureRequest}
        title="Toggle featured?"
        description="This will switch the featured state for this product."
        confirmLabel="Continue"
        confirmIntent="primary"
        isProcessing={processingId === featureRequest?.id}
        onClose={() => setFeatureRequest(null)}
        onConfirm={handleFeature}
      />
    </div>
  );
}