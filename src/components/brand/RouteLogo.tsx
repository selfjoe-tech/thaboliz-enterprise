"use client";

import * as React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

type RouteLogoProps = {
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

function pickLogo(pathname: string) {
  // Order matters (most specific first)
  const map: Array<[string, string, string]> = [
    ["/services/construction", "/logo/t-construction-logo.png", "Thaboliz Construction"],
    ["/services/technologies", "/logo/t-technologies-logo.png", "Thaboliz Technologies"],
    ["/services/mining", "/logo/t-mining-logo.png", "Thaboliz Mining"],
    ["/services/logistics", "/logo/t-logistics-logo.png", "Thaboliz Logistics"],
    ["/services/integrated-farms", "/logo/t-intfarms-logo.png", "Thaboliz Integrated Farms"],
    ["/services/oil-and-gas", "/logo/t-oilgas-logo.png", "Thaboliz Oil & Gas"],
    // If you later add more service pages, add them here
  ];

  for (const [prefix, src, alt] of map) {
    if (pathname === prefix || pathname.startsWith(prefix + "/")) return { src, alt };
  }

  // Default everywhere else
  return { src: "/logo/t-logo.png", alt: "Thaboliz" };
}

export default function RouteLogo({
  width,
  height,
  className = "",
  priority = false,
}: RouteLogoProps) {
  const pathname = usePathname() || "/";
  const { src, alt } = React.useMemo(() => pickLogo(pathname), [pathname]);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={["h-auto w-auto", className].join(" ")}
    />
  );
}