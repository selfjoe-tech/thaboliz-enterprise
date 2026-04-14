import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { requireTenantContext } from "@/app/lib/server/current-tenant";
import { sendEmployeeInviteEmail } from "@/app/lib/server/send-employee-invite-email";

export async function POST(request: Request) {
  try {
    const { supabase, tenantId, user, role, tenant } = await requireTenantContext();

    if (!["owner", "admin"].includes(role)) {
      return NextResponse.json(
        { success: false, error: "You do not have permission to invite employees." },
        { status: 403 },
      );
    }

    const body = await request.json();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const inviteRole = String(body?.role ?? "").trim();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 },
      );
    }

    if (!["admin", "manager", "staff"].includes(inviteRole)) {
      return NextResponse.json(
        { success: false, error: "Invalid role." },
        { status: 400 },
      );
    }

    const { data: existingMembership } = await supabase
      .from("tenant_memberships")
      .select("id")
      .eq("tenant_id", tenantId)
      .eq("is_active", true);

    const token = randomBytes(32).toString("hex");

    const { data, error } = await supabase
      .from("tenant_invites")
      .insert({
        tenant_id: tenantId,
        email,
        role: inviteRole,
        token,
        invited_by_user_id: user.id,
      })
      .select("id, email, role, token, expires_at")
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const acceptUrl = `${baseUrl}/accept-invite?token=${token}`;

    await sendEmployeeInviteEmail({
      to: email,
      companyName: tenant.name,
      inviterEmail: user.email ?? "",
      role: inviteRole,
      acceptUrl,
    });

    return NextResponse.json({
      success: true,
      invite: data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Unexpected error" },
      { status: 500 },
    );
  }
}