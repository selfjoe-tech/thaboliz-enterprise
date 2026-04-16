"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar({
  links,
  userName,
  onNavigate,
}: {
  links: { href: string; label: string; icon: any }[];
  userName: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-neutral-900 text-white">
      <div className="px-4 py-5 text-lg font-semibold">
        Admin Panel
      </div>

      <nav className="flex-1 space-y-1 px-2">
        {links.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? "bg-white text-black"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4 text-xs text-white/50">
        {userName}
      </div>
    </div>
  );
}