import Image from "next/image";
import { BrainCircuit, ChartNoAxesCombined, ScanLine } from "lucide-react";

// Red de ideas conectadas alrededor de la marca.
export default function GrowthOrbit() {
  return (
    <div className="pv-orbit" aria-hidden="true">
      <div className="pv-orbit-grid" /><div className="pv-orbit-halo" />
      <svg viewBox="0 0 520 520" className="pv-orbit-network" fill="none">
        <circle cx="260" cy="260" r="198" stroke="white" strokeOpacity=".09" strokeDasharray="3 9" />
        <circle cx="260" cy="260" r="150" stroke="#CFDE00" strokeOpacity=".18" />
        <path d="M100 135 260 260 420 165M260 260 365 410M100 135 420 165 365 410Z" stroke="#CFDE00" strokeOpacity=".22" />
        <g className="pv-orbit-ring">
          <ellipse cx="260" cy="260" rx="220" ry="92" transform="rotate(-35 260 260)" stroke="#CFDE00" strokeOpacity=".35" />
          <circle cx="80" cy="365" r="5" fill="#CFDE00" /><circle cx="440" cy="155" r="4" fill="#CFDE00" />
        </g>
        <g className="pv-orbit-ring pv-orbit-ring-reverse">
          <ellipse cx="260" cy="260" rx="210" ry="95" transform="rotate(40 260 260)" stroke="white" strokeOpacity=".17" />
          <circle cx="415" cy="400" r="4" fill="white" />
        </g>
        <circle cx="100" cy="135" r="6" fill="#CFDE00" /><circle cx="420" cy="165" r="5" fill="#CFDE00" /><circle cx="365" cy="410" r="5" fill="#CFDE00" />
      </svg>
      <div className="pv-orbit-core">
        <span className="text-[8px] tracking-[.16em] text-primary/70">EL CENTRO ES TU MARCA</span>
        <Image src="/puntoVisual_logo_white_v2.png" alt="" width={170} height={100} className="pv-orbit-logo h-auto" sizes="120px" />
        <span className="text-[8px] tracking-[.12em] text-white/50">CONECTAMOS EL POTENCIAL</span>
      </div>
      <div className="pv-orbit-label pv-orbit-label-ai"><BrainCircuit size={18} className="text-primary" /><div><span>Inteligencia artificial</span><small>Ideas que van más lejos</small></div></div>
      <div className="pv-orbit-label pv-orbit-label-growth"><ChartNoAxesCombined size={18} className="text-primary" /><div><span>Growth & estrategia</span><small>Crecer con dirección</small></div></div>
      <div className="pv-orbit-label pv-orbit-label-design"><ScanLine size={18} className="text-primary" /><div><span>Diseño & tecnología</span><small>Experiencias que conectan</small></div></div>
      <span className="pv-orbit-caption">UN ECOSISTEMA. MÁS POSIBILIDADES.</span>
    </div>
  );
}
