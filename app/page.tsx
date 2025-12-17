'use client';

import Image from "next/image";
import ScrollVelocity from "./components/ScrollVelocity"
import Dock from './components/Dock';
import TextPressure from "./components/TextPressure";
import Clock from "./components/Clock";
import ScrollButton from "./components/ScrollButton";
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
    <main className="min-h-screen w-full bg-white overflow-x-hidden flex flex-col justify-center">

    <div className="fixed inset-0 z-0 pointer-events-none">
        {(
          <div className="absolute inset-0 bg-white bg-[radial-gradient(100%_100%_at_50%_0%,rgba(128,0,0,0)_0,rgba(128,0,0,0.15)_50%,rgba(128,0,0,0)_100%)]" />
        )}
      </div>

      <div className="absolute top-6 left-6 z-50">
        <Clock />
      </div>

      <div className="w-full flex flex-col justify-center items-center z-0 px-4">

        <div className="w-full max-w-[260px] h-12 relative flex items-center justify-center mb-32 cursor-default z-20">
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
      
      <div className="w-full z-10 mb-3 -mt-20">
        <ScrollVelocity
          texts={['UI/UX DESIGNER - TECH ENTHUSIAST - FRONTEND DEVELOPER -']} 
          velocity={150}
          numCopies={50} 
          className="font-redhat text-[5rem] md:text-[8rem] font-black tracking-[-0.08em] leading-[0.8] text-black whitespace-nowrap"
        />
      </div>
      <div className="w-full -mt-0 md:-mt-0">
        <ScrollVelocity
          texts={['TECH ENTHUSIAST - FRONTEND DEVELOPER - UI/UX DESIGNER -']} 
          velocity={-150}
          numCopies={50} 
          className="font-redhat text-[5rem] md:text-[8rem] font-black tracking-[-0.08em] leading-[0.8] text-black whitespace-nowrap"
        />
      </div>

      <div className="flex justify-center mt-12 z-50 pointer-events-auto">
           <ScrollButton />
        </div>
        
      <Dock items={items} />

    </main>
  );
}
