import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // disallow: ["/admin", "/private"], // add these later only if needed
    },
    sitemap: "https://thaboliz.co.za/sitemap.xml",
  };
}