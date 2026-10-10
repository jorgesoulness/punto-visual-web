import type { Metadata } from "next";
import { contactEmail, siteConfig, socialLinks } from "@/data/site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function createPageMetadata({ title, description, path, image = "/og.jpg" }: PageSeo): Metadata {
  const url = new URL(path, siteConfig.url).href;
  const fullTitle = `${title} | ${siteConfig.name}`;
  const images = [{ url: new URL(image, siteConfig.url).href, alt: fullTitle }];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_MX",
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url,
      images,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images },
  };
}

export function getAgencyStructuredData() {
  const profiles = socialLinks
    .map((social) => social.href)
    .filter((href) => /^https?:\/\//.test(href));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/puntoVisual_logo.png`,
        description: siteConfig.description,
        email: contactEmail,
        areaServed: siteConfig.serviceAreas,
        ...(profiles.length ? { sameAs: profiles } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: "es-MX",
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };
}
