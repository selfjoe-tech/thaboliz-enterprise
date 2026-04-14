"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InviteEmployeeForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("staff");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/employees/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });

      const json = await res.json();

      if (!json?.success) {
        throw new Error(json?.error || "Failed to send invite");
      }

      setEmail("");
      setRole("staff");
      router.refresh();
      alert("Invite sent.");
    } catch (error: any) {
      alert(error?.message || "Failed to send invite");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-xl border border-gray-200 bg-white p-4"
    >
      <h2 className="mb-4 text-lg font-semibold">Invite employee</h2>

      <div className="grid gap-4 md:grid-cols-[1fr_180px_auto]">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="employee@company.com"
          className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none"
        >
          <option value="staff">Staff</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 rounded-xl bg-slate-900 px-4 text-sm font-medium text-white"
        >
          {isSubmitting ? "Sending..." : "Send invite"}
        </button>
      </div>
    </form>
  );
}