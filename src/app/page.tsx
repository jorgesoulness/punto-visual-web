import { Metadata } from "next";
import Preloader from "@/components/Preloader";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
// import SlidePortafolio from "@/components/sections/SlidePortafolio";
import HomeHeroSlider from "@/components/sliders/HomeHeroSlider";

export const metadata: Metadata = {
  title: "Diseño & Desarrollo Web Profesional",
  description: "Creamos sitios web modernos, rápidos y optimizados para convertir visitantes en clientes.",
};

export default function Home() {
  return (
    <>
      <Preloader />
      <Hero />
      <Services />
      <HomeHeroSlider />
    </>
  );
}
