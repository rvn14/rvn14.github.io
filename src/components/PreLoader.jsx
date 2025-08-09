/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

export default function PreLoader({
  assets = [],
  minDurationMs = 1000,
  onDone,
  ctaLabel = "START",
}) {
  const overlayRef = useRef(null);
  const progressWrapRef = useRef(null); // NEW — wrapper for count + bar
  const countRef = useRef(null);
  const barRef = useRef(null);
  const btnRef = useRef(null);

  const progressRef = useRef(0);
  const displayRef = useRef({ n: 0 });
  const startedAt = useRef(performance.now());
  const [readyForCTA, setReadyForCTA] = useState(false);

  const urls = useMemo(() => [...new Set(assets.filter(Boolean))], [assets]);

  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => (document.documentElement.style.overflow = prev);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const countEl = countRef.current;
    const barEl = barRef.current;
    const progressWrap = progressWrapRef.current;
    if (!overlay || !countEl) return;

    gsap.set(overlay, { opacity: 1 });
    gsap.set(countEl, { autoAlpha: 1 });
    gsap.set(btnRef.current, { autoAlpha: 0, y: 8 });

    let loaded = 0;
    const total = urls.length;

    const updateDisplay = (to) => {
      progressRef.current = Math.max(progressRef.current, to);
      gsap.to(displayRef.current, {
        n: progressRef.current,
        duration: 0.25,
        ease: "power2.out",
        onUpdate: () => {
          const val = Math.round(displayRef.current.n);
          countEl.textContent = val;
          if (barEl) barEl.style.width = `${val}%`;
        },
      });
    };

    const aborters = [];
    if (total > 0) {
      urls.forEach((url) => {
        const ctrl = new AbortController();
        aborters.push(ctrl);
        fetch(url, { signal: ctrl.signal })
          .then(() => {
            loaded += 1;
            updateDisplay(Math.min(99, (loaded / total) * 100));
          })
          .catch(() => {
            const img = new Image();
            img.onload = img.onerror = () => {
              loaded += 1;
              updateDisplay(Math.min(99, (loaded / total) * 100));
            };
            img.src = url;
          });
      });
    }

    const onWindowLoad = () => {
      updateDisplay(100);
      showCTAWhenReady();
    };
    window.addEventListener("load", onWindowLoad);

    const tick = gsap.ticker.add(() => {
      if (total === 0 && progressRef.current < 90) {
        updateDisplay(progressRef.current + 0.2);
      }
    });

    const showCTAWhenReady = () => {
      const elapsed = performance.now() - startedAt.current;
      const wait = Math.max(0, minDurationMs - elapsed);

      gsap.delayedCall(wait / 1000, () => {
        gsap.to(displayRef.current, {
          n: 100,
          duration: 0.3,
          ease: "power3.out",
          onUpdate: () => {
            const val = Math.round(displayRef.current.n);
            countEl.textContent = val;
            if (barEl) barEl.style.width = `${val}%`;
          },
          onComplete: () => {
            // Hide entire progress section (count + bar)
            gsap.set(progressWrap, { display: "none" });

            // Show button
            gsap.to(btnRef.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" });
            setReadyForCTA(true);
          },
        });
      });
    };

    if (total === 0 && document.readyState === "complete") {
      updateDisplay(100);
      showCTAWhenReady();
    }

    return () => {
      window.removeEventListener("load", onWindowLoad);
      gsap.ticker.remove(tick);
      aborters.forEach((a) => a.abort?.());
      gsap.killTweensOf(displayRef.current);
    };
  }, [urls, minDurationMs]);

  const handleEnter = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        overlayRef.current.style.display = "none";
        onDone?.();
      },
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-black text-lavender-400 flex items-center justify-center select-none font-outfit"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Progress Wrapper */}
        <div ref={progressWrapRef} className="flex flex-col items-center gap-4">
          <div className="text-5xl md:text-7xl font-extrabold tabular-nums tracking-widest">
            <span ref={countRef}>0</span>
            <span className="opacity-80">%</span>
          </div>
          <div className="w-56 md:w-72 h-[3px] bg-white/10 overflow-hidden rounded">
            <div ref={barRef} className="h-full bg-lavender-400" style={{ width: "0%" }} />
          </div>
        </div>

        {/* CTA Button */}
        <button
          ref={btnRef}
          onClick={handleEnter}
          disabled={!readyForCTA}
          className={` px-12 py-2 rounded-3xl border border-lavender-400 bg-charcoal hover:bg-lavender-400 hover:text-charcoal transition text-outfit font-semibold tracking-widest duration-500 ${
            readyForCTA ? "cursor-pointer" : "cursor-not-allowed"
          }`}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
