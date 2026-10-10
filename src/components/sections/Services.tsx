import ServiceIcon from "../services/ServiceIcon";
import BrandingIcon from "../services/icons/BrandingIcon";
import WebDesignIcon from "../services/icons/WebDesignIcon";
import MarketingIcon from "../services/icons/MarketingIcon";
import SocialMediaIcon from "../services/icons/SocialMediaIcon";
import StrategyIcon from "../services/icons/StrategyIcon";
import { BrainCircuit } from "lucide-react";

const services = [
  { icon: BrandingIcon, label: "Branding", description: "Identidades con intención que hacen que tu marca se reconozca y se recuerde." },
  { icon: WebDesignIcon, label: "Web & conversión", description: "Sitios y experiencias digitales que convierten el interés en oportunidades." },
  { icon: MarketingIcon, label: "Growth marketing", description: "Estrategia, campañas y experimentación para encontrar nuevas formas de crecer." },
  { icon: SocialMediaIcon, label: "Contenido & social", description: "Ideas y contenido que conectan con tu audiencia y dan voz a tu marca." },
  { icon: BrainCircuit, label: "IA & automatización", description: "Flujos inteligentes para optimizar tareas y dar más espacio a la creatividad." },
  { icon: StrategyIcon, label: "Estrategia digital", description: "Una dirección clara para alinear tu presencia digital con tus objetivos." },
];
export default function ServicesSection() {
  return (
    <section id="servicios" tabIndex={-1} aria-labelledby="services-title" className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <p className="mb-4 text-xs tracking-[.2em] text-primary">LO QUE HACEMOS</p>
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 id="services-title" className="max-w-xl text-4xl text-white sm:text-5xl">Todo conectado.<br />Todo hacia adelante.</h2>
          <p className="max-w-sm text-sm leading-relaxed text-foreground/70">Cada marca necesita una combinación distinta. Construimos la tuya con creatividad, datos y tecnología.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => <ServiceIcon key={service.label} Icon={service.icon} label={service.label} description={service.description} />)}
        </div>
      </div>
    </section>
  );
}
