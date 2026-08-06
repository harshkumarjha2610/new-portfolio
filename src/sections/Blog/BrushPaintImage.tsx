/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect, useId } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { gsap } from "@/lib/gsap";
import type { BlogProject } from "./data";

/** Organic brush-stroke paths — each band reveals a slice of the image */
const BRUSH_STROKES = [
  "M-60,0 C140,35 300,8 420,28 L560,0 L560,88 C380,108 190,72 0,98 Z",
  "M-60,72 C160,92 330,62 490,88 L560,72 L560,168 C370,188 175,152 0,178 Z",
  "M-60,152 C150,178 320,145 480,170 L560,152 L560,252 C375,272 165,238 0,264 Z",
  "M-60,232 C155,258 310,225 475,250 L560,232 L560,340 C370,360 160,328 0,354 Z",
];

interface BrushPaintImageProps {
  project: BlogProject;
  isLight: boolean;
  sectionRef: React.RefObject<HTMLElement | null>;
}

export default function BrushPaintImage({
  project,
  isLight,
  sectionRef,
}: BrushPaintImageProps) {
  const uid = useId().replace(/:/g, "");
  const maskId = `brush-mask-${uid}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const strokeRefs = useRef<(SVGPathElement | null)[]>([]);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const paintOverlayRef = useRef<HTMLDivElement>(null);
  const wetEdgeRef = useRef<HTMLDivElement>(null);
  const overlaysRef = useRef<HTMLDivElement>(null);

  const revealProgress = useSpring(0, { stiffness: 120, damping: 28, mass: 0.6 });
  const imgScale = useTransform(revealProgress, [0, 1], [1.14, 1]);
  const imgRotate = useTransform(revealProgress, [0, 1], [1.2, 0]);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const imgWrap = imgWrapRef.current;
    const paintOverlay = paintOverlayRef.current;
    const wetEdge = wetEdgeRef.current;
    const overlays = overlaysRef.current;
    if (!section || !container || !imgWrap || !paintOverlay || !wetEdge || !overlays) return;

    const strokes = strokeRefs.current.filter(Boolean) as SVGPathElement[];

    gsap.set(strokes, { x: -560, opacity: 0.85 });
    gsap.set(imgWrap, { scale: 1.14, rotate: 1.2 });
    gsap.set(paintOverlay, { x: "-110%", opacity: 1 });
    gsap.set(wetEdge, { x: "-110%", opacity: 0.9 });
    gsap.set(overlays, { opacity: 0, y: 18 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 48%",
          toggleActions: "play none none reverse",
          onEnter: () => revealProgress.set(1),
          onLeaveBack: () => revealProgress.set(0),
        },
      });

      /* ── Phase 1: brush strokes sweep in (Canva-style paint) ── */
      tl.to(strokes, {
        x: 0,
        opacity: 1,
        duration: 0.72,
        stagger: { each: 0.11, from: "start" },
        ease: "power2.inOut",
      });

      /* ── Phase 2: wet paint edge follows the brush ── */
      tl.to(
        wetEdge,
        { x: "0%", opacity: 0.7, duration: 0.65, ease: "power2.out" },
        0.05
      );
      tl.to(wetEdge, { opacity: 0, duration: 0.35, ease: "power1.out" }, "-=0.15");

      /* ── Phase 3: paint overlay dissolves ── */
      tl.to(
        paintOverlay,
        { x: "110%", opacity: 0, duration: 0.8, ease: "power3.inOut" },
        0.2
      );

      /* ── Phase 4: image settles with subtle zoom-out ── */
      tl.to(
        imgWrap,
        { scale: 1, rotate: 0, duration: 1.1, ease: "power3.out" },
        0.35
      );

      /* ── Phase 5: corner labels fade up ── */
      tl.to(
        overlays,
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
        0.75
      );
    }, container);

    return () => ctx.revert();
  }, [sectionRef, revealProgress]);

  const paintColor = isLight ? "rgba(184,184,184,0.95)" : "rgba(28,28,28,0.95)";
  const wetColor = isLight ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.12)";

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Hidden SVG mask definition */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden>
        <defs>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="500"
            height="340"
          >
            <rect width="500" height="340" fill="black" />
            {BRUSH_STROKES.map((d, i) => (
              <path
                key={i}
                ref={(el) => {
                  strokeRefs.current[i] = el;
                }}
                d={d}
                fill="white"
              />
            ))}
          </mask>
        </defs>
      </svg>

      <div
        className="relative overflow-hidden w-full"
        style={{
          aspectRatio: "16 / 10",
          borderRadius: 4,
          background: isLight ? "rgba(17,17,17,0.06)" : "rgba(255,255,255,0.04)",
        }}
      >
        {/* Masked image */}
        <motion.div
          ref={imgWrapRef}
          className="absolute inset-0 origin-center"
          style={{
            scale: imgScale,
            rotate: imgRotate,
            WebkitMask: `url(#${maskId})`,
            mask: `url(#${maskId})`,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        >
          <img
            src={project.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            style={{
              filter: isLight
                ? "grayscale(15%) contrast(1.06) saturate(1.05)"
                : "grayscale(25%) contrast(1.12) saturate(1.08)",
            }}
          />
        </motion.div>

        {/* Paint overlay — sweeps away after brush reveal */}
        <div
          ref={paintOverlayRef}
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ background: paintColor }}
        />

        {/* Wet brush edge highlight */}
        <div
          ref={wetEdgeRef}
          className="absolute inset-y-0 -left-8 w-24 z-30 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${wetColor}, transparent)`,
            filter: "blur(6px)",
          }}
        />

        {/* Corner overlays — appear after paint completes */}
        <div ref={overlaysRef} className="absolute inset-0 z-40 pointer-events-none">
          <div
            className="absolute top-4 left-4 px-2.5 py-1 uppercase tracking-[0.14em]"
            style={{
              fontSize: "0.6rem",
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 700,
              color: isLight ? "#111" : "#fff",
              background: isLight ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.58)",
              backdropFilter: "blur(10px)",
            }}
          >
            {project.number}
          </div>
          <div
            className="absolute top-4 right-4 uppercase tracking-[0.14em]"
            style={{
              fontSize: "0.6rem",
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 600,
              color: isLight ? "rgba(17,17,17,0.7)" : "rgba(255,255,255,0.7)",
            }}
          >
            {project.year}
          </div>
          <div
            className="absolute bottom-4 left-4 uppercase tracking-[0.14em]"
            style={{
              fontSize: "0.6rem",
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 600,
              color: isLight ? "rgba(17,17,17,0.65)" : "rgba(255,255,255,0.65)",
            }}
          >
            {project.category}
          </div>
          <div
            className="absolute bottom-4 right-4 uppercase tracking-[0.14em]"
            style={{
              fontSize: "0.55rem",
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 600,
              color: isLight ? "rgba(17,17,17,0.5)" : "rgba(255,255,255,0.5)",
            }}
          >
            Read Article →
          </div>
        </div>
      </div>
    </div>
  );
}
