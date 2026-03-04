import Link from "next/link";
import Image from "next/image"; // simepre llamar cuando vas a cargar imagenes estaticas
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
          src="/puntoVisual_logo_white_v2.png"
          alt="PUNTO-VISUAL Design"
          width={100}
          height={70}
          className="block m-0 p-0"
          priority
          />
        </Link>
        {/* Navegación */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/servicios" className="hover:text-primary transition">
            Servicios
          </Link>
          <Link href="/portafolio" className="hover:text-primary transition">
            Portafolio
          </Link>
          <Link href="/precios" className="hover:text-primary transition">
            Precios
          </Link>
          <Link href="/contacto" className="hover:text-primary transition">
            Contacto
          </Link>
        </nav>
        {/* CTA */}
        <Link
          href="/contacto"
          className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded font-bold bg-primary text-black text-sm font-medium hover:opacity-90 transition"
        >
          Agenda una llamada
        </Link>
      </div>
    </header>
  );
}