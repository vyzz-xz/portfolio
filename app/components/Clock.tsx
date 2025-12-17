'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Clock() {
  const [time, setTime] = useState<string>('');
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTime(timeString);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX / 2.5);
    y.set(distanceY / 2.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!time) return null;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className="
        flex items-center justify-center
        cursor-default select-none
        px-6 py-4
      "
    >
      <span className="text-xs md:text-base font-light tracking-wider uppercase font-redhat transition-colors duration-300 hover:text-black">
        {time}
      </span>
    </motion.div>
  );
}