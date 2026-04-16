"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useState } from "react";
import {
  Package,
  LayoutGrid,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";

type AdminLink = {
  href: string;
  label: string;
  icon: "package" | "grid" | "cart" | "users";
};

const iconMap: Record<AdminLink["icon"], LucideIcon> = {
  package: Package,
  grid: LayoutGrid,
  cart: ShoppingCart,
  users: Users,
};

export default function Sidebar({
  links,
  mobile = false,
  onNavigate,
}: {
  links: AdminLink[];
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const desktopExpanded = mobile ? true : expanded;
  const width = mobile ? 288 : desktopExpanded ? 256 : 76;

  return (
    <motion.aside
      initial={false}
      animate={{ width }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      onMouseEnter={mobile ? undefined : () => setExpanded(true)}
      onMouseLeave={mobile ? undefined : () => setExpanded(false)}
      className={clsx(
        "flex h-full flex-col border-r border-white/10 bg-neutral-950 text-white",
        mobile ? "w-[18rem]" : "hidden md:flex h-screen",
      )}
    >
      <div className="flex h-16 items-center border-b border-white/10 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white">
            T
          </div>

          {desktopExpanded ? (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white">
                Thaboliz
              </div>
              <div className="text-xs text-white/45">Admin</div>
            </div>
          ) : null}
        </div>
      </div>

      <nav className="flex-1 px-2 py-3">
        <div className="space-y-1">
          {links.map((link) => {
            const active = pathname === link.href;
            const Icon = iconMap[link.icon];

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onNavigate}
                className={clsx(
                  "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition",
                  active
                    ? "bg-white text-neutral-950"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {desktopExpanded ? (
                  <span className="truncate">{link.label}</span>
                ) : null}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        {desktopExpanded ? (
          <div className="text-xs text-white/50">
            Signed in to current organization
          </div>
        ) : null}
      </div>
    </motion.aside>
  );
}