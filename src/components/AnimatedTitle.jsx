import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);
  const animatedWords = useRef([]); // Will hold arrays of refs per line

useLayoutEffect(() => {
  const allWords = animatedWords.current.flat();
  const ctx = gsap.context(() => {
    const titleAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "10% bottom",
        toggleActions: "play none none reverse",
        
      },
    });

    titleAnimation.to(
      allWords,
      {
        opacity: 1,
        transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.02,
      },
      0
    );
    ScrollTrigger.refresh();
  }, containerRef);

  return () => ctx.revert();
}, []);

return (
  <div ref={containerRef} className={clsx("animated-title", containerClass)}>
    {title.split("<br />").map((line, lineIdx) => (
      <div
        key={lineIdx}
        className="flex-center max-w-full flex-wrap gap-2 px-8 md:gap-3"
      >
        {line.split(" ").map((word, wordIdx) => (
          <span
            ref={el => {
              if (!animatedWords.current[lineIdx]) animatedWords.current[lineIdx] = [];
              animatedWords.current[lineIdx][wordIdx] = el;
            }}
            key={wordIdx}
            className="animated-word font-light"
            dangerouslySetInnerHTML={{ __html: word }}
          />
        ))}
      </div>
    ))}
  </div>
)};
AnimatedTitle.propTypes = {
  title: PropTypes.string.isRequired,
  containerClass: PropTypes.string,
};


export default AnimatedTitle;
