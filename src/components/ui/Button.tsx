import Link from "next/link";
// Propiedades del boton es un componente que se utilizara mucho mediante los props
type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}
// inicia la funcion del boton
export default function Button({
  href,
  children,
  variant = "primary"
}: ButtonProps) {
  // Clases base para el boton
  const base = "inline-flex items-center justify-center rounded px-6 py-3 text-sm font-medium transition";
  // Clases de variantes que se controlan mediante primary/ghost
  const variants = {
    primary: "bg-primary text-black hover:opacity-90",
    ghost: "border border-white/20 hover:border-primary",
  };
  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}