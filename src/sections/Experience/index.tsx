"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const EXPERIENCES = [
  {
    index: "01",
    role: "Full-Stack Developer",
    company: "Freelance",
    period: "2023 — Present",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    desc: "Built end-to-end web applications for clients across fintech, e-commerce, and SaaS — from architecture to deployment on Vercel and AWS.",
  },
  {
    index: "02",
    role: "Creative Technologist",
    company: "Studio NYX",
    period: "2022 — 2023",
    tags: ["Three.js", "GSAP", "WebGL", "React"],
    desc: "Crafted interactive 3D experiences and scroll-driven narratives for brand campaigns. Pushed the boundary between design and engineering.",
  },
  {
    index: "03",
    role: "UI Engineer",
    company: "Stealth Startup",
    period: "2021 — 2022",
    tags: ["React", "Tailwind", "Figma", "Storybook"],
    desc: "Designed and built a scalable component system from scratch. Shipped a full design system used across three products within six months.",
  },
  {
    index: "04",
    role: "AI Integration Lead",
    company: "Research Collab",
    period: "2021",
    tags: ["Python", "OpenAI", "LangChain", "FastAPI"],
    desc: "Integrated large-language-model pipelines into a SaaS product. Reduced manual data-processing time by 70% through AI-driven automation.",
  },
  {
    index: "05",
    role: "Open Source Contributor",
    company: "GitHub",
    period: "2020 — Present",
    tags: ["OSS", "Documentation", "DX", "Community"],
    desc: "Active contributor to developer tooling projects. Focused on improving DX, writing documentation, and mentoring new contributors.",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const getTravel = () => track.scrollWidth - track.offsetWidth;

    const ctx = gsap.context(() => {
      // Heading fade-in
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Horizontal pin + scrub
      gsap.to(track, {
        x: () => -getTravel(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getTravel()}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full overflow-hidden bg-[#0a0a0a]"
      style={{ zIndex: 10 }}
    >
      {/* Heading row */}
      <div
        ref={headingRef}
        className="absolute top-10 left-0 right-0 z-10 flex items-center justify-between px-8 md:px-16 pointer-events-none select-none"
        style={{ opacity: 0 }}
      >
        <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
          Selected Work
        </span>
        <span
          className="font-poppins font-black uppercase tracking-widest"
          style={{ fontSize: "clamp(1.1rem,2.5vw,2rem)", color: "rgba(255,255,255,0.1)" }}
        >
          Experience
        </span>
        <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
          0{EXPERIENCES.length} Cards
        </span>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex h-screen items-stretch will-change-transform"
        style={{ width: "max-content" }}
      >
        {/* Leading spacer */}
        <div className="w-[8vw] shrink-0" />

        {EXPERIENCES.map((exp, i) => (
          <article
            key={exp.index}
            className="relative shrink-0 flex flex-col justify-between h-full px-8 md:px-10 py-24 md:py-28 mr-[3vw] w-[78vw] md:w-[55vw] lg:w-[42vw] xl:w-[36vw]"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Ghost index */}
            <span
              className="absolute top-8 right-8 font-poppins font-black leading-none select-none pointer-events-none"
              style={{
                fontSize: "clamp(5rem,10vw,9rem)",
                color: "rgba(255,255,255,0.04)",
              }}
            >
              {exp.index}
            </span>

            {/* Period + company */}
            <div className="flex flex-col gap-2">
              <span
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {exp.period}
              </span>
              <span
                className="font-poppins font-semibold text-sm tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {exp.company}
              </span>
            </div>

            {/* Role */}
            <div className="my-auto pt-12 pb-8">
              <h3
                className="font-poppins font-black uppercase text-white leading-[0.9]"
                style={{
                  fontSize: "clamp(2.4rem,5.5vw,5.5rem)",
                  letterSpacing: "-0.025em",
                }}
              >
                {exp.role}
              </h3>
            </div>

            {/* Description + tags + progress */}
            <div className="flex flex-col gap-5">
              <p
                className="text-sm leading-relaxed max-w-[38ch]"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {exp.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-[10px] tracking-wider uppercase"
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.4)",
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-2 h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div
                  className="h-full"
                  style={{
                    width: `${((i + 1) / EXPERIENCES.length) * 100}%`,
                    background: "rgba(255,255,255,0.3)",
                  }}
                />
              </div>
            </div>
          </article>
        ))}

        {/* Trailing spacer */}
        <div className="w-[8vw] shrink-0" />
      </div>
    </section>
  );
}
