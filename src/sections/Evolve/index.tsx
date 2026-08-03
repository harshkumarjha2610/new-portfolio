"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function EvolveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRef    = useRef<HTMLDivElement>(null);
  const personRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const word    = wordRef.current;
    const person  = personRef.current;
    if (!section || !word || !person) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        word,
        { opacity: 0, y: -30 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        person,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.2,
          scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" },
        }
      );
      gsap.to(word, {
        yPercent: -5, ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="evolve"
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", background: "#8c8c8c" }}
    >

      {/* ══════════════════════════════════════════
          DESKTOP (md+): horizontal DEVELOPER
          Fits inside viewport with px-padding
      ══════════════════════════════════════════ */}
      <div
        ref={wordRef}
        className="
          hidden md:flex
          absolute inset-x-0 z-10
          items-center justify-center
          pointer-events-none select-none
          px-4
        "
        style={{ top: "6%", bottom: "38%" }}
      >
        <span
          className="font-poppins font-black uppercase leading-none text-center"
          style={{
            /*
              15vw keeps it comfortably inside the viewport.
              max-width: 100% + word-break prevent any overflow.
            */
            fontSize: "clamp(3rem, 14vw, 13rem)",
            letterSpacing: "-0.02em",
            color: "#3d3d3d",
            maxWidth: "100%",
            wordBreak: "keep-all",
          }}
        >
          DEVELOPER
        </span>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE (<md): vertical DEVELOPER
          Right-anchored, spans full height, behind photo
      ══════════════════════════════════════════ */}
      <div
        className="
          md:hidden
          absolute top-0 right-0 bottom-0 z-10
          flex items-center justify-end
          pointer-events-none select-none
          pr-2
        "
      >
        <span
          className="font-poppins font-black uppercase leading-none"
          style={{
            writingMode: "vertical-lr",   /* top-to-bottom, left-to-right column */
            fontSize: "clamp(3.5rem, 18vw, 6rem)",
            letterSpacing: "-0.01em",
            color: "#4a4a4a",
            height: "95vh",               /* span nearly the full viewport height */
            display: "flex",
            alignItems: "center",
          }}
        >
          DEVELOPER
        </span>
      </div>

      {/* ══════════════════════════════════════════
          Person — in front of both text variants
      ══════════════════════════════════════════ */}
      <div
        ref={personRef}
        className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-center pointer-events-none"
      >
        <div
          className="relative w-[75vw] md:w-[28vw] lg:w-[26vw]"
          style={{ height: "88vh" }}
        >
          <Image
            src="/photos/kim2.png"
            alt="Harsh"
            fill
            priority
            draggable={false}
            className="object-contain object-bottom select-none"
            style={{ filter: "grayscale(1) contrast(1.1)" }}
          />
        </div>
      </div>

    </section>
  );
}
