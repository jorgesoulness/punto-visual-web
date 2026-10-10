type ServiceIconProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  description?: string;
};
export default function ServiceIcon({ Icon, label, description }: ServiceIconProps) {
  return (
    <article className="icon-card">
      <div className="icon-wrapper"><Icon aria-hidden="true" /></div>
      <h3 className="icon-label">{label}</h3>
      {description && <p className="relative z-10 mt-4 text-sm leading-relaxed text-foreground/70">{description}</p>}
    </article>
  );
}
