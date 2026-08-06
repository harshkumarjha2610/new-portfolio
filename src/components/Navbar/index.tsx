"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type Lenis from "lenis";

const NAV_LINKS = [
  { label: "Home",     href: "#hero"     },
  { label: "About",    href: "#about"    },
  { label: "Services", href: "#services" },
  { label: "Work",     href: "#works"    },
  { label: "Blog",     href: "#blog"     },
  { label: "Contact",  href: "#contact"  },
];

const NAVBAR_OFFSET = 64;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  // true = over a dark section (white text), false = over light section (dark text)
  const [isDark, setIsDark] = useState(true);

  const scrollToSection = useCallback((href: string) => {
    if (!href.startsWith("#")) return;
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis?.scrollTo) {
      lenis.scrollTo(target, { offset: -NAVBAR_OFFSET, duration: 1.4 });
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }

    window.history.pushState(null, "", href);
    setMenuOpen(false);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      scrollToSection(href);
    },
    [scrollToSection]
  );

  useEffect(() => {
    const aboutSection = document.getElementById("about");
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDark(!entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    if (aboutSection) observer.observe(aboutSection);
    return () => observer.disconnect();
  }, []);

  const textColor = isDark ? "text-white/90" : "text-neutral-800";
  const logoColor = isDark ? "text-white"    : "text-neutral-900";

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-[100]
        flex items-center justify-between
        px-6 md:px-12 h-16
        bg-white/5 backdrop-blur-md
        border-b border-white/10
        transition-colors duration-500
      `}
    >
      {/* Logo */}
      <Link
        href="#hero"
        onClick={(e) => handleNavClick(e, "#hero")}
        className={`font-black text-lg tracking-[0.2em] uppercase transition-colors duration-500 ${logoColor}`}
      >
        HARSH
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className={`nav-link text-sm font-medium tracking-widest uppercase transition-colors duration-500 ${textColor}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger — sits above the drawer */}
      <button
        className={`md:hidden flex flex-col gap-[5px] cursor-pointer relative z-[110] ${textColor}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span
          className={`block h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
        />
        <span
          className={`block h-px w-6 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
        />
      </button>

      {/* ── Mobile drawer ───────────────────────────────────────── */}
      <div
        className={`
          md:hidden fixed left-0 right-0 bottom-0
          transition-opacity duration-500 ease-in-out
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        style={{
          top: "64px",
          /* Glassmorphism base */
          background: "rgba(6, 6, 6, 0.82)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Grey glow at top-right corner */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 100% 0%, rgba(90,90,90,0.30) 0%, rgba(35,35,35,0.15) 45%, transparent 100%)",
          }}
        />

        {/* Nav links — start from top, right-aligned, right-padded to clear close icon */}
        <div
          className="relative flex flex-col overflow-y-auto"
          style={{
            height: "100%",
            paddingTop: "1.25rem",
            paddingBottom: "1.25rem",
            paddingLeft: "1.5rem",
            /* 5rem right padding keeps items clear of the hamburger/close icon */
            paddingRight: "5rem",
          }}
        >
          {NAV_LINKS.map(({ label, href }, i) => (
            <Link
              key={label}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="group flex items-center justify-end gap-3 w-full"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                padding: "0.9rem 0",
                transform: menuOpen ? "translateX(0)" : "translateX(20px)",
                opacity: menuOpen ? 1 : 0,
                transition: "transform 0.38s ease, opacity 0.38s ease",
                transitionDelay: menuOpen ? `${i * 50}ms` : "0ms",
              }}
            >
              {/* Index */}
              <span
                className="text-white/20 font-mono shrink-0"
                style={{ fontSize: "9px" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Label */}
              <span
                className="font-semibold uppercase text-white/80 group-hover:text-white transition-colors duration-200"
                style={{
                  fontSize: "clamp(0.85rem, 3.2vw, 1rem)",
                  letterSpacing: "0.2em",
                }}
              >
                {label}
              </span>

              {/* Hover arrow */}
              <span
                className="text-white/0 group-hover:text-white/40 transition-colors duration-200"
                style={{ fontSize: "0.7rem" }}
              >
                ›
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
