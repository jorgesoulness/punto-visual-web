import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://punto-visual.mx";

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/portafolio/${project.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/portafolio`, lastModified: new Date() },
    ...projectUrls,
  ];
}