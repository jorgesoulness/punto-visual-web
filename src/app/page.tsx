import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import GrowthProcess from "@/components/sections/GrowthProcess";
import HomeHeroSlider from "@/components/sliders/HomeHeroSlider";

export const metadata: Metadata = {
  title: "Creatividad, Growth Marketing & IA",
  description: "Conectamos branding, desarrollo web, marketing e inteligencia artificial para impulsar marcas y hacer crecer negocios reales.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <HomeHeroSlider />
      <GrowthProcess />
    </>
  );
}
