"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function HomeHeroSlider() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <section className="relative w-full heightSlideHome overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={2.25}
        spaceBetween={20}
        loop
        loopAdditionalSlides={projects.length}
        watchSlidesProgress
        speed={1800}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        grabCursor
        className="w-full"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={project.slug}>
            <Link
              href={`/portafolio/${project.slug}`}
              className="group block"
            >
              <div className="relative heightSlideHome__item overflow-hidden rounded">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  className="
                    object-cover
                    transition-transform
                    duration-[2000ms]
                    ease-out
                  "
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}