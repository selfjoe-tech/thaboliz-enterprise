// app/api/categories/delete/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });

    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      console.error("delete category error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("delete category route error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
