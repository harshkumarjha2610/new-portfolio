"use client";

import { useRef, useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { motion, type Variants } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import { gsap } from "@/lib/gsap";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE_OUT_EXPO },
  }),
};

const inputClass =
  "w-full px-4 py-3.5 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] text-sm text-white placeholder:text-white/30 transition-[border-color,box-shadow,background] duration-300 focus:outline-none focus:border-violet-500/40 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]";

type FormState = {
  name: string;
  email: string;
  projectIdea: string;
};

const initialState: FormState = { name: "", email: "", projectIdea: "" };

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 48, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.projectIdea.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setError(null);
    setSubmitted(true);

    // TODO: replace with your actual submit logic (API route, email service, etc.)
    // e.g. fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full overflow-hidden bg-[#050505] text-white"
    >
      {/* Background accents — scoped to this section only, click-through */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <div className="absolute -top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-violet-600/[0.06] blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-purple-500/[0.05] blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139,92,246,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.6) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-20 mx-auto max-w-2xl px-5 sm:px-6 lg:px-8 py-[clamp(5rem,10vw,8rem)]">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center mb-[clamp(2.5rem,5vw,3.5rem)]"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400 mb-4"
          >
            Get in Touch
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeUp}
            className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-tight leading-[1.1] mb-4"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Contact{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
              Us
            </span>
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeUp}
            className="text-white/45 text-base leading-relaxed max-w-md mx-auto"
          >
            Have a project in mind? Share your idea and let&apos;s build something
            exceptional together.
          </motion.p>
        </motion.div>

        {/* Glass form card */}
        <div
          ref={cardRef}
          className="
            relative z-20 rounded-[28px] p-8 md:p-10
            bg-white/[0.03] backdrop-blur-2xl
            border border-white/[0.08]
            shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]
            pointer-events-auto
          "
        >
          {/* Top shimmer */}
          <div
            className="absolute top-0 left-[8%] right-[8%] h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            }}
          />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-12 text-center"
            >
              <p className="text-lg font-medium text-white mb-2">Message sent!</p>
              <p className="text-sm text-white/45">
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              onClick={(e) => e.stopPropagation()}
              className="relative z-20 flex flex-col gap-5 pointer-events-auto"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 mb-2"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 mb-2"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-idea"
                  className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 mb-2"
                >
                  Project Idea
                </label>
                <textarea
                  id="contact-idea"
                  name="projectIdea"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.projectIdea}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 -mt-1">{error}</p>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="
                  group mt-2 inline-flex items-center justify-center gap-2.5
                  w-full py-3.5 rounded-xl
                  bg-violet-500/20 border border-violet-500/30
                  text-sm font-semibold text-violet-200
                  backdrop-blur-sm cursor-pointer
                  transition-[background,box-shadow,border-color] duration-300
                  hover:bg-violet-500/30 hover:border-violet-400/45
                  hover:shadow-[0_0_32px_rgba(139,92,246,0.2)]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60
                "
              >
                Send Message
                <HiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}