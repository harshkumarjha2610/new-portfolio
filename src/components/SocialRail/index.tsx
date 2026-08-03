"use client";

import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

const SOCIALS = [
  { icon: FaFacebookF,     href: "https://facebook.com",     label: "Facebook"  },
  { icon: FaInstagram,     href: "https://instagram.com",    label: "Instagram" },
  { icon: FaXTwitter,      href: "https://twitter.com",      label: "Twitter/X" },
  { icon: MdOutlineEmail,  href: "mailto:hello@harsh.dev",   label: "Email"     },
];

export default function SocialRail() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const aboutSection = document.getElementById("about");
    const observer = new IntersectionObserver(
      ([entry]) => setIsDark(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (aboutSection) observer.observe(aboutSection);
    return () => observer.disconnect();
  }, []);

  const iconColor = isDark ? "text-white/60 hover:text-white" : "text-neutral-500 hover:text-neutral-900";
  const lineColor = isDark ? "bg-white/20" : "bg-neutral-300";

  return (
    <>
      {/* ── Desktop: fixed left rail ── */}
      <aside
        className={`
          hidden md:flex
          fixed left-6 bottom-0 z-[90]
          flex-col items-center gap-4
          pb-0
          transition-colors duration-500
        `}
      >
        {/* Top connecting line */}
        <div className={`w-px h-16 ${lineColor} transition-colors duration-500`} />

        {SOCIALS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`
              transition-all duration-200
              hover:scale-125
              ${iconColor}
            `}
          >
            <Icon size={17} />
          </a>
        ))}

        {/* Bottom line to edge */}
        <div className={`w-px flex-1 min-h-[48px] ${lineColor} transition-colors duration-500`} />
      </aside>

      {/* ── Mobile: horizontal bottom bar ── */}
      <div
        className="
          md:hidden
          fixed bottom-0 left-0 right-0 z-[90]
          flex items-center justify-center gap-6
          py-3
          bg-black/60 backdrop-blur-md
          border-t border-white/10
        "
      >
        {SOCIALS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-white/60 hover:text-white transition-all duration-200 hover:scale-125"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
    </>
  );
}
