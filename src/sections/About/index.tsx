"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, type Variants, useMotionValue, useTransform, animate } from "framer-motion";

const SKILLS = [
  "Full-Stack Development (Next.js / React)",
  "AI & Machine Learning Integration",
  "Creative UI/UX Design",
  "Branding & Visual Identity",
  "Three.js / WebGL Experiences",
  "Digital Strategy & Consulting",
];

const STATS = [
  {
    value: "98%",
    label: "Client Satisfaction Rate",
    sub: null,
  },
  {
    value: "58+",
    label: "Projects Launched",
    sub: "across 12 countries",
  },
  {
    value: "35+",
    label: "Global Clients",
    sub: "and growing",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

function CountingNumber({ valueStr, inView, delay = 0 }: { valueStr: string; inView: boolean; delay?: number }) {
  const numMatch = valueStr.match(/\d+/);
  const number = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = numMatch ? valueStr.slice(numMatch.index! + numMatch[0].length) : valueStr;
  const prefix = numMatch ? valueStr.slice(0, numMatch.index!) : "";

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, number, { duration: 2.5, delay, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, number, count, delay]);

  if (!numMatch) return <>{valueStr}</>;

  return (
    <>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[#f2f0eb] text-neutral-900 overflow-hidden"
    >
      {/* ── Top content block ── */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 items-start">

          {/* Left — text card */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="
              bg-white rounded-2xl shadow-lg
              p-8 md:p-10
              border border-neutral-100
            "
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-neutral-400 mb-3">
              Introducing
            </p>
            <h2 className="font-black text-3xl md:text-4xl leading-tight mb-2">
              Hello! I&apos;m Harsh
            </h2>
            <p className="text-neutral-500 text-base md:text-lg mb-8 leading-relaxed">
              A Full-Stack Developer &amp; Creative Technologist building premium digital experiences with Next.js, AI, and immersive WebGL.
            </p>

            <ul className="flex flex-col gap-3">
              {SKILLS.map((skill, i) => (
                <motion.li
                  key={skill}
                  custom={i + 1}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="flex items-start gap-3 text-sm text-neutral-700"
                >
                  <span className="mt-[5px] block h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-800" />
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Center — portrait photo */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="
              mx-auto
              w-[260px] md:w-[300px] lg:w-[340px]
              aspect-[3/4]
              relative rounded-2xl overflow-hidden
              shadow-xl
              shrink-0
            "
          >
            <Image
              src="/photos/kim.png"
              alt="Harsh portrait"
              fill
              className="object-cover object-top"
            />
          </motion.div>

          {/* Right — stat cards */}
          <div className="flex flex-col gap-5 pt-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className={`
                  bg-white rounded-2xl shadow-md
                  border border-neutral-100
                  p-6 md:p-7
                  ${i === 1 ? "md:ml-6" : ""}
                  ${i === 2 ? "md:ml-3" : ""}
                `}
              >
                <p className="font-black text-4xl md:text-5xl text-neutral-900 leading-none mb-1">
                  <CountingNumber valueStr={stat.value} inView={inView} delay={(i + 1) * 0.15 + 0.3} />
                </p>
                <p className="font-semibold text-sm text-neutral-700">{stat.label}</p>
                {stat.sub && (
                  <p className="text-xs text-neutral-400 mt-0.5">{stat.sub}</p>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Marquee statement ── */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="px-6 md:px-12 py-10 border-t border-neutral-200"
      >
        <p
          className="
            font-poppins font-black uppercase text-center
            text-neutral-300
            leading-tight
            tracking-[0.06em]
            text-[clamp(1.2rem,4.5vw,3.8rem)]
          "
        >
          Design, Branding and Web Development Made Better.
        </p>
      </motion.div>

    </section>
  );
}
