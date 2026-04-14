// lib/stats.ts
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

export async function getStatsData(key: "orders" | "revenue" | "products" | "users"): Promise<number> {
  try {
    if (key === "orders") {
      const { count, error } = await supabaseAdmin
        .schema("public")
        .from("orders")
        .select("id", { head: true, count: "exact" });

        console.log("orders count", count)

      if (error) { console.error("getStatsData orders error:", error); return 0; }
      return count ?? 0;
    }

    if (key === "products") {
      const { count, error } = await supabaseAdmin
      .schema("public")
        .from("products")
        .select("id", { head: true, count: "exact" });

        console.log("products count", count)
      if (error) { console.error("getStatsData products error:", error); return 0; }
      return count ?? 0;
    }

    if (key === "users") {
      const { count, error } = await supabaseAdmin
      .schema("public")
        .from("profile")
        .select("id", { head: true, count: "exact" });
    console.log("users count", count)

      if (error) { console.error("getStatsData users error:", error); return 0; }
      return count ?? 0;
    }

    if (key === "revenue") {
      // Call the SQL function we created
      const { data, error } = await supabaseAdmin.rpc("sum_orders_total");
        console.log("products count", data)


      if (error) {
        console.error("getStatsData revenue error:", error);
        return 0;
      }

      // supabase.rpc may return a scalar or an object, handle both
      // Examples: data === 123 OR data === { sum_orders_total: 123 } depending on PostgREST version
      if (typeof data === "number") return Math.trunc(data);
      if (data == null) return 0;

      // if it's an object or array, try to find the numeric value
      if (Array.isArray(data)) {
        const v = data[0];
        if (typeof v === "number") return Math.trunc(v);
        if (v && typeof v === "object") {
          const val = Object.values(v).find((x) => typeof x === "number");
          return val ? Math.trunc(val as number) : 0;
        }
      } else if (typeof data === "object") {
        const val = Object.values(data).find((x) => typeof x === "number");
        return val ? Math.trunc(val as number) : 0;
      }

      // fallback
      return 0;
    }

    return 0;
  } catch (err: any) {
    console.error("getStatsData unexpected error:", err);
    return 0;
  }
}
