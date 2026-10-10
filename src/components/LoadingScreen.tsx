import Image from "next/image";

export default function LoadingScreen() {
  return (
    <div className="pv-loader" role="status" aria-live="polite" aria-atomic="true">
      <div className="pv-loader-content">
        <div className="pv-loader-orbit" aria-hidden="true">
          <span className="pv-loader-ring" />
          <span className="pv-loader-ring pv-loader-ring-inner" />
          <div className="pv-loader-core">
            <Image
              src="/puntoVisual_logo_white_v2.png"
              alt=""
              width={170}
              height={100}
              className="h-auto w-28"
              loading="eager"
            />
          </div>
        </div>
        <p className="text-[10px] uppercase tracking-[.26em] text-primary">Ideas que conectan</p>
        <p className="mt-3 text-sm text-white/60">Preparando tu experiencia…</p>
        <div className="pv-loader-track" aria-hidden="true"><span /></div>
      </div>
    </div>
  );
}