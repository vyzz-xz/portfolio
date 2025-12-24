'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { LuMoon, LuSun } from 'react-icons/lu';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ThemeToggle({ isDarkMode, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={toggleTheme}
      className={`
        relative flex items-center justify-center w-12 h-12 rounded-full 
        backdrop-blur-md border shadow-lg transition-all duration-300 ease-in-out cursor-pointer z-50
     
        ${isDarkMode 
          ? 'bg-white/10 border-white/20 hover:bg-white/20 text-white' 
          : 'bg-black/5 border-black/10 hover:bg-black/10 text-black'
        }
      `}
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDarkMode ? 'dark' : 'light'}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {isDarkMode ? (
            <LuMoon size={22} />
          ) : (
            <LuSun size={22} />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}