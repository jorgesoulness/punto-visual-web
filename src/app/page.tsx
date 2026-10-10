import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import GrowthProcess from "@/components/sections/GrowthProcess";
import HomeHeroSlider from "@/components/sliders/HomeHeroSlider";
import { createPageMetadata, getAgencyStructuredData } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata = createPageMetadata({
  title: "Marketing digital y desarrollo web en Tijuana",
  description: siteConfig.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getAgencyStructuredData()).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Services />
      <HomeHeroSlider />
      <GrowthProcess />
    </>
  );
}
