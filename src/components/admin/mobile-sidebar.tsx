"use client";

import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/components/admin/sidebar";
import type { LucideIcon } from "lucide-react";

type AdminLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export default function MobileSidebar({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: AdminLink[];
}) {
  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="absolute left-0 top-0 h-full w-[18rem]"
          >
            <Sidebar links={links} mobile onNavigate={onClose} />
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}