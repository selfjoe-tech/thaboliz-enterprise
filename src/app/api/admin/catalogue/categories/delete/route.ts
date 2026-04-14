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
      .select("id, name")
      .eq("id", id)
      .single();

    if (fetchError || !current) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    const { data: products } = await supabaseAdmin
      .from("catalogue_products")
      .select("id, category_names")
      .contains("category_names", [current.name]);

    for (const product of products ?? []) {
      const next = (product.category_names ?? []).filter(
        (entry: string) => entry !== current.name
      );

      await supabaseAdmin
        .from("catalogue_products")
        .update({ category_names: next })
        .eq("id", product.id);
    }

    const { error } = await supabaseAdmin
      .from("catalogue_categories")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}