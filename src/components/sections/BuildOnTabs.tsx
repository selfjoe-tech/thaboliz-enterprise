"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Building2, Cpu, Sprout, Mountain, Truck, Flame, Wind, Microscope, FileText, HeartHandshake } from "lucide-react";
import Image from "next/image";
import ScrollLink from "../ScrollLink";
import { Button } from "../ui/button";
type Item = {
  title: string;
  label: string;
  description: string;
  href?: string;
  icon: React.ReactNode;
  size?: "tall" | "mid" | "short";
  image?: string; // ✅ add this
};


const items: Item[] = [
  {
    label: "Construction",
    title: "Infrastructure that stands the test",
    description: "Planning, delivery, and project execution built around quality and safety.",
    href: "/divisions/construction",
    icon: <Building2 className="h-5 w-5" />,
    size: "tall",
    image: "/companies/construction.jpg"
  },
  {
    label: "Technology",
    title: "Technology that moves the work forward",
    description: "IT services and supplying tech products that fit your needs.",
    href: "/divisions/technologies",
    icon: <Cpu className="h-5 w-5" />,
    size: "mid",
    image: "/companies/tech.jpg"
  },
  {
    label: "Organic Farms",
    title: "Organic farming with real standards",
    description: "No GMOs, no chemical fertilisers. Clean farming practices that respect the land.",
    href: "/divisions/organic-farms",
    icon: <Sprout className="h-5 w-5" />,
    size: "mid",
    image: "/companies/organic farming.avif"
  },
  {
    label: "Mining",
    title: "Responsible resource development",
    description: "Operations guided by safety, compliance, and long-term value.",
    href: "/divisions/mining",
    icon: <Mountain className="h-5 w-5" />,
    size: "tall",
    image: "/companies/mining.avif"
  },
  {
    label: "Logistics",
    title: "Movement that keeps supply chains alive",
    description: "Reliable transport and logistics built for efficiency and trust.",
    href: "/divisions/logistics",
    icon: <Truck className="h-5 w-5" />,
    size: "short",
    image: "/companies/logistics.jpg"
  },
  {
    label: "Oil & Gas",
    title: "Energy projects delivered with discipline",
    description: "Structured execution, clear reporting, and operational accountability.",
    href: "/divisions/oil-and-gas",
    icon: <Flame className="h-5 w-5" />,
    size: "mid",
    image: "/companies/oil.avif"
  },
  {
    label: "Green Energy",
    title: "Clean energy for a stronger future",
    description: "Practical green energy solutions designed to work in the real world.",
    href: "/divisions/green-energy",
    icon: <Wind className="h-5 w-5" />,
    size: "short",
    image: "/companies/energy.avif"
  },
  {
    label: "Research & Innovation",
    title: "Research that turns into results",
    description: "We test, improve, and build smarter ways to deliver projects.",
    href: "/divisions/research",
    icon: <Microscope className="h-5 w-5" />,
    size: "mid",
    image: "/companies/research.avif"
  },
  {
    label: "Tenders",
    title: "Tender support and fulfilment",
    description: "We help source, quote, and deliver what the contract requires.",
    href: "/divisions/tenders",
    icon: <FileText className="h-5 w-5" />,
    size: "short",
    image: "/companies/tender.avif"
  },
  {
    label: "CSR",
    title: "Corporate Social Responsibility",
    description: "Upliftment initiatives through the Thaboliz Empowerment Foundation.",
    href: "/divisions/foundation",
    icon: <HeartHandshake className="h-5 w-5" />,
    size: "tall",
    image: "/companies/community.avif"
  },
];

function spanFor(size?: Item["size"]) {
  if (size === "tall") return "row-span-32";
  if (size === "mid") return "row-span-26";
  return "row-span-22";
}

function minHFor(size?: Item["size"]) {
  if (size === "tall") return "min-h-[320px]";
  if (size === "mid") return "min-h-[250px]";
  return "min-h-[205px]";
}

function Card({ item }: { item: Item }) {
  const Comp: any = item.href ? Link : "div";

  return (
    <Comp
      href={item.href}
      className={cn(
        "glow-border group relative block overflow-hidden rounded-none",
        "bg-card/35 backdrop-blur",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "p-6 text-left",
        minHFor(item.size)
      )}
    >
      {/* Background image (optional) */}
      {item.image ? (
        <>
          <Image
            src={item.image}
            alt=""
            fill
            className="z-0 object-cover opacity-[0.28]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
          {/* Dark overlay to keep text readable */}
          {/* A subtle color wash to match the brand */}
        </>
      ) : (
        <>
          {/* No image: keep it clean but premium */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/6 via-white/3 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_20%_20%,rgba(56,189,248,0.10),transparent_55%)]" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border border-white/10 bg-white/5">
              <span className="text-foreground/90">{item.icon}</span>
            </span>
            <div className="text-xs text-muted-foreground uppercase tracking-widest">
              {item.label}
            </div>
          </div>

          <ArrowRight className="h-4 w-4 text-foreground/30 transition group-hover:text-foreground/70" />
        </div>

        <h3 className="mt-5 text-lg font-semibold leading-tight text-foreground">
          {item.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        <div className="mt-6 text-sm text-foreground/80 group-hover:text-foreground">
          Explore <span className="text-primary">›</span>
        </div>

        
      </div>
    </Comp>
  );
}

export default function BuildOnGrid() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="text-xs text-muted-foreground uppercase tracking-widest">
            Capability
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            What we bring to the table
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The core fields Thaboliz Enterprise focuses on across the group
          </p>
        </div>

        {/* Masonry-like grid */}
        <div className="mt-10 masonry columns-1 md:columns-2 lg:columns-3">
        {items.map((item, idx) => (
            <div key={idx} className="masonry-item">
            <Card item={item} />
            </div>
        ))}
        </div>
        
      </div>

      <div className="flex w-full items-center justify-center mt-5">

<Button
  size="lg"
  className={cn(
    "btn-animated-border rounded-none px-3",
    "text-white",
    "hover:bg-white/10", // bg is handled but this is fine
    "shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
    "group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.10)]"
  )}
  asChild
  onClick={(e) => e.stopPropagation()} // ✅ prevents triggering the card Link
>
  <ScrollLink href="/#contact" className="inline-flex items-center gap-2">
    Contact us
    <ArrowRight className="h-4 w-4 opacity-80" />
  </ScrollLink>
</Button>



      </div>

      
    </section>
  );
}
