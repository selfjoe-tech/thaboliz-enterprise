// app/components/admin/employees/EditEmployeeDialog.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Employee {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

interface Props {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  employee?: Employee | null;
  onUpdated?: (employee: Employee) => void;
}

export default function EditEmployeeDialog({ open, onOpenChange, onClose, employee, onUpdated }: Props) {
  const router = useRouter();
  const [name, setName] = React.useState(employee?.name ?? "");
  const [email, setEmail] = React.useState(employee?.email ?? "");
  const [role, setRole] = React.useState<"employee" | "manager" | "revoked">((employee?.role as any) ?? "employee");
  const [isPending, setIsPending] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setName(employee?.name ?? "");
      setEmail(employee?.email ?? "");
      setRole((employee?.role as any) ?? "employee");
      setIsPending(false);
    }
  }, [open, employee]);

  const handleClose = React.useCallback(() => {
    if (onOpenChange) onOpenChange(false);
    else onClose?.();
  }, [onOpenChange, onClose]);

  const dialogOnOpenChange = React.useCallback(
    (v: boolean) => {
      if (onOpenChange) onOpenChange(v);
      else if (!v) onClose?.();
    },
    [onOpenChange, onClose]
  );

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!employee) return;
    if (!name.trim() || !email.trim()) {
      alert("Please provide a name and email");
      return;
    }
    setIsPending(true);
    try {
      const res = await fetch("/api/admin/employees/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: employee.id, name: name.trim(), email: email.trim(), role }),
      });
      const json = await res.json();
      if (!res.ok || json?.error) {
        alert(json?.error || "Failed to update employee");
        return;
      }
      onUpdated?.(json.employee);
      handleClose();
      router.refresh();
    } catch (err) {
      console.error("update employee error:", err);
      alert("Failed to update employee");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={dialogOnOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit employee</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Employee full name" required />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="employee@example.com" type="email" required />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="revoked">Revoked</option>
            </select>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
