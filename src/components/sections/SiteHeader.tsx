"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ChevronRight, ChevronDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Building2,
  Cpu,
  Truck,
  Sprout,
  
} from "lucide-react";
import ScrollLink from "../ScrollLink";
import RouteLogo from "@/components/brand/RouteLogo";

import { AnimatePresence, motion } from "framer-motion";

const megaPanel = {
  hidden: { opacity: 0, y: 10, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.055,
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.985,
    transition: {
      duration: 0.16,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const megaChild = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <NavigationMenuLink asChild>
      <Link href={href} className="text-sm text-white/70 hover:text-white transition">
        {children}
      </Link>
    </NavigationMenuLink>
  );
}

type WhatWeDoItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  image: { src: string; alt: string };
  chips: string[];
};

const WHAT_WE_DO: WhatWeDoItem[] = [
  {
    id: "construction",
    title: "Construction",
    description:
      "Civil works, refurbishments, disciplined delivery controls, and aluminum fabrication services.",
    href: "/services/construction",
    icon: <Building2 className="h-4 w-4" />,
    image: { src: "/stock/pic-21.jpg", alt: "Construction" },
    chips: ["Aluminum windows", "Aluminum doors", "Gates & fences", "Refurb & upgrades", "Maintenance", "Foundation to roof"],
  },
  {
    id: "technologies",
    title: "Technologies",
    description:
      "Web, systems, and automation solutions that support operations and modern service delivery.",
    href: "/services/technologies",
    icon: <Cpu className="h-4 w-4" />,
    image: { src: "/stock/pic-22.jpg", alt: "Technologies" },
    chips: ["Web platforms", "Automation", "Systems", "Digital ops", "Cyber Security"],
  },
  // {
  //   id: "mining",
  //   title: "Mining",
  //   description:
  //     "Responsible extraction operations with a focus on process discipline and compliance readiness.",
  //   href: "/services/mining",
  //   icon: <Pickaxe className="h-4 w-4" />,
  //   image: { src: "/stock/pic-23.jpg", alt: "Mining" },
  //   chips: ["Operations support", "Compliance readiness", "Project logistics"],
  // },
  {
    id: "logistics",
    title: "Logistics",
    description:
      "Supply chain and distribution support for contracted scopes and infrastructure operations.",
    href: "/services/logistics",
    icon: <Truck className="h-4 w-4" />,
    image: { src: "/stock/pic-24.jpg", alt: "Logistics" },
    chips: ["Distribution", "Facilities support", "Contracted delivery"],
  },
  {
    id: "organic-farms",
    title: "Organic Farms",
    description:
      "Sustainable food production initiatives with practical, scalable execution and operations support.",
    href: "/services/organic-farms",
    icon: <Sprout className="h-4 w-4" />,
    image: { src: "/stock/pic-25.jpg", alt: "Organic farms" },
    chips: ["Sustainable production", "Operations", "Scaling"],
  },
  // {
  //   id: "oil-gas",
  //   title: "Oil & Gas",
  //   description:
  //     "Support services and operational capability for fuel and gas related infrastructure.",
  //   href: "/services/oil-and-gas",
  //   icon: <Flame className="h-4 w-4" />,
  //   image: { src: "/stock/pic-26.jpg", alt: "Oil & Gas" },
  //   chips: ["Infrastructure support", "Safety docs", "Partner-led execution"],
  // },
  
 
  
];

function MegaRow({
  active,
  item,
  onHover,
}: {
  active: boolean;
  item: WhatWeDoItem;
  onHover: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onFocus={onHover}
      className={[
        "w-full text-left",
        "px-3 py-2",
        "text-sm transition",
        active ? "text-white" : "text-white/55 hover:text-white/80",
      ].join(" ")}
    >
      {item.title}
    </button>
  );
}

export default function SiteHeader() {
  const [activeId, setActiveId] = React.useState<string>(WHAT_WE_DO[0]?.id ?? "construction");
  const active = React.useMemo(
    () => WHAT_WE_DO.find((x) => x.id === activeId) ?? WHAT_WE_DO[0],
    [activeId]
  );

  const [megaOpen, setMegaOpen] = React.useState(false);
const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

const openMega = React.useCallback(() => {
  if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  setMegaOpen(true);
}, []);

const closeMega = React.useCallback(() => {
  closeTimerRef.current = setTimeout(() => {
    setMegaOpen(false);
  }, 120);
}, []);





  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="font-semibold tracking-tight text-white">
            <RouteLogo width={110} height={28} priority />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            <NavigationMenu delayDuration={0}>
              <NavigationMenuList className="gap-8">

                  <NavigationMenuItem>
                  <NavLink href="/">Home</NavLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavLink href="/about">About us</NavLink>
                </NavigationMenuItem>

                

                {/* ✅ Squarespace-style mega menu */}
                <NavigationMenuItem
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                    onFocus={openMega}
                    className="relative"
                  >
                    <button
                      type="button"
                      className={[
                        "flex gap-2 h-auto bg-transparent px-0 py-0 text-sm font-normal transition",
                        megaOpen ? "text-white" : "text-white/70 hover:text-white",
                      ].join(" ")}
                    >
                      <span className="inline-flex items-center gap-1">What we do</span>
                      <ChevronDown className="h-5 w-5" />
                    </button>

                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          variants={megaPanel}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          className="fixed left-1/2 top-16 z-50 w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2"
                          onMouseEnter={openMega}
                          onMouseLeave={closeMega}
                        >
                          <div className="relative border border-white/10 bg-black/95 backdrop-blur shadow-[0_22px_70px_rgba(0,0,0,0.65)]">
                            <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-white/10 bg-black/95" />

                            <div className="grid gap-0 lg:grid-cols-12">
                              {/* Left list */}
                              <motion.div variants={megaChild} className="lg:col-span-3 border-r border-white/10 p-6">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                                  Services
                                </div>

                                <div className="mt-4 space-y-1">
                                  {WHAT_WE_DO.map((it, i) => (
                                    <motion.div
                                      key={it.id}
                                      variants={megaChild}
                                      transition={{ delay: i * 0.03 }}
                                    >
                                      <Link
                                        href={it.href}
                                        onMouseEnter={() => setActiveId(it.id)}
                                        onFocus={() => setActiveId(it.id)}
                                        className={[
                                          "flex items-center gap-1 block w-full px-3 py-2 text-sm transition",
                                          it.id === activeId
                                            ? "text-white"
                                            : "text-white/55 hover:text-white/80",
                                        ].join(" ")}
                                      >
                                        {it.title}
                                        {it.id === activeId && <ArrowUpRight />}
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>

                              {/* Middle content */}
                              <motion.div variants={megaChild} className="lg:col-span-5 border-r border-white/10 p-6">
                                

                                <motion.div
                                  key={active.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                >
                                  <Link
                                    href={active.href}
                                    className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-white hover:text-white/90 transition"
                                  >
                                    {active.title}
                                    <ChevronRight className="h-4 w-4" />
                                  </Link>

                                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
                                    {active.description}
                                  </p>

                                  <div className="mt-6 flex flex-wrap gap-2">
                                    {active.chips.map((chip, i) => (
                                      <motion.span
                                        key={chip}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.04 * i, duration: 0.2 }}
                                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70"
                                      >
                                        {chip}
                                      </motion.span>
                                    ))}
                                  </div>
                                </motion.div>
                              </motion.div>

                              {/* Right image */}
                              <motion.div variants={megaChild} className="lg:col-span-4">
                                <motion.div
                                  key={active.image.src}
                                  initial={{ opacity: 0, scale: 0.98 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                                  className="relative overflow-hidden bg-white/[0.02]"
                                >
                                  <div className="relative aspect-[4/5] w-full">
                                    <Image
                                      src={active.image.src}
                                      alt={active.image.alt}
                                      fill
                                      className="object-cover"
                                      sizes="(min-width: 1024px) 360px, 80vw"
                                      priority
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
                                  </div>
                                </motion.div>
                              </motion.div>
                            </div>

                            <motion.div
                              variants={megaChild}
                              className="flex flex-col gap-4 border-t border-white/10 px-6 py-4 md:flex-row md:items-center md:justify-between"
                            >
                              <div className="text-sm text-white/60">
                                Ready to work with us?{" "}
                                <ScrollLink
                                  href="/#contact"
                                  className="text-white underline underline-offset-4 hover:text-white/90 transition"
                                >
                                  Get in touch
                                </ScrollLink>
                                .
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavigationMenuItem>





              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right actions (outside nav) */}
          <div className="flex items-center gap-2">
            

            <Button
              className="hidden md:inline-flex h-10 rounded-none bg-white px-6 text-black hover:bg-white/90"
              asChild
            >
              <ScrollLink href="/#contact">Get started</ScrollLink>
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button className="md:hidden rounded-none bg-white text-black hover:bg-white/90">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className={[
                  "z-[90] flex flex-col max-h-dvh",
                  "w-[320px] rounded-none bg-black text-white border-l border-white/10",
                  "data-[state=open]:duration-150 data-[state=closed]:duration-150",
                  "data-[state=open]:ease-out data-[state=closed]:ease-in",
                ].join(" ")}
              >
                <SheetHeader>
                  <SheetTitle className="text-left text-white">
                    <span className="text-white">Menu</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-4 pb-4">
                  <div className="space-y-3">
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-white/45">
                      What we do
                    </div>

                    <div className="grid gap-2">
                      {WHAT_WE_DO.map((it) => (
                        <SheetClose key={it.href} asChild>
                          <Link
                            href={it.href}
                            className="group flex gap-3 rounded-none border border-white/10 bg-white/[0.02] px-3 py-3 hover:bg-white/5 transition-colors"
                          >
                            <span className="mt-0.5 grid h-9 w-9 place-items-center border border-white/10 bg-white/5 text-white/80 group-hover:text-white">
                              {it.icon}
                            </span>

                            <span className="min-w-0">
                              <span className="block text-sm font-semibold leading-none text-white">
                                {it.title}
                              </span>
                              <span className="mt-1 block text-xs leading-snug text-white/60">
                                {it.description}
                              </span>
                            </span>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>

                    <div className="pt-4">
                      
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}