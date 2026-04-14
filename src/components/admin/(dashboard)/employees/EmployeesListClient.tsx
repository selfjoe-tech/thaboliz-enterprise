// app/admin/employees/EmployeesListClient.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ConfirmActionDialog } from "@/app/components/admin/(dashboard)/categories/confirm-action-dialog"; // adjust path
import AddEmployeeDialog from "@/app/components/admin/(dashboard)/employees/AddEmployeeDialog";
import EditEmployeeDialog from "@/app/components/admin/(dashboard)/employees/EditEmployeeDialog";

type Employee = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  created_at?: string;
};

function RoleBadge({ role }: { role?: string }) {
  const r = role ?? "employee";
  if (r === "manager") {
    return <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Manager</span>;
  }
  if (r === "revoked") {
    return <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Revoked</span>;
  }
  // default: employee
  return <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">Employee</span>;
}

export default function EmployeesClient({
  initialItems,
  total,
  initialPage,
  initialPageSize,
  initialSearch,
}: {
  initialItems: Employee[];
  total: number;
  initialPage: number;
  initialPageSize: number;
  initialSearch: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [employees, setEmployees] = useState<Employee[]>(initialItems ?? []);
  const [search, setSearch] = useState(initialSearch ?? "");
  const [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);
  const [confirm, setConfirm] = useState<{ type: "toggle" | "delete"; id: string } | null>(null);

  // add/edit dialog state
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Employee | null>(null);

  const pageParam = Number(searchParams?.get("page") ?? initialPage ?? 1);
  const pageSizeParam = Number(searchParams?.get("pageSize") ?? initialPageSize ?? 10);
  const currentPage = Number.isFinite(pageParam) ? Math.max(1, pageParam) : 1;
  const pageSize = Number.isFinite(pageSizeParam) ? Math.max(1, pageSizeParam) : 10;

  useEffect(() => {
    setEmployees(initialItems ?? []);
  }, [initialItems]);

  const filtered = useMemo(() => {
    if (!search?.trim()) return employees;
    const q = search.toLowerCase();
    return employees.filter((u) => (u.name ?? "").toLowerCase().includes(q));
  }, [employees, search]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function pushQuery(params: { page?: number; pageSize?: number; search?: string }) {
    const qp = new URLSearchParams(searchParams?.toString() ?? "");
    if (params.page !== undefined) qp.set("page", String(params.page));
    if (params.pageSize !== undefined) qp.set("pageSize", String(params.pageSize));
    if (params.search !== undefined) {
      if (params.search) qp.set("search", params.search);
      else qp.delete("search");
    }
    router.push(`${pathname}?${qp.toString()}`);
  }

  const handleSearchChange = (v: string) => {
    setSearch(v);
    pushQuery({ page: 1, search: v });
  };

  const handlePageChange = (page: number) => pushQuery({ page });
  const handlePageSizeChange = (ps: number) => pushQuery({ page: 1, pageSize: ps });

  // optimistic add (called by AddEmployeeDialog on success)
  const handleAddSuccess = (newEmployee: Employee) => {
    setEmployees((prev) => [newEmployee, ...prev]);
    const toastId = Math.random().toString(36).slice(2, 9);
    setToasts((t) => [...t, { id: toastId, message: "Employee added" }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== toastId)), 4000);
  };

  // optimistic update (called by EditEmployeeDialog on success)
  const handleEditSuccess = (updated: Employee) => {
    setEmployees((prev) => prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)));
    const toastId = Math.random().toString(36).slice(2, 9);
    setToasts((t) => [...t, { id: toastId, message: "Employee updated" }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== toastId)), 4000);
  };

  // optimistic delete
  const handleDelete = async (id: string) => {
    const prev = employees;
    setEmployees((s) => s.filter((e) => e.id !== id));
    try {
      const res = await fetch(`/api/admin/employees/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!res.ok || json?.error) throw new Error(json?.error || "Failed to delete");
      const toastId = Math.random().toString(36).slice(2, 9);
      setToasts((t) => [...t, { id: toastId, message: "Employee deleted" }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== toastId)), 4000);
    } catch (err: any) {
      setEmployees(prev); // rollback
      const toastId = Math.random().toString(36).slice(2, 9);
      setToasts((t) => [...t, { id: toastId, message: `Delete failed: ${err?.message ?? "unknown"}` }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== toastId)), 8000);
    }
  };

  // toggle access by updating latest session via API
  const handleToggleAccess = async (id: string) => {
    // flip role visually (if you prefer using a separate flag, adjust here)
    const optimisticEmployees = employees.map((e) => (e.id === id ? { ...e, role: e.role === "revoked" ? "employee" : "revoked" } : e));
    const prev = employees;
    setEmployees(optimisticEmployees);

    try {
      const res = await fetch(`/api/admin/employees/toggle-access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!res.ok || json?.error) throw new Error(json?.error || "Toggle failed");

      const actionText = json?.action === "revoked" ? "revoked" : "granted";
      const toastId = Math.random().toString(36).slice(2, 9);
      setToasts((t) => [...t, { id: toastId, message: `Access ${actionText}` }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== toastId)), 4000);
    } catch (err: any) {
      setEmployees(prev); // rollback
      const toastId = Math.random().toString(36).slice(2, 9);
      setToasts((t) => [...t, { id: toastId, message: `Toggle failed: ${err?.message ?? "unknown"}` }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== toastId)), 8000);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Employees</h1>

      {/* Search + Add */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search employees by name..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => setAddOpen(true)}>Add employee</Button>

          <div className="ml-2 inline-flex items-center gap-2">
            <label className="text-sm">Per page</label>
            <select value={pageSize} onChange={(e) => handlePageSizeChange(Number(e.target.value))} className="border px-2 py-1 rounded">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add dialog */}
      <AddEmployeeDialog
        open={addOpen}
        onOpenChange={(v) => setAddOpen(v)}
        onCreated={(emp) => {
          handleAddSuccess(emp);
          setAddOpen(false);
        }}
      />

      {/* Mobile cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {filtered.map((emp) => (
          <div
            key={emp.id}
            className="flex items-center justify-between gap-3 p-4 border border-gray-200 rounded-xl shadow-sm bg-white cursor-pointer"
            onClick={() => router.push(`/admin/employees/${emp.id}`)}
          >
            <div>
              <h3 className="font-semibold text-base">{emp.name}</h3>
              <p className="text-sm text-gray-600">{emp.email}</p>
              <div className="mt-1">
                <RoleBadge role={emp.role} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirm({ type: "toggle", id: emp.id });
                }}
              >
                {emp.role === "revoked" ? "Grant" : "Revoke"}
              </Button>

              <ConfirmActionDialog
                open={confirm?.type === "toggle" && confirm?.id === emp.id}
                onOpenChange={(open) => {
                  if (!open) setConfirm(null);
                }}
                title={`${emp.role === "revoked" ? "Grant access" : "Revoke access"}`}
                message={`Are you sure you want to ${emp.role === "revoked" ? "grant" : "revoke"} access for ${emp.name}?`}
                confirmText={emp.role === "revoked" ? "Grant access" : "Revoke access"}
                confirmVariant={emp.role === "revoked" ? "default" : "destructive"}
                onConfirm={async () => {
                  await handleToggleAccess(emp.id);
                  setConfirm(null);
                }}
              />

              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditTarget(emp);
                }}
              >
                Edit
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirm({ type: "delete", id: emp.id });
                }}
              >
                Delete
              </Button>

              <ConfirmActionDialog
                open={confirm?.type === "delete" && confirm?.id === emp.id}
                onOpenChange={(open) => {
                  if (!open) setConfirm(null);
                }}
                title={`Delete Employee`}
                message={`Are you sure you want to delete ${emp.name}? This action cannot be undone.`}
                confirmText="Delete"
                confirmVariant="destructive"
                onConfirm={async () => {
                  await handleDelete(emp.id);
                  setConfirm(null);
                }}
              />
            </div>
          </div>
        ))}

        {filtered.length === 0 && <p className="text-center text-sm text-gray-500">No employees found.</p>}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="p-3" onClick={() => router.push(`/admin/employees/${emp.id}`)}>
                  {emp.name}
                </td>
                <td className="p-3" onClick={() => router.push(`/admin/employees/${emp.id}`)}>
                  {emp.email}
                </td>
                <td className="p-3" onClick={() => router.push(`/admin/employees/${emp.id}`)}>
                  <RoleBadge role={emp.role} />
                </td>
                <td className="p-3 text-center">
                  <div className="inline-flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirm({ type: "toggle", id: emp.id });
                      }}
                    >
                      {emp.role === "revoked" ? "Grant" : "Revoke"}
                    </Button>

                    <ConfirmActionDialog
                      open={confirm?.type === "toggle" && confirm?.id === emp.id}
                      onOpenChange={(open) => {
                        if (!open) setConfirm(null);
                      }}
                      title={`${emp.role === "revoked" ? "Grant access" : "Revoke access"}`}
                      message={`Are you sure you want to ${emp.role === "revoked" ? "grant" : "revoke"} access for ${emp.name}?`}
                      confirmText={emp.role === "revoked" ? "Grant access" : "Revoke access"}
                      confirmVariant={emp.role === "revoked" ? "default" : "destructive"}
                      onConfirm={async () => {
                        await handleToggleAccess(emp.id);
                        setConfirm(null);
                      }}
                    />

                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditTarget(emp);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirm({ type: "delete", id: emp.id });
                      }}
                    >
                      Delete
                    </Button>

                    <ConfirmActionDialog
                      open={confirm?.type === "delete" && confirm?.id === emp.id}
                      onOpenChange={(open) => {
                        if (!open) setConfirm(null);
                      }}
                      title={`Delete Employee`}
                      message={`Are you sure you want to delete ${emp.name}? This action cannot be undone.`}
                      confirmText="Delete"
                      confirmVariant="destructive"
                      onConfirm={async () => {
                        await handleDelete(emp.id);
                        setConfirm(null);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit dialog */}
      <EditEmployeeDialog
        open={Boolean(editTarget)}
        onOpenChange={(v) => {
          if (!v) setEditTarget(null);
        }}
        employee={editTarget}
        onUpdated={(emp) => {
          handleEditSuccess(emp);
          setEditTarget(null);
        }}
      />

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      {/* toasts */}
      <div className="fixed right-4 top-20 z-[9999] flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className="bg-red-600 text-white px-4 py-2 rounded shadow">
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
