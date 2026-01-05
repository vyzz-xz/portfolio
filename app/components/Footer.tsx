'use client';

import { LuArrowUpRight } from 'react-icons/lu';

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  
  const currentYear = new Date().getFullYear();

 const footerLinks = [
    {
      title: "Links",
      links: [
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
      ]
    },
    {
      title: "Connect",
      links: [
        { name: "LinkedIn", href: "https://linkedin.com" },
        { name: "GitHub", href: "https://github.com" },
        { name: "Instagram", href: "https://instagram.com" },
      ]
    }
  ];

  return (
    <footer
      className={`
        w-full h-full
        px-10 md:px-12 pt-20 pb-40 md:pb-52
        flex flex-col justify-between
        border-t
        transition-colors duration-500
        
        ${isDarkMode 
          ? 'bg-white text-black border-t border-neutral-300' 
          : 'bg-[#0f0f0f] text-white border-t border-neutral-800'
        }
      `}
    >
      <div className="max-w-8xl mx-auto w-full flex flex-col md:flex-row justify-between gap-10 md:gap-0 mb-7 mb:mb-20">
        
        <div className="flex flex-col gap-4">
           <div className="w-full md:max-w-md">
            <p className={`text-xs md:text-base font-normal leading-normal ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Crafting digital experiences with code and creativity, blending aesthetics with functionality for a seamless and impactful digital presence.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-10 md:gap-19">
          {footerLinks.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <h4 className={`text-xs md:text-lg font-medium ${isDarkMode ? 'text-black' : 'text-neutral-100'}`}>
                {section.title}
              </h4>
              <ul className="flex flex-col gap-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.href} 
                      className={`
                        flex items-center gap-1 text-xs md:text-base font-light transition-colors duration-300 group
                        ${isDarkMode ? 'text-neutral-500 hover:text-black' : 'text-neutral-400 hover:text-white'}
                      `}
                    >
                      {link.name}
                      <LuArrowUpRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={`w-full pt-6 border-t flex flex-col md:flex-row justify-center items-center gap-2 text-center ${isDarkMode ? 'border-neutral-300' : 'border-neutral-800'}`}>
        <span className={`text-[10px] md:text-xs font-reguler ${isDarkMode ? 'text-neutral-500' : 'text-neutral-300'}`}>
          © {currentYear} Muhamad Hafiz. All Rights reserved.
        </span>
      </div>

    </footer>
  );
}