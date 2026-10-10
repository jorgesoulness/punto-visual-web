"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SectionScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Solo la barra fija: el menú desplegado no forma parte del offset.
    const bar = document.querySelector<HTMLElement>("[data-header-bar]");
    const measure = () => {
      if (bar) document.documentElement.style.setProperty("--header-height", `${bar.getBoundingClientRect().height}px`);
    };
    measure();
    const resize = new ResizeObserver(measure);
    if (bar) resize.observe(bar);
    return () => resize.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let observer: MutationObserver | undefined;
    function cancel() {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      clearTimeout(timeout);
    }
    function align() {
      cancel();
      if (!window.location.hash) return;
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      function findSection() {
        const target = document.getElementById(id);
        if (!target) return false;
        observer?.disconnect();
        clearTimeout(timeout);
        // Espera a que el menú móvil cierre y el layout tenga su altura final.
        frame = requestAnimationFrame(() => {
          target.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
          target.focus({ preventScroll: true });
        });
        return true;
      }
      if (!findSection()) {
        observer = new MutationObserver(findSection);
        observer.observe(document.body, { childList: true, subtree: true });
        timeout = setTimeout(() => observer?.disconnect(), 5000);
      }
    }
    align();
    window.addEventListener("pv:section-navigation", align);
    window.addEventListener("hashchange", align);
    return () => {
      cancel();
      window.removeEventListener("pv:section-navigation", align);
      window.removeEventListener("hashchange", align);
    };
  }, [pathname]);

  return null;
}
