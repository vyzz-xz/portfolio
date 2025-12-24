'use client';

import { motion } from 'framer-motion';
import { LuArrowDown } from 'react-icons/lu';

interface ScrollButtonProps {
  isDarkMode?: boolean;
}

export default function ScrollButton({ isDarkMode = false }: ScrollButtonProps) {
  
  const handleScroll = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }
};
  

  return (
    <motion.button
      onClick={handleScroll}
      initial="initial"
      whileHover="hover"
      layout

className={`
  flex items-center p-3.5 rounded-full cursor-pointer border backdrop-blur-[2px]
  transition-colors duration-500 ease-out
  ${isDarkMode 
  ? 'border-white/50 text-white hover:border-white/50' 
  : 'border-black/50 text-black hover:border-black/50'
  }
`}
  transition={{ 
  type: "spring", 
  stiffness: 300, 
  damping: 30 
  }}
>
{/* ICON PANAH */}
<motion.div 
  layout 
  className="flex items-center justify-center"
>
  <LuArrowDown size={20} />
  </motion.div>

  <motion.div
    className="overflow-hidden flex items-center"
    variants={{
    initial: { 
    width: 0, 
    opacity: 0, 
    paddingLeft: 0 
  },
    hover: { 
    width: "auto", 
    opacity: 1, 
    paddingLeft: 10
  }
}}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <span className="whitespace-nowrap font-medium text-xs tracking-[0.2em] uppercase font-redhat">
    Scroll
  </span>
  </motion.div>
  </motion.button>
  );
}