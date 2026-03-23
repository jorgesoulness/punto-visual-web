"use client";
import { useRef } from "react";
import Button from "../ui/Button";
import SlideUp from "../motion/SlideUp";
import FadeIn from "../motion/FadeIn";
import HeroParticles from "../HeroParticles";
import HeroLogoBuild from "../hero/HeroLogoBuild";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null!);
  const logoContainerRef = useRef<HTMLDivElement>(null!);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ height: "200vh" }} // Altura extendida para permitir scroll
    >
      <HeroParticles />
      
      {/* Contenedor sticky que se mantiene fijo mientras haces scroll */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto p-0 grid gap-12 md:grid-cols-2 items-center relative z-10 w-full px-6">
          
          {/* Columna izquierda - Texto (estático) */}
          <div className="space-y-6">
            <div className="px-6 py-12 space-y-14 max-w-7xl mx-auto">
              <span className="inline-block text-sm tracking-widest text-primary">
                AGENCIA CREATIVA
              </span>
              <SlideUp>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight uppercase">
                  Diseño y desarrollo web que <span className="text-primary">convierte</span>
                </h1>
              </SlideUp>
              <FadeIn delay={0.15}>
                <p className="text-lg text-foreground/80 max-w-xl">
                  Creamos marcas, sitios web y experiencias digitales pensadas para hacer crecer negocios reales.
                </p>
              </FadeIn>
            </div>
            <div className="flex gap-4 pt-2">
              <Button href="/contacto">
                Cotiza tu proyecto
              </Button>
              <Button href="/portafolio" variant="ghost">
                Ver portafolio
              </Button>
            </div>
          </div>

          {/* Columna derecha - El div que contiene la animación */}
          <div className="hidden md:block relative">
            <div 
              ref={logoContainerRef}
              className="h-[500px] w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur flex items-center justify-center relative"
            >
              {/* Pasamos ambos refs: el del hero (para el scroll) y el del contenedor (para la posición) */}
              <HeroLogoBuild 
                heroRef={heroRef} 
                containerRef={logoContainerRef}
              />
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="tech-grid"></div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}