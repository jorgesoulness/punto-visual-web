"use client";
import { useEffect, useState } from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
export default function HeroParticles() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setReady(true);
    });
  }, []);
  if (!ready) return null;
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Particles
        id="hero-particles"
        className="w-full h-full"
        options={{
          fullScreen: false,
          particles: {
            number: { value: 40 },
            color: { value: "rgba(255,255,255,0.6)" },
            size: { value: { min: 1, max: 2 } },
            opacity: { value: 0.5 },
            links: {
              enable: true,
              color: "rgba(255,255,255,0.3)",
              distance: 160,
              opacity: 0.3,
            },
            move: {
              enable: true,
              speed: 0.4,
              outModes: "out",
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
            },
            modes: {
              grab: {
                distance: 180,
                links: { opacity: 0.6 },
              },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}