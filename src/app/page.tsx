"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import useLenis            from "@/hooks/useLenis";
import Navbar              from "@/components/Navbar";
import SocialRail          from "@/components/SocialRail";
import ExperiencesTitle    from "@/sections/ExperiencesTitle";
import EvolveSection       from "@/sections/Evolve";
import About               from "@/sections/About";
import Services            from "@/sections/Services";
import Works               from "@/sections/Works";
import TechStack           from "@/sections/TechStack";
import Blog                from "@/sections/Blog";
import Contact             from "@/sections/Contact";
import ProjectsPanel       from "@/components/ProjectsPanel";
import NameIntro           from "@/components/NameIntro";
import SignatureProjects   from "@/sections/SignatureProjects";

import ProjectsGrid       from "@/components/ProjectsGrid";

import InteractiveHero     from "@/components/InteractiveHero";

import BehindTheLensBlog    from "@/components/BehindTheLensBlog";
import AestheticContact     from "@/components/AestheticContact";
import AnimatedFooter       from "@/components/AnimatedFooter";

const Vortex = dynamic(() => import("@/components/Vortex"), { ssr: false });

export default function Home() {
  useLenis();

  return (
    <>
      {/* <NameIntro onComplete={() => {}} /> */}
      <Navbar />
      <SocialRail />

      {/* <InteractiveHero /> */}

      <main className="overflow-x-hidden bg-black text-white">
        {/* ── HERO: Galaxy Tornado ── */}
        <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-black">
          <Vortex style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

          {/* ── Left Block (Stats) ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2.6, ease: "easeOut" }}
            className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 flex flex-col gap-10 z-10 hidden lg:flex pointer-events-none"
          >
            <div className="flex flex-col gap-2">
              <span className="text-5xl font-bold font-mono text-white tracking-tighter">50+</span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/50">US Clients</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-5xl font-bold font-mono text-white tracking-tighter">100%</span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/50">Satisfaction</span>
            </div>
            <div className="w-px h-20 bg-gradient-to-b from-white/30 to-transparent mt-2"></div>
          </motion.div>

          {/* ── Right Block (Moving Elements) ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2.6, ease: "easeOut" }}
            className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 flex flex-col items-end gap-12 z-10 hidden lg:flex pointer-events-none"
          >
            {/* Spinning Badge */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="w-28 h-28 rounded-full border border-white/10 flex items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            >
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/50 text-center absolute w-full leading-relaxed">
                Available<br />For Work
              </span>
              {/* Orbits */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/40 rounded-full"></div>
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1 h-1 bg-white/20 rounded-full"></div>
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1 h-1 bg-white/20 rounded-full"></div>
            </motion.div>

            {/* Title Details */}
            <div className="text-right flex flex-col gap-1">
              <p className="text-sm font-mono text-white/70 uppercase tracking-widest">Creative Dev</p>
              <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Based Worldwide</p>
            </div>
          </motion.div>

          {/* ── Center Text Overlay ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            <h2
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "var(--font-geist-sans), sans-serif",
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              <div style={{ display: "block" }}>
                {"Introducing ".split("").map((char, i, arr) => (
                  <motion.span
                    key={`intro-${i}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.3 + (arr.length - 1 - i) * 0.04, type: "spring", damping: 10, stiffness: 100 }}
                    style={{ display: "inline-block", whiteSpace: "pre", fontWeight: 400 }}
                  >
                    {char}
                  </motion.span>
                ))}
                {"Selected".split("").map((char, i, arr) => (
                  <motion.span
                    key={`sel-${i}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.3 + ("Introducing ".length + arr.length - 1 - i) * 0.04, type: "spring", damping: 10, stiffness: 100 }}
                    style={{ display: "inline-block", whiteSpace: "pre", fontWeight: 800, fontStyle: "italic" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              
              <div style={{ display: "block" }}>
                {"Projects ".split("").map((char, i) => (
                  <motion.span
                    key={`proj-${i}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.3 + i * 0.04, type: "spring", damping: 10, stiffness: 100 }}
                    style={{ display: "inline-block", whiteSpace: "pre", fontWeight: 800, fontStyle: "italic" }}
                  >
                    {char}
                  </motion.span>
                ))}
                {"That Matter".split("").map((char, i) => (
                  <motion.span
                    key={`matter-${i}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.3 + ("Projects ".length + i) * 0.04, type: "spring", damping: 10, stiffness: 100 }}
                    style={{ display: "inline-block", whiteSpace: "pre", fontWeight: 400 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </h2>
          </div>
        </section>

        {/* ── Signature Projects ── */}
        {/* <SignatureProjects /> */}

        {/* ── Rest of the Website ── */}
        {/* <ExperiencesTitle /> */}
        <EvolveSection />
        <About />
        
        {/* ── Projects Grid (Different dimensions Bento Grid) ── */}
        <ProjectsGrid />

        <Services />

        {/* ── Behind the Lens Photography Blog Section ── */}
        <BehindTheLensBlog />

        {/* ── Light Theme Aesthetic Contact Us Section ── */}
        <AestheticContact />

        {/* ── Animated ASCII Reveal Footer (HARSH) ── */}
        <AnimatedFooter headingLines={["HARSH"]} />

        {/* <Works /> */}
        {/* <TechStack /> */}
        {/* <Blog /> */}
        {/* <Contact /> */}
      </main>

      {/* Slides in from right when "View Projects" is clicked */}
      <ProjectsPanel />
    </>
  );
}
