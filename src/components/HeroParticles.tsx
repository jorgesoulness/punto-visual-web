"use client";
import { useEffect, useState } from "react";
import useMotionPreference from "./motion/useMotionPreference";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

let engineReady: Promise<void> | undefined;
export default function HeroParticles() {
  const [ready, setReady] = useState(false);
  const reducedMotion = useMotionPreference();
  useEffect(() => {
    let active = true;
    engineReady ??= initParticlesEngine(async (engine) => { await loadSlim(engine); });
    engineReady.then(() => { if (active) setReady(true); }).catch(() => { engineReady = undefined; });
    return () => { active = false; };
  }, []);
  if (!ready) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <Particles id="hero-particles" className="h-full w-full" options={{
        fullScreen: false,
        fpsLimit: 40,
        particles: {
          number: { value: 45 },
          color: { value: ["#CFDE00", "#ffffff"] },
          size: { value: { min: 1, max: 2 } },
          opacity: { value: { min: 0.2, max: 0.5 } },
          links: { enable: true, color: "#CFDE00", distance: 145, opacity: 0.12, width: 1 },
          move: { enable: reducedMotion === false, speed: 0.45, outModes: "out" },
        },
        responsive: [{ maxWidth: 768, options: { particles: { number: { value: 22 }, links: { distance: 110 } }, detectRetina: false } }],
        detectRetina: true,
      }} />
    </div>
  );
}
