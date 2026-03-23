"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 8) + 3;
      if (count >= 100) {
        count = 100;
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
        }, 400);
      }
      setProgress(count);
    }, 40);
    return () => clearInterval(interval);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
        >
          <div className="w-full max-w-md text-center">
            {/* Número */}
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-[10vw] md:text-[6rem] font-bold tracking-tight text-[var(--pv-primary)] drop-shadow-[0_0_20px_rgba(207,222,0,0.4)]"
            >
              {progress}
            </motion.h1>
            {/* Línea de carga */}
            <div className="mt-8 h-[2px] w-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}