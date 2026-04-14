// components/InviteList.tsx
"use client";
import React, { useEffect, useState } from "react";

export default function InviteList() {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/list");
      const body = await res.json();
      if (res.ok && body.ok) setRows(body.data || []);
    }
    load();
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold">Invites / Admin rows</h3>
      <ul className="space-y-2 mt-3">
        {rows.map((r) => (
          <li key={r.id} className="p-2 border rounded">
            <div><strong>{r.email}</strong> {r.name ? `— ${r.name}` : ""}</div>
            <div className="text-sm text-gray-600">role: {r.role || "—"} | status: {r.invite_status} | user_id: {r.supabase_user_id || "—"}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
