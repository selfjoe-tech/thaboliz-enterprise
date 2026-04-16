import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { requireTenantContext } from "@/app/lib/server/current-tenant";

export async function GET() {
  try {
    const { tenantId } = await requireTenantContext();

    // Pull stores used by this tenant's products
    const { data, error } = await supabaseAdmin
      .from("products")
      .select(`
        store_id,
        store:stores (
          id,
          name
        )
      `)
      .eq("tenant_id", tenantId)
      .not("store_id", "is", null)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) throw error;

    // Deduplicate stores (latest usage wins)
    const map = new Map();

    for (const row of data ?? []) {
      if (row.store) {
        map.set(row.store.id, row.store);
      }
    }

    const recentStores = Array.from(map.values()).slice(0, 5);

    return NextResponse.json({
      success: true,
      data: recentStores,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}