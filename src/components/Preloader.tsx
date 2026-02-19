"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 8) + 3; // velocidad variable
      if (count >= 100) {
        count = 100;
        clearInterval(interval);
        setTimeout(() => setVisible(false), 400);
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
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-[10vw] font-bold tracking-tight text-white">
              {progress}
            </h1>
            <p className="text-white/60 text-lg tracking-widest">%</p>
            <div className="absolute bottom-0 left-0 h-[2px] bg-primary" style={{ width: `${progress}%` }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}