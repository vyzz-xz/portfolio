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
};

function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize
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

      className={`relative inline-flex items-center justify-center rounded-full transition-colors duration-300 cursor-pointer text-black hover:text-black hover:bg-neutral-200/50 ${className}`}
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

function DockLabel({ children, className = '', isHovered }: any) {
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
          className={`${className} absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-neutral-200 bg-black/90 px-2 py-0.5 text-[10px] font-reguler text-white shadow-sm backdrop-blur-sm z-50 pointer-events-none`}
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

function DockDivider() {
  return <div className="h-8 w-[1px] bg-neutral-300/50 mx-2 self-center" />;
}

export default function Dock({
  items,
  className = '',

  spring = { mass: 0.1, stiffness: 100, damping: 12 }, 
  
  magnification = 60, 
  distance = 150,     
  panelHeight = 64,   
  dockHeight = 150,
  baseItemSize = 45   
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
        className={`${className} absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center w-fit gap-1 rounded-full bg-white/70 border border-black/20 px-3 pb-2 pt-2 backdrop-blur-2xl shadow z-20 transition-all duration-300`}
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