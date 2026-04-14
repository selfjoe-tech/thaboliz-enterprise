// app/components/(dashboard)/users/users-list.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { User as UserIcon, Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/ui/pagination";

type User = {
  id: string;
  name: string;
  phoneNumber?: string;
  totalOrders: number;
  totalSpend: number;
  createdAt?: string;
};

export default function UsersClient({
  initialItems,
  total,
  initialPage,
  initialPageSize,
  initialSearch,
}: {
  initialItems: User[];
  total: number;
  initialPage: number;
  initialPageSize: number;
  initialSearch: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [users, setUsers] = useState<User[]>(initialItems ?? []);
  const [search, setSearch] = useState(initialSearch ?? "");

  const pageParam = Number(searchParams?.get("page") ?? initialPage ?? 1);
  const pageSizeParam = Number(searchParams?.get("pageSize") ?? initialPageSize ?? 10);
  const currentPage = Number.isFinite(pageParam) ? Math.max(1, pageParam) : 1;
  const pageSize = Number.isFinite(pageSizeParam) ? Math.max(1, pageSizeParam) : 10;

  useEffect(() => {
    setUsers(initialItems ?? []);
  }, [initialItems]);

  const filtered = useMemo(() => {
    if (!search?.trim()) return users;
    const q = search.toLowerCase();
    return users.filter((u) => u.name?.toLowerCase().includes(q) || (u.phoneNumber ?? "").toLowerCase().includes(q));
  }, [users, search]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function pushQuery(params: { page?: number; pageSize?: number; search?: string }) {
    const qp = new URLSearchParams(searchParams?.toString() ?? "");
    if (params.page !== undefined) qp.set("page", String(params.page));
    if (params.pageSize !== undefined) qp.set("pageSize", String(params.pageSize));
    if (params.search !== undefined) {
      if (params.search) qp.set("search", params.search);
      else qp.delete("search");
    }
    router.push(`${pathname}?${qp.toString()}`);
  }

  const handleSearchChange = (v: string) => {
    setSearch(v);
    // simple immediate push; optionally debounce
    pushQuery({ page: 1, search: v });
  };

  const handlePageChange = (page: number) => pushQuery({ page });
  const handlePageSizeChange = (ps: number) => pushQuery({ page: 1, pageSize: ps });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Customers</h1>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search customers by name or phone..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        <div className="ml-2 inline-flex items-center gap-2">
          <label className="text-sm">Per page</label>
          <select value={pageSize} onChange={(e) => handlePageSizeChange(Number(e.target.value))} className="border px-2 py-1 rounded">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {filtered.map((user) => (
          <Link
            href={`/admin/customers/${user.id}`}
            key={user.id}
            className="flex items-center justify-between gap-3 p-4 border border-gray-200 rounded-xl shadow-sm bg-white"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 border border-gray-300">
                <UserIcon className="w-6 h-6 text-gray-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.phoneNumber}</p>
                <p className="text-sm text-gray-800 mt-1">
                  Orders: {user.totalOrders} | Spend: R{user.totalSpend.toFixed(2)}
                </p>
              </div>
            </div>

            <ChevronRight />
          </Link>
        ))}
        {filtered.length === 0 && <p className="text-center text-sm text-gray-500">No customers found.</p>}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-center">Orders</th>
              <th className="p-3 text-right">Total Spend</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 border border-gray-300">
                    <UserIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <span className="font-medium">{user.name}</span>
                </td>
                <td className="p-3">{user.phoneNumber}</td>
                <td className="p-3 text-center">{user.totalOrders}</td>
                <td className="p-3 text-right">R {user.totalSpend.toFixed(2)}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => router.push(`/admin/customers/${user.id}`)}
                    className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
