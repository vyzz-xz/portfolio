'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence
} from 'framer-motion';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

export type DockItemData = any;
export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: any;
  isDarkMode?: boolean;
};

function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  isDarkMode
}: any) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}

      className={`relative inline-flex items-center justify-center rounded-full transition-colors duration-300 cursor-pointer ${isDarkMode 
          ? 'text-white hover:text-white hover:bg-white/5'
          : 'text-black hover:text-black hover:bg-black/5' 
        } 
        ${className}`}
      tabIndex={0}
      role="button"
    >
      {Children.map(children, child =>
        React.isValidElement(child)
          ? cloneElement(child as React.ReactElement<any>, { isHovered })
          : child
      )}
    </motion.div>
  );
}

function DockLabel({ children, className = '', isHovered, isDarkMode }: any) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', (latest: number) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0, x: "-50%" }}
          animate={{ opacity: 1, y: -12, x: "-50%" }}
          exit={{ opacity: 0, y: 5, x: "-50%" }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute -top-5 left-1/2 w-fit whitespace-pre rounded-md border px-2 py-0.5 text-[10px] font-medium shadow-sm backdrop-blur-sm z-50 pointer-events-none
            ${isDarkMode 
              ? 'bg-white border-black text-white' 
              : 'bg-black border-black text-white' 
            }
          `}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }: any) {
  return <div className={`flex items-center justify-center w-full h-full ${className}`}>{children}</div>;
}

function DockDivider({ isDarkMode }: { isDarkMode?: boolean }) {
  return <div className="h-8 w-[1px] bg-neutral-300/50 mx-2 self-center" />;
}

export default function Dock({
  items,
  className = '',

  spring = { mass: 0.1, stiffness: 150, damping: 18 }, 
  
  magnification = 60, 
  distance = 150,     
  panelHeight = 58,   
  dockHeight = 150,
  baseItemSize = 45,
  isDarkMode = false   
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(() => Math.max(dockHeight, magnification + magnification / 2 + 4), [magnification, dockHeight]);
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div className="mx-2 flex max-w-full items-end overflow-visible z-50">
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`${className} fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center w-fit gap-0.1 rounded-full px-2 py-1 backdrop-blur-2xl shadow-l z-50 transition-colors duration-500
          ${isDarkMode 
            ? 'bg-neutral-900/80 border border-white/20'
            : 'bg-white border border-black/20'     
          }`}
        style={{ height: panelHeight }}
        role="toolbar"
      >
        {items.map((item, index) => {
          if (item.type === 'separator') {
            return <DockDivider key={index} />;
          }
          return (
            <DockItem
              key={index}
              onClick={item.onClick}
              className={item.className}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
              isDarkMode={isDarkMode}
            >
              <DockIcon>{item.icon}</DockIcon>
              <DockLabel>{item.label}</DockLabel>
            </DockItem>
          );
        })}
      </motion.div>
    </motion.div>
  );
}