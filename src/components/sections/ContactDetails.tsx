import Link from "next/link";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactDetails() {
  return (
    <section className="py-16" id="contact" >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 rounded-none border border-white/10 bg-white/[0.02] p-6 md:grid-cols-2 md:p-10">
          {/* Left: statement */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Contact
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-white">
              <span className="gradient-text">Scale in minutes</span>, not months.
            </h2>

            <p className="text-sm leading-relaxed text-white/65 max-w-prose">
              Whether you’re planning infrastructure, upgrading systems, moving goods, or launching
              an energy initiative, we respond fast and execute with accountability.
            </p>

            
          </div>

          {/* Right: contact cards */}
          <div className="grid gap-4">
            <div className="rounded-none border border-white/10 bg-black/40 p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-none border border-white/10 bg-white/[0.03] p-2">
                  <Mail className="h-4 w-4 text-white/80" />
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-medium text-white">Email us</div>
                  <p className="mt-1 text-sm text-white/60">
                    For proposals, partnerships, and enquiries.
                  </p>
                  <Link
                    href="mailto:info@thaboliz.co.za"
                    className="mt-3 inline-block text-sm text-white underline underline-offset-4 hover:text-primary transition"
                  >
                    info@thaboliz.co.za
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-none border border-white/10 bg-black/40 p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-none border border-white/10 bg-white/[0.03] p-2">
                  <Phone className="h-4 w-4 text-white/80" />
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-medium text-white">Call us</div>
                  <p className="mt-1 text-sm text-white/60">
                    Speak to a team member for urgent requests.
                  </p>
                  <Link
                    href="tel:+27100000000"
                    className="mt-3 inline-block text-sm text-white underline underline-offset-4 hover:text-primary transition"
                  >
                    +27 10 000 0000
                  </Link>
                </div>
              </div>
            </div>

            <p className="text-xs text-white/45">
              Typical response time: within 24 hours on business days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
