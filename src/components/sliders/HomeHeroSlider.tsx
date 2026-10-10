"use client";
import useMotionPreference from "../motion/useMotionPreference";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Pause, Play } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
export default function HomeHeroSlider() {
  const reducedMotion = useMotionPreference();
  const slider = useRef<SwiperInstance | null>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || reducedMotion !== false) slider.current?.autoplay.stop();
    else slider.current?.autoplay.start();
  }, [paused, reducedMotion]);
  return (
    <section aria-label="Proyectos destacados" className="relative w-full heightSlideHome overflow-hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 pb-6">
        <h2 className="text-2xl text-white">Proyectos de diseño y desarrollo web.</h2>
        {reducedMotion === false && <button type="button" aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"} onClick={() => setPaused(!paused)} className="flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs text-white">{paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}<span className="hidden sm:inline">{paused ? "Reanudar" : "Pausar"}</span></button>}
      </div>
      <Swiper
        onSwiper={(instance) => { slider.current = instance; if (paused || reducedMotion !== false) instance.autoplay.stop(); }}
        onSliderFirstMove={() => setPaused(true)}
        modules={[A11y, Autoplay, Keyboard]}
        slidesPerView={1.15}
        breakpoints={{ 640: { slidesPerView: 1.5 }, 1024: { slidesPerView: 2.25 } }}
        keyboard={{ enabled: true }}
        spaceBetween={20}
        loop
        watchSlidesProgress
        speed={reducedMotion ? 0 : 1000}
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        grabCursor
        className="w-full"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={project.slug}>
            <Link
              onFocus={() => setPaused(true)}
              href={`/portafolio/${project.slug}`}
              className="group block"
            >
              <div className="relative heightSlideHome__item overflow-hidden rounded">
                <Image
                  src={project.image}
                  alt={`Vista del diseño web de ${project.title}`}
                  fill
                  sizes="(min-width: 1024px) 45vw, (min-width: 640px) 67vw, 90vw"
                  priority={index === 0}
                  className="object-cover transition-transform duration-[2000ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <h3 className="text-xl text-white">{project.title}</h3>
                  <p className="mt-2 text-xs text-white/75">{project.services.join(" · ")}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
