import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, Mail, Sparkles } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { contactEmail, socialLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Comparte tu idea",
  description: "Cuéntanos tu proyecto: branding, web, growth marketing o IA. Conectemos tu idea con su siguiente etapa.",
};

export default function ContactPage() {
  return (
    <section id="contacto" tabIndex={-1} className="pv-contact relative isolate overflow-hidden">
      <div className="pv-contact-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-12 sm:pt-20">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 text-[10px] tracking-[.18em] text-white/45">
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" /> PUNTO VISUAL / CONECTEMOS</span>
          <span>DE UNA IDEA A LO QUE SIGUE</span>
        </div>
        <div className="grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <p className="mb-5 flex items-center gap-2 text-xs tracking-[.15em] text-primary"><Sparkles size={15} aria-hidden="true" /> LAS GRANDES COSAS EMPIEZAN ASÍ</p>
            <h1 className="max-w-lg text-[clamp(3.2rem,5.6vw,5.6rem)] font-normal leading-[1.02] text-white">Una idea.<br />Una conversación.<br /><span className="text-primary">Muchas posibilidades.</span></h1>
            <p className="mt-7 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">No importa si está en una servilleta, en tu cabeza o lista para despegar. Queremos escucharla y ayudarte a encontrar su siguiente paso.</p>
            <div className="pv-idea-note relative my-9 max-w-md overflow-hidden rounded-2xl border border-primary/20 p-6">
              <span className="mb-4 inline-flex rounded-full border border-primary/25 px-3 py-1 text-[9px] tracking-[.15em] text-primary">EL PUNTO DE PARTIDA</span>
              <p className="relative z-10 text-2xl leading-snug text-white">“¿Y si mi marca<br />pudiera ir más lejos?”</p>
              <p className="relative z-10 mt-3 max-w-[240px] text-xs leading-relaxed text-white/50">Creatividad, estrategia y tecnología para darle dirección a lo que imaginas.</p>
              <div className="pv-idea-orbit" aria-hidden="true"><span /></div>
            </div>
            <a href={`mailto:${contactEmail}`} className="group inline-flex max-w-full items-center gap-3 text-sm text-white transition hover:text-primary"><Mail size={17} className="shrink-0 text-primary" aria-hidden="true" /><span className="break-all">{contactEmail}</span><ArrowUpRight size={16} className="shrink-0 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" /></a>
            <p className="mb-4 mt-8 text-[10px] tracking-[.18em] text-white/40">TAMBIÉN NOS ENCONTRAMOS AQUÍ</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(social => {
                const Icon = social.platform === "instagram" ? Instagram : Facebook;
                const content = <><Icon size={18} aria-hidden="true" /><span>{social.label}</span>{social.href ? <ArrowUpRight size={14} aria-hidden="true" /> : <span className="text-[9px] text-white/35">Próximamente</span>}</>;
                return social.href ? <a key={social.platform} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} de Punto Visual (abre en otra pestaña)`} className="flex items-center gap-3 rounded-full border border-white/15 px-4 py-3 text-xs text-white transition hover:border-primary hover:text-primary">{content}</a> : <span key={social.platform} className="flex items-center gap-3 rounded-full border border-white/10 px-4 py-3 text-xs text-white/60">{content}</span>;
              })}
            </div>
            <Link href="/portafolio" className="mt-8 inline-flex items-center gap-2 text-xs text-white/50 transition hover:text-primary">Antes, una dosis de inspiración <ArrowUpRight size={14} aria-hidden="true" /></Link>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
