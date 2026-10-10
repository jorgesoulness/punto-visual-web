import SectionLink from "../navigation/SectionLink";
import { contactEmail, navigation } from "@/data/site";
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12 text-sm text-foreground/70">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div><p className="font-semibold text-foreground">Punto Visual</p><p className="mt-2 max-w-xs leading-relaxed">Creatividad, marketing y tecnología para impulsar la siguiente etapa de tu marca.</p></div>
          <div className="flex flex-wrap gap-10">
            <nav aria-label="Navegación del pie de página" className="flex flex-col gap-3"><span className="font-medium text-foreground">Explora</span>{navigation.map((item) => <SectionLink key={item.href} href={item.href} className="transition hover:text-primary">{item.label}</SectionLink>)}</nav>
            <div className="flex flex-col gap-3"><span className="font-medium text-foreground">Conectemos</span><a href={`mailto:${contactEmail}`} className="transition hover:text-primary">{contactEmail}</a><span>Tijuana, MX</span></div>
          </div>
        </div>
        <p className="mt-10 text-xs text-foreground/50">© {new Date().getFullYear()} Punto Visual. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
