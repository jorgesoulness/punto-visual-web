"use client";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { motion, Variants } from "framer-motion";
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};
export default function PortafolioGrid() {
  return (
    <section className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-12">Portafolio</h1>
        <div className="grid gap-10 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Link
                href={`/portafolio/${project.slug}`}
                className="group relative block rounded-2xl overflow-hidden border border-white/10 bg-white/5"
              >
                <div className="relative aspect-video">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 p-6 space-y-2 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h2 className="text-2xl font-semibold">
                    {project.title}
                  </h2>
                  <p className="text-sm text-foreground/80">
                    {project.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}