export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 text-sm text-foreground/70">
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          
          <div>
            <p className="font-semibold text-foreground">
              Punto Visual
            </p>
            <p className="mt-2 max-w-xs">
              Diseño, branding y desarrollo web enfocado en resultados.
            </p>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <span className="font-medium text-foreground">
                Navegación
              </span>
              <a href="/servicios">Servicios</a>
              <a href="/portafolio">Portafolio</a>
              <a href="/contacto">Contacto</a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium text-foreground">
                Contacto
              </span>
              <span>ventas@puntovisual.mx</span>
              <span>Tijuana, MX</span>
            </div>
          </div>
        </div>

        <p className="mt-10 text-xs text-foreground/50">
          © {new Date().getFullYear()} Punto Visual. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}