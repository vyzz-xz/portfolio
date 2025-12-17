'use client';

import { motion } from 'framer-motion';
import { LuArrowDown } from 'react-icons/lu';

export default function ScrollButton() {
  
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  

  return (
    <motion.button
      onClick={handleScroll}
      initial="initial"
      whileHover="hover"
      layout

      className="group flex items-center p-[1px] rounded-full cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] border border-black/50"
      style={{ minWidth: '50px', height: '50px' }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <motion.div
        layout
        className="w-12 h-12 rounded-full flex items-center justify-center text-black"
      >
        <LuArrowDown size={20} />
      </motion.div>

      <motion.div
        layout
        className="overflow-hidden"
        variants={{
          initial: { width: 0, opacity: 0, marginLeft: 0 },
          hover: { width: "auto", opacity: 1, marginLeft: -4, paddingRight: 25 }
        }}
      >
        <span className="whitespace-nowrap font-medium text-base tracking-widest text-black font-redhat">
          Scroll
        </span>
      </motion.div>
    </motion.button>
  );
}