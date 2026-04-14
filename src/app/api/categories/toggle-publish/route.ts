// app/api/categories/toggle-publish/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });

    // fetch current status
    const { data: existing, error: fetchErr } = await supabase
      .from("categories")
      .select("status")
      .eq("id", id)
      .single();

      console.log(existing, "<------ status data")

    if (fetchErr) {
      console.error("toggle publish fetch error:", fetchErr);
      return NextResponse.json({ success: false, error: fetchErr.message }, { status: 500 });
    }

    const current = existing?.status ?? "unpublished";
    const next = current === "published" ? "unpublished" : "published";

    console.log(next, "<------------ next")

    const { data, error } = await supabase
      .from("categories")
      .update({ status: next })
      .eq("id", id)
      .select()
      .single();


          console.log(data, "<------------ succes or not")

    if (error) {
      console.error("toggle publish update error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, category: data });
  } catch (err) {
    console.error("toggle publish error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
