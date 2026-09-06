"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AestheticContact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <section id="contact" className="w-full bg-[#fcfcfc] text-neutral-900 py-[80px] px-[20px] border-t border-[#f0f0f0]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header Section */}
        <div className="mb-14">
          <span className="bg-[#f4f4f4] text-[#333] text-[13px] font-semibold px-3.5 py-1.5 rounded-[8px] tracking-wide inline-block mb-4 font-[family-name:var(--font-sans)]">
            Contact Us
          </span>
          <h2
            className="text-[44px] sm:text-[56px] md:text-[68px] font-medium tracking-[-2.5px] text-black leading-[1.05] max-w-4xl"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Let&apos;s build something extraordinary together.
          </h2>
          <p className="max-w-[560px] text-[#666] text-[18px] font-medium opacity-85 leading-relaxed mt-4 font-[family-name:var(--font-sans)]">
            Have a project in mind, a question, or just want to connect? Drop a message below and I&apos;ll get back to you promptly.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-10">
            {/* Status & Direct Contact */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#f4f7f4] border border-[#e2ebe2] text-[#2c4c34] text-xs font-semibold font-[family-name:var(--font-sans)]">
                <span className="w-2 h-2 rounded-full bg-[#2c4c34] animate-pulse" />
                Available for New Projects & Freelance
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#888] font-semibold block mb-1 font-[family-name:var(--font-sans)]">
                  Direct Email
                </span>
                <a
                  href="mailto:contact@harshkumar.dev"
                  className="text-2xl sm:text-3xl font-medium text-black hover:text-[#7d1a4a] transition-colors tracking-tight"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  contact@harshkumar.dev
                </a>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#888] font-semibold block mb-1 font-[family-name:var(--font-sans)]">
                  Location
                </span>
                <p className="text-lg font-medium text-black font-[family-name:var(--font-sans)]">
                  Worldwide • Remote Available
                </p>
              </div>
            </div>

            {/* Response Indicator Card */}
            <div className="p-6 rounded-[20px] bg-white border border-[#f0f0f0] shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#f4f4f4] flex items-center justify-center text-sm">
                  ⚡
                </div>
                <span className="text-sm font-semibold text-black font-[family-name:var(--font-sans)]">
                  Fast Response Guaranteed
                </span>
              </div>
              <p className="text-xs text-[#666] leading-relaxed font-[family-name:var(--font-sans)]">
                Typical reply time is under 24 hours. For urgent inquiries, feel free to reach out via social channels.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <span className="text-xs uppercase tracking-wider text-[#888] font-semibold block mb-3 font-[family-name:var(--font-sans)]">
                Connect Across Platforms
              </span>
              <div className="flex flex-wrap gap-3">
                {["GitHub", "LinkedIn", "Twitter / X", "Instagram"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="px-4 py-2 rounded-full border border-[#e5e5e5] bg-white text-xs font-semibold text-[#333] hover:bg-black hover:text-white hover:border-black transition-all font-[family-name:var(--font-sans)]"
                  >
                    {social} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Aesthetic Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[28px] border border-[#f0f0f0] shadow-xl shadow-neutral-100">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#f4f7f4] text-[#2c4c34] flex items-center justify-center text-3xl mb-2">
                    ✓
                  </div>
                  <h3
                    className="text-3xl font-medium tracking-tight text-black"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Message Sent Successfully!
                  </h3>
                  <p className="text-[#666] text-sm max-w-sm font-[family-name:var(--font-sans)]">
                    Thank you for reaching out. I&apos;ve received your note and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-full bg-black text-white text-xs font-semibold hover:scale-105 transition-transform"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-[#444] uppercase tracking-wider mb-2 font-[family-name:var(--font-sans)]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-[#e5e5e5] bg-[#fafafa] text-sm text-black placeholder:text-[#aaa] focus:bg-white focus:border-black focus:outline-none transition-all font-[family-name:var(--font-sans)]"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-[#444] uppercase tracking-wider mb-2 font-[family-name:var(--font-sans)]">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-[#e5e5e5] bg-[#fafafa] text-sm text-black placeholder:text-[#aaa] focus:bg-white focus:border-black focus:outline-none transition-all font-[family-name:var(--font-sans)]"
                      />
                    </div>
                  </div>

                  {/* Subject / Service */}
                  <div>
                    <label className="block text-xs font-semibold text-[#444] uppercase tracking-wider mb-2 font-[family-name:var(--font-sans)]">
                      Subject / Service Type
                    </label>
                    <input
                      type="text"
                      placeholder="Web Development, Branding, AI App, etc."
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#e5e5e5] bg-[#fafafa] text-sm text-black placeholder:text-[#aaa] focus:bg-white focus:border-black focus:outline-none transition-all font-[family-name:var(--font-sans)]"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-[#444] uppercase tracking-wider mb-2 font-[family-name:var(--font-sans)]">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about your project goals, timeline, or ideas..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#e5e5e5] bg-[#fafafa] text-sm text-black placeholder:text-[#aaa] focus:bg-white focus:border-black focus:outline-none transition-all resize-none font-[family-name:var(--font-sans)]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-8 rounded-full bg-black text-white text-[15px] font-semibold hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending Message...
                      </span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
