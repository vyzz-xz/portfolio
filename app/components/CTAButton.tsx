'use client';

import { motion } from 'framer-motion';

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
}

export default function CTAButton({ text, onClick }: CTAButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      
      className="relative overflow-hidden rounded-full bg-white px-6 py-4 text-black border border-black/50 shadow-lg group"
    >
      <div className="relative overflow-hidden">
        
        <span className="block font-medium font-redhat tracking-widest text-sm uppercase transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
          {text}
        </span>
        <span className="absolute inset-0 flex items-center justify-center font-medium font-redhat tracking-widest text-sm uppercase translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
          {text}
        </span>
      
      </div>

    </motion.button>
  );
}