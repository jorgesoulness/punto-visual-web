import Link from "next/link";
type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}
export default function Button({
  href,
  children,
  variant = "primary"
}: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded px-6 py-3 text-sm font-medium transition";
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