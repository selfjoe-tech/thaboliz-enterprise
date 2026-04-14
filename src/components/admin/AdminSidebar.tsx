"use client";

import Link from "next/link";
import { logoutAction } from "@/app/(auth)/actions";


type AdminLink = {
  href: string;
  label: string;
};

export default function AdminSidebar({
  userName,
  links,
}: {
  userName?: string | null;
  links: AdminLink[];
}) {
  return (
    <aside className="flex h-full w-full max-w-[260px] flex-col border-r border-white/10 bg-neutral-950 text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <div className="text-xs uppercase tracking-[0.2em] text-white/45">
          Admin
        </div>
        <div className="mt-2 text-lg font-semibold">
          {userName || "Dashboard"}
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/8 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <form action={logoutAction}>
        <button
          type="submit"
          className="w-full rounded-xl border border-white/10 px-4 py-3 text-left text-sm text-white transition hover:bg-white/5"
        >
          Sign out
        </button>
      </form>
    </aside>
  );
}