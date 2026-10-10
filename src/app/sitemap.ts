import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Añadir lastModified solo cuando se disponga de fechas reales de edición.
  const paths = ["/", "/portafolio", "/contacto", ...projects.map((project) => `/portafolio/${project.slug}`)];
  return paths.map((path) => ({ url: new URL(path, siteConfig.url).href }));
}
