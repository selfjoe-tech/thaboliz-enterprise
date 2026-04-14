// components/InviteUserForm.tsx
"use client";

import React, { useState } from "react";

export default function InviteUserForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, role }),
      });

      const body = await res.json();
      if (!res.ok) {
        setStatus(body?.error || "Invite failed");
      } else {
        setStatus(body?.message || "Invite sent");
        setEmail("");
        setName("");
        setRole("");
      }
    } catch (err: any) {
      setStatus(err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
      <div>
        <label className="block text-sm">Email</label>
        <input required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="employee@example.com" />
      </div>

      <div>
        <label className="block text-sm">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" placeholder="Full name (optional)" />
      </div>

      <div>
        <label className="block text-sm">Role</label>
        <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 border rounded" placeholder="role (optional)" />
      </div>

      <button disabled={loading} className="px-4 py-2 bg-black text-white rounded">
        {loading ? "Inviting…" : "Invite"}
      </button>

      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  );
}
