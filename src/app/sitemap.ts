import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services",
    ...services.map((s) => `/services/${s.slug}`),
    "/solutions",
    ...solutions.map((s) => `/solutions/${s.slug}`),
    "/work",
    "/about",
    "/contact",
    "/legal/privacy",
    "/legal/cookies",
  ];
  return paths.map((p) => ({
    url: new URL(p, site.url).toString(),
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : p.startsWith("/legal") ? 0.2 : 0.7,
  }));
}
