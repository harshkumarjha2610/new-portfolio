"use client";

import useLenis            from "@/hooks/useLenis";
import Navbar              from "@/components/Navbar";
import SocialRail          from "@/components/SocialRail";
import Hero                from "@/sections/Hero";
import ExperiencesTitle    from "@/sections/ExperiencesTitle";
import EvolveSection       from "@/sections/Evolve";
import About               from "@/sections/About";
import Services            from "@/sections/Services";
import Works               from "@/sections/Works";
import TechStack           from "@/sections/TechStack";
import Blog                from "@/sections/Blog";
import Contact             from "@/sections/Contact";
import NameIntro           from "@/components/NameIntro";

export default function Home() {
  useLenis();


  return (
    <>
      <NameIntro onComplete={() => {}} />
      <Navbar />

      <SocialRail />

      <main className="overflow-x-hidden bg-black text-white">
        <Hero />
        <ExperiencesTitle />
        <EvolveSection />
        <About />
        <Services />
        <Works />
        <TechStack />
        <Blog />
        <Contact />
      </main>
    </>
  );
}
