// app/api/orders/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page") ?? "1");
    const pageSize = Number(url.searchParams.get("pageSize") ?? "10");
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search") ?? "";

    // debug log (can remove later)
    console.log(`[orders API] page=${page} pageSize=${pageSize} status=${status} search=${search}`);

    // If search is numeric -> treat as lookup by id (short-circuit)
    const sTrim = search.trim();
    if (sTrim !== "" && /^\d+$/.test(sTrim)) {
      const idNum = Number(sTrim);

      // single-row query (no range/pagination). Use maybeSingle so we get null if not found.
      const { data: single, error: singleErr } = await supabaseAdmin
        .from("orders")
        .select(
          "id, created_at, order_number, order_type, total, status, user_id, profile(name)",
          { count: "exact" }
        )
        .eq("id", idNum)
        .maybeSingle();

      if (singleErr) {
        console.error("[orders API] single lookup error:", singleErr);
        return NextResponse.json({ error: singleErr.message }, { status: 500 });
      }

      if (!single) {
        // found nothing for that id
        console.log(`[orders API] id ${idNum} not found`);
        return NextResponse.json({ data: [], total: 0 });
      }

      const row = {
        id: single.id,
        date: single.created_at ? new Date(single.created_at).toLocaleString() : "",
        order_number: single.order_number,
        order_type: single.order_type,
        total: typeof single.total === "number" ? single.total : Number(single.total || 0),
        status: single.status,
        user_id: single.user_id,
        customer: single.profile?.name ?? "Unknown",
      };


      return NextResponse.json({ data: [row], total: 1 });
    }

    // Normal paginated list path (no numeric search)
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    let q = supabaseAdmin
      .from("orders")
      .select("id, created_at, order_number, order_type, total, status, user_id, profile(name)", {
        count: "exact",
      })
      .order("created_at", { ascending: false })
      .range(start, end);

    if (status && status !== "All") q = q.eq("status", status);

    // if non-numeric search was provided and you want to return no results,
    // uncomment the following block to return empty set for non-numeric searches:
    // if (search && search.trim()) {
    //   q = q.eq("id", -1); // guaranteed no rows
    // }

    const { data, error, count } = await q;
    if (error) {
      console.error("[orders API] list error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

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

    return NextResponse.json({ data: orders, total: count ?? orders.length });
  } catch (err: any) {
    console.error("orders route error", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
