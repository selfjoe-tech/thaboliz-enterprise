// app/components/(dashboard)/users/user-detail-client.tsx
"use client";

import { User as UserIcon, ChevronRight, Search } from "lucide-react";
import { BackButton } from "@/app/components/admin/ui/buttons";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/ui/pagination";
import { useEffect, useState } from "react";

type Order = {
  id: string;
  order_number?: string;
  status: string;
  totalAmount: number;
  createdAt: string;
};

type User = {
  id: string;
  name: string;
  phoneNumber?: string;
  createdAt?: string;
  orders: Order[];
  totalOrdersCount?: number;
  totalSpend?: number;
};

export default function UserDetailClient({
  user,
  initialPage,
  initialPageSize,
  initialSearch,
}: {
  user: User;
  initialPage: number;
  initialPageSize: number;
  initialSearch: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [orders, setOrders] = useState<Order[]>(user.orders ?? []);
  const [search, setSearch] = useState(initialSearch ?? "");

  const pageParam = Number(searchParams?.get("page") ?? initialPage ?? 1);
  const pageSizeParam = Number(searchParams?.get("pageSize") ?? initialPageSize ?? 10);
  const currentPage = Number.isFinite(pageParam) ? Math.max(1, pageParam) : 1;
  const pageSize = Number.isFinite(pageSizeParam) ? Math.max(1, pageSizeParam) : 10;

  useEffect(() => {
    setOrders(user.orders ?? []);
  }, [user.orders]);

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
      <div className="mb-3">
        <BackButton name="Customer Detail" />
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 border border-gray-300">
          <UserIcon className="w-10 h-10 text-gray-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-center md:text-left">{user.name}</h2>
          <p className="text-gray-600">{user.phoneNumber}</p>
          <p className="text-sm text-gray-500 mt-1">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
          <p className="text-sm text-gray-700 mt-2">
            Orders: {user.totalOrdersCount ?? 0} • Spent: R{(user.totalSpend ?? 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Search + page size */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search orders by id or order number..."
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
        <h2 className="text-lg font-semibold mb-4">Order History</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Order #{order.order_number ?? order.id.slice(-6)}</span>
                  <span className="font-medium text-gray-800">R{order.totalAmount.toFixed(2)}</span>
                  <span className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                  <span
                    className={`mt-1 text-xs font-medium px-2 py-0.5 rounded-full w-fit ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Order History</h2>

        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Order #</th>
                  <th className="px-4 py-2 text-center">Status</th>
                  <th className="px-4 py-2 text-right">Total</th>
                  <th className="px-4 py-2 text-center">Date</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{order.order_number ?? order.id}</td>
                    <td className="px-4 py-2 text-center">{order.status}</td>
                    <td className="px-4 py-2 text-right">R{order.totalAmount.toFixed(2)}</td>
                    <td className="px-4 py-2 text-center">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 text-center">
                      <Link href={`/admin/orders/${order.id}`} className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* pagination: compute total pages from totalOrdersCount passed from server via user prop if available */}
        <div className="mt-4 flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.max(1, Math.ceil((user.totalOrdersCount ?? 0) / pageSize))}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
