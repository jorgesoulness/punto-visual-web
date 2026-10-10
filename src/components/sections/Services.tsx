import ServiceIcon from "../services/ServiceIcon";
import BrandingIcon from "../services/icons/BrandingIcon";
import WebDesignIcon from "../services/icons/WebDesignIcon";
import MarketingIcon from "../services/icons/MarketingIcon";
import SocialMediaIcon from "../services/icons/SocialMediaIcon";
import StrategyIcon from "../services/icons/StrategyIcon";
import { BrainCircuit } from "lucide-react";

const services = [
  { icon: WebDesignIcon, label: "Diseño y desarrollo web", description: "Sitios corporativos y landing pages responsivas para presentar tus servicios y facilitar solicitudes de contacto. Diseño de interfaces y desarrollo según las necesidades de tu negocio." },
  { icon: MarketingIcon, label: "Marketing digital y growth", description: "Estrategia de campañas y experimentación para conectar con tu audiencia. Definimos objetivos, mensajes e indicadores para evaluar y mejorar tus acciones de marketing." },
  { icon: BrandingIcon, label: "Branding e identidad visual", description: "Identidad visual y criterios de comunicación para marcas que buscan una presencia coherente. Conectamos diseño, personalidad y aplicaciones digitales." },
  { icon: SocialMediaIcon, label: "Contenido y redes sociales", description: "Planificación de contenido y piezas creativas para comunicar tus servicios en redes sociales. Alineamos cada publicación con tu audiencia y los objetivos de tu marca." },
  { icon: BrainCircuit, label: "IA y automatización", description: "Flujos de trabajo con inteligencia artificial para tareas repetitivas y procesos digitales. Identificamos qué automatizar y cómo integrarlo a tu operación." },
  { icon: StrategyIcon, label: "Estrategia digital", description: "Revisión de tu presencia digital y definición de prioridades para tu negocio. Coordinamos sitio web, contenido y campañas en un plan con alcance y objetivos claros." },
];
export default function ServicesSection() {
  return (
    <section id="servicios" tabIndex={-1} aria-labelledby="services-title" className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <p className="mb-4 text-xs tracking-[.2em] text-primary">LO QUE HACEMOS</p>
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 id="services-title" className="max-w-xl text-4xl text-white sm:text-5xl">Servicios de marketing<br />y desarrollo web.</h2>
          <p className="max-w-sm text-sm leading-relaxed text-foreground/70">Para negocios que quieren lanzar su sitio, fortalecer su marca o mejorar su captación de clientes. Combinamos los servicios según tus objetivos y la etapa de tu negocio.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => <ServiceIcon key={service.label} Icon={service.icon} label={service.label} description={service.description} />)}
        </div>
      </div>
    </section>
  );
}
