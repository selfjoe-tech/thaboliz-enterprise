// app/data/orders.ts
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

/**
 * listAllOrders
 * - page: 1-based
 * - pageSize: items per page
 * - status: optional filter
 * - orderNumber: optional search (partial, ilike)
 */
export async function listAllOrders({
  page = 1,
  pageSize = 10,
  status,
  orderNumber,
}: {
  page?: number;
  pageSize?: number;
  status?: string | null;
  orderNumber?: string | null;
} = {}) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  let q = supabaseAdmin
    .from("orders")
    .select("id, created_at, order_number, order_type, total, status, user_id, profile(name)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(start, end);

  if (status && status !== "All") q = q.eq("status", status);
  if (orderNumber && orderNumber.trim().length) q = q.ilike("order_number", `%${orderNumber}%`);

  const { data, error, count } = await q;
  if (error) throw error;

  const orders = (data || []).map((r: any) => ({
    id: r.id,
    date: r.created_at ? new Date(r.created_at).toLocaleString() : "",
    order_number: r.order_number,
    order_type: r.order_type,
    total: typeof r.total === "number" ? r.total : Number(r.total || 0),
    status: r.status,
    user_id: r.user_id,
    customer: r.profile?.name ?? "Unknown",
  }));

  return { orders, total: count ?? orders.length };
}

/**
 * getOrderDetails - fetch one order and its items + products
 */
export async function getOrderDetails(orderId: string) {
  const { data: orderData, error: orderErr } = await supabaseAdmin
    .from("orders")
    .select("id, created_at, address, order_number, order_type, total, status, user_id, profile(name)")
    .eq("id", orderId)
    .maybeSingle();

  if (orderErr) throw orderErr;
  if (!orderData) return null;

  const { data: items, error: itemsErr } = await supabaseAdmin
    .from("orders_items")
    .select("id, order_id, product_id, quantity, products(name, price)")
    .eq("order_id", orderId);

  if (itemsErr) throw itemsErr;

  return {
    id: orderData.id,
    address: orderData.address,
    date: orderData.created_at ? new Date(orderData.created_at).toLocaleString() : "",
    order_number: orderData.order_number,
    order_type: orderData.order_type,
    total: Number(orderData.total || 0),
    status: orderData.status,
    customer: orderData.profile?.name ?? "Unknown",
    items: (items || []).map((it: any) => ({
      id: it.id,
      product_id: it.product_id,
      product_name: it.products?.name ?? "Unknown",
      product_price: Number(it.products?.price ?? 0),
      quantity: Number(it.quantity ?? 0),
    })),
  };
}
