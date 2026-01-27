import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import ThabolizLogo from "../brand/ThabolizLogo";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-widest text-white/55">
      {children}
    </div>
  );
}

function FooterLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={[
        "group inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition",
        className,
      ].join(" ")}
    >
      <span className="truncate">{children}</span>
      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
    </Link>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={[
        "group inline-flex h-10 w-10 items-center justify-center rounded-none",
        "border border-white/10 bg-white/[0.03] text-white/70",
        "hover:bg-white/[0.06] hover:text-white transition",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();

  const divisions = [
    { label: "Construction", href: "/divisions/construction" },
    { label: "Technologies", href: "/divisions/technologies" },
    { label: "Mining", href: "/divisions/mining" },
    { label: "Logistics", href: "/divisions/logistics" },
    { label: "Organic farms", href: "/divisions/organic-farms" },
    { label: "Oil & gas", href: "/divisions/oil-and-gas" },
    { label: "Green energy", href: "/divisions/green-energy" },
    { label: "Research & innovation", href: "/divisions/research" },
    { label: "Tenders", href: "/divisions/tenders" },
  ];

  const companyLinks = [
    { label: "About us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Divisions", href: "/divisions" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      {/* subtle background texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_15%_20%,rgba(255,255,255,0.06),transparent_60%),radial-gradient(700px_320px_at_85%_30%,rgba(255,0,80,0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-14">
        {/* Top grid */}
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand / summary */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <ThabolizLogo />
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-white/65">
              We deliver across essential industries, combining on-the-ground execution
              with modern systems to build solutions that last.
            </p>

            
          </div>

          {/* Divisions */}
          <div className="md:col-span-5">
            <FooterHeading>Divisions</FooterHeading>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {divisions.map((d) => (
                <FooterLink key={d.href} href={d.href}>
                  {d.label}
                </FooterLink>
              ))}
            </div>
          </div>

          {/* Company / Contact */}
          <div className="md:col-span-3">
            <FooterHeading>Company</FooterHeading>
            <div className="mt-4 space-y-2">
              {companyLinks.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </div>

            <div className="mt-8">
              <FooterHeading>Contact</FooterHeading>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-white/55" />
                  <span>info@thabolizservices.co.za</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-white/55" />
                  <span>+27 00 000 0000</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-white/55" />
                  <span>South Africa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/10" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-white/55">
            © {year} Thaboliz Enterprise. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/terms" className="hover:text-white transition">
              Terms of service
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/cookies" className="hover:text-white transition">
              Cookies settings
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <SocialIcon href="#" label="Facebook">
              <Facebook className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href="#" label="Instagram">
              <Instagram className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href="#" label="X">
              <Twitter className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href="#" label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href="#" label="YouTube">
              <Youtube className="h-4 w-4" />
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}
