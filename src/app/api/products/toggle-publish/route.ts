import { NextResponse } from "next/server";
import { requireTenantContext } from "@/app/lib/server/current-tenant";

export async function POST(request: Request) {
  try {
    const { supabase, tenantId, user } = await requireTenantContext();
    const body = await request.json();

    const id = String(body.id ?? "").trim();
    const publish = Boolean(body.publish);

    if (!id) {
      return NextResponse.json({ success: false, error: "Product id is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("products")
      .update({
        status: publish ? "active" : "draft",
        updated_by_user_id: user.id,
      })
      .eq("tenant_id", tenantId)
      .eq("id", id)
      .select("id, status")
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, product: data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Unexpected error" },
      { status: 500 },
    );
  }
}