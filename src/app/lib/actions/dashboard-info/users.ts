// app/lib/actions/dashboard-info/users.ts
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

/**
 * listUsersPaged(page, pageSize, search)
 * - Fetches a page of profiles from `profile` table.
 * - Then fetches orders for those profiles (single query) and aggregates totals/counts in JS.
 * - Returns { items: Array<{ id, name, phoneNumber, totalOrders, totalSpend, created_at }>, total }
 */
export async function listUsersPaged(page = 1, pageSize = 10, search?: string) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Build base query for profiles
  let profilesQuery = supabaseAdmin
    .from("profile")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (search && search.trim()) {
    // search by name (case-insensitive)
    const pattern = `%${search.trim()}%`;
    profilesQuery = profilesQuery.ilike("name", pattern);
  }

  const { data: profiles, error: profilesError, count } = await profilesQuery.range(from, to);

  if (profilesError) {
    console.error("listUsersPaged - profiles error:", profilesError);
    throw profilesError;
  }

  const items = (profiles ?? []) as any[];

  // If no items, return empty result quickly
  if (items.length === 0) {
    return { items: [], total: typeof count === "number" ? count : 0 };
  }

  // collect user ids on this page
  const userIds = items.map((p) => p.id);

  // fetch orders for these users (single query)
  const { data: orders, error: ordersError } = await supabaseAdmin
    .from("orders")
    .select("user_id,total")
    .in("user_id", userIds);

  if (ordersError) {
    console.error("listUsersPaged - orders error:", ordersError);
    throw ordersError;
  }

  // aggregate by user_id
  const agg: Record<
    string,
    {
      totalOrders: number;
      totalSpend: number;
    }
  > = {};

  (orders ?? []).forEach((o: any) => {
    const uid = o.user_id;
    if (!agg[uid]) agg[uid] = { totalOrders: 0, totalSpend: 0 };
    agg[uid].totalOrders += 1;
    // ensure total numeric
    const t = typeof o.total === "number" ? o.total : Number(o.total ?? 0);
    agg[uid].totalSpend += isNaN(t) ? 0 : t;
  });

  // build final list
  const resultItems = items.map((p) => ({
    id: p.id,
    name: p.name,
    phoneNumber: p.phoneNumber,
    createdAt: p.created_at,
    totalOrders: agg[p.id]?.totalOrders ?? 0,
    totalSpend: agg[p.id]?.totalSpend ?? 0,
  }));

  return {
    items: resultItems,
    total: typeof count === "number" ? count : resultItems.length,
  };
}

/**
 * getUserWithOrdersPaged(userId, page, pageSize, search)
 * - Returns { user: { id, name, phoneNumber, created_at }, orders: Order[], totalOrdersCount }
 * - Orders are fetched from `orders` table for the user_id.
 * - Optional `search` filters orders by id (text) OR order_number (case-insensitive partial match).
 */
export async function getUserWithOrdersPaged(
  userId: string,
  page = 1,
  pageSize = 10,
  search?: string
) {
  // get profile
  const { data: user, error: userErr } = await supabaseAdmin
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();

  if (userErr) {
    console.error("getUserWithOrdersPaged - userErr:", userErr);
    throw userErr;
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Build orders query
  let ordersQuery = supabaseAdmin
    .from("orders")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (search && search.trim()) {
    const q = search.trim();
    // use supabase or() to match id or order_number
    // Note: or() expects condition strings
    ordersQuery = ordersQuery.or(`id.ilike.%${q}%,order_number.ilike.%${q}%`);
  }

  const { data: orders, error: ordersErr, count } = await ordersQuery.range(from, to);

  if (ordersErr) {
    console.error("getUserWithOrdersPaged - ordersErr:", ordersErr);
    throw ordersErr;
  }

  // map orders to shape expected by client
  const mapped = (orders ?? []).map((o: any) => ({
    id: o.id,
    order_number: o.order_number,
    status: o.status,
    totalAmount: typeof o.total === "number" ? o.total : Number(o.total ?? 0),
    createdAt: o.created_at,
    // you can include address, order_type, items etc if present
    address: o.address,
    order_type: o.order_type,
  }));

  // compute totals across all user orders (server-side full count)
  // For "total spent" across all orders we need to sum all rows across all pages.
  // We'll make another query to fetch the sum and count for that user.
  const { data: aggData, error: aggErr } = await supabaseAdmin
    .from("orders")
    .select("total", { count: "exact" })
    .eq("user_id", userId);

  if (aggErr) {
    console.error("getUserWithOrdersPaged - aggErr:", aggErr);
    throw aggErr;
  }

  // compute total spend & total count from all orders (aggData contains rows)
  let totalSpend = 0;
  if (Array.isArray(aggData)) {
    for (const r of aggData) {
      const t = typeof r.total === "number" ? r.total : Number(r.total ?? 0);
      totalSpend += isNaN(t) ? 0 : t;
    }
  }

  const totalOrdersCount = typeof count === "number" ? count : (aggData?.length ?? 0);

  return {
    user: {
      id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      createdAt: user.created_at,
    },
    orders: mapped,
    totalOrdersCount,
    totalSpend,
  };
}
