import SiteHeader from "@/components/sections/SiteHeader";
import "./globals.css";
import TopLoader from "@/components/TopLoader";
import { Suspense } from "react";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <Suspense >
                  <TopLoader />
        </Suspense>
              <SiteHeader />

        {/* Site-wide gradient backdrop */}
        <div className="fixed inset-0 -z-10 site-bg" />
        {/* Optional vignette for depth */}
        <div className="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-b from-black/0 via-black/35 to-black/85" />
        {children}
      </body>
    </html>
  );
}
