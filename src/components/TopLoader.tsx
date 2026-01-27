"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Configure once
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 120,
      minimum: 0.12,
    });
  }, []);

  // Finish when navigation completes (pathname/searchParams change)
  useEffect(() => {
    NProgress.done(true);
  }, [pathname, searchParams]);

  // Start on link clicks (capturing phase so it fires before Next handles it)
  useEffect(() => {
    const start = () => NProgress.start();

    const onClickCapture = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const a = target.closest("a") as HTMLAnchorElement | null;
      if (!a) return;

      // Only for internal navigations
      const href = a.getAttribute("href") || "";
      const isExternal = a.target === "_blank" || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
      const isHashOnly = href.startsWith("#");
      const isNewTab = a.rel?.includes("noopener") && a.target === "_blank";

      if (isExternal || isNewTab || isHashOnly) return;

      // If user is opening in new tab with ctrl/cmd/middle click, don't run loader
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;

      start();
    };

    window.addEventListener("click", onClickCapture, true);
    return () => window.removeEventListener("click", onClickCapture, true);
  }, []);

  return null;
}
