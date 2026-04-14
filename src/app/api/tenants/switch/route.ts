import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const tenantId = String(body?.tenantId ?? "").trim();

    if (!tenantId) {
      return NextResponse.json(
        { success: false, error: "Tenant id is required." },
        { status: 400 },
      );
    }

    const { error } = await supabase.rpc("set_active_tenant", {
      p_tenant_id: tenantId,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Unexpected error" },
      { status: 500 },
    );
  }
}