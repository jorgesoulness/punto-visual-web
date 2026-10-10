import PortafolioGrid from "@/components/sections/PortafolioGrid";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Portafolio de diseño y desarrollo web",
  description: "Explora proyectos de diseño web, interfaces y experiencias digitales de Punto Visual. Conoce los servicios aplicados y comparte tu próximo proyecto.",
  path: "/portafolio",
});

export default function PortafolioPage() {
  return <PortafolioGrid />;
}
