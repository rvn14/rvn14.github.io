import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { logoData } from "../assets/logoData";

gsap.registerPlugin(ScrollTrigger);

const FadeInSection = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const maskData = logoData;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Set up resize observer for responsive adjustments
    const resizeObserver = new ResizeObserver(() => {
      checkMobile();
      // Refresh ScrollTrigger when size changes
      ScrollTrigger.refresh();
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: isMobile ? 1 : 2,
        pin: true,
        start: "top top",
        end: isMobile ? "+=1500" : "+=2000",
        ease: "power2.out",
      },
    });

    // Initial states
    tl.set(imageRef.current, {
      scale: isMobile ? 1.05 : 1.05,
      opacity: 1,
    });

    tl.set(".about-content", {
      scale: isMobile ? 20 : 30,
      opacity: 0, // Start completely invisible
      visibility: "hidden" // Ensure hidden from the start
    });

    // Add subtle glow effect
    tl.set(".text-glow", {
      opacity: 0,
    });

    // First animate background image with smoother easing
    tl.to(imageRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    });

    // Run the masked text reveal in parallel with the image animation
    tl.to(".about-content", {
      opacity: 1, // Make it appear
      visibility: "visible", // Make it visible
      duration: 0.3,
      ease: "power2.in",
    }, "<"); // "<" position parameter makes it start at the same time as the previous animation

    // Then scale down the masked text
    tl.to(".about-content", {
      scale: 1,
      duration: isMobile ? 1.5 : 2,
      ease: "expo.out",
    }, "-=1"); 

    // Add glow effect for modern look
    tl.to(".text-glow", {
      opacity: 0.7,
      duration: 1,
    }, "-=1.5");

    // Subtle movement adjusted for mobile
    tl.to(imageRef.current, {
      y: isMobile ? "2%" : "3%",
      duration: isMobile ? 2 : 3,
      ease: "sine.inOut",
    }, "-=2");

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
      resizeObserver.disconnect();
    };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="about-container relative bg-black min-h-screen overflow-hidden">
      <img
        ref={imageRef}
        src="/images/aboutbg2.jpg"
        alt=""
        className="about-img w-full h-full object-cover absolute inset-0 z-0"
      />
        <div className="about-content absolute top-0 z-10 flex items-center justify-center h-full w-full opacity-0 invisible">
            {/* Modern glow effect behind text */}
            <div className="text-glow absolute w-full h-full flex items-center justify-center">
              <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-pink-500/20 blur-3xl w-3/4 h-1/2 rounded-full"></div>
            </div>
            
            <svg
            viewBox="0 0 512 512"
            preserveAspectRatio="xMidYMid slice"
            width="100%"
            height="100%"
            className="textMask absolute inset-0"
            >
            <defs>
                <mask id="mask" width="100%" height="100%" x="0" y="0">
                    <rect x="0" y="0" width="100%" height="100%" fill="white"/>
                    <text 
                      ref={textRef}
                      x="50%" 
                      y="40%" 
                      textAnchor="middle" 
                      dominantBaseline="middle" 
                      className="font-black font-inter"
                      style={{
                        fontSize: isMobile ? "min(8vw, 3.5rem)" : "min(12vw, 4.5rem)",
                        fontWeight: "900",
                      }}
                      fill="black">
                        <tspan x="50%" dy="0">Dasun</tspan>
                        <tspan x="50%" dy="1em">Adithya</tspan>
                        
                    </text>
                </mask>
            </defs>
            <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="black"
                mask="url(#mask)"
            />
            </svg>
        </div>
        

    </div>
  );
};

export default FadeInSection;
