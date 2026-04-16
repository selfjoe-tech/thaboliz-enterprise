import SiteHeader from "@/components/sections/SiteHeader";
import "../globals.css";
import TopLoader from "@/components/TopLoader";
import { Suspense } from "react";
import SiteFooter from "@/components/sections/SiteFooter";

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <div className="min-h-screen w-full bg-background text-foreground">
        

        <SiteHeader />

        <div className="fixed -z-10 site-bg" />
        <div className="fixed -z-10 pointer-events-none bg-gradient-to-b from-black/0 via-black/35 to-black/85" />

        {children}

        <SiteFooter />
        {/* <FloatingWhatsAppButton /> */}
      </div>
  
  );
}

