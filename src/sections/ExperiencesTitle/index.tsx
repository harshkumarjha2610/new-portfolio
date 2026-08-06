"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import StarBurst from "@/components/StarBurst";

const ITEMS = [
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

export default function ExperiencesTitle() {
  const wrapperRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const panelRef    = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null); // inner list — scrolled by GSAP

  useEffect(() => {
    const wrapper  = wrapperRef.current;
    const heading  = headingRef.current;
    const panel    = panelRef.current;
    const content  = contentRef.current;
    if (!wrapper || !heading || !panel || !content) return;

    gsap.registerPlugin(ScrollTrigger);

    const vh = window.innerHeight;

    // Initial states — set in JS so no SSR mismatch
    gsap.set(panel,   { yPercent: 100 });
    gsap.set(content, { y: 0 });

    /*
      How far the content list needs to scroll:
      scrollable height = total content height minus the visible panel height.
      Measured after mount so it's accurate.
    */
    const getContentTravel = () =>
      Math.max(0, content.scrollHeight - panel.clientHeight + 48); // +48 = bottom padding

    /*
      Timeline phases — all durations are relative weights, not seconds.
      The ScrollTrigger scrub maps these proportionally to scroll pixels.

      Phase 1 [0   → 1.5] : hold      — user reads EXPERIENCES
      Phase 2 [1.5 → 5  ] : slide     — heading exits left
      Phase 3 [5   → 6.5] : rise      — glass panel comes up
      Phase 4 [6.5 → 10 ] : list scroll — content scrolls inside panel
    */
    const tl = gsap.timeline({ defaults: { ease: "none" } });

    // Phase 1 — hold
    tl.to({}, { duration: 1.5 });

    // Phase 2 — heading slides left
    tl.to(heading, {
      xPercent: -110,
      ease: "power2.inOut",
      duration: 3.5,
    });

    // Phase 3 — panel rises
    tl.to(panel, {
      yPercent: 0,
      ease: "power3.out",
      duration: 1.5,
    });

    // Phase 4 — content inside panel scrolls upward (GSAP-driven)
    tl.to(content, {
      y: () => -getContentTravel(),
      ease: "none",
      duration: 3.5,
    });

    /*
      Total pinned scroll distance:
        hold   = vh × 0.15
        slide  = heading pixel width (≈ 40vw × ~8 chars)
        rise   = vh (panel needs one screen height to fully cover)
        list   = content scrollable height (variable)
    */
    const getEnd = () => {
      const hold  = vh * 0.15;
      const slide = heading.offsetWidth;
      const rise  = vh * 0.85;
      const list  = getContentTravel();
      return `+=${hold + slide + rise + list}`;
    };

    ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: getEnd,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 1.8,
      invalidateOnRefresh: true,
      animation: tl,
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      id="experiences-title"
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100vh" }}
    >
      {/* ── StarBurst Background ── */}
      <div className="absolute inset-0 z-0">
        <StarBurst 
          color="#ffffff" 
          starCount={120} 
          speed={5} 
          opacity={30} 
          starSize={8} 
        />
      </div>

      {/* ── EXPERIENCES heading ── */}
      <div className="absolute inset-0 z-10 flex items-center overflow-hidden pointer-events-none">
        <h1
          ref={headingRef}
          className="font-poppins uppercase leading-none whitespace-nowrap will-change-transform text-transparent bg-clip-text bg-linear-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
          style={{ fontSize: "25vw", letterSpacing: "-0.04em", fontWeight: 400 }}
        >
          EXPERIENCES
        </h1>
      </div>

      {/* ── Glass panel — rises from bottom, clips overflow so only GSAP drives scroll ── */}
      <div
        ref={panelRef}
        className="absolute inset-x-0 bottom-0 z-30 will-change-transform"
        style={{
          height: "85vh",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "28px 28px 0 0",
          overflow: "hidden",  // no browser scrollbar — GSAP moves content
        }}
      >
        {/* contentRef — GSAP translates this element upward */}
        <div
          ref={contentRef}
          className="will-change-transform"
          style={{ paddingBottom: "48px" }}
        >
          {/* Label row */}
          <div className="flex items-center justify-between px-8 md:px-16 pt-12 pb-10">
            <span
              className="text-[10px] tracking-[0.35em] uppercase"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Selected Work
            </span>
            <span
              className="font-poppins font-black uppercase tracking-widest"
              style={{
                fontSize: "clamp(1rem,2vw,1.6rem)",
                color: "rgba(255,255,255,0.1)",
              }}
            >
              Experience
            </span>
            <span
              className="text-[10px] tracking-[0.35em] uppercase"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              0{ITEMS.length} Entries
            </span>
          </div>

          {/* Cards */}
          <div className="px-8 md:px-16">
            {ITEMS.map((item, i) => (
              <div
                key={item.index}
                className="flex flex-col md:flex-row md:items-start gap-6 py-9 relative"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* Number */}
                <span
                  className="font-poppins font-black leading-none shrink-0 select-none"
                  style={{
                    fontSize: "clamp(1.8rem,3.5vw,3rem)",
                    color: "rgba(255,255,255,0.07)",
                    width: "5rem",
                  }}
                >
                  {item.index}
                </span>

                {/* Main */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3
                      className="font-poppins font-black uppercase text-white leading-none"
                      style={{
                        fontSize: "clamp(1.3rem,2.8vw,2.6rem)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {item.role}
                    </h3>
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {item.company}
                    </span>
                  </div>

                  <p
                    className="text-sm leading-relaxed mb-4 max-w-[52ch]"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-[10px] tracking-wider uppercase"
                        style={{
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "rgba(255,255,255,0.38)",
                          background: "rgba(255,255,255,0.04)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Period */}
                <span
                  className="text-[10px] tracking-[0.2em] uppercase shrink-0 md:text-right pt-1"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {item.period}
                </span>

                {/* Progress bar */}
                <div
                  className="absolute left-0 bottom-0 h-px"
                  style={{
                    width: `${((i + 1) / ITEMS.length) * 100}%`,
                    background: "rgba(255,255,255,0.1)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
