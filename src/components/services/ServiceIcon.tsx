type ServiceIconProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
};
export default function ServiceIcon({ Icon, label }: ServiceIconProps) {
  return (
    <div className="icon-card">
      <div className="icon-wrapper">
        <Icon />
      </div>
      <div className="icon-label">{label}</div>
    </div>
  );
}