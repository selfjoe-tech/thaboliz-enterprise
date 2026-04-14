// components/(dashboard)/orders/orders-list.tsx
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Pagination from "@/components/ui/pagination";
import { supabase } from "@/app/lib/supabaseClient"; // for realtime
import { useOrdersRealtime } from "@/app/components/hooks/useOrdersRealtime";


// debounce util (unchanged)
function useDebounce(fn: (...args: any[]) => void, wait = 400) {
  const t = useRef<number | null>(null);
  return useCallback((...args: any[]) => {
    if (t.current) window.clearTimeout(t.current);
    // @ts-ignore
    t.current = window.setTimeout(() => fn(...args), wait);
  }, [fn, wait]);
}

// helper to read cookie by name (client-side)



export default function OrdersList({
  orders: initialOrders = [],
  initialTotal = null,
}: {
  orders: any[];
  initialTotal?: number | null;
}) {
  const router = useRouter();

  const [allOrders, setAllOrders] = useState<any[]>(initialOrders);
  const [paginatedOrders, setPaginatedOrders] = useState<any[]>(initialOrders); // <--- stateful
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [total, setTotal] = useState<number | null>(initialTotal);

  // set of newly added order IDs to show red dot (local map)
  const [newOrderIds, setNewOrderIds] = useState<Record<string, boolean>>({});

  // toast state
  const [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);

  // current user's id (admin_id cookie)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // read admin_id from cookie on mount (client-side)

  useEffect(() => {
  let mounted = true;
  (async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!mounted) return;
      if (res.status === 401) {
        setCurrentUserId(null);
        return;
      }
      const json = await res.json();
      if (json?.adminId) setCurrentUserId(String(json.adminId));
    } catch (err) {
      console.error("fetch /api/auth/me failed", err);
    }
  })();
  return () => { mounted = false; };
}, []);
  

  // fetch page implementation
  const fetchPage = async (opts: { page?: number; status?: string; search?: string } = {}) => {
    try {
      const p = opts.page ?? currentPage;
      const s = opts.search ?? search;
      const st = opts.status ?? status;

      const qs = new URLSearchParams();
      qs.set("page", String(p));
      qs.set("pageSize", String(pageSize));
      if (st) qs.set("status", st);
      if (s && s.trim().length) qs.set("search", s.trim());

      const res = await fetch(`/api/orders?${qs.toString()}`);
      // handle auth error
      if (res.status === 401) {
        router.push("/admin-login");
        return;
      }
      const json = await res.json();
      if (json?.error) {
        console.error("orders fetch error", json.error);
        return;
      }

      // set states (allOrders kept for compatibility, paginatedOrders now used for rendering)
      setAllOrders(json.data || []);
      setPaginatedOrders(json.data || []); // <--- important: update paginated state
      setTotal(json.total ?? 0);

      // Check which of these order ids this user has seen (persisted)
      if (currentUserId) {
        const ids = (json.data || []).map((r: any) => r.id).filter(Boolean).join(",");
        if (ids.length) {
          const seenRes = await fetch(`/api/orders/seen?userId=${encodeURIComponent(currentUserId)}&orderIds=${encodeURIComponent(ids)}`);
          if (seenRes.status === 401) {
            router.push("/admin-login");
            return;
          }
          const seenJson = await seenRes.json();
          if (!seenJson?.error) {
            const seenIds: string[] = seenJson.seen || [];
            // mark unseen ids as new
            const newMap: Record<string, boolean> = {};
            (json.data || []).forEach((r: any) => {
              if (!seenIds.includes(r.id)) newMap[r.id] = true;
            });
            setNewOrderIds(newMap);
          }
        }
      }
    } catch (err) {
      console.error("orders fetch error", err);
    }
  };

  // Debounced search (only numeric / empty handled by your prior logic)
  const debouncedFetch = useDebounce((val: string) => {
    const q = val.trim();
    if (q === "") {
      setCurrentPage(1);
      fetchPage({ page: 1, search: "" });
      return;
    }
    if (/^\d+$/.test(q)) {
      setCurrentPage(1);
      fetchPage({ page: 1, search: q });
    }
  }, 450);

  useEffect(() => {
    // initial load - wait until we read cookie above (currentUserId may be null but it's okay)
    fetchPage({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]);

  useEffect(() => {
    // when status filter changes, reset page and fetch
    setCurrentPage(1);
    fetchPage({ page: 1, status, search: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    // when page changes, fetch page
    fetchPage({ page: currentPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Realtime & optimistic event handling (keeps using setAllOrders/paginatedOrders)
  useEffect(() => {
    let mounted = true;

    const channel = supabase
      .channel("public:orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload: any) => {
          if (!mounted) return;
          const evt = payload?.eventType ?? payload?.event ?? payload?.type ?? payload?.action ?? payload?.type;
          const newRow = payload?.new ?? payload?.record ?? payload?.payload ?? null;
          const oldRow = payload?.old ?? payload?.previous ?? null;

          function mapRow(r: any) {
            if (!r) return null;
            return {
              id: r.id,
              date: r.created_at ? new Date(r.created_at).toLocaleString() : "",
              order_number: r.order_number,
              order_type: r.order_type,
              total: typeof r.total === "number" ? r.total : Number(r.total ?? 0),
              status: r.status,
              user_id: r.user_id,
              customer: r.profile?.name ?? (r.customer ?? "Unknown"),
            };
          }

          if (evt === "INSERT" || evt === "insert") {
            const mapped = mapRow(newRow) || {
              id: newRow?.id,
              date: newRow?.created_at ? new Date(newRow.created_at).toLocaleString() : "",
              order_number: newRow?.order_number,
              order_type: newRow?.order_type,
              total: Number(newRow?.total ?? 0),
              status: newRow?.status,
              user_id: newRow?.user_id,
              customer: newRow?.profile?.name ?? "Unknown",
            };
            // Add to top and mark as new for this user (unless already seen)
            setAllOrders((prev) => {
              if (prev.find((p) => p.id === mapped.id)) return prev;
              return [mapped, ...prev].slice(0, pageSize);
            });

            // also update paginatedOrders so UI shows new item (optimistic behaviour)
            setPaginatedOrders((prev) => {
              if (prev.find((p) => p.id === mapped.id)) return prev;
              return [mapped, ...prev].slice(0, pageSize);
            });

            setNewOrderIds((prev) => ({ ...prev, [mapped.id]: true }));
            setTotal((t) => (typeof t === "number" ? t + 1 : t));
            return;
          }

          if (evt === "UPDATE" || evt === "update") {
            const mapped = mapRow(newRow) || { id: newRow?.id, status: newRow?.status, total: Number(newRow?.total ?? 0) };
            setAllOrders((prev) => prev.map((p) => (p.id === mapped.id ? { ...p, ...mapped } : p)));
            setPaginatedOrders((prev) => prev.map((p) => (p.id === mapped.id ? { ...p, ...mapped } : p)));
            return;
          }

          if (evt === "DELETE" || evt === "delete") {
            const id = oldRow?.id ?? payload?.old?.id ?? payload?.record?.id;
            if (!id) return;
            setAllOrders((prev) => prev.filter((p) => p.id !== id));
            setPaginatedOrders((prev) => prev.filter((p) => p.id !== id));
            setTotal((t) => (typeof t === "number" && t > 0 ? t - 1 : t));
            setNewOrderIds((prev) => {
              const copy = { ...prev };
              delete copy[id];
              return copy;
            });
            return;
          }
        }
      )
      .subscribe();

    const onOrderUpdated = (e: Event) => {
      const ev = (e as CustomEvent).detail;
      if (!ev) return;
      if (ev.optimistic) {
        setAllOrders((prev) => prev.map((p) => (p.id === ev.id ? { ...p, status: ev.status } : p)));
        setPaginatedOrders((prev) => prev.map((p) => (p.id === ev.id ? { ...p, status: ev.status } : p)));
        return;
      }
      if (ev.id) {
        setAllOrders((prev) => {
          const exists = prev.some((p) => p.id === ev.id);
          if (exists) return prev.map((p) => (p.id === ev.id ? { ...p, ...ev } : p));
          return [{ id: ev.id, date: ev.date ?? "", order_number: ev.order_number ?? ev.id, order_type: ev.order_type, total: Number(ev.total ?? 0), status: ev.status, user_id: ev.user_id, customer: ev.customer ?? "Unknown" }, ...prev].slice(0, pageSize);
        });
        setPaginatedOrders((prev) => {
          const exists = prev.some((p) => p.id === ev.id);
          if (exists) return prev.map((p) => (p.id === ev.id ? { ...p, ...ev } : p));
          return [{ id: ev.id, date: ev.date ?? "", order_number: ev.order_number ?? ev.id, order_type: ev.order_type, total: Number(ev.total ?? 0), status: ev.status, user_id: ev.user_id, customer: ev.customer ?? "Unknown" }, ...prev].slice(0, pageSize);
        });
      }
    };

    const onOrderUpdateFailed = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail) return;
      if (detail.prevStatus && detail.id) {
        setAllOrders((prev) => prev.map((p) => (p.id === detail.id ? { ...p, status: detail.prevStatus } : p)));
        setPaginatedOrders((prev) => prev.map((p) => (p.id === detail.id ? { ...p, status: detail.prevStatus } : p)));
      }
      const message = detail?.error ?? "Failed to update order";
      const toastId = Math.random().toString(36).slice(2, 9);
      setToasts((t) => [...t, { id: toastId, message }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== toastId)), 5000);
    };

    window.addEventListener("order-updated", onOrderUpdated as EventListener);
    window.addEventListener("order-update-failed", onOrderUpdateFailed as EventListener);

    return () => {
      mounted = false;
      window.removeEventListener("order-updated", onOrderUpdated as EventListener);
      window.removeEventListener("order-update-failed", onOrderUpdateFailed as EventListener);
      channel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize]);

  // mark an order as seen on click: persist and remove red dot
  const markSeenAndNavigate = async (orderId: string) => {
    // remove red dot locally instantly
    setNewOrderIds((prev) => {
      const copy = { ...prev };
      delete copy[orderId];
      return copy;
    });

    // persist (if we have a currentUserId)
    if (currentUserId) {
      try {
        const res = await fetch("/api/orders/mark-seen", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });

        if (res.status === 401) {
          router.push("/admin-login");
          return;
        }

        const json = await res.json();
        if (json?.error) {
          console.error("mark-seen failed", json.error);
        }
      } catch (err) {
        console.error("mark seen failed", err);
      }
    } else {
      router.push("/admin-login");
      return;
    }

    // navigate to order details
    router.push(`/admin/orders/${orderId}`);
  };

  const totalPages = total ? Math.max(1, Math.ceil(total / pageSize)) : 1;




  function mapRow(r: any) {
  if (!r) return null;
  return {
    id: r.id,
    date: r.created_at ? new Date(r.created_at).toLocaleString() : "",
    order_number: r.order_number,
    order_type: r.order_type,
    total: typeof r.total === "number" ? r.total : Number(r.total ?? 0),
    status: r.status,
    user_id: r.user_id,
    customer: r.profile?.name ?? (r.customer ?? "Unknown"),
  };
}

// resync function for the hook — re-fetch current page (useCallback optional)
const resyncCurrentPage = () => {
  // keep it light: fetch current page with current filters
  fetchPage({ page: currentPage, status, search });
};

// onInsert/onUpdate/onDelete handlers
const handleInsert = (row: any) => {
  const mapped = mapRow(row) || {
    id: row?.id,
    date: row?.created_at ? new Date(row.created_at).toLocaleString() : "",
    order_number: row?.order_number,
    order_type: row?.order_type,
    total: Number(row?.total ?? 0),
    status: row?.status,
    user_id: row?.user_id,
    customer: row?.profile?.name ?? "Unknown",
  };

  // update both allOrders and paginatedOrders (optimistic)
  setAllOrders((prev) => {
    if (prev.find((p) => p.id === mapped.id)) return prev;
    return [mapped, ...prev].slice(0, pageSize);
  });

  setPaginatedOrders((prev) => {
    if (prev.find((p) => p.id === mapped.id)) return prev;
    return [mapped, ...prev].slice(0, pageSize);
  });

  // mark new (unless user has already seen) — best-effort (server will persist when they open)
  if (currentUserId) {
    setNewOrderIds((prev) => ({ ...prev, [mapped.id]: true }));
  } else {
    // if we don't know currentUserId we don't mark persisted new state
    setNewOrderIds((prev) => ({ ...prev, [mapped.id]: true }));
  }

  setTotal((t) => (typeof t === "number" ? t + 1 : t));
};

const handleUpdate = (row: any) => {
  const mapped = mapRow(row) || { id: row?.id, status: row?.status, total: Number(row?.total ?? 0) };
  setAllOrders((prev) => prev.map((p) => (p.id === mapped.id ? { ...p, ...mapped } : p)));
  setPaginatedOrders((prev) => prev.map((p) => (p.id === mapped.id ? { ...p, ...mapped } : p)));
};

const handleDelete = (oldRow: any) => {
  const id = oldRow?.id;
  if (!id) return;
  setAllOrders((prev) => prev.filter((p) => p.id !== id));
  setPaginatedOrders((prev) => prev.filter((p) => p.id !== id));
  setTotal((t) => (typeof t === "number" && t > 0 ? t - 1 : t));
  setNewOrderIds((prev) => {
    const copy = { ...prev };
    delete copy[id];
    return copy;
  });
};

// optimistic / external event listeners (unchanged)
useEffect(() => {
  const onOrderUpdated = (e: Event) => {
    const ev = (e as CustomEvent).detail;
    if (!ev) return;
    if (ev.optimistic) {
      setAllOrders((prev) => prev.map((p) => (p.id === ev.id ? { ...p, status: ev.status } : p)));
      setPaginatedOrders((prev) => prev.map((p) => (p.id === ev.id ? { ...p, status: ev.status } : p)));
      return;
    }
    if (ev.id) {
      setAllOrders((prev) => {
        const exists = prev.some((p) => p.id === ev.id);
        if (exists) return prev.map((p) => (p.id === ev.id ? { ...p, ...ev } : p));
        return [{ id: ev.id, date: ev.date ?? "", order_number: ev.order_number ?? ev.id, order_type: ev.order_type, total: Number(ev.total ?? 0), status: ev.status, user_id: ev.user_id, customer: ev.customer ?? "Unknown" }, ...prev].slice(0, pageSize);
      });
      setPaginatedOrders((prev) => {
        const exists = prev.some((p) => p.id === ev.id);
        if (exists) return prev.map((p) => (p.id === ev.id ? { ...p, ...ev } : p));
        return [{ id: ev.id, date: ev.date ?? "", order_number: ev.order_number ?? ev.id, order_type: ev.order_type, total: Number(ev.total ?? 0), status: ev.status, user_id: ev.user_id, customer: ev.customer ?? "Unknown" }, ...prev].slice(0, pageSize);
      });
    }
  };

  const onOrderUpdateFailed = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    if (!detail) return;
    if (detail.prevStatus && detail.id) {
      setAllOrders((prev) => prev.map((p) => (p.id === detail.id ? { ...p, status: detail.prevStatus } : p)));
      setPaginatedOrders((prev) => prev.map((p) => (p.id === detail.id ? { ...p, status: detail.prevStatus } : p)));
    }
    const message = detail?.error ?? "Failed to update order";
    const toastId = Math.random().toString(36).slice(2, 9);
    setToasts((t) => [...t, { id: toastId, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== toastId)), 5000);
  };

  window.addEventListener("order-updated", onOrderUpdated as EventListener);
  window.addEventListener("order-update-failed", onOrderUpdateFailed as EventListener);

  return () => {
    window.removeEventListener("order-updated", onOrderUpdated as EventListener);
    window.removeEventListener("order-update-failed", onOrderUpdateFailed as EventListener);
  };
}, [pageSize]); // keep dependencies minimal

// add this call after the listener useEffect:
useOrdersRealtime({
  onInsert: handleInsert,
  onUpdate: handleUpdate,
  onDelete: handleDelete,
  resync: resyncCurrentPage,
  enabled: true,
});

  return (
    <div className="p-0 md:p-4">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Orders</h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by Order ID..."
          value={search}
          inputMode="numeric"
          pattern="[0-9]*"
          aria-label="Search orders by numeric ID"
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, "");
            setSearch(digitsOnly);
            debouncedFetch(digitsOnly);
          }}
          onKeyDown={(e) => {
            const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "Tab"];
            if (allowed.includes(e.key)) return;
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            if (!/^\d$/.test(e.key)) {
              e.preventDefault();
            }
          }}
          onPaste={(e) => {
            e.preventDefault();
            const pasted = (e.clipboardData || (window as any).clipboardData).getData("text") || "";
            const digitsOnly = pasted.replace(/\D/g, "");
            if (digitsOnly.length) {
              setSearch(digitsOnly);
              debouncedFetch(digitsOnly);
            }
          }}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setSearch("");
          }}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="All">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="shipped">Shipped</option>
          <option value="collected">Collected</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* tiny toasts */}
      <div className="fixed right-4 top-20 z-[9999] flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className="bg-red-600 text-white px-4 py-2 rounded shadow">
            {t.message}
          </div>
        ))}
      </div>

      {/* Mobile list */}
      <div className="space-y-4 md:hidden">
        {paginatedOrders.map((order) => (
          <div key={order.id} onClick={() => markSeenAndNavigate(order.id)} className="block border border-gray-200 shadow-sm p-4 rounded-xl bg-white cursor-pointer">
            <div className="flex justify-between items-start">
              <div className="w-full">
                <div className="flex flex-row justify-between font-semibold text-sm">
                  <div className="flex items-center">
                    {newOrderIds[order.id] && <span className="inline-block h-2 w-2 rounded-full bg-red-500 mr-2" />}
                    <p>Order #{order.order_number || order.id}</p>
                  </div>
                  <ChevronRight />
                </div>
                <div className="text-sm text-gray-600">{order.date}</div>
                <div className="font-bold mt-1">R {order.total.toFixed(2)}</div>
                <span className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full ${order.status === "pending" ? "bg-yellow-100 text-yellow-700" : order.status === "paid" ? "bg-blue-100 text-blue-700" : order.status === "shipped" ? "bg-purple-100 text-purple-700" : order.status === "delivered" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Order Number</th>
              <th className="px-4 py-3 text-left">Order Type</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Customer Name</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-200">
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => markSeenAndNavigate(order.id)}>
                <td className="px-4 py-3 font-mono">
                  <div className="inline-flex items-center gap-2">
                    {newOrderIds[order.id] && <span className="inline-block h-2 w-2 rounded-full bg-red-500" />}
                    <span>{order.order_number}</span>
                  </div>
                </td>
                <td className="px-4 py-3">{order.order_type}</td>
                <td className="px-4 py-3">{order.date}</td>
                <td className="px-4 py-3">{order.customer}</td>
                <td className="px-4 py-3">R {order.total.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${order.status === "pending" ? "bg-yellow-100 text-yellow-700" : order.status === "paid" ? "bg-blue-100 text-blue-700" : order.status === "shipped" ? "bg-purple-100 text-purple-700" : order.status === "delivered" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 text-center">
                  <div className="inline-flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); markSeenAndNavigate(order.id); }} className="px-3 py-1 rounded-md border border-gray-300 text-xs hover:bg-gray-100">View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Desktop pagination */}
      <div className="mt-4">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
