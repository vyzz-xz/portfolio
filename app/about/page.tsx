"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Dock from "../components/Dock";
import Clock from "../components/Clock";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";

import { 
VscHome,VscAccount,VscFolderLibrary,VscGithubAlt, 
} from "react-icons/vsc";
import { FaLinkedinIn } from "react-icons/fa6";

export default function AboutPage() {

const router = useRouter();

const {isDarkMode, toggleTheme} = useTheme();
const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
    const handleResize = () => { setIsMobile(window.innerWidth < 768);};
    handleResize(); 
    window.addEventListener('resize', handleResize);
    router.prefetch('/home');
    return () => window.removeEventListener('resize', handleResize);
}, []);

const dockIconSize = isMobile ? 18 : 22;
const items = [
    {icon: <VscHome size={17} />, 
        label: 'Home', 
        onClick: () => router.push('/') },
    {icon: <VscAccount size={17} />, 
        label: 'About', 
        onClick: () => {} },
    {icon: <VscFolderLibrary size={17} />, 
        label: 'Projects', 
        onClick: () => alert('My Projects')},
    {icon: <VscGithubAlt size={17} />, 
        label: 'GitHub', 
        onClick: () => window.open('https://github.com/vyzz-xz', '_blank')},
    {icon: <FaLinkedinIn size={17} />, 
        label: 'LinkedIn', 
        onClick: () => window.open('https://www.linkedin.com/in/muhamad-hafiz-37467b346', '_blank')},
];

return (
    <main className={`min-h-[100dvh] w-full relative overflow-x-hidden transition-colors duration-0
    ${isDarkMode ? 'bg-black text-white selection:bg-white selection:text-black' : 'bg-white text-black selection:bg-black selection:text-white'}`}>
    
    <div className="fixed top-6 left-6 md:top-6 md:left-6 z-50 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`"><Clock />
    </div>
    
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </div>

    <div className="absolute inset-0 z-0 pointer-events-none">
        {isDarkMode ?(
        <div className="absolute inset-0 bg-black bg-[radial-gradient(100%_100%_at_50%_0%,rgba(59,130,246,0)_0,rgba(59,130,246,0.25)_0%,rgba(59,130,246,0)_100%)]" />
    ):(
        <div className="absolute inset-0 bg-white bg-[radial-gradient(100%_100%_at_50%_0%,rgba(59,130,246,0)_0,rgba(59,130,246,0.25)_0%,rgba(59,130,246,0)_100%)]" />
    )}
    </div>


    {/* SECTION */}
    <section className="relative w-full min-h-screen flex flex-col items-center justify-start pt-32 px-4 md:px-20 z-10 pb-40">
    <div className="w-full flex justify-center mt-8">

    </div>
    </section>


    <Dock 
        items={items} 
        baseItemSize={isMobile ? 35 : 45} 
        panelHeight={isMobile ? 50 : 64}  
        magnification={isMobile ? 50 : 60} 
        isDarkMode={isDarkMode} 
        />
    </main>
);
}