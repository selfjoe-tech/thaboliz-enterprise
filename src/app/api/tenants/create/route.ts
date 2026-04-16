// src/app/api/tenants/create/route.ts
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

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const name = String(body?.name ?? "").trim();

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Organization name is required." },
        { status: 400 },
      );
    }

    const slug = slugify(name);

    const { data, error } = await supabase.rpc("create_tenant_with_owner", {
      p_name: name,
      p_slug: slug,
      p_support_email: user.email ?? null,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      tenantId: data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Unexpected error" },
      { status: 500 },
    );
  }
}