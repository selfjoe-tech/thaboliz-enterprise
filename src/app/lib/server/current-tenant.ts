import { createClient } from "@/lib/supabase/server";

export async function requireTenantContext() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Not authenticated");
  }

  const [{ data: profile, error: profileError }, { data: memberships, error: membershipsError }] =
    await Promise.all([
      supabase
        .from("user_profiles")
        .select("active_tenant_id")
        .eq("id", user.id)
        .single(),

      supabase
        .from("tenant_memberships")
        .select(`
          tenant_id,
          role,
          tenant:tenants!inner (
            id,
            name,
            slug
          )
        `)
        .eq("user_id", user.id)
        .eq("is_active", true)
        .order("created_at", { ascending: true }),
    ]);

  if (profileError) {
    throw profileError;
  }

  if (membershipsError) {
    throw membershipsError;
  }

  const accessibleTenants =
    (memberships ?? []).map((m: any) => ({
      tenantId: m.tenant_id as string,
      role: m.role as "owner" | "admin" | "manager" | "staff",
      tenant: m.tenant as {
        id: string;
        name: string;
        slug: string;
      },
    })) ?? [];

  if (accessibleTenants.length === 0) {
    throw new Error("No active tenant membership found");
  }

  const activeTenantId = profile?.active_tenant_id ?? null;

  const active =
    accessibleTenants.find((entry) => entry.tenantId === activeTenantId) ??
    accessibleTenants[0];

  return {
    supabase,
    user,
    tenantId: active.tenantId,
    role: active.role,
    tenant: active.tenant,
    accessibleTenants,
  };
}