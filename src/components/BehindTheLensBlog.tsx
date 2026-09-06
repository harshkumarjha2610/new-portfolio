"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface BlogPost {
  id: string;
  is_featured?: boolean;
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  content?: string[];
  author?: string;
  date?: string;
  readTime?: string;
  category: string;
  category_color: string;
  video_url: string;
  display_order: number;
}

const DEFAULT_FEATURED: BlogPost = {
  id: "full-frame-vs-crop-sensor",
  is_featured: true,
  badge: "Must Read",
  title: "Full-Frame vs. Crop Sensor: Which for Photography?",
  subtitle: "Understanding sensor sizes, focal length multipliers, and real-world image quality.",
  description:
    "An honest look at the real-world differences between these camera systems to help you choose what's actually right for your photography needs.",
  content: [
    "Choosing between a full-frame and crop sensor (APS-C) camera is one of the most significant decisions a photographer will make. While marketing material often pushes full-frame as the ultimate professional standard, the reality is far more nuanced.",
    "Full-frame sensors match the physical size of traditional 35mm film (36x24mm). This larger surface area allows individual pixels to be larger, gathering more light and offering superior dynamic range and low-light performance.",
    "On the other hand, crop sensors feature a 1.5x (or 1.6x Canon) crop factor. This effectively turns a 200mm telephoto lens into a 300mm equivalent, giving wildlife and sports photographers incredible reach without the extra weight and immense cost of super-telephoto lenses.",
    "Conclusion: If you shoot primarily in low light, studio portraiture, or wide architecture, full-frame excels. But if you value portability, reach, and budget efficiency, modern crop sensor systems deliver professional results."
  ],
  author: "By August Renner (c)",
  date: "Sept 2025",
  readTime: "5 min read",
  category: "Gear",
  category_color: "#7d1a4a",
  video_url:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_155500_808e6fdd-761f-4acd-b3be-cb7e6e700def.mp4",
  display_order: 0,
};

const DEFAULT_GRID_POSTS: BlogPost[] = [
  {
    id: "finding-natural-light",
    title: "Finding Natural Light in Unexpected Places",
    subtitle: "How shadow play and window reflections transform ordinary scenes.",
    description: "Discover how to spot ambient light direction, hard contrast shadows, and soft bounce light in everyday urban environments.",
    content: [
      "Light is the fundamental building block of photography, yet great natural light often hides in plain sight.",
      "Instead of waiting for golden hour, learn to seek out architectural reflective surfaces, alleyway light slices, and dappled window shade during mid-day glare.",
      "Key Technique: Expose for your highlights and let deep shadows frame your subjects to create instant cinematic mood."
    ],
    author: "By August Renner (c)",
    date: "Aug 2025",
    readTime: "4 min read",
    category: "Lighting",
    category_color: "#2c4c34",
    video_url:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_030111_a9e15665-d379-4a7f-8116-695bbe452ad1.mp4",
    display_order: 1,
  },
  {
    id: "approach-to-editing",
    title: "My Approach to Editing: Creating a Consistent Photography Style",
    subtitle: "Building color palettes, curves, and cohesive visual language.",
    description: "A step-by-step breakdown of color grading techniques and curves adjustment to craft a signature aesthetic.",
    content: [
      "A recognizable photography style isn't about applying a single preset to every image—it's about tone consistency across different lighting conditions.",
      "Focus on anchor colors: desaturate distracting background hues while keeping skin tones natural and luminous.",
      "Use subtle split toning in highlights and shadows to give your photo series a cohesive cinematic atmosphere."
    ],
    author: "By August Renner (c)",
    date: "Aug 2025",
    readTime: "6 min read",
    category: "Editing",
    category_color: "#a63e2d",
    video_url:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4",
    display_order: 2,
  },
  {
    id: "pricing-your-photography",
    title: "Pricing Your Photography: Strategies That Work",
    subtitle: "Value-based pricing, licensing rights, and client positioning.",
    description: "Proven commercial pricing strategies to monetize creative work and establish sustainable rates.",
    content: [
      "Pricing photography based purely on hourly work is a trap that limits your growth.",
      "Instead, transition toward value-based pricing and commercial licensing based on how and where the client intends to deploy your imagery.",
      "Always invoice separate usage rights for digital campaigns, print media, and worldwide broadcast."
    ],
    author: "By August Renner (c)",
    date: "Jul 2025",
    readTime: "7 min read",
    category: "Business",
    category_color: "#1a2b8c",
    video_url:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154232_f8809bd2-a6c3-4a38-908d-2005e5b3cb3e.mp4",
    display_order: 3,
  },
];

function VideoHoverContainer({
  src,
  className = "",
  onClick,
}: {
  src: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden group cursor-pointer ${className}`}
    >
      {/* Video Element */}
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.08]"
      />

      {/* Dark Overlay on Hover */}
      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none z-10" />

      {/* Centered '+' Icon Circle */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          className="w-[70px] h-[70px] rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white text-3xl font-light transform scale-70 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black cursor-pointer pointer-events-auto"
          aria-label="Open blog post"
        >
          +
        </button>
      </div>

      {/* White L-Shaped Corner Brackets (12px, 1.5px border, 15px inset) */}
      <div className="absolute top-[15px] left-[15px] z-20 border-t-[1.5px] border-l-[1.5px] border-white w-[12px] h-[12px] pointer-events-none" />
      <div className="absolute top-[15px] right-[15px] z-20 border-t-[1.5px] border-r-[1.5px] border-white w-[12px] h-[12px] pointer-events-none" />
      <div className="absolute bottom-[15px] left-[15px] z-20 border-b-[1.5px] border-l-[1.5px] border-white w-[12px] h-[12px] pointer-events-none" />
      <div className="absolute bottom-[15px] right-[15px] z-20 border-b-[1.5px] border-r-[1.5px] border-white w-[12px] h-[12px] pointer-events-none" />
    </div>
  );
}

export default function BehindTheLensBlog() {
  const [featuredPost] = useState<BlogPost>(DEFAULT_FEATURED);
  const [gridPosts] = useState<BlogPost[]>(DEFAULT_GRID_POSTS);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="w-full bg-white font-[family-name:var(--font-sans)] text-neutral-900 py-[60px] px-[20px]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <span className="bg-[#f4f4f4] text-[#333] text-[13px] font-semibold px-3 py-1 rounded-[8px] tracking-wide inline-block mb-3">
            Blog
          </span>
          <h2
            className="text-[48px] md:text-[64px] font-[family-name:var(--font-outfit,'Outfit')] font-medium tracking-[-2.5px] text-black leading-[1.05]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Behind the lens
          </h2>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4">
            <p className="max-w-[480px] text-[#666] text-[18px] font-medium opacity-80 leading-relaxed">
              Thoughts, insights, and stories from my photography journey. Take a peek into my creative process and recent projects.
            </p>

            <button
              type="button"
              onClick={() => setSelectedPost(featuredPost)}
              className="bg-black text-white rounded-[40px] px-6 py-3 text-[14px] font-semibold hover:scale-[1.02] transition-transform duration-200 cursor-pointer self-start md:self-auto shrink-0"
            >
              View all posts
            </button>
          </div>
        </div>

        {/* Featured Post (Full-width 2-column card) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-[20px] border border-[#f0f0f0] bg-[#fcfcfc] min-h-[520px] overflow-hidden mb-[40px]">
          {/* Left Column: Video Container */}
          <VideoHoverContainer
            src={featuredPost.video_url}
            onClick={() => setSelectedPost(featuredPost)}
            className="w-full h-full min-h-[320px] lg:min-h-[520px]"
          />

          {/* Right Column: Details */}
          <div className="p-[40px] lg:p-[60px] flex flex-col justify-between">
            <div>
              {featuredPost.badge && (
                <span className="bg-black text-white text-[12px] font-semibold px-3 py-1 rounded-[20px] inline-block w-max mb-5">
                  {featuredPost.badge}
                </span>
              )}

              <h3
                onClick={() => setSelectedPost(featuredPost)}
                className="text-[32px] md:text-[48px] font-[family-name:var(--font-outfit,'Outfit')] font-medium tracking-[-1.5px] text-black leading-[1.1] mb-4 cursor-pointer hover:text-[#7d1a4a] transition-colors"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {featuredPost.title}
              </h3>

              {featuredPost.description && (
                <p className="text-[#666] text-[17px] leading-relaxed">
                  {featuredPost.description}
                </p>
              )}
            </div>

            <div className="mt-8 lg:mt-auto pt-6 flex items-center justify-between border-t border-[#f0f0f0]">
              <span className="text-[14px] font-medium text-[#333]">
                {featuredPost.author || "By Author"}
              </span>

              <span
                className="text-white text-[11px] font-semibold px-[12px] py-[4px] rounded-[20px] capitalize tracking-wide cursor-pointer"
                style={{ backgroundColor: featuredPost.category_color }}
                onClick={() => setSelectedPost(featuredPost)}
              >
                {featuredPost.category}
              </span>
            </div>
          </div>
        </div>

        {/* Blog Grid (3 Standard Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
          {gridPosts.map((post) => (
            <div key={post.id} className="flex flex-col">
              {/* Video container */}
              <VideoHoverContainer
                src={post.video_url}
                onClick={() => setSelectedPost(post)}
                className="aspect-[16/10] w-full rounded-[20px]"
              />

              {/* Title & Category Badge */}
              <div className="mt-4 flex items-start justify-between gap-3">
                <h4
                  onClick={() => setSelectedPost(post)}
                  className="font-[family-name:var(--font-outfit,'Outfit')] font-semibold text-[17px] text-black leading-snug cursor-pointer hover:opacity-75 transition-opacity"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {post.title}
                </h4>

                <span
                  onClick={() => setSelectedPost(post)}
                  className="text-white text-[11px] font-semibold px-[12px] py-[4px] rounded-[20px] capitalize shrink-0 tracking-wide mt-0.5 cursor-pointer"
                  style={{ backgroundColor: post.category_color }}
                >
                  {post.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Interactive Blog Article Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-center items-center p-4 sm:p-6 lg:p-10 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-neutral-900 rounded-[32px] max-w-5xl w-full h-[90vh] max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shadow-2xl relative border border-neutral-200 flex flex-col"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 z-30 w-11 h-11 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors text-base font-semibold shadow-lg"
                aria-label="Close article"
              >
                ✕
              </button>

              {/* Video Header */}
              <div className="relative w-full h-[360px] sm:h-[460px] shrink-0 overflow-hidden rounded-t-[32px]">
                <video
                  src={selectedPost.video_url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />
                <span
                  className="absolute bottom-6 left-6 md:left-10 text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md"
                  style={{ backgroundColor: selectedPost.category_color }}
                >
                  {selectedPost.category}
                </span>
              </div>

              {/* Article Content */}
              <div className="p-6 md:p-10">
                <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium mb-3">
                  <span>{selectedPost.author || "By August Renner"}</span>
                  <span>•</span>
                  <span>{selectedPost.date || "2025"}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime || "5 min read"}</span>
                </div>

                <h1
                  className="text-3xl md:text-5xl font-medium tracking-tight text-black mb-4 leading-tight"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {selectedPost.title}
                </h1>

                {selectedPost.subtitle && (
                  <p className="text-lg md:text-xl text-[#555] font-normal leading-relaxed mb-6 italic border-l-2 border-black pl-4">
                    {selectedPost.subtitle}
                  </p>
                )}

                <div className="space-y-5 text-base md:text-lg text-[#333] leading-relaxed font-normal">
                  {selectedPost.content ? (
                    selectedPost.content.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{selectedPost.description}</p>
                  )}
                </div>

                {/* Footer Action */}
                <div className="mt-10 pt-6 border-t border-neutral-200 flex justify-between items-center">
                  <span className="text-xs text-neutral-400 font-mono">Behind the Lens Series</span>
                  <button
                    type="button"
                    onClick={() => setSelectedPost(null)}
                    className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-neutral-800 transition-colors"
                  >
                    Done Reading
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
