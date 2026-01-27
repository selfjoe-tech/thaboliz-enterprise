"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type ScrollLinkProps = React.ComponentPropsWithoutRef<typeof Link> & {
  href: string; // "/#contact" or "#contact"
};

const ScrollLink = React.forwardRef<HTMLAnchorElement, ScrollLinkProps>(
  ({ href, onClick, ...props }, ref) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // ✅ Let Radix SheetClose (and any parent) run first
      onClick?.(e);

      // If something already prevented default, respect it.
      if (e.defaultPrevented) return;

      const hash = href.includes("#") ? href.split("#")[1] : "";
      if (!hash) return;

      // Ignore new-tab / modified clicks
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;

      // Stop normal navigation so we can scroll reliably
      e.preventDefault();

      const go = () => {
        // wait a tick for layout to settle, then scroll
        requestAnimationFrame(() => {
          const el = document.getElementById(hash);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", "/#" + hash);
        });
      };

      if (pathname !== "/") {
        router.push("/#" + hash);
        // a tiny delay helps when the section mounts after navigation
        setTimeout(go, 50);
      } else {
        go();
      }
    };

    return <Link ref={ref} href={href} onClick={handleClick} {...props} />;
  }
);

ScrollLink.displayName = "ScrollLink";
export default ScrollLink;
