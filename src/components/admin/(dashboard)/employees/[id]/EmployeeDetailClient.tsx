"use client";

import { useEffect, useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import Pagination from "@/components/ui/pagination";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Order = { id: string; order_number?: string; status?: string; total?: number; created_at?: string };

type Employee = { id: string; name?: string; email?: string; createdAt?: string; orders?: Order[]; totalOrdersCount?: number };

export default function EmployeeDetailClient({
  employee,
  initialPage,
  initialPageSize,
  initialSearch,
}: {
  employee: Employee;
  initialPage: number;
  initialPageSize: number;
  initialSearch: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [orders, setOrders] = useState<Order[]>(employee.orders ?? []);
  const [search, setSearch] = useState(initialSearch ?? "");

  const pageParam = Number(searchParams?.get("page") ?? initialPage ?? 1);
  const pageSizeParam = Number(searchParams?.get("pageSize") ?? initialPageSize ?? 10);
  const currentPage = Number.isFinite(pageParam) ? Math.max(1, pageParam) : 1;
  const pageSize = Number.isFinite(pageSizeParam) ? Math.max(1, pageSizeParam) : 10;

  useEffect(() => {
    setOrders(employee.orders ?? []);
  }, [employee.orders]);

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
    pushQuery({ page: 1, search: v });
  };

  const handlePageChange = (page: number) => pushQuery({ page });
  const handlePageSizeChange = (ps: number) => pushQuery({ page: 1, pageSize: ps });

  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
        <h2 className="text-lg font-semibold">{employee.name}</h2>
        <p className="text-sm text-gray-600">{employee.email}</p>
        <p className="text-sm text-gray-500 mt-1">Joined {employee.createdAt ? new Date(employee.createdAt).toLocaleDateString() : "-"}</p>
        <p className="text-sm text-gray-700 mt-2">Actions performed: {employee.totalOrdersCount ?? 0}</p>
      </div>

      {/* Search + page size */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search orders by id..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm mr-2">Per page</label>
          <select value={pageSize} onChange={(e) => handlePageSizeChange(Number(e.target.value))} className="border px-2 py-1 rounded">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* Mobile */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 px-4 md:hidden">
        <h2 className="text-lg font-semibold mb-4">Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div key={order.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => router.push(`/admin/orders/${order.id}`)}>
                <div className="font-medium">Order #{order.order_number ?? order.id}</div>
                <div className="text-sm text-gray-600">R{(order.total ?? 0).toFixed(2)}</div>
                <div className="text-xs text-gray-500">{order.created_at ? new Date(order.created_at).toLocaleDateString() : ""}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Order #</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-right">Total</th>
                  <th className="px-4 py-2 text-center">Date</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => router.push(`/admin/orders/${order.id}`)}>
                    <td className="px-4 py-2">{order.order_number ?? order.id}</td>
                    <td className="px-4 py-2">{order.status}</td>
                    <td className="px-4 py-2 text-right">R {(order.total ?? 0).toFixed(2)}</td>
                    <td className="px-4 py-2 text-center">{order.created_at ? new Date(order.created_at).toLocaleDateString() : ""}</td>
                    <td className="px-4 py-2 text-center">
                      <Link href={`/admin/orders/${order.id}`} className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 flex items-center justify-center">
          <Pagination currentPage={currentPage} totalPages={Math.max(1, Math.ceil((employee.totalOrdersCount ?? 0) / pageSize))} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
}
