"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroLogoBuildProps {
  heroRef: React.RefObject<HTMLElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function HeroLogoBuild({ heroRef, containerRef }: HeroLogoBuildProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    if (!heroRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>("#pv-logo path, #pv-logo polygon");
      
      // Setup inicial: ocultar paths
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 1
        });
      });

      // Ocultar glow inicialmente
      gsap.set("#pv-glow", { opacity: 0, scale: 0.95 });

      // Crear el timeline vinculado al scroll del HERO (que tiene height: 200vh)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=1500",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          markers: true,
        }
      });

      // Animación de dibujado: ocurre entre 0% y 70% del scroll
      tl.to(paths, {
        strokeDashoffset: 0,
        stagger: 0.02,
        ease: "none",
        duration: 0.7 // Relativo al timeline total
      }, 0);

      // Animación del glow: ocurre entre 60% y 100%
      tl.to("#pv-glow", {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      }, 0.6);

    }, containerRef);

    return () => ctx.revert();
  }, [heroRef, containerRef]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        ref={svgRef}
        id="pv-logo"
        viewBox="0 0 960 323.7"
        className="w-[80%]"
        suppressHydrationWarning
      >
        <filter id="pv-glow-filter">
          <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <g
          id="pv-glow"
          filter="url(#pv-glow-filter)"
          stroke="var(--pv-primary)"
          fill="none"
          strokeWidth="2"
        >
          <polygon fill="none" stroke="currentColor" points="547.4,317.5 529.3,271.6 525.7,271.6 546.1,323.1 547.2,323.1 547.4,323.7 547.6,323.1 548.8,323.1 569.2,271.6 565.6,271.6"/>
          <polygon fill="none" stroke="currentColor" points="607.3,274.8 617.6,274.8 617.6,319.1 607.3,319.1 607.3,322.4 631.3,322.4 631.3,319.1 620.9,319.1 620.9,274.8 631.3,274.8 631.3,271.6 607.3,271.6"/>
          <path fill="none" stroke="currentColor" d="M689.8,295.2c-7.6-0.7-14.2-1.4-14.7-9.2c-0.2-2.6,0.4-4.8,1.9-6.7c2.8-3.7,8-5.1,11.8-5.1h0.3c4.5,0,8.6,1.5,11,4.1c1.2,1.3,2,2.9,2.4,4.7l0.2,1.8l3.3-0.6l-0.2-1.7c-1.5-8-9.4-11.5-16.6-11.5c-6.2,0-11.8,2.4-14.9,6.5c-2,2.6-2.8,5.7-2.5,8.9c0.7,10.6,9.7,11.5,17.6,12.3c7,0.7,13,1.3,14.3,7.3c0.7,3.2,0,6.1-1.9,8.5c-2.7,3.3-7.5,5.3-12.6,5.3c-6.5,0-13.7-3.5-14.4-10l-0.2-1.6l-3.3,0.4l0.2,1.6c0.9,8.4,9.8,12.9,17.7,12.9c6.2,0,12.1-2.5,15.4-6.6c2.5-3.1,3.4-7,2.5-11.1 C705.1,296.7,697,295.9,689.8,295.2"/>
          <path fill="none" stroke="currentColor" d="M782.9,308c0,7.5-7.6,11.5-14.8,11.5s-14.8-4-14.8-11.4v-36.6H750V308c0,9.7,9.4,14.9,18.2,14.9c8.8,0,18.1-5.2,18.1-14.8v-36.6h-3.4V308z"/>
          <path fill="none" stroke="currentColor" d="M847.2,270.8l-0.2-0.5l-0.2,0.5h-1.1l-20.4,51.6h3.6l6.6-16.3h23.1l6.7,16.3h3.6l-20.4-51.6H847.2zM836.8,302.7l10.2-26.2l10.2,26.2H836.8z"/>
          <polygon fill="none" stroke="currentColor" points="907.4,319 907.4,271.5 904,271.5 904,322.4 933.5,322.4 933.5,319 "/>
          <path fill="none" stroke="currentColor" d="M85.7,3.4c50.6,0,76.1,39.2,76.1,78.4s-25.5,78.1-76.1,78.1H34.1V238H-0.1V3.4H85.7z M85.7,126.4c28.5,0,42.6-22.1,42.6-44.2c0-22.4-14.1-44.6-42.6-44.6H34.1v88.8H85.7z"/>
          <path fill="none" stroke="currentColor" d="M177.9,167.6V3.7H212v164.2c0,25.8,27.8,38.5,52.6,38.5c24.5,0,52.3-13.1,52.3-38.9V3.7h34.2v164.2c0,47.6-46.2,72.4-86.5,72.4C223.4,240.3,177.9,215.5,177.9,167.6"/>
          <polygon fill="none" stroke="currentColor" points="374.6,238 374.6,3.1 400.7,3.4 515,168.6 515,3.4 548.5,3.4 548.5,238 521.7,238 408.4,74.1 408.4,238 "/>
          <polygon fill="none" stroke="currentColor" points="630.6,239 630.6,37.6 559.5,37.6 559.5,3.4 735.1,3.4 735.1,37.6 664.4,37.6 664.4,239 "/>
          <path fill="none" stroke="currentColor" d="M880.1,119.7c0,22.4-18.2,40.6-40.6,40.6c-22.4,0-40.6-18.2-40.6-40.6c0-22.4,18.2-40.6,40.6-40.6C861.9,79.1,880.1,97.2,880.1,119.7"/>
          <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="664.0983" y1="204.6499" x2="880.6248" y2="101.0941">
            <stop offset="0" stopColor="#84BD54"/>
            <stop offset="1" stopColor="#EFE41D"/>
          </linearGradient>
          <path fill="url(#SVGID_1_)" stroke="currentColor" d="M776,222c-1.9-1.1-3.7-2.3-5.5-3.6c-45.7-31.8-63.1-95.1-40.4-147.2c22.2-51.1,81-80.6,136.7-68.5c6.5,1.4,10.6,7.8,9.2,14.4c-1.4,6.5-7.8,10.6-14.3,9.2c-44.7-9.7-91.8,13.8-109.5,54.5c-18.1,41.8-4.3,92.5,32.1,117.8c35.3,24.6,84.4,23.1,116.5-3.5c34.7-28.7,45.5-79.9,25.1-119.1c-3.1-5.9-0.7-13.2,5.2-16.3c5.9-3.1,13.2-0.8,16.3,5.2c25.4,49.1,12,113-31.2,148.8C877.4,245.7,819.5,248.8,776,222"/>
          <path fill="url(#SVGID_1_)" stroke="currentColor" d="M838.8,198.9c-18.9,0-37.9-6.4-52.8-19.1c-28.3-23.9-35.9-66.8-17.7-100c17.8-32.5,58.6-48.3,94.8-36.9c3.2,1,4.9,4.4,3.9,7.6c-1,3.2-4.4,4.9-7.6,3.9c-30.8-9.7-65.5,3.7-80.6,31.2c-15.5,28.2-9.1,64.7,14.9,84.9c23.2,19.6,57.8,21.8,82.2,5.1c26.2-17.9,37.2-53.2,25.5-82.1c-1.3-3.1,0.2-6.6,3.3-7.9c3.1-1.2,6.6,0.2,7.9,3.3c13.8,34.1,1,75.6-29.9,96.6C869.8,194.5,854.3,198.9,838.8,198.9"/>
        </g>
      </svg>
    </div>
  );
}