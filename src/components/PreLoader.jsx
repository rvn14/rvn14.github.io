/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

export default function PreLoader({
  assets = ["/video/Aurora.mp4",
            "/images/aboutbg2.jpg",
            "/images/propic.jpg",],
  minDurationMs = 1500,         
  onDone,                       
  ctaLabel = "START",
}) {
  const overlayRef = useRef(null);
  const progressWrapRef = useRef(null); // wraps count + bar
  const countRef = useRef(null);
  const barRef = useRef(null);
  const btnRef = useRef(null);

  const progressRef = useRef(0);        // target % (0..100)
  const displayRef = useRef({ n: 0 });  // animated number
  const startedAt = useRef(performance.now());
  const [readyForCTA, setReadyForCTA] = useState(false);

  // dedupe valid URLs
  const urls = useMemo(() => [...new Set(assets.filter(Boolean))], [assets]);

  // lock scroll while loader is visible
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
    if (!overlay || !countEl || !progressWrap) return;

    gsap.set(overlay, { opacity: 1 });
    gsap.set(countEl, { autoAlpha: 1 });
    gsap.set(btnRef.current, { autoAlpha: 0, y: 8 });

    // helper: tween number + bar
    const setDisplay = (to) => {
      progressRef.current = Math.max(progressRef.current, to);
      gsap.to(displayRef.current, {
        n: progressRef.current,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          const v = Math.round(displayRef.current.n);
          countEl.textContent = v;
          if (barEl) barEl.style.width = `${v}%`;
        },
      });
    };

    // robust per-URL loader (images, videos, anything else via fetch)
    const loadWithType = (url, signal) =>
      new Promise((resolve) => {
        const finish = (ok) => resolve(ok);

        const ext = (url.split("?")[0].split("#")[0].split(".").pop() || "").toLowerCase();

        // images
        if (["png", "jpg", "jpeg", "webp", "gif", "svg", "avif"].includes(ext)) {
          const img = new Image();
          img.onload = () => finish(true);
          img.onerror = () => finish(false);
          img.src = url;
          return;
        }

        // videos
        if (["mp4", "webm", "ogg"].includes(ext)) {
          const video = document.createElement("video");
          video.preload = "auto";
          const cleanup = () => {
            video.onloadeddata = null;
            video.onerror = null;
          };
          video.onloadeddata = () => {
            cleanup();
            finish(true);
          };
          video.onerror = () => {
            cleanup();
            finish(false);
          };
          // warm the cache via fetch (some servers require it)
          fetch(url, { signal }).finally(() => {
            video.src = url;
          });
          return;
        }

        // everything else: fetch
        fetch(url, { signal }).then(() => finish(true)).catch(() => finish(false));
      });

    let loaded = 0;
    const total = urls.length;
    const controller = new AbortController();

    const bump = () => {
      if (total === 0) return;
      loaded += 1;
      const pct = Math.floor((loaded / total) * 100);
      // cap at 99 until we decide to finish
      setDisplay(Math.min(99, pct));
      maybeFinish();
    };

    // window load flag (page may already be loaded)
    let windowLoaded = document.readyState === "complete";
    const onWindowLoad = () => {
      windowLoaded = true;
      maybeFinish();
    };
    window.addEventListener("load", onWindowLoad);

    // smooth drift if no explicit assets
    let driftRemover = null;
    if (total === 0) {
      const drift = () => {
        if (displayRef.current.n < 90) setDisplay(displayRef.current.n + 0.15);
      };
      gsap.ticker.add(drift);
      driftRemover = () => gsap.ticker.remove(drift);
    }

    const started = performance.now();

    const finishToCTA = () => {
      const elapsed = performance.now() - started;
      const wait = Math.max(0, minDurationMs - elapsed);

      gsap.delayedCall(wait / 1000, () => {
        gsap.to(displayRef.current, {
          n: 100,
          duration: 0.35,
          ease: "power3.out",
          onUpdate: () => {
            const v = Math.round(displayRef.current.n);
            countEl.textContent = v;
            if (barEl) barEl.style.width = `${v}%`;
          },
          onComplete: () => {
            // hide the progress UI entirely
            gsap.set(progressWrap, { display: "none" });
            // reveal CTA
            gsap.to(btnRef.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" });
            setReadyForCTA(true);
          },
        });
      });
    };

    // decide when to finish (either all assets OR window loaded)
    const allAssetsLoaded = () => total === 0 || loaded >= total;
    const maybeFinish = () => {
      if (allAssetsLoaded() || windowLoaded) finishToCTA();
    };

    // kick off loads with per-asset timeout so one bad URL won't hang
    if (total > 0) {
      urls.forEach((url) => {
        const timeout = setTimeout(() => bump(), 15000); // 15s safety net
        loadWithType(url, controller.signal)
          .finally(() => {
            clearTimeout(timeout);
            bump();
          });
      });
    } else {
      // no assets: if the page is already loaded, finish; else wait for onload
      maybeFinish();
    }

    return () => {
      window.removeEventListener("load", onWindowLoad);
      controller.abort();
      if (driftRemover) driftRemover();
      gsap.killTweensOf(displayRef.current);
    };
  }, [urls, minDurationMs]);

  // CTA click -> fade overlay out and unmount
  const handleEnter = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        if (overlayRef.current) overlayRef.current.style.display = "none";
        onDone?.();
      },
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-black text-lavender-400 flex items-center justify-center select-none font-outfit"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Progress (hidden after 100%) */}
        <div ref={progressWrapRef} className="flex flex-col items-center gap-4">
          <div className="text-5xl md:text-7xl font-extrabold tabular-nums tracking-widest">
            <span ref={countRef}>0</span>
            <span className="opacity-80">%</span>
          </div>
          <div className="w-56 md:w-72 h-[3px] bg-white/10 overflow-hidden rounded">
            <div ref={barRef} className="h-full bg-lavender-400" style={{ width: "0%" }} />
          </div>
        </div>

        {/* CTA (appears after minDuration & load) */}
        <button
          ref={btnRef}
          onClick={handleEnter}
          disabled={!readyForCTA}
          className={`px-12 py-2 rounded-3xl border opacity-0 border-lavender-400 bg-charcoal hover:bg-lavender-400 hover:text-charcoal transition text-outfit font-semibold tracking-widest duration-500 ${
            readyForCTA ? "cursor-pointer" : "cursor-not-allowed"
          }`}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
