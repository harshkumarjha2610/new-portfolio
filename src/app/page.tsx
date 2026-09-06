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

const Vortex = dynamic(() => import("@/components/Vortex"), { ssr: false });

export default function Home() {
  useLenis();

  return (
    <>
      {/* <NameIntro onComplete={() => {}} /> */}
      {/* <Navbar /> */}
      <SocialRail />

      <InteractiveHero />

      <main className="overflow-x-hidden bg-black text-white">
        {/* ── PREVIOUS HERO: Galaxy Tornado (Commented Out) ── */}
        {/* ... */}

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
