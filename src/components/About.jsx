import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import { RiNextjsFill } from "react-icons/ri";
import { DiCss3, DiHtml5, DiJavascript, DiNodejs, DiPython, DiMongodb } from "react-icons/di";
import { FaReact, FaGitAlt, FaFigma } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiFirebase } from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";

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
    <div id="about" className="w-full min-h-screen flex flex-col items-center justify-center">
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

          
        </div>
        
      </div>

    </div>
  );
};

export default About;
