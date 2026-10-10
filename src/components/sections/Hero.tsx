"use client";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import HeroParticles from "../HeroParticles";
import GrowthOrbit from "../hero/GrowthOrbit";
import { heroContent } from "@/data/site";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pv-hero relative isolate overflow-hidden">
      <HeroParticles />
      <div className="pv-hero-glow" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-6 pb-12 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-4 lg:py-20">
        <div className="pv-hero-copy max-w-2xl">
          <p className="mb-7 flex items-center gap-3 text-[10px] font-semibold tracking-[0.18em] text-primary sm:text-xs">
            <span className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_16px_#cfde00]" aria-hidden="true" />
            {heroContent.eyebrow}
          </p>
          <h1 id="hero-title" className="text-[clamp(2.7rem,5.5vw,5rem)] font-normal leading-[0.98] tracking-[-0.025em] text-white">
            {heroContent.title}<br /><span className="text-primary">{heroContent.highlight}</span>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-foreground/80 sm:text-lg">{heroContent.description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/contacto" className="pv-cta group inline-flex items-center justify-center gap-4 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-black transition hover:bg-[#e6f542]">
              Cuéntanos tu proyecto <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link href="/portafolio" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-4 text-sm text-white transition hover:border-primary hover:text-primary">
              Ver proyectos de diseño web <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-foreground/70" aria-label="Nuestras especialidades">
            {heroContent.capabilities.map((item) => <li key={item} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary/70" aria-hidden="true" />{item}</li>)}
          </ul>
        </div>
        <GrowthOrbit />
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 lg:col-span-2">
          <p className="flex items-center gap-2 text-xs text-foreground/60"><Sparkles size={15} className="text-primary" aria-hidden="true" /> Creatividad + tecnología + dirección</p>
          <Link href="#servicios" className="flex items-center gap-2 text-xs text-white/80 transition hover:text-primary">Descubre lo que podemos crear <ArrowDown size={15} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
