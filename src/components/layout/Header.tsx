"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/site";
import SectionLink from "../navigation/SectionLink";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);
  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-white/10 bg-background/90 backdrop-blur-xl" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <div data-header-bar className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
        <SectionLink href="/" aria-label="Punto Visual, inicio" onClick={() => setOpen(false)}><Image src="/puntoVisual_logo_white_v2.png" alt="Punto Visual" width={110} height={70} className="h-auto w-24" priority /></SectionLink>
        <nav aria-label="Navegación principal" className="hidden items-center gap-7 text-sm lg:flex">
          {navigation.map((item) => <SectionLink key={item.href} href={item.href} aria-current={pathname !== "/" && pathname === item.href.split("#")[0] ? "page" : undefined} className="text-foreground/80 transition hover:text-primary aria-[current=page]:text-primary">{item.label}</SectionLink>)}
        </nav>
        <SectionLink href="/contacto#contacto" className="hidden items-center gap-3 rounded-full border border-primary/40 px-5 py-3 text-sm text-primary transition hover:bg-primary hover:text-black lg:inline-flex">Hablemos de growth <ArrowUpRight size={16} aria-hidden="true" /></SectionLink>
        <button ref={toggleRef} type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => setOpen(!open)} className="rounded-xl border border-white/20 p-3 text-white lg:hidden">{open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}</button>
      </div>
      <nav id="mobile-navigation" aria-label="Navegación móvil" hidden={!open} className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 px-6 pb-6 lg:hidden">
        {navigation.map((item) => <SectionLink key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={pathname !== "/" && pathname === item.href.split("#")[0] ? "page" : undefined} className="block border-b border-white/10 py-4 text-lg text-white transition hover:text-primary">{item.label}</SectionLink>)}
        <SectionLink href="/contacto#contacto" onClick={() => setOpen(false)} className="mt-5 flex items-center justify-between rounded-xl bg-primary px-5 py-4 text-sm font-semibold text-black">Hablemos de tu proyecto <ArrowUpRight size={18} aria-hidden="true" /></SectionLink>
      </nav>
    </header>
  );
}
