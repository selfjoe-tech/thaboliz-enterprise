"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  deleteProductAction,
  togglePublishStatus,
} from "@/app/lib/actions/dashboard-info/product";
import ConfirmModal from "@/components/ui/confirm-modal";
import Pagination from "@/components/ui/pagination";
import ProductCard from "./product-card";
import TableRow from "./table-row";

type Product = {
  id: string;
  title: string;
  categoryName: string;
  categoryId: string | null;
  price: number | null;
  stockQuantity: number | null;
  stockStatus: "in_stock" | "out_of_stock" | "preorder";
  status: "draft" | "active" | "archived";
  purchaseMode: "internal" | "external";
  inventoryMode: "tracked" | "untracked";
  coverImageUrl: string | null;
  externalUrl: string | null;
};

type CategoryOption = {
  label: string;
  value: string;
};

export default function ProductListPage({
  cats,
  initialItems,
  total,
  initialPage = 1,
  initialPageSize = 10,
  initialSearch = "",
  initialCategory = "all",
  initialStatus = "all",
}: {
  cats: CategoryOption[];
  initialItems: Product[];
  total: number;
  initialPage?: number;
  initialPageSize?: number;
  initialSearch?: string;
  initialCategory?: string;
  initialStatus?: string;
}) {
  const router = useRouter();

  const [items, setItems] = useState<Product[]>(initialItems);
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [status, setStatus] = useState(initialStatus);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [publishRequest, setPublishRequest] = useState<{
    id: string;
    publish: boolean;
    open: boolean;
  } | null>(null);

  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    setPageSize(initialPageSize);
  }, [initialPageSize]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const url = new URL(window.location.href);

      if (search.trim()) {
        url.searchParams.set("search", search.trim());
      } else {
        url.searchParams.delete("search");
      }

      if (category !== "all") {
        url.searchParams.set("category", category);
      } else {
        url.searchParams.delete("category");
      }

      if (status !== "all") {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      url.searchParams.set("page", "1");
      url.searchParams.set("pageSize", String(pageSize));

      router.replace(url.pathname + url.search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, category, status, pageSize, router]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const gotoPage = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(page));
    url.searchParams.set("pageSize", String(pageSize));
    router.push(url.pathname + url.search);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
  };

  const handleRequestTogglePublish = (id: string, publish: boolean) => {
    setPublishRequest({ id, publish, open: true });
  };

  const handleConfirmPublish = async () => {
    if (!publishRequest) return;

    const prev = items.slice();

    setItems((current) =>
      current.map((item) =>
        item.id === publishRequest.id
          ? {
              ...item,
              status: publishRequest.publish ? "active" : "draft",
            }
          : item,
      ),
    );

    setPublishingId(publishRequest.id);
    setPublishRequest(null);

    try {
      const res = await togglePublishStatus(
        publishRequest.id,
        publishRequest.publish,
      );

      if (!res?.success) {
        throw new Error(res?.error || "Failed to update product status");
      }
    } catch (error) {
      setItems(prev);
      alert("Failed to update product status");
    } finally {
      setPublishingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    const prev = items.slice();
    setItems((current) => current.filter((item) => item.id !== id));
    setDeleteId(null);

    try {
      const res = await deleteProductAction(id);

      if (!res?.success) {
        throw new Error(res?.error || "Failed to delete product");
      }
    } catch (error) {
      setItems(prev);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="p-0 md:p-4">
      <h1 className="mb-6 text-xl font-bold md:text-2xl">Products</h1>

      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black md:w-1/3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black md:w-1/4"
        >
          <option value="all">All Categories</option>
          {cats.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black md:w-40"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>

        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black md:w-40"
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
        </select>

        <Link
          href="/admin/products/new"
          className="rounded-lg bg-black px-4 py-2 text-center text-white transition hover:bg-gray-800"
        >
          + Add Product
        </Link>
      </div>

      <div className="mb-4 md:hidden">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={gotoPage}
        />
      </div>

      <div className="space-y-4 md:hidden">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            setDeleteId={setDeleteId}
            onRequestTogglePublish={handleRequestTogglePublish}
          />
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Mode</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-sm">
            {items.map((product) => (
              <TableRow
                key={product.id}
                product={product}
                setDeleteId={setDeleteId}
                onRequestTogglePublish={handleRequestTogglePublish}
                publishingId={publishingId}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={gotoPage}
        />
      </div>

      {deleteId && (
        <ConfirmModal
          open={!!deleteId}
          title="Delete product?"
          description="This will permanently delete the product."
          confirmLabel="Delete"
          confirmIntent="danger"
          isProcessing={false}
          onClose={() => setDeleteId(null)}
          onConfirm={async () => {
            if (deleteId) await handleDelete(deleteId);
          }}
        />
      )}

      {publishRequest && (
        <ConfirmModal
          open={publishRequest.open}
          title={publishRequest.publish ? "Activate product?" : "Move product to draft?"}
          description={
            publishRequest.publish
              ? "This product will be visible in the storefront."
              : "This product will be hidden from the storefront."
          }
          confirmLabel={publishRequest.publish ? "Activate" : "Move to draft"}
          confirmIntent="primary"
          isProcessing={!!publishingId}
          onClose={() => setPublishRequest(null)}
          onConfirm={handleConfirmPublish}
        />
      )}
    </div>
  );
}