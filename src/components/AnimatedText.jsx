/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Helper: Wrap each letter in its own mask group
const splitLetters = (text) =>
  text.split("").map((char, i) => (
    <span
      key={i}
      className="relative inline-block"
      style={{
        height: "1em",
        verticalAlign: "top",
        lineHeight: 1,
        fontSize: "inherit",
        overflow: "hidden",
      }}
    >
      {/* Top word (start state) */}
      <span className="block absolute top-0 left-0 w-full h-full rolling-old" style={{ willChange: "transform" }}>
        {char === " " ? "\u00A0" : char}
      </span>
      {/* Bottom word (end state) */}
      <span className="block absolute top-0 left-0 w-full h-full rolling-new" style={{ willChange: "transform" }}>
        {char === " " ? "\u00A0" : char}
      </span>
      {/* For the mask */}
      <span className="invisible">{char === " " ? "\u00A0" : char}</span>
    </span>
  ));

const AnimatedText = ({ text, className }) => {
  const textRef = useRef();

  useEffect(() => {
    if (!textRef.current) return;
    const olds = textRef.current.querySelectorAll(".rolling-old");
    const news = textRef.current.querySelectorAll(".rolling-new");

    // Generate a random order for the pairs
    const indices = Array.from({ length: olds.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 90%",
        toggleActions: "play none none none",
        // markers: true,
      }
    });

    // Animate each pair in random order
    indices.forEach((idx, order) => {
      tl.to(olds[idx], {
        yPercent: 100, // downward
        rotateX: -90,  // downward
        opacity: 0,
        duration: 1.3,
        ease: "expo.inOut"
      }, order * 0.06);
      tl.fromTo(news[idx],
        {
          yPercent: -100, // downward
          rotateX: 90,    // downward
          opacity: 0,
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.3,
          ease: "expo.inOut"
        },
        order * 0.06
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [text]);

  return (
    <div
      ref={textRef}
      className={`flex flex-wrap justify-center font-extrabold ${className}`}
      style={{ fontVariantLigatures: "none", gap: "0", lineHeight: 1, letterSpacing: "0" }}
    >
      {splitLetters(text)}
      <style>{`
        span.relative {
          overflow: hidden;
          height: 1em;
          line-height: 1;
          font-size: inherit;
        }
        .rolling-old, .rolling-new {
          position: absolute;
          left: 0; top: 0;
          width: 100%; height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-variant-ligatures: none;
          backface-visibility: hidden;
          line-height: 1;
          font-size: inherit;
        }
      `}</style>
    </div>
  );
};

export default AnimatedText;

