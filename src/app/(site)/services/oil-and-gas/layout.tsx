import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Oil & Gas | Thaboliz",
  description: "Thabolize Oil & Gas: fuel security, ESG, and gas-led growth from Sandton.",
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* local subnav */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/services/oil-and-gas" className="text-sm font-semibold tracking-wide">
            Oil & Gas
          </Link>

          <Link
            href="/contact"
            className="text-xs font-semibold px-3 py-2 rounded-full border border-white/15 hover:border-white/30 transition"
          >
            Contact
          </Link>
        </div>
      </div>

      {children}
    </div>
  );
}