"use client";
import { motion } from "framer-motion";
import { Code2, Palette, Rocket, LineChart } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Desarrollo Web",
    desc: "Sitios modernos, rápidos y escalables.",
  },
  {
    icon: Palette,
    title: "Diseño UI/UX",
    desc: "Interfaces limpias enfocadas en conversión.",
  },
  {
    icon: Rocket,
    title: "Branding Digital",
    desc: "Identidad visual con impacto real.",
  },
  {
    icon: LineChart,
    title: "SEO & Performance",
    desc: "Optimización para posicionamiento y velocidad.",
  },
];

export default function ServicesSection() {
  return (
    <section className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Lo que hacemos
        </h2>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="icons-grid">
            <div className="icon-card">
              <div className="icon-wrapper">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  <circle cx="12" cy="12" r="3" strokeWidth="1"/>
                </svg>
              </div>
              <div className="icon-label">Branding</div>
            </div>
          </div>
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: -5,
                }}
                transition={{ type: "spring", stiffness: 200 }}
                className="group relative p-[1px] rounded-2xl pv-card-border transition-all duration-500 hover:shadow-[0_0_30px_rgba(207,222,0,0.25)]"
                style={{ perspective: 1000 }}
              >
                <div className="rounded-2xl bg-background p-8 h-full flex flex-col items-center text-center">
                  <div className="mb-6">
                    <Icon
                      size={48}
                      className="text-[var(--pv-primary)] group-hover:text-[var(--pv-primary-light)] transition-colors duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}