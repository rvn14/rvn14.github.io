/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import gsap from "gsap";
// ScrollTrigger optional; you can remove if not needed
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Helper: create masked double stack for each character
const splitLetters = (text) =>
  text.split("").map((char, i) => (
    <span
      key={i}
      className="mask-letter relative inline-block align-baseline"
      data-axis="mixed"     // will be randomized in useEffect
      data-sign="mixed"     // will be randomized in useEffect
      style={{
        height: "1em",
        lineHeight: 1,
        fontSize: "inherit",
        overflow: "hidden",
        verticalAlign: "top",
      }}
    >
      {/* Top copy (start state / old) */}
      <span
        className="rolling-old block absolute top-0 left-0 w-full h-full"
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
      {/* Bottom copy (end state / new) */}
      <span
        className="rolling-new block absolute top-0 left-0 w-full h-full"
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
      {/* Invisible for natural width */}
      <span className="invisible">{char === " " ? "\u00A0" : char}</span>
    </span>
  ));

const LoopText = ({
  text,
  className = "",
  duration = 1.2,    // per-letter tween duration
  stagger = 4,     // delay between letters (set equal to duration for one-at-a-time)
  repeatDelay = 1, // delay between loops
  loop = true,        // infinite loop
}) => {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const masks = Array.from(root.querySelectorAll(".mask-letter"));
    const olds  = masks.map((m) => m.querySelector(".rolling-old"));
    const news  = masks.map((m) => m.querySelector(".rolling-new"));

    // Randomize axis & sign per letter (once per render)
    // axis: 'v' (vertical) or 'h' (horizontal)
    // sign: +1 or -1 (down/right vs up/left)
    masks.forEach((mask) => {
      const axis = Math.random() < 0.5 ? "v" : "h";
      const sign = Math.random() < 0.5 ? 1 : -1;
      mask.dataset.axis = axis;
      mask.dataset.sign = String(sign);
    });

    // Random play order (like your original)
    const indices = Array.from({ length: masks.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Function: set initial positions for all letters based on their axis/sign
    const resetPositions = () => {
      masks.forEach((mask, i) => {
        const axis = mask.dataset.axis;       // 'v' | 'h'
        const sign = Number(mask.dataset.sign); // +1 | -1
        const oldEl = olds[i];
        const newEl = news[i];

        if (axis === "v") {
          // old starts visible at 0, new sits "above" or "below" ready to roll in
          gsap.set(oldEl, { xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 1 });
          gsap.set(newEl, { xPercent: 0, yPercent: -100 * sign, rotateX: 90 * sign, rotateY: 0, opacity: 0 });
        } else {
          // horizontal
          gsap.set(oldEl, { xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 1 });
          gsap.set(newEl, { xPercent: -100 * sign, yPercent: 0, rotateX: 0, rotateY: -90 * sign, opacity: 0 });
        }
      });
    };

    // Build timeline
    const tl = gsap.timeline({
      repeat: loop ? -1 : 0,
      repeatDelay,
      defaults: { ease: "expo.inOut", duration },
      onStart: resetPositions,
      onRepeat: resetPositions, // ensure clean loop without accumulation
    });

    // Animate in randomized order
    indices.forEach((idx, order) => {
      const mask = masks[idx];
      const axis = mask.dataset.axis;
      const sign = Number(mask.dataset.sign);
      const oldEl = olds[idx];
      const newEl = news[idx];

      if (axis === "v") {
        // Vertical roll (top/bottom)
        tl.to(
          oldEl,
          {
            yPercent: 100 * sign,    // roll out in chosen vertical direction
            rotateX: -90 * sign,
            opacity: 0,
          },
          order * stagger
        ).to(
          newEl,
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
          },
          order * stagger // sync with old's start for seamless swap
        );
      } else {
        // Horizontal roll (left/right)
        tl.to(
          oldEl,
          {
            xPercent: 100 * sign,    // roll out in chosen horizontal direction
            rotateY: 90 * sign,
            opacity: 0,
          },
          order * stagger
        ).to(
          newEl,
          {
            xPercent: 0,
            rotateY: 0,
            opacity: 1,
          },
          order * stagger
        );
      }
    });

    return () => {
      tl.kill();
      // If you’re not using ScrollTrigger in this component, you can remove this line:
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [text, duration, stagger, repeatDelay, loop]);

  return (
    <div
      ref={rootRef}
      className={`flex flex-wrap justify-center font-extrabold select-none ${className}`}
      style={{ fontVariantLigatures: "none", gap: 0, lineHeight: 1, letterSpacing: 0, perspective: "800px" }}
    >
      {splitLetters(text)}
      <style>{`
        .mask-letter { overflow: hidden; height: 1em; line-height: 1; font-size: inherit; }
        .rolling-old, .rolling-new {
          position: absolute;
          left: 0; top: 0;
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-variant-ligatures: none;
          backface-visibility: hidden;
          line-height: 1; font-size: inherit;
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
};

export default LoopText;
