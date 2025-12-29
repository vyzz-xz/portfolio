'use client';

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "./Preloader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isLoading) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[99999] bg-[#121212] flex items-center justify-center overflow-hidden"
            initial={{ 
              y: 0,
              borderBottomLeftRadius: "0% 0px", 
              borderBottomRightRadius: "0% 0px" 
            }}
            exit={{
              y: "-100%", 
              borderBottomLeftRadius: "50% 200px", 
              borderBottomRightRadius: "50% 200px",
              transition: { 
                duration: 1.2, 
                ease: [0.83, 0, 0.17, 1]
              },
            }} 

          >
            <Preloader onLoadingComplete={() => setIsLoading(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full min-h-screen"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}