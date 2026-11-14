import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/legal/privacy", "/legal/cookies"].map((p) => ({
    url: new URL(p, site.url).toString(),
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : 0.2,
  }));
}
