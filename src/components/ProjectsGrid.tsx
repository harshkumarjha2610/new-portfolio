"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface BentoProject {
  id: string;
  num: string;
  tag: string;
  title: string;
  description?: string;
  pillText?: string;
  buttonText?: string;
  imageSrc: string;
  videoSrc?: string;
  category: string;
  year: string;
  tags: string[];
}

const BENTO_PROJECTS: Record<string, BentoProject> = {
  bento1: {
    id: "bento1",
    num: "01/",
    tag: "Found in Curiosity",
    title: "Great Questions\nUnearth\nHidden Gems",
    description: "An AI-powered neural exploratory search platform uncovering hidden insights across vast unstructured data.",
    pillText: "The best answers come from asking the right questions. Start your search with purpose today.",
    imageSrc: "/photos/bento_01_face.jpg",
    category: "AI & Neural Search",
    year: "2025",
    tags: ["Next.js 15", "AI Search", "TailwindCSS", "Framer Motion"],
  },
  bento2: {
    id: "bento2",
    num: "02/",
    tag: "Where Knowledge Begins",
    title: "Where Knowledge Begins",
    description: "Cinematic real-time WebGL visualization engine mapping multidimensional data paths across twilight terrain.",
    imageSrc: "/photos/bento_02_dunes.jpg",
    category: "3D WebGL & Canvas",
    year: "2025",
    tags: ["Three.js", "WebGL", "GLSL Shaders", "Data Viz"],
  },
  bento3: {
    id: "bento3",
    num: "03/",
    tag: "In Real Time",
    title: "In Real Time",
    description: "From complex topics to quick facts, trust what you learn from every search you perform.",
    buttonText: "Start Using Nexora",
    imageSrc: "/photos/project_3d_webgl.jpg",
    category: "Interactive Simulation",
    year: "2024",
    tags: ["TypeScript", "WebSockets", "Interactive UI"],
  },
  bento4: {
    id: "bento4",
    num: "04/",
    tag: "Just Ask",
    title: "Users Trust Our Search Models",
    description: "Next-gen predictive AI search engine trusted by over 100K active researchers worldwide.",
    imageSrc: "/photos/project_fintech_app.jpg",
    category: "Fintech & Analytics",
    year: "2024",
    tags: ["Fintech", "Predictive ML", "Real-Time Data"],
  },
};

export default function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<BentoProject | null>(null);

  return (
    <section id="projects" className="w-full bg-black text-white py-20 px-6 sm:px-10 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        {/* <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-2 leading-tight">
              Curiosity-led tools for truth-seeking minds.
            </h2>
            <p className="text-xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#888888]">
              Ask with confidence. Powered by AI.
            </p>
          </div>

          <a
            href="#contact"
            className="self-start lg:self-auto shrink-0 bg-white/5 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 rounded-full px-6 py-3 text-sm font-medium tracking-wide backdrop-blur-md"
          >
            Start Using Nexora
          </a>
        </div> */}

        {/* Bento Grid Layout */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          ...bento cards commented out...
        </div> */}
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
              {/* Top-Right Cross Button Only */}
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
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white whitespace-pre-line">
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
