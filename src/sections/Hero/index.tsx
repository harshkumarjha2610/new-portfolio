"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { gsap } from "@/lib/gsap";

const SKILLS = [
  "Web Development",
  "Branding & Identity",
  "Creative Strategy",
  "UI/UX Design",
  "AI / ML Integration",
  "Three.js / WebGL",
];

const STATS = [
  { value: "98", sup: "%",  label: "Client Satisfaction Rate",    dark: false },
  { value: "58", sup: "+",  label: "Projects Launched",           dark: true  },
  { value: "35", sup: "+",  label: "Global Clients and Growing",  dark: false },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef    = useRef<HTMLHeadingElement>(null);
  const roleRef    = useRef<HTMLParagraphElement>(null);
  const lineRef    = useRef<HTMLSpanElement>(null);

  /* ── Scroll-linked progress ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* State A — HARSH fades out in the first 28% of scroll */
  const stateAOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const stateAScale   = useTransform(scrollYProgress, [0, 0.28], [1, 0.84]);
  const stateAY       = useTransform(scrollYProgress, [0, 0.28], ["0%", "-6%"]);

  /* White panel — rises 5%–65% */
  const panelY = useTransform(scrollYProgress, [0.05, 0.65], ["100%", "0%"]);

  /* DEVELOPER word — 10%–45% */
  const devOpacity = useTransform(scrollYProgress, [0.10, 0.42], [0, 1]);
  const devScale   = useTransform(scrollYProgress, [0.10, 0.48], [0.82, 1]);

  /* Kim photo — 14%–50% */
  const kimOpacity = useTransform(scrollYProgress, [0.14, 0.48], [0, 1]);
  const kimY       = useTransform(scrollYProgress, [0.14, 0.55], ["10%", "0%"]);
  const kimScale   = useTransform(scrollYProgress, [0.14, 0.65], [0.88, 1]);

  /* Bottom content — 35%–65% */
  const contentOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);
  const contentY       = useTransform(scrollYProgress, [0.35, 0.65], [28, 0]);

  /* ── GSAP entrance: HARSH letters ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const letters = nameRef.current?.querySelectorAll(".h-letter") ?? [];

      tl.fromTo(
        letters,
        { opacity: 0, y: 80, rotateX: -70, filter: "blur(10px)", transformPerspective: 900, transformOrigin: "50% 100%" },
        { opacity: 1, y: 0,  rotateX: 0,   filter: "blur(0px)", stagger: 0.07, duration: 0.9 }
      );
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );
      tl.fromTo(
        roleRef.current,
        { opacity: 0, y: 18, filter: "blur(6px)" },
        { opacity: 1, y: 0,  filter: "blur(0px)", duration: 0.8 },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full"
      style={{ height: "160vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        {/* ════════════ STATE A — black + HARSH ════════════ */}
        <motion.div
          style={{ opacity: stateAOpacity, scale: stateAScale, y: stateAY }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
        >
          <h1
            ref={nameRef}
            className="flex select-none items-center font-black uppercase text-white"
            style={{ letterSpacing: "0.18em" }}
            aria-label="HARSH"
          >
            {"HARSH".split("").map((char, i) => (
              <span
                key={i}
                className="h-letter inline-block will-change-transform text-[clamp(4rem,13vw,10rem)]"
              >
                {char}
              </span>
            ))}
          </h1>

          <span
            ref={lineRef}
            className="my-5 block h-px w-24 origin-center bg-white/25"
            style={{ transform: "scaleX(0)" }}
          />

          <p
            ref={roleRef}
            className="select-none tracking-[0.5em] uppercase text-neutral-500 text-xs md:text-sm"
          >
            Creative Developer
          </p>
        </motion.div>

        {/* ════════════ WHITE PANEL — curved reveal ════════════ */}
        <motion.div
          id="page2"
          style={{
            y: panelY,
            borderRadius: "52px 52px 0 0",
            height: "100%",
            position: "absolute",
            inset: 0,
            zIndex: 20,
            backgroundColor: "#ffffff",
            color: "#171717",
            overflow: "hidden",
          }}
        >
          {/* DEVELOPER word — bleeds off top */}
          <motion.div
            style={{ opacity: devOpacity, scale: devScale }}
            className="absolute inset-x-0 z-0 flex justify-center pointer-events-none select-none"
          >
            <span
              className="font-poppins font-black uppercase leading-none whitespace-nowrap text-neutral-900"
              style={{
                fontSize: "clamp(5rem, 19vw, 18rem)",
                letterSpacing: "-0.025em",
                marginTop: "-0.05em",
              }}
            >
              DEVELOPER
            </span>
          </motion.div>

          {/* Kim cutout */}
          <motion.div
            style={{ opacity: kimOpacity, y: kimY, scale: kimScale }}
            className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pointer-events-none"
          >
            <div className="group relative pointer-events-auto w-[260px] md:w-[340px] lg:w-[400px] h-[86vh]">
              <Image
                src="/photos/kim.png"
                alt="Harsh"
                fill
                priority
                draggable={false}
                className="object-contain object-bottom select-none transition-opacity duration-700 ease-in-out group-hover:opacity-0"
              />
              <Image
                src="/photos/kim2.png"
                alt="Harsh hover"
                fill
                draggable={false}
                className="absolute inset-0 object-contain object-bottom select-none opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-[1.04]"
              />
            </div>
          </motion.div>

          {/* Bottom row — intro text + stat cards */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute bottom-0 inset-x-0 z-20 flex items-end justify-between px-8 md:px-14 pb-10 md:pb-12 pointer-events-none"
          >
            <div className="max-w-[240px] md:max-w-[280px]">
              <h2 className="font-black text-lg md:text-xl leading-snug uppercase mb-3 text-neutral-900">
                Hello! I&apos;m Harsh<br />
                A Digital Designer and<br />
                Creative Developer.
              </h2>
              <ul className="flex flex-col gap-1.5">
                {SKILLS.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-[11px] md:text-xs text-neutral-500">
                    <span className="text-neutral-400 text-xs">↳</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden md:flex flex-col gap-3 items-end">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`rounded-xl px-5 py-4 min-w-[175px] shadow-md pointer-events-auto
                    ${stat.dark ? "bg-neutral-900 text-white border border-neutral-800" : "bg-white text-neutral-900 border border-neutral-200"}
                    ${i === 0 ? "mr-8" : i === 1 ? "mr-4" : "mr-1"}`}
                >
                  <p className={`font-black text-3xl leading-none ${stat.dark ? "text-white" : "text-neutral-900"}`}>
                    {stat.value}<sup className="text-sm font-semibold">{stat.sup}</sup>
                  </p>
                  <p className={`text-xs mt-1 ${stat.dark ? "text-neutral-400" : "text-neutral-500"}`}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
