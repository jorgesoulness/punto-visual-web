"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import useMotionPreference from "@/components/motion/useMotionPreference";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const reducedMotion = useMotionPreference();

  useEffect(() => {
    let cancelled = false;
    let onLoad: (() => void) | undefined;
    const loaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else {
        onLoad = resolve;
        window.addEventListener("load", onLoad, { once: true });
      }
    });

    // Espera la carga real, con un límite para recursos externos lentos.
    const timeout = window.setTimeout(() => {
      if (!cancelled) setVisible(false);
    }, 3500);

    Promise.all([loaded, document.fonts.ready]).then(() => {
      if (!cancelled) {
        window.clearTimeout(timeout);
        setVisible(false);
      }
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      if (onLoad) window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <>
      <noscript><style>{".pv-initial-preloader { display: none !important; }"}</style></noscript>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="pv-initial-preloader fixed inset-0 z-[100] pointer-events-none"
            initial={false}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}