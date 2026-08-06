"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import BlogEntry from "./BlogEntry";
import { BLOG_PROJECTS, BG_DARK } from "./data";

export default function Blog() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header.children,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="blog" className="relative w-full">
      {/* Section header */}
      <div
        ref={headerRef}
        className="relative w-full"
        style={{
          background: BG_DARK,
          padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 6rem) clamp(3rem, 6vw, 5rem)",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <h2
            className="uppercase leading-none tracking-tight text-cyan-100"
            style={{
              fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Latest Articles
          </h2>
          <p
            className="max-w-sm leading-relaxed lg:text-right"
            style={{
              fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)",
              color: "rgba(255,255,255,0.45)",
              fontFamily: "var(--font-geist-sans)",
              lineHeight: 1.7,
            }}
          >
            Thoughts, tutorials, and insights from my experiences building modern
            web applications.
          </p>
        </div>
      </div>

      {/* Project entries */}
      {BLOG_PROJECTS.map((project, index) => (
        <BlogEntry key={project.id} project={project} index={index} />
      ))}
    </section>
  );
}
