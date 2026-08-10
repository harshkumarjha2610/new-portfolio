"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Lazy-load the heavy Three.js Vortex only when panel opens
const Vortex = dynamic(() => import("@/components/Vortex"), { ssr: false });

export default function ProjectsPanel() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Listen for the custom event fired by the "View Projects" button
  useEffect(() => {
    const onOpen = () => {
      setMounted(true);
      // Small tick to let the DOM mount the panel before animating in
      requestAnimationFrame(() => setOpen(true));
    };
    window.addEventListener("open-projects-panel", onOpen);
    return () => window.removeEventListener("open-projects-panel", onOpen);
  }, []);

  // Lock body scroll while panel is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  // Escape key to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  if (!mounted) return null;

  return (
    /* Full-screen panel — slides in from right */
    <div
      aria-modal="true"
      role="dialog"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        transform: open ? "translateX(0%)" : "translateX(100%)",
        transition: "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* ── Galaxy Tornado — fills the entire panel ── */}
      <Vortex
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />

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
          {open && (
            <>
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
            </>
          )}
        </h2>
      </div>

      {/* ── Close button — top-left, always on top ── */}
      <button
        onClick={close}
        aria-label="Close"
        style={{
          position: "absolute",
          top: "1.5rem",
          left: "1.5rem",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.55rem 1.1rem",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "999px",
          color: "rgba(255,255,255,0.75)",
          fontSize: "0.72rem",
          fontFamily: "var(--font-geist-mono), monospace",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "background 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = "rgba(255,255,255,0.16)";
          el.style.color = "rgba(255,255,255,1)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = "rgba(255,255,255,0.08)";
          el.style.color = "rgba(255,255,255,0.75)";
        }}
      >
        <span style={{ fontSize: "0.9rem" }}>←</span>
        Back
      </button>
    </div>
  );
}
