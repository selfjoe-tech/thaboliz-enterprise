"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FinishLoginClient({
  inviteToken,
}: {
  inviteToken: string;
}) {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        if (inviteToken) {
          const res = await fetch("/api/auth/accept-invite", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: inviteToken }),
          });

          const json = await res.json();

          if (!res.ok || !json?.success) {
            throw new Error(json?.error || "Could not accept invite.");
          }
        }

        if (!cancelled) {
          router.replace("/admin/products");
          router.refresh();
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message || "Could not finish login.");
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [inviteToken, router]);

  if (error) {
    return (
      <div className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
        <h1 className="text-xl font-semibold">Invite could not be completed</h1>
        <p className="mt-2 text-sm text-red-200">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6">
      <h1 className="text-xl font-semibold">Signing you in…</h1>
      <p className="mt-2 text-sm text-white/60">
        Finalizing access to the organization.
      </p>
    </div>
  );
}