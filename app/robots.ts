import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://sivasavarapu.com/sitemap.xml",
    host: "https://sivasavarapu.com",
  };
}
