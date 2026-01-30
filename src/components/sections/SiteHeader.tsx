"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
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
  Pickaxe,
  Truck,
  Sprout,
  Flame,
  Wind,
  Microscope,
  FileText,
  Info,
} from "lucide-react";
import HeaderBrand from "./HeaderBrand";
import ScrollLink from "../ScrollLink";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <NavigationMenuLink asChild>
      <Link href={href} className="text-sm text-white/70 hover:text-white transition">
        {children}
      </Link>
    </NavigationMenuLink>
  );
}

type MegaItem = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

const megaCols: { heading: string; items: MegaItem[] }[] = [
  {
    heading: "Core business",
    items: [
      {
        title: "About us",
        description: "Learn who we are and what we do",
        href: "/about",
        icon: <Info className="h-4 w-4" />,
      },
    ],
  },
  {
    heading: "Operations",
    items: [
      {
        title: "Construction",
        description: "Infrastructure from ground up",
        href: "/services/construction",
        icon: <Building2 className="h-4 w-4" />,
      },
      {
        title: "Technologies",
        description: "End-to-end tech solutions",
        href: "/services/technologies",
        icon: <Cpu className="h-4 w-4" />,
      },
      {
        title: "Mining",
        description: "Responsible extraction operations",
        href: "/services/mining",
        icon: <Pickaxe className="h-4 w-4" />,
      },
      {
        title: "Logistics",
        description: "Supply chain and distribution",
        href: "/services/logistics",
        icon: <Truck className="h-4 w-4" />,
      },
    ],
  },
  {
    heading: "Resources & energy",
    items: [
      {
        title: "Organic farms",
        description: "Sustainable food production",
        href: "/services/organic-farms",
        icon: <Sprout className="h-4 w-4" />,
      },
      {
        title: "Oil & gas",
        description: "Energy services and support",
        href: "/services/oil-and-gas",
        icon: <Flame className="h-4 w-4" />,
      },
      {
        title: "Green energy",
        description: "Clean energy and reduction",
        href: "/services/green-energy",
        icon: <Wind className="h-4 w-4" />,
      },
      {
        title: "Research & innovation",
        description: "Research that turns to results",
        href: "/services/research",
        icon: <Microscope className="h-4 w-4" />,
      },
    ],
  },
  {
    heading: "Development hub",
    items: [
      {
        title: "Tenders",
        description: "Bid and tender support",
        href: "/services/tenders",
        icon: <FileText className="h-4 w-4" />,
      },
    ],
  },
];

function MegaLink({ title, description, href, icon }: MegaItem) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className={[
          "group flex gap-3 rounded-none border border-white/10 bg-white/[0.02] px-3 py-3",
          "hover:bg-white/5 transition-colors focus:outline-none focus:bg-white/5",
        ].join(" ")}
      >
        <span className="mt-0.5 grid h-9 w-9 place-items-center border border-white/10 bg-white/5 text-white/80 group-hover:text-white">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold leading-none text-white">
            {title}
          </span>
          <span className="mt-1 block text-xs leading-snug text-white/60">
            {description}
          </span>
        </span>
      </Link>
    </NavigationMenuLink>
  );
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-white">
          <HeaderBrand w={140} h={28} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList className="gap-6">
                <NavigationMenuItem>
                  <NavLink href="/about">About us</NavLink>
                </NavigationMenuItem>

                {/* Desktop mega menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-auto bg-transparent px-0 py-0 text-sm font-normal text-white/70 hover:text-white data-[state=open]:text-white">
                    <span className="inline-flex items-center gap-1">What we do</span>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="p-0 bg-transparent border-0 shadow-none">
                    <div className="fixed left-1/2 top-16 z-50 w-[min(1100px,calc(100vw-2rem))] -translate-x-1/2">
                      <div className="rounded-none border border-white/10 bg-black/95 backdrop-blur p-6 shadow-[0_18px_50px_rgba(0,0,0,0.55)]">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                          {megaCols.map((col) => (
                            <div key={col.heading} className="space-y-3">
                              <div className="text-xs font-semibold uppercase tracking-widest text-white/50">
                                {col.heading}
                              </div>
                              <div className="space-y-2">
                                {col.items.map((it) => (
                                  <MegaLink key={it.title} {...it} />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-4 md:flex-row md:items-center md:justify-between">
                          <div className="text-sm text-white/70">
                            Ready to work with us?{" "}
                            <ScrollLink
                              href="/#contact"
                              className="text-white underline underline-offset-4 hover:text-primary transition"
                            >
                              Get in touch today
                            </ScrollLink>
                            .
                          </div>

                          <div className="flex items-center gap-6 text-sm text-white/70">
                            <button
                              type="button"
                              className="inline-flex items-center gap-2 hover:text-white transition"
                            >
                              <Search className="h-4 w-4" />
                              Search
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center gap-2 hover:text-white transition"
                            >
                              <Menu className="h-4 w-4" />
                              Menu
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden md:inline-flex rounded-none border-white/15 text-white hover:bg-white/5"
              asChild
            >
              <ScrollLink href="/#contact">Contact us</ScrollLink>
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button className="sm:hidden rounded-none bg-primary text-white hover:opacity-90 transition">
                  <Menu className="h-4 w-4 sm:hidden" />
                </Button>
              </SheetTrigger>

              {/* Add faster animation overrides here */}
              <SheetContent
                side="right"
                className={[
                    "z-[90]",
                    "flex flex-col max-h-dvh",
                  "w-[320px] rounded-none bg-black text-white border-l border-white/10",
                  "data-[state=open]:duration-150 data-[state=closed]:duration-150",
                  "data-[state=open]:ease-out data-[state=closed]:ease-in",
                ].join(" ")}
              >
                <SheetHeader>
                  <SheetTitle className="text-left text-white">
                    <span className="text-primary">Menu</span>
                  </SheetTitle>
                </SheetHeader>

                {/* ✅ Mobile uses the SAME megaCols items */}
                <div className="flex-1 overflow-y-auto px-4 pb-4 ">
                  {megaCols.map((col) => (
                    <div key={col.heading} className="space-y-3">
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-white/45">
                        {col.heading}
                      </div>

                      <div className="grid gap-2">
                        {col.items.map((it) => (
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
                    </div>
                  ))}

                  
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
