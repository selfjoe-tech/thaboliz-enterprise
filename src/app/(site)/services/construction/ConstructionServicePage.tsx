// DROP-IN: replace your entire Construction page file with this.
// (Keeps your existing layout + Embla carousels, and adds the alternating Vision/Mission-style blocks
// for aluminum categories that only have ONE item.)

import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  HardHat,
  Building2,
  ClipboardList,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Hammer,
  Droplets,
  Warehouse,
  GraduationCap,
  Hospital,
  ChevronRight,
  BrickWall,
  PaintRoller,
  LandPlot,
  Home,
  SquareDashedBottom,
  Ruler,
} from "lucide-react";

import AluminumCategoryCarousel, {
  type AluminumSlide,
} from "@/components/aluminum/AluminumCategoryCarousel";

import SectorsCarousel, { type SectorSlide } from "@/components/construction/SectorsCarousel";


function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 py-14 sm:py-18">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="max-w-3xl">
          {eyebrow ? (
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              {eyebrow}
            </div>
          ) : null}
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 text-lg leading-relaxed font-semibold text-white sm:text-[15px]">
              {subtitle}
            </p>
          ) : null}
        </Reveal>

        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function ConstructionCard({
  children,
  className = "",
  bgSrc,
  bgAlt = "",
  bgOpacity = 0.22,
}: {
  children: React.ReactNode;
  className?: string;
  bgSrc?: string;
  bgAlt?: string;
  bgOpacity?: number;
}) {
  return (
    <div
      className={[
        "group relative overflow-hidden ",
        
        
        className,
      ].join(" ")}
    >

      {bgSrc ? (
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={bgSrc}
            alt={bgAlt}
            fill
            className="object-cover"
            style={{ opacity: bgOpacity }}
          />
        </div>
      ) : null}

      

      <div className="relative">{children}</div>
    </div>
  );
}

function MediaSlot({
  label = "Illustration / image slot",
  src,
}: {
  label?: string;
  src?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10">
      <div className="relative aspect-[16/11] w-full">
        {src ? (
          <Image src={src} alt={label} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6">
            <div className="text-center">
              <div className="text-sm font-semibold text-white/80">{label}</div>
              <div className="mt-1 text-xs text-white/50">
                Replace with a real image later (keeps layout stable now).
              </div>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
      </div>
    </div>
  );
}

/** ✅ Vision/Mission-style block for single-item categories (alternates left/right) */
export function AluminumSplitFeature({
  title,
  lead,
  body,
  image,
  flip = false,
  anchorId,
}: {
  title: string;
  lead?: string;
  body?: string;
  image: { src: string; alt: string };
  flip?: boolean;
  anchorId?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
      {anchorId ? <div id={anchorId} className="scroll-mt-32" /> : null}

      <div className="grid lg:min-h-[420px] lg:grid-cols-12">
        {/* image */}
        <div className={["lg:col-span-6", flip ? "lg:order-2" : "lg:order-1"].join(" ")}>
          <div className="relative h-56 w-full sm:h-80 lg:h-full lg:min-h-[420px]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>

        {/* text */}
        <div className={["lg:col-span-6", flip ? "lg:order-1" : "lg:order-2"].join(" ")}>
          <div className="flex h-full min-h-[240px] flex-col justify-center p-6 sm:p-8 lg:min-h-[420px] lg:p-10">
            <h3 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
              {title}
            </h3>

            {lead ? (
              <p className="mt-4 text-base font-semibold text-lg text-white">{lead}</p>
            ) : null}

            {body ? (
              <p className="mt-3 max-w-xl text-lg font-semibold text-white sm:text-base">
                {body}
              </p>
            ) : null}

            <div className="mt-10 h-px w-24 bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConstructionServicePage() {
  const quickLinks: Array<[string, string]> = [
    ["Overview", "#overview"],
    ["What we do", "#what-we-do"],
    ["Aluminum", "#aluminum"],
    ["Other services", "#other-services"],
    ["Sectors", "#sectors"],
    ["Delivery", "#delivery"],
    ["Compliance", "#compliance"],
    ["Ventures", "#ventures"],
  ];

  const whatWeDo = [
    {
      icon: <Building2 className="h-4 w-4" />,
      title: "Civil & building works",
      desc: "New builds, upgrades, and enabling works.",
      img: "/stock/pic-11.jpg",
    },
    {
      icon: <Hammer className="h-4 w-4" />,
      title: "Earthworks & concrete",
      desc: "Site establishment, drainage, and structural works.",
      img: "/stock/pic-3.avif",
    },
    {
      icon: <Wrench className="h-4 w-4" />,
      title: "Fit-out & refurbishment",
      desc: "Interior fit-outs, remedial works, and upgrades.",
      img: "/stock/pic-2.jpg",
    },
    {
      icon: <ClipboardList className="h-4 w-4" />,
      title: "Maintenance programs",
      desc: "Planned maintenance for facilities and infrastructure.",
      img: "/stock/pic-1.jpg",
    },
  ];

  const sectorSlides: SectorSlide[] = [
  {
    id: "public",
    label: "Public infrastructure",
    icon: "Building2",
    bgSrc: "/g/pic-15.avif",
  },
  {
    id: "industrial",
    label: "Industrial facilities",
    icon: "Warehouse",
    bgSrc: "/g/pic-16.avif",
  },
  {
    id: "commercial",
    label: "Commercial builds",
    icon: "CheckCircle2",
    bgSrc: "/g/pic-17.jpg",
  },
  {
    id: "community",
    label: "Community developments",
    icon: "GraduationCap",
    bgSrc: "/g/pic-18.avif",
  },
  {
    id: "enabling",
    label: "Energy & logistics enabling works",
    icon: "HardHat",
    bgSrc: "/illustrations/gradient-1.avif",
  },
];

  // ✅ Aluminum categories (carousels for multi, split UI for single)
  const aluminumCategories: Array<{
    id: string;
    title: string;
    subtitle?: string;
    slides: AluminumSlide[];
  }> = [
    {
      id: "aluminum-windows",
      title: "Aluminum Windows",
      subtitle: "Awning, casement, sliding, pane, turn & tilt, triple, fixed.",
      slides: [
        {
          id: "awning-windows",
          eyebrow: "Windows",
          title: "Awning Windows",
          description: "Ventilation-friendly, rain-resistant top-hinged windows.",
          image: { src: "/alu/pic-2.jpg", alt: "Awning Windows by Thaboliz Construction" },
        },
        {
          id: "casement-windows",
          eyebrow: "Windows",
          title: "Aluminum Casement Windows",
          description: "Side-hinged windows with strong seals and clean frames.",
          image: { src: "/alu/pic-18.jpg", alt: "Aluminum Casement Windows by Thaboliz Construction" },
        },
        {
          id: "sliding-windows",
          eyebrow: "Windows",
          title: "Sliding Windows",
          description: "Space-saving openings with smooth track systems.",
          image: { src: "/alu/pic-13.jpg", alt: "Sliding Windows by Thaboliz Construction" },
        },
        {
          id: "pane-windows",
          eyebrow: "Windows",
          title: "Pane Windows",
          description: "Classic pane style with modern aluminum durability.",
          image: { src: "/alu/pic-16.jpg", alt: "Pane Windows by Thaboliz Construction" },
        },
        {
          id: "turn-tilt-windows",
          eyebrow: "Windows",
          title: "Turn and Tilt Windows",
          description: "Flexible opening modes for airflow, safety, and cleaning.",
          image: { src: "/alu/pic-15.jpg", alt: "Turn and Tilt Windows by Thaboliz Construction" },
        },
        {
          id: "triple-windows",
          eyebrow: "Windows",
          title: "Aluminium Triple Windows",
          description: "Multi-panel solutions for wider spans and larger openings.",
          image: { src: "/alu/pic-14.jpg", alt: "Aluminium Triple Windows by Thaboliz Construction" },
        },
        {
          id: "fixed-windows",
          eyebrow: "Windows",
          title: "Fixed Windows",
          description: "Maximum light, clean lines, strong structural stability.",
          image: { src: "/alu/pic-13.jpg", alt: "Fixed Windows by Thaboliz Construction" },
        },
      ],
    },
    {
      id: "aluminum-doors",
      title: "Aluminum Doors",
      subtitle: "Sliding, hinged, folding/stacking, pivot, stable.",
      slides: [
        {
          id: "sliding-doors",
          eyebrow: "Doors",
          title: "Sliding Doors",
          description: "Wide openings with smooth gliding and neat track finishing.",
          image: { src: "/alu/pic-13.webp", alt: "Sliding Doors by Thaboliz Construction" },
        },
        {
          id: "hinged-doors",
          eyebrow: "Doors",
          title: "Hinged Doors",
          description: "Strong everyday entries with consistent fitment and finish.",
          image: { src: "/alu/pic-12.webp", alt: "Hinged Doors by Thaboliz Construction" },
        },
        {
          id: "folding-stacking-doors",
          eyebrow: "Doors",
          title: "Folding / Stacking Doors",
          description: "Multi-leaf stacking configurations to open up full areas.",
          image: { src: "/alu/pic-11.webp", alt: "Folding / Stacking Doors by Thaboliz Construction" },
        },
        {
          id: "pivot-doors",
          eyebrow: "Doors",
          title: "Pivot Doors",
          description: "Statement entrances with premium proportions and smooth swing.",
          image: { src: "/alu/pic-10.jpg", alt: "Pivot Doors by Thaboliz Construction" },
        },
        {
          id: "stable-doors",
          eyebrow: "Doors",
          title: "Stable Doors",
          description: "Split opening for airflow and access control.",
          image: { src: "/alu/pic-9.jpg", alt: "Stable Doors by Thaboliz Construction" },
        },
      ],
    },
    {
      id: "louvres-shutters",
      title: "Louvre’s Windows & Shutters",
      subtitle: "Ventilation and shading control with a clean modern look.",
      slides: [
        {
          id: "louvre-windows",
          eyebrow: "Louvres",
          title: "Louvre Windows",
          description: "Adjustable blades for airflow control and privacy.",
          image: { src: "/alu/pic-19.jpg", alt: "Louvre Windows by Thaboliz Construction" },
        },
        {
          id: "window-shutters",
          eyebrow: "Shutters",
          title: "Louvre Doors",
          description: "Durable shutters for shading and protection.",
          image: { src: "/alu/pic-8.jpg", alt: "Window Shutters by Thaboliz Construction" },
        },
      ],
    },

    // ✅ SINGLE ITEM examples (these will render as alternating split blocks)
    {
      id: "aluminum-shades",
      title: "Aluminum Shades",
      subtitle: "Shade systems designed for function and outdoor exposure.",
      slides: [
        {
          id: "aluminum-shades-1",
          eyebrow: "Shades",
          title: "Aluminum Shades",
          description: "Shading solutions for patios, verandas, and outdoor comfort.",
          image: { src: "/alu/pic-7.jpg", alt: "Aluminum Shades by Thaboliz Construction" },
        },
      ],
    },
    {
      id: "gates-fences",
      title: "Aluminum Gates & Fences",
      subtitle: "Perimeter solutions aligned to security and clean installation.",
      slides: [
        {
          id: "gates-fences-1",
          eyebrow: "Perimeter",
          title: "Gates & Fences",
          description: "Secure boundaries with consistent detailing and neat finishing.",
          image: { src: "/alu/pic-6.jpg", alt: "Aluminum Gates & Fences by Thaboliz Construction" },
        },
      ],
    },
    {
      id: "aluminum-kitchens",
      title: "Aluminum Kitchens",
      subtitle: "Durable kitchen structures with modern lines and easy maintenance.",
      slides: [
        {
          id: "aluminum-kitchens-1",
          eyebrow: "Kitchens",
          title: "Aluminum Kitchens",
          description: "Clean cabinetry structures designed for durability and easy upkeep.",
          image: { src: "/alu/pic-3.jpeg", alt: "Aluminum Kitchens by Thaboliz Construction" },
        },
      ],
    },
    {
      id: "aluminum-ceilings",
      title: "Aluminum Ceilings",
      subtitle: "Ceiling solutions for commercial finish and consistent presentation.",
      slides: [
        {
          id: "aluminum-ceilings-1",
          eyebrow: "Ceilings",
          title: "Aluminum Ceilings",
          description: "Neat ceiling systems with durable, easy-maintenance materials.",
          image: { src: "/alu/pic-1.webp", alt: "Aluminum Ceilings by Thaboliz Construction" },
        },
      ],
    },
    {
      id: "roofing",
      title: "Aluminum Roofing",
      subtitle: "Installation and repair support aligned to safe execution and tidy finishing.",
      slides: [
        {
          id: "roofing-1",
          eyebrow: "Roofing",
          title: "Aluminium Roofing",
          description: "Roofing work focused on weather protection and long-term performance.",
          image: { src: "/alu/pic-5.jpg", alt: "Roofing by Thaboliz Construction" },
        },
      ],
    },
  ];



  const otherServices = [
  {
    title: "Tiling",
    desc: "Floor and wall tiling with clean alignment and consistent finish.",
    icon: <BrickWall className="h-4 w-4" />,
  },
  {
    title: "Paving",
    desc: "Driveways, walkways, and external paving works.",
    icon: <Hammer className="h-4 w-4" />,
  },
  {
    title: "Electrical wiring",
    desc: "Electrical wiring and fitment support (project dependent).",
    icon: <Wrench className="h-4 w-4" />,
  },
  {
    title: "Painting",
    desc: "Interior and exterior painting with proper surface prep practices.",
    icon: <PaintRoller className="h-4 w-4" />,
  },

  // ✅ Added services
  {
    title: "Foundation",
    desc: "Foundation setting-out, formwork, reinforcement placement, and concrete preparation (scope dependent).",
    icon: <LandPlot className="h-4 w-4" />,
  },
  {
    title: "General Roofing",
    desc: "Roof installation and repairs including sheeting, flashing, waterproofing checks, and roof detailing.",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Wood Works",
    desc: "Carpentry and timber works including doors, frames, skirting, and custom wood finishes.",
    icon: <SquareDashedBottom className="h-4 w-4" />,
  },
  {
    title: "Brick laying",
    desc: "Brickwork for walls, partitions, and structural elements with clean lines and consistent bonding.",
    icon: <BrickWall className="h-4 w-4" />,
  },
  {
    title: "Leveling",
    desc: "Surface leveling and screeding for floors and bases to ensure proper finishes and drainage fall.",
    icon: <Ruler className="h-4 w-4" />,
  },
];

  const sectors = [
    { icon: <Building2 className="h-4 w-4" />, label: "Public infrastructure" },
    { icon: <Warehouse className="h-4 w-4" />, label: "Industrial facilities" },
    { icon: <CheckCircle2 className="h-4 w-4" />, label: "Commercial builds" },
    { icon: <GraduationCap className="h-4 w-4" />, label: "Community developments" },
    { icon: <HardHat className="h-4 w-4" />, label: "Energy & logistics enabling works" },
  ];

 const delivery = [
  {
    icon: <ClipboardList className="h-4 w-4" />,
    title: "Feasibility and constructability",
    summary:
      "We clarify requirements early, coordinate design inputs, and confirm constructability so scope is measurable and execution is predictable.",
    img: "/stock/pic-12.jpg",
  },
  {
    icon: <BarChart3 className="h-4 w-4" />,
    title: "Project controls",
    summary:
      "We manage procurement, coordination, and milestones with disciplined tracking so cost, schedule, and dependencies stay visible.",
    img: "/stock/pic-13.avif",
  },
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    title: "Safety-led execution",
    summary:
      "We run a structured HSE approach with quality checks throughout delivery, enabling clean handovers and reduced rework.",
    img: "/stock/pic-14.jpg",
  },
];

  const ventures = [
    {
      title: "Rapid-turnaround refurbishment unit",
      desc: "Fast upgrades for schools, clinics, and offices with disciplined scope and quality checks.",
      badge: "Refurb & upgrades",
      icon: <Hospital className="h-4 w-4" />,
    },
    {
      title: "Industrial parks and warehousing shells",
      desc: "Small-to-mid shells and enabling infrastructure for logistics and light industrial growth.",
      badge: "Industrial & logistics",
      icon: <Warehouse className="h-4 w-4" />,
    },
    {
      title: "Water resilience projects",
      desc: "Leakage reduction, pump station upgrades, and borehole infrastructure (with required authorisations where applicable).",
      badge: "Water resilience",
      icon: <Droplets className="h-4 w-4" />,
    },
  ];

  return (
    <main className="site-bg">
      {/* HERO */}
      {/* HERO (Webflow-style: big type, no illustration slot) */}
<section className="relative overflow-hidden pt-16 sm:pt-20 h-[100vh]">
  {/* video background */}
  <div className="absolute inset-0 z-20">
    <video
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src="/videos/hero-bg-video.mp4" type="video/mp4" />
    </video>
  </div>

  {/* background atmosphere / overlays */}
  

  <div className="relative mx-auto max-w-6xl px-4 z-25">
    

    <div className="pb-16 pt-10 sm:pb-20 sm:pt-12">
      <Reveal>
        <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Quality.
          <br />
          — Built to last.
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white sm:text-base">
          We deliver construction with scope clarity, schedule integrity, quality assurance, and
          safety-led execution, built for long-term performance and cost-effective operation.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild className="h-11 rounded-none px-6">
            <Link href="/#contact">Contact Us</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-none border-white/15 bg-transparent px-6 text-white hover:bg-white/5"
          >
            <Link href="#what-we-do">Construction Services</Link>
          </Button>
        </div>
      </Reveal>
    </div>
  </div>

  <Separator className="bg-white/10" />
</section>

      {/* STICKY QUICK LINKS */}
      

      {/* OVERVIEW */}
      {/* ✅ OVERVIEW (split into 2 sections: Positioning + Vision, each with its own hero-style vibe) */}

{/* POSITIONING (uses 1st image vibe: big left title + right copy + CTA box) */}
<section id="overview" className="scroll-mt-32 py-14 sm:py-18">
  <div className="mx-auto max-w-6xl px-4">
      

    <div className="mt-10">
      <Reveal>
        <ConstructionCard className="p-7 sm:p-9">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left: big statement */}
            <div className="lg:col-span-7">
              <h3 className="text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl">
                Scope clarity
                <br />
                with disciplined
                <br />
                controls.
              </h3>
            </div>

            {/* Right: copy + button */}
            <div className="lg:col-span-5">
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                We deliver end-to-end construction services with disciplined controls: scope clarity,
                schedule integrity, quality assurance, and safety-led execution.
              </p>

              <div className="mt-6">
                <Button
                  asChild
                  variant="outline"
                  className="h-11 w-full rounded-none border-white/15 bg-transparent text-white hover:bg-white/5 sm:w-auto sm:px-8"
                >
                  <Link href="/#contact">Contact Us</Link>
                </Button>
              </div>

              
            </div>
          </div>
        </ConstructionCard>
      </Reveal>
    </div>
  </div>
</section>

{/* VISION (uses 2nd image vibe: bold headline + image card next to text) */}
<section id="vision" className="scroll-mt-32 py-14 sm:py-18 bg-white">
  <div className="mx-auto max-w-6xl px-4">
    

    <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-stretch">
      {/* Left: text block like the screenshot */}
      <Reveal className="lg:col-span-6">
        <ConstructionCard className="h-full p-7 sm:p-9">
          <h3 className="text-5xl font-bold leading-[0.95] tracking-tight text-black sm:text-6xl">
            Vision
            
          </h3>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-black sm:text-base">
            To build infrastructure that lasts, is safe to operate, and is cost-effective to maintain.
            We keep delivery visible through planning, governance, and quality checks from start to handover.
          </p>

          <div className="mt-8 h-px w-24 bg-white/10" />
        </ConstructionCard>
      </Reveal>

      {/* Right: image card (illustration) */}
      <Reveal delayMs={140} className="lg:col-span-6">
        <ConstructionCard className="h-full p-2 sm:p-2.5">
          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            <div className="relative aspect-[16/11] w-full">
              <Image
                src="/illustrations/construction-2.png"
                alt="Vision illustration by Thaboliz Construction"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </ConstructionCard>
      </Reveal>
    </div>
  </div>
</section>

{/* divider after overview */}
<div className="mx-auto max-w-6xl px-4">
  <Separator className="bg-white/10" />
</div>

      {/* WHAT WE DO */}
      

<Section id="what-we-do" title="Core Construction Services">
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {whatWeDo.map((x, i) => {
      const gradients = [
        "bg-[linear-gradient(135deg,rgba(37,99,235,.28),rgba(0,0,0,.92))]", // blue
        "bg-[linear-gradient(135deg,rgba(245,158,11,.22),rgba(0,0,0,.92))]", // amber
        "bg-[linear-gradient(135deg,rgba(34,197,94,.18),rgba(0,0,0,.92))]", // green
        "bg-[linear-gradient(135deg,rgba(168,85,247,.20),rgba(0,0,0,.92))]", // purple
      ];
      const textBg = gradients[i % gradients.length];

      return (
        <Reveal key={x.title} delayMs={i * 60}>
          <div
            className={[
              "group overflow-hidden border border-white/10 bg-black",
              "transition-transform duration-200 hover:-translate-y-[2px]",
              "hover:shadow-[0_0_0_1px_rgba(255,255,255,.12),0_22px_70px_rgba(0,0,0,.55)]",
              "min-h-[360px] sm:min-h-[420px]",
              // stack on mobile, split on larger screens
              "flex flex-col",
            ].join(" ")}
          >
            {/* TEXT PANEL (gradient backgrounds) */}
            <div className={["relative p-6", textBg].join(" ")}>
              {/* extra depth */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.22] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.18),transparent_55%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.14] bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:28px_28px]" />

              <div className="relative flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center border border-white/15 bg-black/30 text-white/90">
                  {x.icon}
                </span>

                <div className="min-w-0">
                  <div className="text-lg font-semibold leading-snug text-white">
                    {x.title}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-white/70">
                    {x.desc}
                  </div>
                </div>
              </div>

            </div>

            {/* IMAGE PANEL (NOT a background) */}
            <div className="relative bg-black h-100">
              <div className="relative h-full min-h-[170px] sm:min-h-[210px]">
                <Image
                  src={x.img}
                  alt={x.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  priority={i < 2}
                />
              </div>
            </div>

            {/* hover tint */}
          </div>
        </Reveal>
      );
    })}
  </div>
</Section>

      {/* ✅ ALUMINUM: carousels for multi, alternating split blocks for single */}
      <Section
        id="aluminum"
        title="Aluminum Products & Services"
      >
        {(() => {
          // Only alternate among single-item categories, so carousels in-between don't break the pattern.
          const singleIds = aluminumCategories
            .filter((c) => c.slides.length === 1)
            .map((c) => c.id);

          return (
            <div className="grid gap-6">
              {aluminumCategories.map((cat, i) => {
                const isSingle = cat.slides.length === 1;
                const flip = isSingle ? singleIds.indexOf(cat.id) % 2 === 1 : false;

                return (
                  <Reveal key={cat.id} delayMs={i * 70}>
                    {isSingle ? (
                      <AluminumSplitFeature
                        anchorId={cat.id}
                        title={cat.title}
                        lead={cat.subtitle ?? cat.slides[0]?.title}
                        body={cat.slides[0]?.description}
                        image={cat.slides[0].image}
                        flip={flip}
                      />
                    ) : (
                      <ConstructionCard className="p-6">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <div className="text-3xl font-semibold text-white">{cat.title}</div>
                            
                          </div>

                        </div>

                        <div id={cat.id} className="scroll-mt-32" />

                        <div className="mt-5">
                          <AluminumCategoryCarousel slides={cat.slides} autoPlayMs={6000} />
                        </div>
                      </ConstructionCard>
                    )}
                  </Reveal>
                );
              })}
            </div>
          );
        })()}
      </Section>





<Section
  id="catalog"
  title="Download the catalog"
>
  <Reveal>
    <ConstructionCard className="p-8 sm:p-10">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left: text */}
        <div className="lg:col-span-7">
          
          
          <p className="mt-3 max-w-2xl font-semibold text-lg leading-relaxed text-white sm:text-base">
            Download a shareable PDF version of our catalogue. Ideal for WhatsApp, email, printing,
            and client presentations.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="/catalogs/Thaboliz Construction Catalog.pdf"
              download
              className="inline-flex h-11 items-center justify-center rounded-none bg-white px-6 text-sm font-semibold text-black hover:bg-white/90 transition"
            >
              Download PDF
            </a>

            <a
              href="/catalogs/Thaboliz Construction Catalog.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-none border border-white/15 bg-transparent px-6 text-sm font-semibold text-white hover:bg-white/5 transition"
            >
              View in browser
            </a>
          </div>

          <div className="mt-4 text-md text-white font-semibold">
            If the download doesn’t start, use “View in browser” and save from your PDF viewer.
          </div>
        </div>

        
      </div>
    </ConstructionCard>
  </Reveal>
</Section>

      {/* OTHER SERVICES */}
      <Section
        id="other-services"
        title="Additional services"
        subtitle="Support services commonly requested alongside aluminum and construction work."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {otherServices.map((s, i) => (
            <Reveal key={s.title} delayMs={i * 60}>
              <ConstructionCard className="h-full p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/90">
                    {s.icon}
                  </span>
                  <div>
                    <div className="text-lg font-semibold text-white">{s.title}</div>
                    <div className="mt-1 text-lg leading-relaxed text-white">{s.desc}</div>
                  </div>
                </div>
              </ConstructionCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTORS */}


<section id="sectors" className="scroll-mt-32 py-14 sm:py-18">
  <div className="mx-auto max-w-6xl px-4">
    <Reveal>
      <SectorsCarousel
        title="Sectors we serve"
        slides={sectorSlides}
      />
    </Reveal>
  </div>
</section>



      {/* DELIVERY */}
      

<Section
  id="delivery"
  title="How we deliver"
>
  <div className="grid gap-8 lg:grid-cols-3">
    {delivery.map((d: any, i: number) => (
      <Reveal key={d.title} delayMs={i * 80}>
        <div
          className={[
            "group relative overflow-hidden",
            "bg-black",
            "transition-transform duration-200 lg:hover:-translate-y-[2px]",
            "lg:shadow-[0_30px_90px_rgba(0,0,0,0.55)]",
          ].join(" ")}
        >
          {/* Image top (crisp) */}
          <div className="relative h-[220px] w-full sm:h-[360px]">
            <Image
              src={d.img ?? `/illustrations/gradient-${(i % 4) + 1}.avif`}
              alt={d.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              priority={i === 0}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/65" />

            {/* tiny step chip like the reference */}
            
          </div>

          {/* Text body */}
          <div className="p-6">
            <h3 className="text-xl font-semibold leading-snug text-white sm:text-2xl">
              {d.title}
            </h3>

            {/* ✅ No bullet points, single paragraph summary */}
            <p className="mt-3 text-sm leading-relaxed text-white">
              {d.summary ??
                (Array.isArray(d.bullets)
                  ? d.bullets.join(" ")
                  : "Structured delivery practices that keep scope, schedule, and quality visible from start to handover.")}
            </p>
          </div>
        </div>
      </Reveal>
    ))}
  </div>
</Section>

      {/* COMPLIANCE */}
      <Section
        id="compliance"
        title="Assurance and compliance
"
        subtitle="We align delivery practices to best-practice requirements appropriate to client and project context."
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <ConstructionCard className="h-full p-6">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/90">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">Public-sector alignment</div>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    Where public-sector work applies, we align to the CIDB contractor grading environment and
                    best-practice requirements for contractor capability and track record.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Quality checks", "Documentation", "Milestones", "HSE file approach"].map((x) => (
                      <Badge key={x} variant="outline" className="rounded-none border-white/15 text-white/80">
                        {x}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </ConstructionCard>
          </Reveal>

          <Reveal delayMs={120}>
            <MediaSlot label="Compliance image" src="/illustrations/construction-3.png" />
          </Reveal>
        </div>
      </Section>

      {/* VENTURES */}
      <Section id="ventures" 
      title="Ventures we’re pursuing">
  <div className="grid gap-6 md:grid-cols-3">
    {ventures.map((v, i) => (
      <Reveal key={v.title} delayMs={i * 80}>
        <ConstructionCard className="h-full p-6">
          <div className="flex items-start gap-4">
            {/* ✅ Blue icon ring (like before) */}
            <span className="mt-0.5 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#2563eb] text-[#2563eb]">
              <span className="grid place-items-center [&_*]:h-6 [&_*]:w-6">
                {v.icon}
              </span>
            </span>

            <div className="min-w-0">
              <div className="text-lg font-semibold text-white">{v.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{v.desc}</p>

              
            </div>
          </div>
        </ConstructionCard>
      </Reveal>
    ))}
  </div>
</Section>

      {/* CTA */}
      

<section className="relative overflow-hidden py-20 sm:py-24">
  {/* subtle background wash */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-black" />
    <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.06] blur-3xl" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
  </div>

  <div className="relative mx-auto max-w-6xl px-4">
    <Reveal>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        {/* Big headline */}
        <div className="lg:col-span-8">
          <h3 className="text-4xl  ttext-white sm:text-5xl lg:text-6xl">
            Ready to get started?
          
          </h3>
        </div>

        {/* Actions + small note */}
        <div className="lg:col-span-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* square white button */}
            <Button
              asChild
              className="h-12 rounded-none bg-blue-500 px-8 text-white hover:text-black hover:bg-white/90"
            >
              <Link href="/#contact">Contact Us</Link>
            </Button>

           
          </div>
        </div>
      </div>
    </Reveal>
  </div>
</section>
    </main>
  );
}