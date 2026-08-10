"use client";

import Link from "next/link";
import Vortex from "@/components/Vortex";



export default function ProjectsPage() {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden bg-black"
      style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
    >
      {/* ── Galaxy Tornado background ─────────────────────────── */}
      <Vortex
        className="absolute inset-0 w-full h-full"
        style={{ width: "100%", height: "100%" }}
        topRadius={320}
        waistRadius={48}
        waistPosition={48}
        bottomRadius={1000}
        twist={3.2}
        zoom={72}
        speed={9}
        direction="right"
        lineOptions={{ count: 200, color: "#ffffff", glow: 9 }}
        dots
        dotOptions={{ count: 6000, size: 18, color: "#ffffff", glow: 9, flicker: 8 }}
        comets
        cometOptions={{ count: 8, speed: 5, color: "#f97316", glow: 7, tail: 18, delay: 7, collide: 5 }}
      />

      {/* ── Dark vignette so text is readable ────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* ── Page content ─────────────────────────────────────── */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between px-8 md:px-16 pt-10">
          <Link
            href="/"
            className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 text-sm tracking-widest uppercase font-medium"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span>
            Back
          </Link>
          <span className="text-white/25 text-xs tracking-[0.3em] uppercase font-mono">
            harshkumarjha · works
          </span>
        </header>
      </div>
    </main>
  );
}
