"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

const ParticleImage = dynamic(() => import("@/components/ParticleImage"), { ssr: false });

const PROJECTS = [
  {
    id: "neural-canvas",
    name: "Neural Canvas",
    tag: "AI / Creative Tool",
    year: "2024",
    description:
      "An AI-powered creative canvas where generative models meet real-time interaction. Built for designers who want to explore the boundary between human intuition and machine intelligence.",
    tech: ["Next.js", "Three.js", "Python", "Stable Diffusion"],
    link: "#",
    particleImage: "/logos/neural-canvas.png",
    accent: "#6366f1",
  },
];

export default function SignatureProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black py-24 px-6 md:px-16 overflow-hidden"
    >
      {/* Background subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Section Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-16 flex flex-col gap-3"
      >
        <p className="text-[10px] tracking-[0.35em] uppercase text-white/30 font-mono">
          Selected Work
        </p>
        <h2
          className="text-4xl md:text-6xl font-bold text-white tracking-tight"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          Signature{" "}
          <span className="italic font-extrabold" style={{ color: "#6366f1" }}>
            Projects
          </span>
        </h2>
        <div className="w-12 h-px bg-white/20 mt-2" />
      </motion.div>

      {/* ── Project Cards ── */}
      {PROJECTS.map((project, idx) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 + idx * 0.15, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 max-w-6xl mx-auto"
        >
          {/* Card 1 — Particle Visual */}
          <div
            className="relative rounded-2xl overflow-hidden group"
            style={{
              background: "rgba(12,12,20,0.9)",
              border: "1px solid rgba(255,255,255,0.06)",
              minHeight: "480px",
              boxShadow: `0 0 60px rgba(99,102,241,0.08), inset 0 0 40px rgba(0,0,0,0.4)`,
            }}
          >
            {/* Corner tags */}
            <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
              <span
                className="px-2 py-1 rounded-md text-[10px] tracking-widest uppercase font-mono"
                style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}
              >
                {project.tag}
              </span>
            </div>
            <div className="absolute top-5 right-5 z-10">
              <span className="text-[10px] font-mono text-white/20 tracking-widest">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Particle canvas — fills the card */}
            <ParticleImage
              imageConfig={{
                image: project.particleImage,
                mode: "fit",
                sizeUnit: "%",
                widthPct: 65,
                heightPct: 65,
                scale: 8,
              }}
              particleColor="single"
              singleColor="#ffffff"
              particleCount={60}
              particleSize={4}
              hoverEnabled={true}
              hoverConfig={{
                hoverType: "roam",
                transition: { duration: 0.9, ease: "easeInOut" },
                roamOpacity: 0.4,
                roamShape: "rectangle",
              }}
              repulsionEnabled={true}
              repulsionConfig={{ repulsionMode: "outside", repulsionForce: 10, repulsionRadius: 70 }}
              style={{ width: "100%", height: "100%", minHeight: "480px" }}
            />

            {/* Project name at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 p-6"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
              }}
            >
              <h3
                className="text-2xl font-bold text-white tracking-tight"
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                {project.name}
              </h3>
              <p className="text-xs text-white/40 font-mono mt-1 uppercase tracking-widest">
                {project.year}
              </p>
            </div>
          </div>

          {/* Card 2 — Description */}
          <div
            className="relative rounded-2xl overflow-hidden flex flex-col justify-between p-8 group"
            style={{
              background: "rgba(8,8,14,0.95)",
              border: "1px solid rgba(255,255,255,0.06)",
              minHeight: "480px",
            }}
          >
            {/* Corner particle decoration */}
            <div
              className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none opacity-30"
              style={{
                background: `radial-gradient(circle at 100% 100%, ${project.accent}40 0%, transparent 70%)`,
              }}
            />
            <div className="absolute bottom-4 right-4 flex flex-col gap-1 opacity-20 pointer-events-none">
              {[...Array(4)].map((_, row) => (
                <div key={row} className="flex gap-1">
                  {[...Array(5)].map((_, col) => (
                    <div
                      key={col}
                      className="w-1 h-1 rounded-full bg-indigo-400"
                      style={{ opacity: Math.random() > 0.4 ? 1 : 0.3 }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6 relative z-10">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 font-mono mb-3">
                  About the project
                </p>
                <p
                  className="text-lg text-white/80 leading-relaxed"
                  style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                >
                  {project.description}
                </p>
              </div>

              {/* Tech stack */}
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 font-mono mb-3">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs font-mono"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="relative z-10 mt-6">
              <a
                href={project.link}
                className="inline-flex items-center gap-2 group/btn"
                style={{ textDecoration: "none" }}
              >
                <span
                  className="text-sm font-mono uppercase tracking-widest transition-colors duration-300"
                  style={{ color: "#818cf8" }}
                >
                  View Project
                </span>
                <span
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  style={{ color: "#818cf8" }}
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
