/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* ─── Marquee ──────────────────────────────────────────────────── */
const REPEAT = 6;

/* ─── Service cards data ───────────────────────────────────────── */
const SERVICES = [
  {
    num: "01",
    title: "ILLUSTRATION DESIGN",
    tags: ["CREATIVE DIRECTION", "BRAND IDENTITY", "GRAPHIC DESIGN"],
    img: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?w=600&q=80",
  },
  {
    num: "02",
    title: "BUSINESS BRANDING",
    tags: ["CREATIVE DIRECTION", "BRAND IDENTITY", "GRAPHIC DESIGN"],
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  },
  {
    num: "03",
    title: "WEB DEVELOPMENT",
    tags: ["CREATIVE DIRECTION", "BRAND IDENTITY", "GRAPHIC DESIGN"],
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80",
  },
  {
    num: "04",
    title: "APPLICATION DESIGN",
    tags: ["CREATIVE DIRECTION", "BRAND IDENTITY", "GRAPHIC DESIGN"],
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
  },
];

/* ─── Single capsule card ──────────────────────────────────────── */
function ServiceCard({
  title,
  tags,
  img,
  index,
}: {
  title: string;
  tags: string[];
  img: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Odd index → slides from left (-80px), even → from right (+80px)
    const fromX = index % 2 === 0 ? -80 : 80;

    gsap.fromTo(
      card,
      { opacity: 0, x: fromX },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === card)
        .forEach((st) => st.kill());
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: hovered ? "1.5px solid #e05a00" : "1.5px solid transparent",
        borderRadius: "999px",
        padding: "10px 10px",
        display: "flex",
        flexDirection: index % 2 === 0 ? "row" : "row-reverse",
        alignItems: "center",
        gap: "1.5rem",
        width: "100%",
        transition: "border-color 0.35s ease",
        cursor: "default",
        background: hovered ? "rgba(255,255,255,0.03)" : "transparent",
      }}
    >
      {/* Text — title + tags */}
      <div style={{ flex: 1, minWidth: 0, padding: "0.5rem 1.2rem" }}>
        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-poppins), sans-serif",
            fontSize: "clamp(1.4rem, 2.8vw, 2.8rem)",
            fontWeight: 800,
            color: "#e05a00",
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            lineHeight: 1,
            marginBottom: "0.75rem",
          }}
        >
          {title}
        </h3>

        {/* Tags */}
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
                fontSize: "clamp(0.55rem, 0.8vw, 0.7rem)",
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.12em",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.4)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Right — image inside inner capsule */}
      <div
        style={{
          width: "clamp(160px, 22vw, 300px)",
          height: "clamp(110px, 15vw, 200px)",
          borderRadius: "999px",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={img}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Main section ─────────────────────────────────────────────── */
export default function Services() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(strip, {
        xPercent: -50,
        ease: "none",
        duration: 18,
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const marqueeItems = Array.from({ length: REPEAT }, (_, i) => (
    <span
      key={i}
      className="inline-flex items-center shrink-0 gap-6 pr-6"
      style={{ fontFamily: "var(--font-poppins), sans-serif" }}
    >
      <span
        className="font-black uppercase leading-none text-white"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)", letterSpacing: "-0.01em" }}
      >
        SERVICES
      </span>
      <span className="text-white/60 font-light text-2xl select-none">—</span>
      <span
        className="font-black uppercase leading-none"
        style={{
          fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
          letterSpacing: "-0.01em",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(255,255,255,0.5)",
        }}
      >
        SERVICES
      </span>
      <span className="text-white/60 font-light text-2xl select-none">—</span>
    </span>
  ));

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* ── Marquee strip ── */}
      <div
        className="w-full overflow-hidden"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          paddingBlock: "clamp(1.6rem, 3.5vw, 2.8rem)",
          background: "oklch(37.2% 0.044 257.287)",
        }}
      >
        <div
          ref={stripRef}
          className="flex will-change-transform"
          style={{ width: "max-content" }}
        >
          {marqueeItems}
          {marqueeItems}
        </div>
      </div>

      {/* ── Capsule cards ── */}
      <div
        style={{
          padding: "clamp(2.5rem, 5vw, 5rem) clamp(1.5rem, 4vw, 5rem)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(1.2rem, 2.5vw, 2.2rem)",
        }}
      >
        {SERVICES.map((s, i) => (
          /*
            Asymmetric offset — matches the reference:
            even index (0,2): full width, starts from left edge
            odd index  (1,3): indented ~6% from left, slightly narrower
          */
          <div
            key={s.num}
            style={{
              marginLeft:  i % 2 === 1 ? "clamp(2rem, 6vw, 7rem)" : "0",
              marginRight: i % 2 === 0 ? "clamp(2rem, 6vw, 7rem)" : "0",
            }}
          >
            <ServiceCard {...s} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
