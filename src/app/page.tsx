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

export default function Home() {
  useLenis();

  return (
    <>
      <Navbar />
      <SocialRail />

      <main className="overflow-x-hidden bg-black text-white">
        <Hero />
        <ExperiencesTitle />
        <EvolveSection />
        <About />
        <Services />
        <Works />
      </main>
    </>
  );
}
