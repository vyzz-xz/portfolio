'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  return (
    <motion.div
      // Awal: Hilang & Turun
      initial={{ opacity: 0, y: 50 }}
      
      // Masuk Layar: Muncul & Naik
      whileInView={{ opacity: 3, y: 0 }}
      
      // Animasi ulang setiap kali di-scroll (Replay)
      viewport={{ once: false, margin: "-10%" }} 
      
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        delay: delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}