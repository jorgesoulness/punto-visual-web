import Button from "../ui/Button";
import SlideUp from "../motion/SlideUp";
import FadeIn from "../motion/FadeIn";
import HeroParticles from "../HeroParticles";
export default function Hero() {
  return(
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <HeroParticles />
      <div className="max-w-7xl mx-auto px-6 py-28 grid gap-12 md:grid-cols-2 items-center relative z-10">
        <div className="space-y-6">
          <div className="px-6 py-12 space-y-14 max-w-7xl mx-auto">
            <span className="inline-block text-sm tracking-widest text-primary">
              AGENCIA CREATIVA
            </span>
            <SlideUp>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight uppercase">
              Diseño y desarrollo web que <span className="text-primary">convierte</span>
            </h1>
            </SlideUp>
            <FadeIn delay={0.15}>
            <p className="text-lg text-foreground/80 max-w-xl">
              Creamos marcas, sitios web y experiencias digitales pensadas para hacer crecer negocios reales.
            </p>
            </FadeIn>
          </div>
          <div className="flex gap-4 pt-2">
            <Button href="/contacto">
              Cotiza tu proyecto
            </Button>
            <Button href="/portafolio" variant="ghost">
              Ver portafolio
            </Button>
          </div>
        </div>
        <div className="hidden md:block relative">
          <div className="aspect-square rounded-2xl border border-white/10 bg-white/5 backdrop-blur" />
        </div>
      </div>
    </section>
  );
}