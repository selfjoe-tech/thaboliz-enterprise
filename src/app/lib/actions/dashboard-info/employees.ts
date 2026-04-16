import { requireTenantContext } from "@/app/lib/server/current-tenant";

export async function listEmployees(search = "") {
  const { supabase, tenantId } = await requireTenantContext();

  const [
    { data: memberships, error: membershipsError },
    { data: invites, error: invitesError },
  ] = await Promise.all([
    supabase
      .from("tenant_memberships")
      .select("id, user_id, role, is_active, created_at")
      .eq("tenant_id", tenantId)
      .order("created_at", { ascending: false }),

    supabase
      .from("tenant_invites")
      .select("id, email, role, created_at, expires_at, accepted_at")
      .eq("tenant_id", tenantId)
      .is("accepted_at", null)
      .order("created_at", { ascending: false }),
  ]);

  if (membershipsError) throw membershipsError;
  if (invitesError) throw invitesError;

  const userIds = [...new Set((memberships ?? []).map((m: any) => m.user_id).filter(Boolean))];

  console.log(userIds, "<_______userIds")

  let profiles: any[] = [];

  if (userIds.length > 0) {
    const { data: profileRows, error: profilesError } = await supabase
      .from("user_profiles")
      .select("id, full_name, email, phone")
      .in("id", userIds);

    if (profilesError) throw profilesError;
    profiles = profileRows ?? [];
    console.log(profiles, "<_______ profiles")
  }

  const profileMap = new Map(
    profiles.map((profile: any) => [profile.id, profile]),
  );

  console.log(profileMap, "<______ profileMap")

  const members = (memberships ?? []).map((membership: any) => ({
    ...membership,
    profile: profileMap.get(membership.user_id) ?? null,
  }));

  console.log(members, "<______members")

  const q = search.trim().toLowerCase();

  const filteredMembers = members.filter((member: any) => {
    const name = member.profile?.full_name?.toLowerCase() ?? "";
    const email = member.profile?.email?.toLowerCase() ?? "";
    const role = member.role?.toLowerCase() ?? "";
    return !q || name.includes(q) || email.includes(q) || role.includes(q);
  });

  console.log(filteredMembers, "<________filteredMembers")

  const filteredInvites = (invites ?? []).filter((invite: any) => {
    const email = invite.email?.toLowerCase() ?? "";
    const role = invite.role?.toLowerCase() ?? "";
    return !q || email.includes(q) || role.includes(q);
  });

  console.log(filteredInvites, "<_____filteredInvites")

  return {
    members: filteredMembers,
    invites: filteredInvites,
  };
}