import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { requireAdminPermission } from "@/lib/authz";



export async function POST(req: Request) {
    const auth = await requireAdminPermission("manage_categories");
if (!auth.ok) return auth.response;
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing id" },
        { status: 400 }
      );
    }

    const { data: current, error: fetchError } = await supabaseAdmin
      .from("catalogue_products")
      .select("id, is_featured")
      .eq("id", id)
      .single();

    if (fetchError) {
      return NextResponse.json(
        { success: false, error: fetchError.message },
        { status: 500 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("catalogue_products")
      .update({ is_featured: !current.is_featured })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, product: data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}