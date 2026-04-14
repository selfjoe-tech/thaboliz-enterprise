import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { requireAdminPermission } from "@/lib/authz";

export async function POST(req: Request) {
  const auth = await requireAdminPermission("manage_categories");
  if (!auth.ok) return auth.response;

  try {
    const body = await req.json();
    const id = String(body?.id ?? "").trim();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing id" },
        { status: 400 }
      );
    }

    const { data: current, error: fetchError } = await supabaseAdmin
      .from("catalogue_categories")
      .select("id, is_active")
      .eq("id", id)
      .single();

    if (fetchError || !current) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("catalogue_categories")
      .update({
        is_active: !current.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, category: data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}