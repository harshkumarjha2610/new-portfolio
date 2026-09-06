"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  imageSrc: string;
  videoSrc?: string; // Future scope: video support
  colSpan: string; // Tailwind grid span classes
  aspectRatio: string;
  year: string;
  link?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "neurocore-ai",
    title: "NeuroCore AI Analytics",
    category: "AI & Machine Learning",
    description:
      "A next-generation AI dashboard featuring real-time telemetry, model performance metrics, and automated neural network insights.",
    tags: ["Next.js", "AI/ML", "TailwindCSS", "Framer Motion"],
    imageSrc: "/photos/project_ai_platform.jpg",
    colSpan: "lg:col-span-8 col-span-12",
    aspectRatio: "aspect-video md:aspect-[16/9]",
    year: "2025",
    link: "#",
  },
  {
    id: "aurelia-luxury",
    title: "Aurélia Luxury Fashion",
    category: "Mobile & E-Commerce",
    description:
      "Editorial digital boutique and high-fashion mobile app experience with fluid micro-interactions and dark luxury aesthetic.",
    tags: ["React Native", "E-Commerce", "Design System"],
    imageSrc: "/photos/project_luxury_brand.jpg",
    colSpan: "lg:col-span-4 col-span-12",
    aspectRatio: "aspect-[3/4] md:aspect-[3/4]",
    year: "2025",
    link: "#",
  },
  {
    id: "kinetic-webgl",
    title: "Kinetic 3D WebGL Engine",
    category: "Interactive 3D & WebGL",
    description:
      "Real-time interactive WebGL geometric liquid shader simulation built with custom GLSL shaders and Three.js.",
    tags: ["Three.js", "WebGL", "GLSL Shaders", "Canvas"],
    imageSrc: "/photos/project_3d_webgl.jpg",
    colSpan: "lg:col-span-5 col-span-12",
    aspectRatio: "aspect-[4/3] md:aspect-[4/3]",
    year: "2024",
    link: "#",
  },
  {
    id: "quantum-trade",
    title: "QuantumTrade Crypto Terminal",
    category: "Fintech & Data Viz",
    description:
      "Ultra-low latency crypto & stock market dashboard rendering millions of live data points with WebGL charts.",
    tags: ["TypeScript", "WebSockets", "D3.js", "Fintech"],
    imageSrc: "/photos/project_fintech_app.jpg",
    colSpan: "lg:col-span-7 col-span-12",
    aspectRatio: "aspect-video md:aspect-[16/9]",
    year: "2024",
    link: "#",
  },
];

export default function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects-grid" className="w-full bg-black text-white py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-xs font-mono tracking-[0.3em] text-emerald-400 uppercase block mb-3">
              [ Selected Projects & Works ]
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Featured Work
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-sm md:text-base leading-relaxed">
            Explorations in high-performance web applications, interactive 3D WebGL visuals, and modern AI dashboard interfaces.
          </p>
        </div>

        {/* Asymmetric Bento Grid (Blocks with different dimensions) */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className={`${project.colSpan} group relative rounded-3xl overflow-hidden bg-neutral-900/60 border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer shadow-2xl flex flex-col justify-end min-h-[380px] lg:min-h-[440px]`}
            >
              {/* Media Container (Image now, supports Video on hover when videoSrc provided) */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                {project.videoSrc ? (
                  <video
                    src={project.videoSrc}
                    poster={project.imageSrc}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                ) : (
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                  />
                )}
                {/* Gradient Overlays for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
              </div>

              {/* Top Tag / Year */}
              <div className="relative z-10 p-6 sm:p-8 flex justify-between items-start">
                <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-white/50 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  {project.year}
                </span>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom Details */}
              <div className="relative z-10 p-6 sm:p-8 transform group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {project.title}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-400 transition-all duration-300 shrink-0">
                    <svg className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>

                <p className="text-sm text-white/70 line-clamp-2 mb-4 font-normal leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-emerald-300/90 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-white/15 rounded-2xl max-w-xl w-full overflow-hidden relative text-white shadow-2xl max-h-[85vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-sm"
                aria-label="Close project modal"
              >
                ✕
              </button>

              {/* Modal Image Header */}
              <div className="relative w-full h-44 sm:h-52 shrink-0">
                <Image
                  src={selectedProject.imageSrc}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
              </div>

              {/* Modal Content */}
              <div className="p-5 sm:p-6 overflow-y-auto">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {selectedProject.category}
                  </span>
                  <span className="text-[11px] font-mono text-white/50">
                    Year: {selectedProject.year}
                  </span>
                  {/* Future video indicator badge */}
                  <span className="text-[11px] font-mono text-purple-300 bg-purple-950/40 border border-purple-500/30 px-2 py-0.5 rounded-full flex items-center gap-1.5 ml-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    Video Ready
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-4">
                  {selectedProject.description}
                </p>

                <div className="mb-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1.5">Technologies</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="text-[11px] font-mono bg-white/10 px-2.5 py-1 rounded-md text-white/90">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
