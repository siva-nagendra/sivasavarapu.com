import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://sivasavarapu.com",
      lastModified: new Date("2026-03-28T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 1,
      images: ["https://sivasavarapu.com/opengraph-image"],
    },
  ];
}
