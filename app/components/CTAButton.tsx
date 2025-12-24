'use client';

import { motion } from 'framer-motion';

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
  isDarkMode?: boolean;
}

export default function CTAButton({ text, onClick, isDarkMode = false }: CTAButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      
      className={`
        relative overflow-hidden rounded-full px-5 py-4 border shadow-lg group cursor-pointer bg-transparent backdrop-blur-sm
        transition-colors duration-300 ease-out
        ${isDarkMode 
          ? 'border-white/50 text-white'
          : 'border-black/50 text-black'
        }
      `}
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