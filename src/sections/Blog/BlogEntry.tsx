/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { HiArrowUpRight } from "react-icons/hi2";
import BrushPaintImage from "./BrushPaintImage";
import type { BlogProject } from "./data";
import { BG_DARK, BG_LIGHT } from "./data";

interface BlogEntryProps {
  project: BlogProject;
  index: number;
}

export default function BlogEntry({ project, index }: BlogEntryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const overviewRef = useRef<HTMLParagraphElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);

  const isLight = index % 2 === 1;
  const bg = isLight ? BG_LIGHT : BG_DARK;
  const textPrimary = isLight ? "#111111" : "#ffffff";
  const textMuted = isLight ? "rgba(17,17,17,0.55)" : "rgba(255,255,255,0.55)";
  const textFaint = isLight ? "rgba(17,17,17,0.35)" : "rgba(255,255,255,0.25)";
  const watermarkColor = isLight ? "rgba(17,17,17,0.06)" : "rgba(255,255,255,0.04)";

  useEffect(() => {
    const section = sectionRef.current;
    const meta = metaRef.current;
    const overview = overviewRef.current;
    const stack = stackRef.current;
    const cta = ctaRef.current;
    const watermark = watermarkRef.current;
    if (!section || !meta || !overview || !stack || !cta || !watermark) return;

    gsap.set([meta, overview, stack, cta], { opacity: 0, y: 40 });
    gsap.set(watermark, { opacity: 0, scale: 0.92 });

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        })
        .to(watermark, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" })
        .to(meta, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.5")
        .to(overview, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.35")
        .to(stack, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.35")
        .to(cta, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: bg, minHeight: "100vh" }}
      aria-label={`Article ${project.number}: ${project.category}`}
    >
      <div
        className="relative mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        style={{
          padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 6rem)",
          minHeight: "100vh",
        }}
      >
        {/* Left — text content */}
        <div className="relative z-10 flex flex-col justify-center">
          <span
            ref={watermarkRef}
            aria-hidden
            className="absolute -top-[clamp(1rem,3vw,2rem)] -left-[clamp(0.5rem,2vw,1rem)] select-none pointer-events-none leading-none font-black"
            style={{
              fontSize: "clamp(8rem, 22vw, 18rem)",
              color: watermarkColor,
              WebkitTextStroke: isLight
                ? "1px rgba(17,17,17,0.08)"
                : "1px rgba(255,255,255,0.06)",
              fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            {project.number}
          </span>

          <p
            ref={metaRef}
            className="relative z-10 mb-6 uppercase tracking-[0.18em]"
            style={{
              fontSize: "clamp(0.6rem, 0.85vw, 0.72rem)",
              color: textMuted,
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 600,
            }}
          >
            ({project.number}) {project.category} / {project.topic} / {project.year}
          </p>

          <p
            ref={overviewRef}
            className="relative z-10 max-w-lg leading-relaxed mb-10"
            style={{
              fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
              color: textPrimary,
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 400,
              lineHeight: 1.65,
            }}
          >
            {project.overview}
          </p>

          <div ref={stackRef} className="relative z-10 mb-10">
            <p
              className="uppercase tracking-[0.16em] mb-4"
              style={{
                fontSize: "clamp(0.55rem, 0.75vw, 0.65rem)",
                color: textMuted,
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 700,
              }}
            >
              Tech Stack:
            </p>
            <ul className="flex flex-col gap-1.5">
              {project.stack.map((item, i) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 uppercase tracking-[0.12em]"
                  style={{
                    fontSize: "clamp(0.65rem, 0.9vw, 0.78rem)",
                    color: textPrimary,
                    fontFamily: "var(--font-poppins), sans-serif",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: textFaint, fontWeight: 400 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <a
            ref={ctaRef}
            href={`#blog/${project.slug}`}
            className="relative z-10 inline-flex items-center gap-3 group w-fit"
            style={{ color: textPrimary }}
          >
            <span
              className="uppercase tracking-[0.14em] group-hover:opacity-70 transition-opacity duration-300"
              style={{
                fontSize: "clamp(0.65rem, 0.85vw, 0.75rem)",
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 700,
              }}
            >
              Read Article
            </span>
            <span
              className="flex items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-110"
              style={{
                width: 28,
                height: 28,
                borderColor: isLight ? "rgba(17,17,17,0.25)" : "rgba(255,255,255,0.25)",
              }}
            >
              <HiArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>

        {/* Right — brush-paint image reveal */}
        <div className="relative z-10 w-full">
          <BrushPaintImage
            project={project}
            isLight={isLight}
            sectionRef={sectionRef}
          />
        </div>
      </div>
    </section>
  );
}
