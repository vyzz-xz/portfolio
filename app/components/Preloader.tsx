'use client';

import { useEffect, useState } from 'react';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

export default function Preloader({ onLoadingComplete }: PreloaderProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const count = useMotionValue(0);
  const roundedCount = useTransform(count, Math.round);

  const loadingTexts = [
    "INITIALIZING...",
    "LOADING ASSETS...",
    "PREPARING EXPERIENCE...",
    "ALMOST READY..."
  ];

  useEffect(() => {
    const controls = animate(count, 100, { duration: 2.5, ease: "easeInOut" });

    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 600);

    const finishTimer = setTimeout(() => {
      onLoadingComplete();
    }, 3000);

    return () => {
      controls.stop();
      clearInterval(textInterval);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] w-screen h-screen bg-[#121212] text-white flex flex-col justify-center items-center font-redhat cursor-wait overflow-hidden">
      
      <div className="mb-4 overflow-hidden">
        <motion.span 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.2, duration: 0.5 }}
           className="text-[10px] md:text-sm font-medium tracking-[0.2em] md:tracking-[0.3em] text-white/70 uppercase block text-center"
        >
          Muhamad Hafiz
        </motion.span>
      </div>

      <div className="relative flex items-start mb-6">
          <motion.h1 className="text-5xl md:text-8xl font-reguler leading-none tracking-tighter text-white/80 tabular-nums">
            {roundedCount}
          </motion.h1>
          <span className="text-xl md:text-3xl font-medium text-white/50 mt-2">%</span>
      </div>

      <div className="w-[150px] md:w-[200px] flex flex-col gap-5">
        
        <div className="w-full h-[2px] bg-neutral-800 relative rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white absolute top-0 left-0"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.0, ease: "easeInOut" }}
          />
        </div>

        <div className="h-4 relative overflow-hidden flex justify-center w-full">
           <motion.div
             key={currentTextIndex}
             initial={{ y: 15, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             exit={{ y: -15, opacity: 0 }}
             transition={{ duration: 0.3 }}
             className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 absolute text-center"
           >
             {loadingTexts[currentTextIndex]}
           </motion.div>
        </div>

      </div>

    </div>
  );
}