'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
    isDarkMode: boolean;
    toggleTheme: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = (e?: React.MouseEvent<HTMLButtonElement>) => {
    // @ts-ignore
    const isSupported = document.startViewTransition && e;

    if (!isSupported) {
        setIsDarkMode((prev) => !prev);
        return;
    }

    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
    );

    // Mulai Transisi View
    // @ts-ignore
    const transition = document.startViewTransition(() => {
        setIsDarkMode((prev) => !prev);
    });

    transition.ready.then(() => {
        const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    
    document.documentElement.animate(
        {
        clipPath: clipPath, 
        },
        {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)", 
        }
    );
    });
};

return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
    {children}
    </ThemeContext.Provider>
);
}

export function useTheme() {
    const context = useContext(ThemeContext);
if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
}
return context;
}