import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import { RiNextjsFill } from "react-icons/ri";
import { DiCss3, DiHtml5, DiJavascript, DiNodejs, DiPython, DiMongodb } from "react-icons/di";
import { FaReact, FaGitAlt, FaFigma } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiFirebase } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const About = () => {

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });

    
  });


  return (
    <div id="about" className="w-full ">
      <div className="relative mt-12 flex flex-col items-center gap-5">
        <div className="flex flex-col items-center justify-center gap-5">
          <p className="font-general text-sm uppercase md:text-[12px]">
            Welcome to My Portfolio
          </p>

          <AnimatedTitle
            title="GRAPHIC <b>DES</b>IGNER & <br /> FULLSTACK <b>WEB</b> DEVELOPER"
            containerClass="mt-2 text-black! text-center"
          />
        </div>

        <div>

        </div>

        <div className="flex flex-col items-center justify-center text-center pb-12">
          {/* <div className="flex flex-col items-center justify-center">
            <p className="font-semibold text-lg">Hi! my name is Dasun Adithya</p>
            <p className="text-gray-500 w-2/3">
            <span>I am a <span className ="text-[#8e6fa3]" >Computer Science</span> undergraduate with strong coding skills and a passion for designing websites, interfaces, and graphics.</span>
            </p>
          </div> */}

          <div className="skillset flex items-center justify-center gap-5 mt-5 flex-wrap max-w-3xl">
            <div className="skill-item bg-black/10 rounded-full p-2 hover:scale-105 transition-transform duration-300 relative group">
              <DiHtml5 className="text-4xl text-black" />
              <span className="skill-tooltip absolute -bottom-9 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">HTML5</span>
            </div>
            
            <div className="skill-item bg-black/10 rounded-full p-2 hover:scale-105 transition-transform duration-300 relative group">
              <DiCss3 className="text-4xl text-black" />
              <span className="skill-tooltip absolute -bottom-9 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">CSS3</span>
            </div>
            
            <div className="skill-item bg-black/10 rounded-full p-2 hover:scale-105 transition-transform duration-300 relative group">
              <DiJavascript className="text-4xl text-black" />
              <span className="skill-tooltip absolute -bottom-9 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">JavaScript</span>
            </div>
            
            <div className="skill-item bg-black/10 rounded-full p-2 hover:scale-105 transition-transform duration-300 relative group">
              <FaReact className="text-4xl text-black" />
              <span className="skill-tooltip absolute -bottom-9 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">React</span>
            </div>
            
            <div className="skill-item bg-black/10 rounded-full p-2 hover:scale-105 transition-transform duration-300 relative group">
              <SiTypescript className="text-4xl text-black" />
              <span className="skill-tooltip absolute -bottom-9 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">TypeScript</span>
            </div>

            <div className="skill-item bg-black/10 rounded-full p-2 hover:scale-105 transition-transform duration-300 relative group">
              <SiTailwindcss className="text-4xl text-black" />
              <span className="skill-tooltip absolute -bottom-9 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Tailwind CSS</span>
            </div>

            <div className="skill-item bg-black/10 rounded-full p-2 hover:scale-105 transition-transform duration-300 relative group">
              <RiNextjsFill className="text-4xl text-black" />
              <span className="skill-tooltip absolute -bottom-9 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Next.js</span>
            </div>
            
            <div className="skill-item bg-black/10 rounded-full p-2 hover:scale-105 transition-transform duration-300 relative group">
              <DiNodejs className="text-4xl text-black" />
              <span className="skill-tooltip absolute -bottom-9 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Node.js</span>
            </div>
            
            <div className="skill-item bg-black/10 rounded-full p-2 hover:scale-105 transition-transform duration-300 relative group">
              <DiPython className="text-4xl text-black" />
              <span className="skill-tooltip absolute -bottom-9 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Python</span>
            </div>
            
            <div className="skill-item bg-black/10 rounded-full p-2 hover:scale-105 transition-transform duration-300 relative group">
              <DiMongodb className="text-4xl text-black" />
              <span className="skill-tooltip absolute -bottom-9 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">MongoDB</span>
            </div>
            
            <div className="skill-item bg-black/10 rounded-full p-2 hover:scale-105 transition-transform duration-300 relative group">
              <FaGitAlt className="text-4xl text-black" />
              <span className="skill-tooltip absolute -bottom-9 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Git</span>
            </div>
            
            <div className="skill-item bg-black/10 rounded-full p-2 hover:scale-105 transition-transform duration-300 relative group">
              <FaFigma className="text-4xl text-black" />
              <span className="skill-tooltip absolute -bottom-9 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Figma</span>
            </div>
            
            <div className="skill-item bg-black/10 rounded-full p-2 hover:scale-105 transition-transform duration-300 relative group">
              <SiFirebase className="text-4xl text-black" />
              <span className="skill-tooltip absolute -bottom-9 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Firebase</span>
            </div>
          </div>
        </div>
        
      </div>

    </div>
  );
};

export default About;
