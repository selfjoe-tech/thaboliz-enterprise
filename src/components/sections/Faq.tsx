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
    <section className="py-16">
      <div className="text-center">
        <Reveal>
          <h2 className="text-3xl font-semibold text-white">FAQ</h2>
          <p className="mt-2 text-sm text-white/60">
            The quick answers. The longer story is in the work.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-white/10 rounded-none px-4 bg-black"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex w-full items-start justify-between gap-4">
                  <div className="text-left text-sm font-semibold text-white">{f.q}</div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-4 text-sm text-white/70 leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
