"use client";

import React, { useEffect, useState } from "react";

export interface BlogPost {
  id: string;
  is_featured?: boolean;
  badge?: string;
  title: string;
  description?: string;
  author?: string;
  category: string;
  category_color: string;
  video_url: string;
  display_order: number;
}

const DEFAULT_FEATURED: BlogPost = {
  id: "featured-1",
  is_featured: true,
  badge: "Must Read",
  title: "Full-Frame vs. Crop Sensor: Which for Photography?",
  description:
    "An honest look at the real-world differences between these camera systems to help you choose what's actually right for your photography needs.",
  author: "By August Renner (c)",
  category: "Gear",
  category_color: "#7d1a4a",
  video_url:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_155500_808e6fdd-761f-4acd-b3be-cb7e6e700def.mp4",
  display_order: 0,
};

const DEFAULT_GRID_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Finding Natural Light in Unexpected Places",
    category: "Lighting",
    category_color: "#2c4c34",
    video_url:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_030111_a9e15665-d379-4a7f-8116-695bbe452ad1.mp4",
    display_order: 1,
  },
  {
    id: "post-2",
    title: "My Approach to Editing: Creating a Consistent Photography Style",
    category: "Editing",
    category_color: "#a63e2d",
    video_url:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4",
    display_order: 2,
  },
  {
    id: "post-3",
    title: "Pricing Your Photography: Strategies That Work",
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
}: {
  src: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden group cursor-pointer ${className}`}>
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
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="w-[70px] h-[70px] rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white text-3xl font-light transform scale-70 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
          +
        </div>
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
  const [featuredPost, setFeaturedPost] = useState<BlogPost>(DEFAULT_FEATURED);
  const [gridPosts, setGridPosts] = useState<BlogPost[]>(DEFAULT_GRID_POSTS);

  return (
    <section className="w-full bg-white font-[family-name:var(--font-sans)] text-neutral-900 py-[60px] px-[20px]">
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
                className="text-[32px] md:text-[48px] font-[family-name:var(--font-outfit,'Outfit')] font-medium tracking-[-1.5px] text-black leading-[1.1] mb-4"
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
                className="text-white text-[11px] font-semibold px-[12px] py-[4px] rounded-[20px] capitalize tracking-wide"
                style={{ backgroundColor: featuredPost.category_color }}
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
                className="aspect-[16/10] w-full rounded-[20px]"
              />

              {/* Title & Category Badge */}
              <div className="mt-4 flex items-start justify-between gap-3">
                <h4
                  className="font-[family-name:var(--font-outfit,'Outfit')] font-semibold text-[17px] text-black leading-snug"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {post.title}
                </h4>

                <span
                  className="text-white text-[11px] font-semibold px-[12px] py-[4px] rounded-[20px] capitalize shrink-0 tracking-wide mt-0.5"
                  style={{ backgroundColor: post.category_color }}
                >
                  {post.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
