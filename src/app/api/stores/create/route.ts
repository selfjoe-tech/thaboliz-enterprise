import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const body = await request.json();
    const name = String(body?.name ?? "").trim();

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Store name is required." },
        { status: 400 },
      );
    }

    const slug = slugify(name);

    const { data: existing, error: existingError } = await supabase
      .from("stores")
      .select("id, name, slug, website_url")
      .ilike("name", name)
      .maybeSingle();

    if (existingError) {
      return NextResponse.json(
        { success: false, error: existingError.message },
        { status: 400 },
      );
    }

    if (existing) {
      return NextResponse.json({
        success: true,
        store: existing,
      });
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("stores")
      .insert({
        tenant_id: null,
        name,
        slug,
        website_url: null,
        created_by_user_id: user?.id ?? null,
      })
      .select("id, name, slug, website_url")
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      store: data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Unexpected error" },
      { status: 500 },
    );
  }
}