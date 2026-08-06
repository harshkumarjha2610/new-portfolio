"use client";

import Link from "next/link";
import Vortex from "@/components/Vortex";

const PROJECTS = [
  {
    id: "01",
    title: "Neural Canvas",
    tags: ["AI/ML", "Three.js", "React"],
    desc: "Generative art platform powered by diffusion models with real-time WebGL rendering.",
    year: "2025",
    url: "#",
  },
  {
    id: "02",
    title: "Orbit CMS",
    tags: ["Next.js", "PostgreSQL", "TypeScript"],
    desc: "Headless content management system with visual page builder and multi-tenant support.",
    year: "2025",
    url: "#",
  },
  {
    id: "03",
    title: "Synthwave Studio",
    tags: ["Web Audio", "Canvas", "WebGL"],
    desc: "Browser-based music production environment with procedural sound synthesis.",
    year: "2024",
    url: "#",
  },
  {
    id: "04",
    title: "Quantum UI",
    tags: ["Design System", "React", "CSS"],
    desc: "Production-grade component library with 80+ accessible, animated components.",
    year: "2024",
    url: "#",
  },
  {
    id: "05",
    title: "Meridian Maps",
    tags: ["MapLibre", "Node.js", "GIS"],
    desc: "Real-time geospatial analytics platform with custom tile rendering pipeline.",
    year: "2024",
    url: "#",
  },
];

export default function ProjectsPage() {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden bg-black"
      style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
    >
      {/* ── Galaxy Tornado background ─────────────────────────── */}
      <Vortex
        className="absolute inset-0 w-full h-full"
        style={{ width: "100%", height: "100%" }}
        topRadius={320}
        waistRadius={48}
        waistPosition={48}
        bottomRadius={1000}
        twist={3.2}
        zoom={72}
        speed={9}
        direction="right"
        lineOptions={{ count: 200, color: "#ffffff", glow: 9 }}
        dots
        dotOptions={{ count: 6000, size: 18, color: "#ffffff", glow: 9, flicker: 8 }}
        comets
        cometOptions={{ count: 8, speed: 5, color: "#f97316", glow: 7, tail: 18, delay: 7, collide: 5 }}
      />

      {/* ── Dark vignette so text is readable ────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* ── Page content ─────────────────────────────────────── */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between px-8 md:px-16 pt-10">
          <Link
            href="/"
            className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 text-sm tracking-widest uppercase font-medium"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span>
            Back
          </Link>
          <span className="text-white/25 text-xs tracking-[0.3em] uppercase font-mono">
            harshkumarjha · works
          </span>
        </header>

        {/* Hero heading */}
        <div className="px-8 md:px-16 mt-16 md:mt-20">
          <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-mono mb-3">
            Selected Projects
          </p>
          <h1
            className="font-black uppercase text-white leading-none"
            style={{
              fontSize: "clamp(2.8rem, 8vw, 7rem)",
              letterSpacing: "-0.03em",
            }}
          >
            My Work
          </h1>
        </div>

        {/* Project list */}
        <div className="flex-1 px-8 md:px-16 mt-12 md:mt-16 pb-16">
          <div className="flex flex-col gap-0 max-w-4xl">
            {PROJECTS.map((p, i) => (
              <a
                key={p.id}
                href={p.url}
                className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-8 py-6 border-b border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer"
                style={{
                  animationDelay: `${i * 80}ms`,
                }}
              >
                {/* Index */}
                <span className="text-white/20 font-mono text-xs shrink-0 w-6">
                  {p.id}
                </span>

                {/* Title */}
                <span
                  className="text-white/85 font-bold uppercase group-hover:text-white transition-colors duration-200 shrink-0"
                  style={{
                    fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                    letterSpacing: "0.06em",
                    minWidth: "220px",
                  }}
                >
                  {p.title}
                </span>

                {/* Description — hidden on small, shows on md */}
                <span className="hidden md:block text-white/40 text-sm flex-1 group-hover:text-white/60 transition-colors duration-200">
                  {p.desc}
                </span>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 shrink-0">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-white/35 text-[10px] tracking-widest uppercase font-mono border border-white/10 rounded-full px-2 py-0.5 group-hover:border-white/25 group-hover:text-white/55 transition-all duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Year + arrow */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-white/25 text-xs font-mono">{p.year}</span>
                  <span className="text-white/0 group-hover:text-white/50 transition-all duration-200 text-sm translate-x-1 group-hover:translate-x-0">
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
