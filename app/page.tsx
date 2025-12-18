'use client';

import Image from "next/image";
import ScrollVelocity from "./components/ScrollVelocity"
import Dock from './components/Dock';
import TextPressure from "./components/TextPressure";
import Clock from "./components/Clock";
import ScrollButton from "./components/ScrollButton";
import ScrollReveal from "./components/ScrollReveal";

import { 
  VscHome, 
  VscAccount, 
  VscFolderLibrary, 
  VscGithubAlt, 
} from "react-icons/vsc";

import { FaLinkedinIn } from "react-icons/fa6";

export default function Home() {
  const items = [
    { 
      icon: <VscHome size={17} />, 
      label: 'Home', 
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) 
    },
    { 
      icon: <VscAccount size={17} />, 
      label: 'About', 
      onClick: () => alert('About Me') 
    },
    { 
      icon: <VscFolderLibrary size={17} />, 
      label: 'Projects', 
      onClick: () => alert('My Projects') 
    },
    { 
      icon: <VscGithubAlt size={17} />, 
      label: 'GitHub', 
      onClick: () => window.open('https://github.com/vyzz-xz', '_blank') 
    },
    { 
      icon: <FaLinkedinIn size={17} />, 
      label: 'LinkedIn', 
      onClick: () => window.open('https://www.linkedin.com/in/muhamad-hafiz-37467b346', '_blank') 
    },

  ];

  return (
    <main className="min-h-screen w-full relative bg-white flex flex-col justify-center">

    <div className="fixed top-6 left-6 z-50"><Clock /></div>
    
    {/* HERO SECTION */}
    <section id="hero" className="relative w-full h-screen flex flex-col justify-center items-center z-10 overflow-hidden">

    <div className="absolute inset-0 z-0 pointer-events-none">
      {(<div className="absolute inset-0 bg-white bg-[radial-gradient(100%_100%_at_50%_0%,rgba(128,0,0,0)_0,rgba(128,0,0,0.15)_50%,rgba(128,0,0,0)_100%)]" />)}
    </div>

    <div className="w-full flex flex-col justify-center items-center z-0 px-4">

    <div className="absolute top-[23%] left-0 right-0 flex justify-center z-20 px-4">
    <div className="w-full max-w-[300px] h-12 relative flex items-center justify-center cursor-default">
      <TextPressure
        text="MUHAMAD HAFIZ"
        flex={true}
        alpha={false}
        stroke={false}
        width={true}
        weight={true}
        italic={true}
        textColor={"#000000"}
        minFontSize={10}
        />
      </div>
    </div>
  </div>
      
    <div className="w-full relative z-10 transform scale-110 md:scale-100 -mt-12">
      <ScrollVelocity
        texts={['UI/UX DESIGNER - TECH ENTHUSIAST - FRONTEND DEVELOPER -']} 
        velocity={150}
        numCopies={100} 
        className="font-redhat text-[5rem] md:text-[8rem] font-black tracking-[-0.08em] leading-[0.8] text-black whitespace-nowrap"
      />
    </div>
    <div className="w-full -mt-0 md:-mt-0">
      <ScrollVelocity
        texts={['TECH ENTHUSIAST - FRONTEND DEVELOPER - UI/UX DESIGNER -']} 
        velocity={-150}
        numCopies={100} 
        className="font-redhat text-[5rem] md:text-[8rem] font-black tracking-[-0.08em] leading-[0.8] text-black whitespace-nowrap"
      />
    </div>

      <div className="absolute bottom-[20%] left-0 right-0 flex justify-center z-20 pointer-events-auto">
        <ScrollButton />
      </div>
  </section>
  
  {/*SECTION ABOUT*/}
      <section id="about" className="relative w-full min-h-[80vh] flex flex-col items-center justify-center py-20 px-6 md:px-20 z-10">
        <div className="max-w-5xl w-full text-center">
          
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

      <Dock items={items} />

    </main>
  );
}
