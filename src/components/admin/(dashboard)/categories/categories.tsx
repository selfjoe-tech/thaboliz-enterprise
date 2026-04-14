// app/components/admin/(dashboard)/categories/categories.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import AddCategoryDialog from "./add-category-dialog";
import EditCategoryDialog from "./edit-category-dialog";
import { TableRow } from "./table-row";
import { CategoryCard } from "./category-card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/ui/pagination";

type Category = {
  id: string;
  name: string;
  slug?: string;
  description?: string | null;
  is_active?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
};

export default function Categories({
  initialItems,
  total,
  initialPage,
  initialPageSize,
  initialSearch,
}: {
  initialItems: Category[];
  total: number;
  initialPage: number;
  initialPageSize: number;
  initialSearch: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // internal state seeded from server
  const [categories, setCategories] = useState<Category[]>(initialItems ?? []);
  const [search, setSearch] = useState(initialSearch ?? "");
  const [showAdd, setShowAdd] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showEdit, setShowEdit] = useState(false);

  const pageParam = Number(searchParams?.get("page") ?? initialPage ?? 1);
  const pageSizeParam = Number(searchParams?.get("pageSize") ?? initialPageSize ?? 10);
  const currentPage = Number.isFinite(pageParam) ? Math.max(1, pageParam) : 1;
  const pageSize = Number.isFinite(pageSizeParam) ? Math.max(1, pageSizeParam) : 10;

  useEffect(() => {
    setCategories(initialItems ?? []);
  }, [initialItems]);

  // client-side filtering on the current page only (we also support server search param)
  const filteredCategories = useMemo(() => {
    if (!search?.trim()) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [categories, search]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function pushQuery(params: { page?: number; pageSize?: number; search?: string }) {
    const qp = new URLSearchParams(searchParams?.toString() ?? "");
    if (params.page !== undefined) qp.set("page", String(params.page));
    if (params.pageSize !== undefined) qp.set("pageSize", String(params.pageSize));
    if (params.search !== undefined) {
      if (params.search) qp.set("search", params.search);
      else qp.delete("search");
    }
    const url = `${pathname}?${qp.toString()}`;
    router.push(url);
  }

  // search handler — update URL search param and reset page to 1
  const handleSearchChange = (v: string) => {
    setSearch(v);
    // debounce would be nicer; simple immediate push for now
    pushQuery({ page: 1, search: v });
  };

  const handlePageChange = (page: number) => {
    pushQuery({ page });
  };

  const handlePageSizeChange = (pageSize: number) => {
    // when pageSize changes, reset to page 1
    pushQuery({ page: 1, pageSize });
  };

  return (
    <div className="p-0 md:p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Categories</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm font-medium shadow-sm hover:bg-gray-800 transition"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* page size selector */}
        <div className="ml-auto md:ml-0">
          <label className="text-sm mr-2">Per page</label>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="border px-2 py-1 rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {filteredCategories.length ? (
          filteredCategories.map((cat) => <CategoryCard key={cat.id} cat={cat} />)
        ) : (
          <p className="text-center text-sm text-gray-500">No categories found.</p>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-200">
            {filteredCategories.length ? (
              filteredCategories.map((cat) => <TableRow key={cat.id} cat={cat} />)
            ) : (
              <tr>
                <td colSpan={4} className="p-6 text-center text-sm text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (desktop + mobile) */}
      <div className="mt-4 flex items-center justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Dialogs */}
      <AddCategoryDialog open={showAdd} onOpenChange={setShowAdd} />
      <EditCategoryDialog open={showEdit} onOpenChange={setShowEdit} category={editingCategory} />
    </div>
  );
}
