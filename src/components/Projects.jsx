/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DiReact } from "react-icons/di";
import { FaGithub } from "react-icons/fa6";
import { TiLocationArrow } from "react-icons/ti";

gsap.registerPlugin(ScrollTrigger);

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 4; 
    const tiltY = (relativeX - 0.5) * -4; 

    const newTransform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };
  
  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transform: transformStyle, 
        transition: "transform 0.3s ease-out",
        willChange: "transform"
      }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon, repoLink, siteLink }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [repoHoverOpacity, setRepoHoverOpacity] = useState(0);
  const [siteHoverOpacity, setSiteHoverOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const repoButtonRef = useRef(null);
  const siteButtonRef = useRef(null);

  const handleMouseMove = (event, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };



  return (
    <div 
      className="relative size-full overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        className={`object-center object-cover z-0 w-full h-full transition-transform duration-500`} 
        src={src}
        alt={typeof title === 'string' ? title : 'Project thumbnail'}
      />
      <div className="absolute top-0 z-10 flex size-full flex-col justify-between p-5 bg-gradient-to-b from-black/0 to-black/0 text-gray-50 transition-opacity duration-300">
        <div className="flex flex-col p-3 bg-black/20 backdrop-blur-xs rounded-lg border-hsla shadow-lg">
          <div className="flex items-center justify-between ">
            <h1 className="bento-title special-font font-light select-none">{title}</h1>
            
          </div>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-sm  select-none line-clamp-3 text-gray-50">{description}</p>
          )}
        </div>
        
        {!isComingSoon && (
          <div className="flex gap-3 flex-wrap">
            {repoLink && (
              <div
                ref={repoButtonRef}
                onMouseMove={(e) => handleMouseMove(e, repoButtonRef)}
                onMouseEnter={() => setRepoHoverOpacity(1)}
                onMouseLeave={() => setRepoHoverOpacity(0)}
                className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black/80 px-5 py-2 text-xs uppercase text-gray-50"
              >
                <div
                  className="pointer-events-none absolute -inset-px transition-opacity duration-500"
                  style={{
                    opacity: repoHoverOpacity,
                    background: `radial-gradient(150px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #5d3fd388, transparent 70%)`,
                    willChange: "opacity, background"
                  }}
                />
                <a href={repoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <FaGithub className="text-xl" />
                  <p className="relative z-20">Github</p>
                </a>
              </div>
            )}
            
            {siteLink && (
              <div
                ref={siteButtonRef}
                onMouseMove={(e) => handleMouseMove(e, siteButtonRef)}
                onMouseEnter={() => setSiteHoverOpacity(1)}
                onMouseLeave={() => setSiteHoverOpacity(0)}
                className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black/80 px-5 py-2 text-xs uppercase text-gray-50"
              >
                <div
                  className="pointer-events-none absolute -inset-px transition-opacity duration-500"
                  style={{
                    opacity: siteHoverOpacity,
                    background: `radial-gradient(150px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #5d3fd388, transparent 70%)`,
                    willChange: "opacity, background"
                  }}
                />
                <a href={siteLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <TiLocationArrow className="text-xl" />
                  <p className="relative z-20">Live Demo</p>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Projects = () => {

  

  return (
    
      <section className="w-full bg-black z-1 pb-16 pt-16 lg:pt-36">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 pb-16">
          <p className="font-zentry special-font text-4xl md:text-9xl text-lavender-100">
            PRO<b>J</b>ECTS
          </p>
          <p className="max-w-md text-lg text-lavender-100 opacity-50">
            A collection of my projects, showcasing my skills and creativity.
            I am constantly working on new projects, so stay tuned for more updates!
          </p>
        </div>

        <BentoTilt className="border-hsla bento-tilt_1 relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="images/pizzario.jpg"
            title={
              <>
                PIZZ<b>A</b>RIO
              </>
            }
            description="A fuly functional Pizza Restaurant website, built with NextJS, ThreeJS and Tailwind CSS."
            repoLink="https://github.com/rvn14/pizzario"
            siteLink="https://pizzario-rvn14.vercel.app"
          />
        </BentoTilt>

        <div className="grid w-full grid-cols-2 grid-rows-2 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:ms-0 h-96">
            <BentoCard
              src="images/newsscraper.jpg"
              title={
                <>
                  N<b>E</b>WS Scraper
                </>
              }
              description="A web scraper that collects news articles from various sources and gives more accurate news in a nice web app."
              repoLink="https://github.com/rvn14/newsapp"
              siteLink="https://newsapp-snowy-ten.vercel.app"
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1  md:col-span-1 md:me-0 h-96">
            <BentoCard
              src="videos/feature-4.mp4"
              title={
                <>
                  az<b>u</b>l
                </>
              }
              description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
              
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1  md:col-span-1 md:ms-0 h-96">
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  n<b>e</b>xus
                </>
              }
              description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
              
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1  md:col-span-1 md:ms-0 h-96">
            <div className="flex size-full flex-col justify-between bg-lavender-500 p-5">
              <h1 className="bento-title text-7xl special-font font-light max-w-64 text-black">
                M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
              </h1>

              <TiLocationArrow className="m-5 scale-5 self-end" />
            </div>
          </BentoTilt>

          

        </div>
      </div>
    </section>
  )
}

export default Projects;
