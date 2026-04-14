import InviteEmployeeForm from "@/components/admin/employees/invite-form";
import { listEmployees } from "@/app/lib/actions/dashboard-info/employees";
import { requireTenantContext } from "@/app/lib/server/current-tenant";

type SearchParams = Promise<{
  search?: string;
}>;

export default async function EmployeesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const search = typeof sp?.search === "string" ? sp.search : "";

  const [{ members, invites }, tenantContext] = await Promise.all([
    listEmployees(search),
    requireTenantContext(),
  ]);

  const canInvite =
    tenantContext.role === "owner" || tenantContext.role === "admin";

  return (
    <main className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Employees</h1>
        <p className="mt-1 text-sm text-slate-600">
          People who currently have access to this company account.
        </p>
      </div>

      {canInvite ? <InviteEmployeeForm /> : null}

      <form className="mb-6">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search by name, email, or role..."
          className="w-full max-w-md rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
        />
      </form>

      <section className="mb-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-4 py-3">
          <h2 className="font-semibold text-slate-900">Active access</h2>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Access</th>
              <th className="px-4 py-3">Added</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {members.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No employees found.
                </td>
              </tr>
            ) : (
              members.map((member: any) => (
                <tr key={member.id}>
                  <td className="px-4 py-3 text-slate-900">
                    {member.profile?.full_name || "Unnamed user"}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {member.profile?.email || "-"}
                  </td>
                  <td className="px-4 py-3 capitalize text-slate-700">
                    {member.role}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        member.is_active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {member.is_active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {new Date(member.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <section className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-4 py-3">
          <h2 className="font-semibold text-slate-900">Pending invites</h2>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Sent</th>
              <th className="px-4 py-3">Expires</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {invites.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  No pending invites.
                </td>
              </tr>
            ) : (
              invites.map((invite: any) => (
                <tr key={invite.id}>
                  <td className="px-4 py-3 text-slate-900">{invite.email}</td>
                  <td className="px-4 py-3 capitalize text-slate-700">
                    {invite.role}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {new Date(invite.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {new Date(invite.expires_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}