import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const token = String(body?.token ?? "").trim();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Invite token is required." },
        { status: 400 },
      );
    }

    const { error } = await supabase.rpc("accept_tenant_invite", {
      p_token: token,
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