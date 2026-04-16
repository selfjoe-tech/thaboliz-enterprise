import { NextResponse } from "next/server";
import { requireTenantContext } from "@/app/lib/server/current-tenant";


export async function GET(request: Request) {
  try {
    const { supabase, tenantId } = await requireTenantContext();
    const url = new URL(request.url);
    const query = (url.searchParams.get("q") ?? "").trim();
    const limit = Math.min(10, Math.max(1, Number(url.searchParams.get("limit") ?? "10")));

    let q = supabase
      .from("stores")
      .select("id, name, slug, website_url")
      .eq("tenant_id", tenantId)
      .order("name", { ascending: true })
      .limit(limit);

    if (query) {
      q = q.ilike("name", `%${query}%`);
    }

    const { data, error } = await q;

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      items: data ?? [],
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to search stores" },
      { status: 500 },
    );
  }
}