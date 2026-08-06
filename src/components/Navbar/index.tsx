"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home",     href: "#hero"  },
  { label: "About",    href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work",     href: "#works" },
  { label: "Blog",     href: "#blog" },
  { label: "Contact",  href: "#contact" },
];

const NAVBAR_OFFSET = 64;

declare global {
  interface Window {
    lenis?: {
      scrollTo: (
        target: string | HTMLElement | number,
        options?: { offset?: number; duration?: number; immediate?: boolean }
      ) => void;
    };
  }
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  // true = over a dark section (white text), false = over light section (dark text)
  const [isDark, setIsDark] = useState(true);

  const scrollToSection = useCallback((href: string) => {
    if (!href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;

    if (window.lenis?.scrollTo) {
      window.lenis.scrollTo(target as HTMLElement, { offset: -NAVBAR_OFFSET });
    } else {
      const top =
        target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
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
        // When the about (light) section enters viewport → flip to dark-text mode
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

      {/* Mobile hamburger */}
      <button
        className={`md:hidden flex flex-col gap-[5px] cursor-pointer ${textColor}`}
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

      {/* Mobile drawer */}
      <div
        className={`
          md:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-lg
          flex flex-col items-center justify-center gap-8
          transition-all duration-400
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            className="text-white/90 text-2xl font-semibold tracking-widest uppercase hover:text-white transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
