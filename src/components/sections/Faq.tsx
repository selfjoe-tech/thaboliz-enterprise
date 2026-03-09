"use client";

import Reveal from "@/components/motion/Reveal";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What does Thaboliz do?",
    a: "Thaboliz Enterprise is a holding company with specialized divisions across construction, technology, farming, mining, logistics, energy, research, tenders, and community empowerment.",
  },
  {
    q: "Do you work with public sector?",
    a: "Yes. We serve both public and private sector clients with a strong focus on compliance, safety, and delivery quality.",
  },
  {
    q: "What makes your approach different?",
    a: "Disciplined execution, clear communication, and a structure that allows specialist divisions to work together as one unit when needed.",
  },
  {
    q: "How do you handle sustainability?",
    a: "Organic farming avoids GMOs and chemical fertilisers. Green energy and responsible operations are built into how we plan and deliver.",
  },
];

export default function Faq() {
  return (
    <section className="bg-black py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(260px,0.9fr)_minmax(0,1.35fr)] lg:gap-20">
          {/* Left title */}
          <Reveal>
            <div className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="max-w-[5ch] text-5xl font-semibold leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Frequently asked questions
              </h2>
            </div>
          </Reveal>

          {/* Right accordion */}
          <Reveal delayMs={80}>
            <div>
              <Accordion type="single" collapsible className="border-t border-white/10">
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-b border-white/10"
                  >
                    <AccordionTrigger className="group py-7 text-left hover:no-underline [&>svg]:hidden sm:py-8">
                      <div className="flex w-full items-start justify-between gap-6">
                        <span className="max-w-4xl pr-4 text-xl font-semibold leading-snug text-white sm:text-2xl lg:text-[2rem] lg:leading-[1.15]">
                          {f.q}
                        </span>

                        <span className="mt-1 shrink-0 text-[#2563eb] transition-transform duration-300 group-data-[state=open]:rotate-45">
                          <Plus className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.8} />
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pb-7 pr-12 text-base leading-relaxed text-white/70 sm:pb-8 sm:text-lg">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}