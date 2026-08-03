"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type Transition as MotionTransition,
} from "framer-motion";
import { type CSSProperties } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const WORD = "WORKS";
const BG   = "#a6a6a6";
const GLASS = "#a6a6a6";

const LEFT_COLORS: Record<number, string> = {
  0: "#ffffff", 1: "#1a1a1a", 2: "#545454", 3: "#1a1a1a", 4: "#1a1a1a",
};
const RIGHT_COLORS: Record<number, string> = {
  0: "#d3d3d3", 1: "#1a1a1a", 2: "#1a1a1a", 3: "#c0c0c0", 4: "#1a1a1a",
};

const FS = "clamp(3.8rem, 9.5vw, 9rem)";
const LH = 1.0;

/* ─── AnimChar ─────────────────────────────────────────────────── */
function AnimChar({
  char, progress, colStart, colEnd, direction, color,
}: {
  char: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  colStart: number; colEnd: number;
  direction: "down" | "up";
  color: string;
}) {
  const raw = useTransform(
    progress,
    [colStart, colEnd],
    direction === "down" ? ["-105%", "0%"] : ["105%", "0%"]
  );
  const y = useSpring(raw, { stiffness: 120, damping: 22, mass: 0.6 });

  return (
    <span style={{ display: "inline-block", overflow: "hidden", lineHeight: LH }}>
      <motion.span
        style={{
          display: "inline-block", y, color,
          fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
          fontSize: FS, fontWeight: 700, lineHeight: LH,
          letterSpacing: "-0.01em", willChange: "transform",
        }}
      >
        {char}
      </motion.span>
    </span>
  );
}

/* ─── Works list data ─────────────────────────────────────────── */
const WORK_ITEMS = [
  { text: "FULL-STACK WEB APP",  src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80" },
  { text: "AI DASHBOARD",         src: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80" },
  { text: "BRAND IDENTITY",       src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80" },
  { text: "3D INTERACTIVE SITE",  src: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&q=80" },
  { text: "MOBILE APPLICATION",   src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80" },
];

const SPRING_CFG: MotionTransition = { type: "spring", stiffness: 400, damping: 40, mass: 1 };

function WorksList() {
  const containerRef                  = useRef<HTMLDivElement>(null);
  const [hovered, setHovered]         = useState<number | null>(null);
  const rawX                          = useMotionValue(0);
  const rawY                          = useMotionValue(0);
  const x                             = useSpring(rawX, { stiffness: 80, damping: 28, mass: 0.5 });
  const y                             = useSpring(rawY, { stiffness: 80, damping: 28, mass: 0.5 });
  const anyActive                     = hovered != null;

  const onMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left + 240);
    rawY.set(e.clientY - rect.top + 80);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={() => setHovered(null)}
      style={{
        position: "relative",
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        gap: "0.1rem",
        padding: "2rem 3.5rem",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Floating image card */}
      <motion.div
        style={{
          position: "absolute", top: 0, left: 0,
          x, y,
          translateX: "-50%", translateY: "-50%",
          width: "clamp(140px, 22vw, 280px)",
          height: "clamp(180px, 28vw, 360px)",
          borderRadius: 14,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 20,
        }}
        animate={{ opacity: anyActive ? 1 : 0 }}
        transition={SPRING_CFG}
      >
        {WORK_ITEMS.map((item, i) => {
          const yPos =
            hovered == null ? "100%"
            : i < hovered  ? "-100%"
            : i > hovered  ? "100%"
            : "0%";
          return (
            <motion.div
              key={i} initial={false}
              animate={{ y: yPos }} transition={SPRING_CFG}
              style={{ position: "absolute", inset: 0, overflow: "hidden" }}
            >
              <img src={item.src} alt={item.text}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Text list */}
      <div
        onMouseLeave={() => setHovered(null)}
        style={{ display: "flex", flexDirection: "column", gap: "0rem" }}
      >
        {WORK_ITEMS.map((item, i) => {
          const isHov = hovered === i;
          const col   = anyActive
            ? (isHov ? "#444444" : "rgba(118,118,118,0.45)")
            : "#767676";

          const textStyle: CSSProperties = {
            display: "block",
            color: col,
            transition: "color 0.2s ease",
            whiteSpace: "pre",
            fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
            fontSize: "clamp(1.5rem, 3.5vw, 3.4rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          };

          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              style={{ overflow: "hidden", cursor: "pointer" }}
            >
              <motion.div
                style={{ position: "relative" }}
                animate={{ y: isHov ? "-100%" : "0%" }}
                transition={SPRING_CFG}
              >
                <span style={textStyle}>{item.text}</span>
                <span aria-hidden style={{ ...textStyle, position: "absolute", top: "100%", left: 0, width: "100%" }}>
                  {item.text}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main ─────────────────────────────────────────────────────── */
export default function Works() {
  const sectionRef  = useRef<HTMLElement>(null);
  const innerRef    = useRef<HTMLDivElement>(null);   // blurred bg
  const glassRef    = useRef<HTMLDivElement>(null);   // expanding water-drop frame

  /* Character animation scroll */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "center center"],
  });

  const getWindow = (col: number): [number, number] => {
    const s = col * 0.17;
    return [s, Math.min(s + 0.3, 1.0)];
  };

  /* ── GSAP: pin section when its bottom hits viewport bottom,
     then expand the glass frame from center ── */
  useEffect(() => {
    const section = sectionRef.current;
    const inner   = innerRef.current;
    const glass   = glassRef.current;
    if (!section || !inner || !glass) return;

    gsap.registerPlugin(ScrollTrigger);

    // Initial state — glass is a tiny dot in the center, invisible
    gsap.set(glass, {
      scale: 0,
      opacity: 0,
      xPercent: -50,
      yPercent: -50,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "bottom bottom",   // fires when section bottom reaches viewport bottom
        pin: true,
        pinSpacing: false,        // no extra space added
        toggleActions: "play none none reverse",
      },
    });

    // 1. Blur background behind the glass
    tl.to(inner, {
      filter: "blur(14px) brightness(0.85)",
      duration: 0.6,
      ease: "power2.out",
    }, 0);

    // 2. Glass expands from a tiny point — watery ripple effect
    tl.to(glass, {
      scale: 1,
      opacity: 1,
      duration: 0.9,
      ease: "elastic.out(0.8, 0.55)", // elastic = water ripple
    }, 0);

    return () => {
      ScrollTrigger.getAll()
        .filter(st => st.vars.trigger === section)
        .forEach(st => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative w-full overflow-hidden"
      style={{ background: BG, minHeight: "100vh" }}
    >
      {/* ── Typography background (gets blurred) ── */}
      <div
        ref={innerRef}
        className="w-full flex"
        style={{
          padding: "clamp(2rem, 4vw, 5rem) 0",
          minHeight: "100vh",
          alignItems: "center",
          willChange: "filter",
        }}
      >
        {/* LEFT */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column",
          alignItems: "flex-start", paddingLeft: "clamp(1.5rem,5vw,7rem)",
          overflow: "hidden", gap: 0 }}>
          {WORD.split("").map((_, rowIdx) => {
            const rowText = WORD.slice(rowIdx);
            return (
              <div key={`L${rowIdx}`} style={{ display: "flex", lineHeight: LH }}>
                {rowText.split("").map((char, ci) => {
                  const [cs, ce] = getWindow(rowIdx + ci);
                  return <AnimChar key={`L${rowIdx}-${ci}`} char={char}
                    progress={scrollYProgress} colStart={cs} colEnd={ce}
                    direction="down" color={LEFT_COLORS[rowIdx]} />;
                })}
              </div>
            );
          })}
        </div>

        {/* RIGHT */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column",
          alignItems: "flex-end", paddingRight: 0, overflow: "hidden", gap: 0 }}>
          {WORD.split("").map((_, rowIdx) => {
            const rowText = WORD.slice(0, rowIdx + 1);
            return (
              <div key={`R${rowIdx}`} style={{ display: "flex", lineHeight: LH }}>
                {rowText.split("").map((char, ci) => {
                  const [cs, ce] = getWindow(rowIdx - ci);
                  return <AnimChar key={`R${rowIdx}-${ci}`} char={char}
                    progress={scrollYProgress} colStart={cs} colEnd={ce}
                    direction="up" color={RIGHT_COLORS[rowIdx]} />;
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Glass water-drop frame ── */}
      {/*
        Positioned at exact center via left:50% top:50% + xPercent/yPercent:-50
        GSAP scales it from 0→1 with elastic.out for the water-drop ripple.
        Border-radius 50% at scale(0) → rounds to pill/circle as it expands → 24px at full size.
      */}
      <div
        ref={glassRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "70vw",
          height: "70vh",
          /* glass styling */
          background: "rgba(166,166,166,0.18)",
          backdropFilter: "blur(40px) saturate(1.8) brightness(1.05)",
          WebkitBackdropFilter: "blur(40px) saturate(1.8) brightness(1.05)",
          border: "1px solid rgba(255,255,255,0.55)",
          borderRadius: "28px",
          boxShadow:
            "0 0 0 0.5px rgba(255,255,255,0.3), " +
            "0 8px 32px rgba(166,166,166,0.25), " +
            "0 32px 80px rgba(100,100,120,0.15), " +
            "inset 0 1px 0 rgba(255,255,255,0.7), " +
            "inset 0 -1px 0 rgba(255,255,255,0.15)",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          willChange: "transform, opacity",
          /* shimmer top edge */
        }}
      >
        {/* Inner shimmer line — water surface highlight */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "5%",
            right: "5%",
            height: "1.5px",
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 30%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.9) 70%, transparent 100%)",
            borderRadius: "50%",
            filter: "blur(0.5px)",
          }}
        />
        {/* Secondary shimmer — bottom edge water reflection */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "20%",
            right: "20%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
          }}
        />

        {/* ── HoverImageReveal list ── */}
        <WorksList />
      </div>
    </section>
  );
}
