"use client";

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

const workCards = [
  {
    title: "Discovery to delivery",
    desc: "We shape execution from requirements, feasibility, cost, schedule, and risk into a clearer scope with measurable outcomes and fewer surprises later in delivery.",
    image: "/stock/about/pic-11.jpg",
    width: 1200,
    height: 1600,
  },
  {
    title: "Safety and quality first",
    desc: "Structured HSE planning, regulatory awareness, and quality checks stay active throughout delivery, especially in construction and mining environments.",
    image: "/stock/about/pic-9.jpg",
    width: 1200,
    height: 700,
  },
  {
    title: "Governance",
    desc: "Transparent reporting, milestone-based progress, and auditable decisions keep delivery visible and easier to manage across teams and stakeholders.",
    image: "/stock/about/pic-12.jpg",
    width: 1200,
    height: 900,
  },
  
  {
    title: "Local impact",
    desc: "Training, subcontractor development, procurement discipline, and sustainable local participation are built into how we operate where we work.",
    image: "/stock/about/pic-10.avif",
    width: 1200,
    height: 1500,
  },
];

export default function HowWeWorkMasonry() {
  return (
    <section
      id="how-we-work"
        className="relative overflow-hidden border-y border-black/10 bg-gradient-to-b from-[#f8f8f6] via-[#ececea] to-[#d9d9d4] py-16 sm:py-20 lg:py-24"
    >

        <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.95),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.55),transparent_28%),radial-gradient(circle_at_50%_80%,rgba(180,180,180,0.18),transparent_34%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_38%,rgba(120,120,120,0.06)_100%)]" />
  </div>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Heading row */}
        <div className="grid gap-8 lg:grid-cols-[minmax(320px,0.95fr)_minmax(320px,0.9fr)] lg:items-start lg:gap-16">
          <Reveal>
            <h2 className="max-w-[9ch] text-4xl font-semibold leading-[0.92] tracking-tight text-black sm:text-5xl lg:text-6xl">
                Our Process
            </h2>
          </Reveal>

          <Reveal delayMs={80}>
            <p className="max-w-2xl text-base leading-relaxed text-black/90 sm:text-lg">
              We keep execution visible through governance, HSE planning, and
              quality checks throughout. The process is designed to stay clear,
              accountable, and practical from early planning through live
              operations.
            </p>
          </Reveal>
        </div>

        {/* Masonry cards */}
        <div className="mt-12 columns-1 gap-6 lg:columns-2 [column-fill:_balance]">
  {workCards.map((card, idx) => (
    <div key={card.title} className="mb-6 break-inside-avoid">
      <Reveal delayMs={idx * 70}>
        <article className="group relative overflow-hidden rounded-xl bg-white/5">
          {/* Image now determines height */}
          <div className="relative">
            <Image
              src={card.image}
              alt={card.title}
              width={card.width}
              height={card.height}
              className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.28)_24%,rgba(0,0,0,0.62)_100%)]" />


            {/* Content overlay */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-8">
              <div className="max-w-[28rem]">
                <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                  {card.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-white sm:text-base">
                  {card.desc}
                </p>
              </div>

              
            </div>
          </div>
        </article>
      </Reveal>
    </div>
  ))}
</div>
      </div>
    </section>
  );
}