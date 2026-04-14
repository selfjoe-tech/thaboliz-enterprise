// lib/fonts.ts
import { Inter, Open_Sans } from "next/font/google";

// Inter for body text
export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",    // exposes CSS variable
  // you can add `style: ['normal', 'italic']` if needed
});

// Open Sans for UI / headings (or swap roles as you prefer)
export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  variable: "--font-open-sans",
});
