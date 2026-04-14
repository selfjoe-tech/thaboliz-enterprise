import { NextResponse } from "next/server";
import { requireTenantContext } from "@/app/lib/server/current-tenant";

export async function POST(request: Request) {
  try {
    const { supabase, tenantId } = await requireTenantContext();
    const body = await request.json();

    const id = String(body.id ?? "").trim();
    if (!id) {
      return NextResponse.json({ success: false, error: "Product id is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("tenant_id", tenantId)
      .eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Unexpected error" },
      { status: 500 },
    );
  }
}