"use client";

import React, { useState, useEffect } from "react";
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
    "Choosing between a full-frame and crop sensor (APS-C) camera is one of the most significant decisions a photographer will make. While marketing material often pushes full-frame as the ultimate professional standard, the reality is far more nuanced and practical.",
    "Full-frame sensors match the physical dimensions of traditional 35mm film (36x24mm). This larger surface area allows individual pixels—photosites—to be physically larger, gathering significantly more photons. As a result, full-frame sensors produce cleaner signals in low-light environments, broader dynamic range, and richer tonal transitions in highlights and deep shadows.",
    "However, crop sensors feature a 1.5x (or 1.6x Canon) focal crop factor. This effectively converts a 70-200mm telephoto lens into a 105-300mm equivalent, giving sports, wildlife, and documentary photographers incredible reach without the colossal weight, footprint, and immense cost of exotic prime super-telephotos.",
    "Depth of field is another critical consideration. At equivalent field-of-view and apertures, full-frame bodies deliver shallower depth-of-field, creating that coveted three-dimensional subject separation and creamy bokeh portraits. Crop sensors inherently offer deeper depth-of-field, which is actually advantageous for macro, landscape, and street photography where edge-to-edge sharpness matters.",
    "Lenses and ecosystem economics: Full-frame glass is universally larger, heavier, and substantially more expensive. A full kit with holy trinity f/2.8 zooms can easily weigh 5kg and cost upwards of $6,000. Conversely, dedicated APS-C systems from Fujifilm, Sony, and Canon offer featherweight setups that you are far more likely to carry daily.",
    "Key Takeaway: If your bread and butter is dimly-lit weddings, studio editorial portraiture, or fine-art commercial architecture, full-frame will pay dividends. But if you value agile travel, wildlife reach, street discretion, and budget efficiency, modern crop sensor flagships deliver undeniably world-class results."
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
      "Light is the fundamental building block of photography, yet great natural light often hides in plain sight. Most photographers are taught to fear high noon sun and only shoot during the golden hour, but limitation is the greatest catalyst for creativity.",
      "Instead of retreating indoors when the sun is overhead, learn to seek out architectural reflective surfaces, polished concrete plazas, and narrow alleyway light slices that slice through the urban canopy like theatrical spotlights.",
      "Concrete bounce acts as nature's gigantic softbox. When midday sunlight hits light-colored pavement or white stucco walls, it bounces upwards at a gentle 45-degree angle, providing flattering, wrap-around fill light that fills in harsh eye sockets and neck shadows without requiring external flash units.",
      "Expose for the Highlights: In intense directional light, the camera's meter will often try to average out the scene, blowing out beautiful highlights. Switch to spot metering or dial down your exposure compensation by -1.0 to -1.7 EV. Let deep shadows fall into rich negative space to carve out immediate dramatic mood.",
      "Window reflections also offer endless compositional layers. Look for double reflections where the interior and street blend into a single cinematic tableau. By rotating a circular polarizer, you can dial in the exact balance between transparency and reflection to craft painterly cityscapes.",
      "Practical Exercise: Take a single 35mm or 50mm prime lens and walk through your neighborhood between 12:00 PM and 2:00 PM. Hunt exclusively for pockets of illumination no wider than 3 feet across. Frame your subject stepping into that light beam and witness how ordinary sidewalks transform into cinematic frames."
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
      "A recognizable photography style isn't about slapping the same high-contrast preset onto every image—it is rooted in tonal consistency, color discipline, and intentional emotional temperature across differing lighting conditions.",
      "The Foundation: Tone Curve Mastery. The S-curve is ubiquitous, but the secret lies in lifting the black point just enough to soften harsh digital blacks without washing out contrast. Gently flattening the deepest shadows creates that tactile filmic quality, while keeping the mid-tones crisp and articulate.",
      "Anchor Colors: In the HSL panel, human skin is your non-negotiable anchor. Protect oranges and reds from shifting into unnatural magenta or yellow casts. Once your skin tones are calibrated, you can aggressively stylize surrounding greens, blues, and yellows—often by desaturating competing secondary hues to guide the viewer's eye straight to the focal subject.",
      "Split Toning and Color Wheels: Introducing subtle cool blues or cyans into the shadows while bathing highlights in soft warm amber creates complementary color harmony. The key is subtlety: keep luminance blending below 15% so the color treatment feels like an intrinsic quality of the atmosphere rather than an artificial filter.",
      "Texture and Grain: Digital sensors capture razor-sharp, sterile pixels. Adding a micro-layer of organic, fine grain at 25-30% roughness softens edge transitions and knits together the color spectrum, providing a timeless print aesthetic.",
      "Workflow Tip: Build master reference boards in your catalog. When editing a new series, place three anchor images alongside your work in progress. If the newly graded photo feels disjointed in temperature or black-depth, adjust the tone curve before touching global exposure."
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
      "Pricing creative work based purely on hourly time spent is the fastest route to burnout. You are not selling 60 minutes of button pressing; you are delivering years of specialized artistic perspective, technical mastery, equipment amortization, and brand value.",
      "Transition to Value-Based Pricing: Ask yourself what the client intends to achieve with your imagery. A regional coffee shop using photos for an Instagram announcement generates vastly different revenue than a multinational brand deploying your hero shot across billboards and television campaigns. Price the outcome, not just the clock.",
      "Separate Creative Fee from Licensing Usage: Always itemize your proposals. The Creative Production Fee covers shoot prep, shooting time, crew, and initial proofing. The Licensing / Usage Rights fee governs where, how long, and in which territories the imagery will be deployed (e.g. 1-year North America Digital vs. Perpetual Global Broadcast).",
      "Tiered Packages: Never present a client with a single take-it-or-leave-it price. Always offer three tiers: Essential (meets baseline scope), Recommended (ideal package with extended deliverables and social clips), and Premium (all-inclusive with full usage buyout and rush delivery). 70% of clients will naturally gravitate to the middle tier.",
      "Confidence in the Negotiation: When clients push back on price, never discount without reducing scope. If their budget is 20% lower, remove a deliverable, reduce shoot duration, or shorten the license window. This maintains your rate integrity while respecting their budget constraints.",
      "Final Thought: The market does not dictate your value—your positioning, client curation, and ability to articulate ROI do. Charge rates that allow you to invest in top-tier craft and deliver unmistakable excellence on every assignment."
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

  // Lock background scroll and pause Lenis when modal card is open
  useEffect(() => {
    if (selectedPost) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      lenis?.stop();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedPost(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow || "";
        lenis?.start();
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedPost]);

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
            onWheel={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-center items-center p-3 sm:p-6 lg:p-10"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
              tabIndex={-1}
              className="bg-white text-neutral-900 rounded-[28px] sm:rounded-[32px] max-w-5xl w-full h-[88vh] max-h-[88vh] overflow-y-auto overscroll-contain no-scrollbar relative border border-neutral-200 flex flex-col shadow-2xl focus:outline-none"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* Sticky / Floating Close Button that stays pinned as you scroll */}
              <div className="sticky top-4 sm:top-6 z-40 flex justify-end px-4 sm:px-6 pointer-events-none -mb-12">
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center transition-all duration-200 text-sm sm:text-base font-semibold shadow-xl backdrop-blur-md cursor-pointer pointer-events-auto border border-white/20 hover:scale-105"
                  aria-label="Close article"
                >
                  ✕
                </button>
              </div>

              {/* Video Header */}
              <div className="relative w-full h-[320px] sm:h-[420px] shrink-0 overflow-hidden rounded-t-[28px] sm:rounded-t-[32px]">
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
              <div className="p-6 md:p-12 pb-16">
                <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium mb-3">
                  <span>{selectedPost.author || "By August Renner"}</span>
                  <span>•</span>
                  <span>{selectedPost.date || "2025"}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime || "5 min read"}</span>
                </div>

                <h1
                  className="text-3xl md:text-5xl font-medium tracking-tight text-black mb-5 leading-tight"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {selectedPost.title}
                </h1>

                {selectedPost.subtitle && (
                  <p className="text-lg md:text-xl text-[#555] font-normal leading-relaxed mb-8 italic border-l-2 border-black pl-4">
                    {selectedPost.subtitle}
                  </p>
                )}

                <div className="space-y-6 text-base md:text-lg text-[#333] leading-relaxed font-normal">
                  {selectedPost.content ? (
                    selectedPost.content.map((paragraph, i) => (
                      <p key={i} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p>{selectedPost.description}</p>
                  )}
                </div>

                {/* Footer Action */}
                <div className="mt-12 pt-8 border-t border-neutral-200 flex justify-between items-center">
                  <span className="text-xs text-neutral-400 font-mono">Behind the Lens Series</span>
                  <button
                    type="button"
                    onClick={() => setSelectedPost(null)}
                    className="bg-black text-white px-7 py-3 rounded-full text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
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
