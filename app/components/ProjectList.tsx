'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, Variants } from 'framer-motion';
import { LuArrowUpRight } from 'react-icons/lu';

interface Project {
  title: string;
  category: string;
  image: string;
  link: string;
}

interface ProjectListProps {
  projects: Project[];
  isDarkMode: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
      delayChildren: 0.5, 
    },
  },
};


const itemVariants: Variants = {
  hidden: { 
    x: -80, 
    opacity: 0 
  },
  visible: {
    x: 0, 
    opacity: 1, 
    transition: {
    type: "spring",
      damping: 20,    
      stiffness: 100,  
      mass: 0.5
    }
  },
};

export default function ProjectList({ projects, isDarkMode }: ProjectListProps) {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  
  const springConfig = { stiffness: 100, damping: 20, mass: 0.1 };
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    x.set(clientX - 150); 
    y.set(clientY - 100);
  };

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto py-0 md:py-10"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveProject(null)}
    >
      
      {/* --- LIST PROJECTS --- */}
      <motion.div 
        className="flex flex-col"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10%" }} 
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants} 
            onMouseEnter={() => setActiveProject(index)}
            onClick={() => window.open(project.link, '_blank')}
            className={`
              group relative flex items-center justify-between 
              w-full py-6 md:py-10 px-0 md:px-0 cursor-pointer overflow-hidden
              border-b-2 transition-all duration-500
              
              ${isDarkMode 
                ? 'border-white hover:bg-white'
                : 'border-black hover:bg-neutral-100/50' 
              }
            `}
          >
            {/* BACKGROUND IMAGE */}
            <div 
              className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none"
            >
              <div className={`absolute inset-0 z-10 ${isDarkMode ? 'bg-white/90' : 'bg-black/80'}`} /> 
              <img 
                src={project.image} 
                alt="bg" 
                className="w-full h-full object-cover object-center scale-150 group-hover:scale-100 transition-transform duration-500 mix-blend-overlay" 
              />
            </div>

            {/* KONTEN (JUDUL & KATEGORI) */}
            <div className="relative z-20 flex flex-col gap-1 md:gap-3 transition-transform duration-300 group-hover:translate-x-10">
              <h3 className={`text-xl md:text-5xl font-bold font-redhat transition-colors duration-300
                 ${isDarkMode 
                   ? 'text-white group-hover:text-black' 
                   : 'text-neutral-800 group-hover:text-white' 
                 }
              `}>
                {project.title}
              </h3>
              <span className={`text-[10px] md:text-sm tracking[2em] font-reguler transition-colors duration-300
                 ${isDarkMode 
                   ? 'text-white group-hover:text-black' 
                   : 'text-black group-hover:text-white'
                 }
              `}>
                {project.category}
              </span>
            </div>

            {/* ICON PANAH */}
            <div className={`relative z-20 transform transition-all duration-500 md:group-hover:-translate-x-10 md:group-hover:-translate-y-1
               ${isDarkMode 
                  ? 'text-white group-hover:text-black' 
                  : 'text-black group-hover:text-white'
               }
            `}>
               <LuArrowUpRight className="text-2xl md:text-5xl" />
            </div>

          </motion.div>
        ))}
      </motion.div>


      {/* --- FLOATING IMAGE POPUP --- */}
      <motion.div
        style={{ x: xSpring, y: ySpring }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: activeProject !== null ? 1 : 0,
          scale: activeProject !== null ? 1 : 0.5,
          rotate: activeProject !== null ? 5 : 0,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed top-0 left-0 w-[250px] h-[250px] rounded-xl overflow-hidden shadow-2xl z-50 pointer-events-none hidden md:block"
      >
        {projects.map((project, idx) => {
           const isActive = activeProject === idx;
           return (
            <div 
                key={idx}
                className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out 
                  ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}
                `}
            >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
            </div>
           );
        })}
      </motion.div>

    </div>
  );
}