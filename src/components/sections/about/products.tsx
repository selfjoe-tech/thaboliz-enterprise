"use client";

import * as React from "react";
import Reveal from "@/components/motion/Reveal";
import { AluminumSplitFeature, ConstructionCard } from "@/app/(site)/services/construction/ConstructionServicePage";
import AluminumCategoryCarousel, {
  type AluminumSlide,
} from "@/components/aluminum/AluminumCategoryCarousel";
import { Building2, Hospital, Leaf, Package, Snowflake, Store } from "lucide-react";
// import AluminumSplitFeature from wherever it lives

type ProductCategory = {
  id: string;
  title: string;
  subtitle?: string;
  slides: AluminumSlide[];
};


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


const coldRoomVentures = [
  {
    title: "Modular Commercial Cold Rooms",
    desc: "Flexible cold room solutions for hospitality, retail, food service, and commercial operations that need dependable refrigerated storage.",
    image: "/enterprise/pic-12.jpg",
    icon: <Store className="h-5 w-5" />,
  },
  {
    title: "Walk-In Freezer Rooms",
    desc: "Heavy-duty freezer room solutions for frozen stock, back-of-house operations, and high-volume storage requirements.",
    image: "/enterprise/pic-13.jpg",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Produce and Agricultural Cold Storage",
    desc: "Temperature-controlled cold storage suited to fresh produce, agricultural goods, and perishable stock.",
    image: "/enterprise/pic-14.jpg",
    icon: <Leaf className="h-5 w-5" />,
  },
  {
    title: "Retail and Hospitality Cold Rooms",
    desc: "Cold storage solutions for restaurants, hotels, supermarkets, and service environments that need organised refrigeration.",
    image: "/enterprise/pic-15.jpg",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Pharmaceutical and Specialised Storage Rooms",
    desc: "Controlled refrigeration environments for healthcare and specialised applications where temperature-sensitive products require dependable handling.",
    image: "/enterprise/pic-16.jpg",
    icon: <Hospital className="h-5 w-5" />,
  },
  {
    title: "Custom Cold Room Configurations",
    desc: "Cold room layouts configured around size, access, storage volume, and intended operational use.",
    image: "/enterprise/pic-18.jpg",
    icon: <Snowflake className="h-5 w-5" />,
  },
];


const aboutProductCategories: ProductCategory[] = [
  ...aluminumCategories,
  {
    id: "cold-room-solutions",
    title: "Cold Room Solutions",
    subtitle:
      "Commercial, freezer, agricultural, retail, pharmaceutical, and custom cold rooms.",
    slides: coldRoomVentures.map((item, index) => ({
      id: `cold-room-${index + 1}`,
      title: item.title,
      description: item.desc,
      image: {
        src: item.image,
        alt: item.title,
      },
    })),
  },

  {
  id: "ppe-hygiene",
  title: "PPE",
  subtitle:
    "Protective wear, workplace safety gear, and hygiene products for staff, site teams, and operational environments.",
  slides: [
    {
      id: "ppe-gloves-masks",
      title: "Gloves, Masks and Specticles",
      description:
        "Supply of gloves, masks, overalls, aprons, and other personal protective wear for workplace and site use.",
      image: {
        src: "/product/ppe.webp",
        alt: "PPE gloves masks and protective wear",
      },
    },
    
  ],
},
{
  id: "ice-products",
  title: "Ice Products",
  subtitle:
    "Bagged ice, bulk ice supply, retail, hospitality, and commercial use.",
  slides: [
    {
      id: "bagged-ice",
      title: "Bagged Ice Supply",
      description:
        "Convenient packaged ice supply for retail, events, hospitality, and everyday commercial demand.",
      image: {
        src: "/product/ice.webp",
        alt: "Bagged ice supply",
      },
    },
    
  ],
},




];

const supplyItems = [
  {
    title: "General Procurement",
    description:
      "Broad sourcing support for operational, administrative, and business supply requirements.",
  },
  {
    title: "Technical Supplies",
    description:
      "Equipment, components, and technical products aligned with project and site needs.",
  },
  {
    title: "Specialised Equipment",
    description:
      "Supply coordination for more specialised equipment and business-critical requirements.",
  },
  {
    title: "Cold Room Solutions",
    description:
      "Cold room and refrigeration-related supply for commercial, agricultural, and specialised use.",
  },
];




export default function AboutProductsSection() {
  const [activeTab, setActiveTab] = React.useState(aboutProductCategories[0]?.id ?? "");

  const activeCategory =
    aboutProductCategories.find((cat) => cat.id === activeTab) ??
    aboutProductCategories[0];

  if (!activeCategory) return null;

  const isSingle = activeCategory.slides.length === 1;

  return (
    <section id="products" className="scroll-mt-32 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Products we supply
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
              Explore our product categories across aluminum solutions, shop fitting,
              office supplies, PPE and hygiene, and cold room supply.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {aboutProductCategories.map((cat) => {
              const isActive = cat.id === activeTab;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? "border-[#2563eb] bg-[#2563eb] text-white"
                      : "border-white/10 bg-white/[0.04] text-white/80 hover:bg-white/[0.08] hover:text-white",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-20">
          <Reveal key={activeCategory.id}>
            {isSingle ? (
              <AluminumSplitFeature
                anchorId={activeCategory.id}
                title={activeCategory.title}
                lead={activeCategory.subtitle ?? activeCategory.slides[0]?.title}
                body={activeCategory.slides[0]?.description}
                image={activeCategory.slides[0].image}
              />
            ) : (
              <ConstructionCard className="p-6 sm:p-7 lg:p-8">
                <div id={activeCategory.id} className="scroll-mt-32" />

                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-3xl">
                    <h3 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                      {activeCategory.title}
                    </h3>

                    {activeCategory.subtitle ? (
                      <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                        {activeCategory.subtitle}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-6">
                  <AluminumCategoryCarousel
                    slides={activeCategory.slides}
                    autoPlayMs={6000}
                  />
                </div>
              </ConstructionCard>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}