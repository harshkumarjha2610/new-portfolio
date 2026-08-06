"use client";

import GalleryTunnel from "@/components/GalleryTunnel";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} id="tech-stack" className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 pointer-events-auto">
        {inView && <GalleryTunnel />}
      </div>

      <div className="relative z-10 pointer-events-none flex flex-col items-center justify-center">
        <h2 className="font-poppins font-medium uppercase text-white text-[clamp(2rem,4vw,3.5rem)] tracking-tight leading-none mix-blend-difference">
          Tech <span className="text-sky-400">Stack</span> <br />
          & <span className="text-emerald-400">AI</span> Tools
        </h2>
      </div>
    </section>
  );
}
