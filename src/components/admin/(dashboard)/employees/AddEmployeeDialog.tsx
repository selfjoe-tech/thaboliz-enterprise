// app/components/admin/employees/AddEmployeeDialog.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  onCreated?: (employee: any) => void; // will receive the created employee row
}

export default function AddEmployeeDialog({ open, onOpenChange, onClose, onCreated }: Props) {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<"employee" | "manager">("employee");
  const [isPending, setIsPending] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setName("");
      setEmail("");
      setRole("employee");
      setIsPending(false);
    }
  }, [open]);

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
    if (!name.trim() || !email.trim()) {
      alert("Please provide a name and email");
      return;
    }
    setIsPending(true);
    try {
      const res = await fetch("/api/admin/employees/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), role }),
      });
      const json = await res.json();
      if (!res.ok || json?.error) {
        alert(json?.error || "Failed to create employee");
        return;
      }
      // json.employee should be the created row
      onCreated?.(json.employee);
      handleClose();
      router.refresh();
    } catch (err) {
      console.error("create employee error:", err);
      alert("Failed to create employee");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={dialogOnOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add new employee</DialogTitle>
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
              onChange={(e) => setRole(e.target.value as "employee" | "manager")}
              className="w-full border rounded px-3 py-2"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
