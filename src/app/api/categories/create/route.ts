import { NextResponse } from "next/server";
import { requireTenantContext } from "@/app/lib/server/current-tenant";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, "")
    .replace(/\\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request: Request) {
  try {
    const { supabase, tenantId, user, role } = await requireTenantContext();

    if (!["owner", "admin", "manager"].includes(role)) {
      return NextResponse.json(
        { success: false, error: "You do not have permission to create categories." },
        { status: 403 },
      );
    }

    const body = await request.json();
    const name = String(body?.name ?? "").trim();

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Category name is required." },
        { status: 400 },
      );
    }

    const slug = slugify(name);

    const { data: existing } = await supabase
      .from("categories")
      .select("id, name")
      .eq("tenant_id", tenantId)
      .ilike("name", name)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({
        success: true,
        category: existing,
      });
    }

    const { data, error } = await supabase
      .from("categories")
      .insert({
        tenant_id: tenantId,
        name,
        slug,
        created_by_user_id: user.id,
        updated_by_user_id: user.id,
      })
      .select("id, name")
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      category: data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Unexpected error" },
      { status: 500 },
    );
  }
}