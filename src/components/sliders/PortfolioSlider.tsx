"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
export default function PortfolioSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={32}
      slidesPerView={1}
      loop
      autoplay={{
        delay: 4500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation
      breakpoints={{
        768: { slidesPerView: 2 },
        1280: { slidesPerView: 3 },
      }}
      className="!overflow-visible"
    >
      {projects.map((project) => (
        <SwiperSlide key={project.slug}>
          <Link
            href={`/portafolio/${project.slug}`}
            className="group block rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:border-primary transition"
          >
            <div className="relative aspect-video">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition"
              />
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-xl font-semibold">
                {project.title}
              </h3>
              <p className="text-sm text-foreground/70">
                {project.description}
              </p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}