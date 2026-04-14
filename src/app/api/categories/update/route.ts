// app/api/categories/update/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, name, status } = body;

    if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    if (!name || !name.trim()) return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });

    const updateData: any = { name: name.trim() };
    if (status !== undefined) updateData.status = status;

    const { data, error } = await supabase
      .from("categories")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("update category error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, category: data });
  } catch (err) {
    console.error("update category route error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
