'use client';

import { useState, useEffect } from "react";
import ScrollVelocity from "./components/ScrollVelocity"
import Dock from './components/Dock';
import TextPressure from "./components/TextPressure";
import Clock from "./components/Clock";
import ScrollButton from "./components/ScrollButton";
import ScrollReveal from "./components/ScrollReveal";
import LogoLoop from './components/LogoLoop';
import ThemeToggle from "./components/ThemeToggle";
import CTAButton from "./components/CTAButton";
import ProjectList from "./components/ProjectList";
import Magnet from "./components/Magnet";
import SplitText from "./components/SplitText";

import { 
  VscHome,VscAccount,VscFolderLibrary,VscGithubAlt, 
} from "react-icons/vsc";

import { FaLinkedinIn } from "react-icons/fa6";

import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
  SiFigma, SiNodedotjs, SiCanva, SiGithub 
} from 'react-icons/si';

export default function Home() {

const [isDarkMode, setIsDarkMode] = useState(true);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
   
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 {/* TOOGLE THEME */}
const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!document.startViewTransition) {
      setIsDarkMode(!isDarkMode);
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

    const transition = document.startViewTransition(() => {
      setIsDarkMode(!isDarkMode);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 800,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)", 
        }
      );
    });
  };

  const iconSize = isMobile ? 30 : 50;
  const techLogos = [
    { node: <SiReact size={70} />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs size={70} />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript size={70} />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss size={70} />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiCanva size={70} />, title: "Canva", href: "https://www.canva.com" },
    { node: <SiFigma size={70} />, title: "Figma", href: "https://figma.com" },
    { node: <SiNodedotjs size={70} />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiGithub size={70} />, title: "GitHub", href: "https://github.com" },
  ];

  const projects = [
    { title: "BookShelf", category: "Library Management Web", image: "/projects/Book.jpg", link: "https://book-nestv1.vercel.app/" },
    { title: "Vico Apps", category: "Language Learning Apps", image: "/projects/Vico.jpg", link: "#" },
    { title: "SumbangBang Apps", category: "Food Donation Application", image: "/projects/SumbangBang.jpg", link: "#" },
    { title: "Photobooth", category: "Free Photobooth Web", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop", link: "#" },
  ];

  const dockIconSize = isMobile ? 18 : 22;
  const items = [
    {icon: <VscHome size={17} />, 
      label: 'Home', 
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' })},
    {icon: <VscAccount size={17} />, 
      label: 'About', 
      onClick: () => alert('About Me')},
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
    
    {/* TOGGLE TEMA */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>

      {/* HERO SECTION */}
      <section id="hero" className="relative w-full h-[100dvh] flex flex-col justify-center items-center z-10 overflow-hidden">

    {/* GRADIENT-BG */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      {isDarkMode ?(
        <div className="absolute inset-0 bg-black bg-[radial-gradient(100%_100%_at_50%_0%,rgba(59,130,246,0)_0,rgba(59,130,246,0.25)_0%,rgba(59,130,246,0)_100%)]" />
      ):(
        <div className="absolute inset-0 bg-white bg-[radial-gradient(100%_100%_at_50%_0%,rgba(59,130,246,0)_0,rgba(59,130,246,0.25)_0%,rgba(59,130,246,0)_100%)]" />
      )}
    </div>

    <div className="w-full flex flex-col justify-center items-center z-0 px-4">

    <div className="absolute top-[25%] md:top-[25%] left-0 right-0 flex justify-center z-20 px-4">
    <div className="w-full max-w-[160px] md:max-w-[300px] h-8 md:h-12 relative flex items-center justify-center cursor-default">
      <TextPressure
        text="MUHAMAD HAFIZ"
        flex={true}
        alpha={false}
        stroke={false}
        width={true}
        weight={true}
        italic={true}
        textColor={isDarkMode ? "#FFFFFF" : "#000000"}
        minFontSize={isMobile ? 10 : 14}
        />
      </div>
    </div>
  </div>
      
    <div className="w-full relative z-10 transform scale-110 md:scale-100 -mt-12 md:-mt-5">
      <ScrollVelocity
        texts={['UI/UX DESIGNER - TECH ENTHUSIAST - FRONTEND DEVELOPER -']} 
        velocity={150}
        numCopies={100} 
        className="font-redhat text-[5rem] md:text-[8rem] font-black tracking-[-0.08em] leading-[0.8] whitespace-nowrap transition-colors duration-300 ${isDarkMode ? 'text-black' : 'text-white'}"
      />
    </div>
    <div className="w-full -mt-0 md:-mt-0">
      <ScrollVelocity
        texts={['TECH ENTHUSIAST - FRONTEND DEVELOPER - UI/UX DESIGNER -']} 
        velocity={-150}
        numCopies={100} 
        className="font-redhat text-[5rem] md:text-[8rem] font-black tracking-[-0.08em] leading-[0.8] whitespace-nowrap ${isDarkMode ? 'text-black' : 'text-white'}"
      />
    </div>

      <div className="absolute bottom-[20%] md:bottom-[20%] left-0 right-0 flex justify-center z-20 pointer-events-auto">
      <ScrollButton isDarkMode={isDarkMode} />
      </div>
  </section>
  
  {/*SECTION ABOUT*/}
      <section id="about" className="relative w-full min-h-[100vh] flex flex-col items-center justify-center py-5 px-6 md:px-20 z-10">
        <div className="max-w-5xl w-full text-center font-redhat">
          
          <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          >
              Hi, I'm Muhamad Hafiz. An Computer Science Student and Tech Enthusiast. 
              Mainly focused on UI Design Development,
              I love creating intuitive and visually appealing stuff like this.
          </ScrollReveal>
        </div>

      <div className="h-40"></div>
      </section>

    {/* SECTION TECH STACK */}
    <section id="skills" className="relative w-full py-15 z-10 flex flex-col items-center justify-center">
        <div style={{ width: '100%', height: isMobile ? '150px' : '200px', position: 'relative', overflow: 'hidden'}}>
          <LogoLoop
            logos={techLogos}
            speed={isMobile ? 80 : 150}
            direction="left"
            logoHeight={isMobile ? 40 : 80}
            gap={isMobile ? 45 : 70}
            hoverSpeed={50} 
            scaleOnHover={true} 
            fadeOut={true} 
            fadeOutColor={isDarkMode ? "#000000" : "#ffffff"}
            ariaLabel="Technology partners"
            isDarkMode={isDarkMode}
          />
        </div>

        <div className="mt-24 md:mt-12 flex justify-center">
          <CTAButton 
            text="More About Me" 
            onClick={() => window.location.href = 'mailto:email@example.com'} //belum di ubah
            isDarkMode={isDarkMode}
          />
        </div>

        <div className="h-40"></div>
      </section>

      {/* SECTION PROJECTS */}
      <section id="projects" className="relative w-full py-20 px-4 md:px-20 z-10">   
        <div className="w-full flex justify-center mb-10 select-none pointer-events-none">
            <h2 className={`
                font-black font-redhat uppercase tracking-tighter select-none 
                whitespace-nowrap text-center leading-none text-[17vw] md:text-[16.6vw]
                ${isDarkMode 
                  ? 'text-neutral-900' 
                  : 'text-neutral-100'
                }
            `}>
              <SplitText text="MY WORKS" delay={0.4}/>
            </h2>
        </div>

        <div className="w-full relative z-30">
            <ProjectList 
                projects={projects} 
                isDarkMode={isDarkMode} 
            />
        </div>
        <div className="mt-24 md:mt-20 flex justify-center">
          <CTAButton 
            text="See More" 
            onClick={() => window.location.href = 'mailto:email@example.com'} //belum di ubah
            isDarkMode={isDarkMode}
          />
        </div>
        <div className="h-10"></div>
      </section>
    
    {/* SECTION QUOTES */}
      <section id="quotes" className="relative w-full py-24 md:py-40 flex flex-col items-center justify-center z-10 overflow-hidden">

      <div className="absolute top-0 left-0 w-full flex justify-center z-0 select-none pointer-events-none mt-10">
        <h2 className={`text-[24vw] md:text-[24vw] font-black font-redhat uppercase tracking-tighter mb-12 select-none text-center
            ${isDarkMode ? 'text-neutral-900' : 'text-neutral-100'} 
            `}>
          <SplitText text="Quotes" delay={0.5}/>
        </h2>
      </div>
      <div className="relative z-10 max-w-4xl text-center px-4 mt-24 md:mt-48"></div>

        <div className="max-w-6xl text-center px-6">
           <div className={`text-2xl md:text-7xl font-bold font-redhat tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-black'}`}>
             <SplitText 
               text='Don&apos;t let us get caught up in the Vibe Coding because it is very dangerous...'
               delay={0.2}
             />
           </div>

           <div className="mt-8 md:mt-12 flex justify-center">
             <Magnet padding={20} strength={4}>
               <span className={`text-sm md:text-xl font-medium tracking-wide cursor-pointer transition-colors duration-500 ${isDarkMode ? 'text-white/80' : 'text-black/50'}`}>
                <SplitText text="Muhamad Hafiz, Probably" delay={0.5}/>
               </span>
             </Magnet>
           </div>
        </div>
      <div className="h-30"></div>
      </section>

      {/* SECTION CONTACT */}
      <section id="contact" className="relative w-full py-24 md:py-40 flex flex-col items-center justify-center z-10 overflow-hidden">

      <div className="absolute top-0 left-0 w-full flex justify-center z-0 select-none pointer-events-none mt-10">
        <h2 className={`text-[21vw] md:text-[21vw] font-black font-redhat uppercase tracking-tighter mb-12 select-none text-center
            ${isDarkMode ? 'text-neutral-900' : 'text-neutral-100'} 
            `}>
          <SplitText text="Contact" delay={0.5}/>
        </h2>
      </div>
      <div className="relative z-10 max-w-4xl text-center px-4 mt-24 md:mt-48"></div>

        <div className="relative z-10 max-w-6xl text-center px-6">
           <div className={`text-3xl md:text-7xl font-bold font-redhat uppercase tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-black'}`}>
             <SplitText 
               text='Let&apos;s make something great'
               delay={0.2}
             />
             <div className="text-neutral-200">
               <SplitText 
                 text="Contact Me" 
                 delay={0.3}
               />
             </div>
           </div>

           <div className="mt-5 md:mt-12 flex justify-center">
             <Magnet padding={5} strength={20}>
               <span className={`text-sm md:text-xl font-normal tracking-wide leading-normal cursor-pointer transition-colors duration-500 flex flex-col gap-4 items-center max-w-xs md:max-w-2xl ${isDarkMode ? 'text-neutral-400' : 'text-neutral-400'}`}>
                <SplitText text="I'm always open to new opportunities, collaborations, and connections. Got a project to discuss or just want to say hi? Feel free to reach out!" delay={0.3}/>
               </span>
             </Magnet>
           </div>
        </div>
      <div className="h-30"></div>
      </section>

      <Dock items={items}
        baseItemSize={isMobile ? 35 : 45}
        panelHeight={isMobile ? 50 : 60} 
        magnification={isMobile ? 45 : 55}
        isDarkMode={isDarkMode}
      />

    </main>
  );
}
