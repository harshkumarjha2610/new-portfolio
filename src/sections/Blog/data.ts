export interface BlogProject {
  id: string;
  number: string;
  category: string;
  topic: string;
  year: string;
  overview: string;
  stack: string[];
  image: string;
  slug: string;
}

export const BLOG_PROJECTS: BlogProject[] = [
  {
    id: "1",
    number: "01",
    category: "NEXT.JS",
    topic: "WEB DEVELOPMENT",
    year: "2026",
    overview:
      "Building production-ready applications with Next.js 15 — App Router patterns, streaming, server components, and deployment strategies that scale from side projects to enterprise.",
    stack: ["NEXT.JS", "REACT", "TYPESCRIPT", "VERCEL"],
    image:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1200&q=80",
    slug: "nextjs-15-production-apps",
  },
  {
    id: "2",
    number: "02",
    category: "REACT",
    topic: "FRONTEND",
    year: "2026",
    overview:
      "Mastering React Server Components in 2026 — when to reach for RSC, how to compose client boundaries, and patterns that keep your bundle lean without sacrificing UX.",
    stack: ["REACT", "RSC", "PERFORMANCE", "TAILWIND"],
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&q=80",
    slug: "react-server-components",
  },
  {
    id: "3",
    number: "03",
    category: "AI",
    topic: "DEVELOPMENT",
    year: "2025",
    overview:
      "Integrating AI into your development workflow — how I use LLMs for code review, scaffolding, and documentation without losing craft or control over architecture.",
    stack: ["CURSOR", "OPENAI", "PRODUCTIVITY", "AUTOMATION"],
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
    slug: "ai-development-workflow",
  },
  {
    id: "4",
    number: "04",
    category: "JAVASCRIPT",
    topic: "PATTERNS",
    year: "2025",
    overview:
      "Modern JavaScript patterns every developer should know — from async iterators to composition over inheritance, practical techniques for maintainable codebases.",
    stack: ["JAVASCRIPT", "ES2026", "PATTERNS", "NODE.JS"],
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "modern-javascript-patterns",
  },
  {
    id: "5",
    number: "05",
    category: "CSS",
    topic: "UI DESIGN",
    year: "2025",
    overview:
      "The art of glassmorphism in modern UI design — backdrop filters, layered depth, and subtle motion for interfaces that feel premium without overwhelming users.",
    stack: ["CSS", "TAILWIND", "UI DESIGN", "FRAMER MOTION"],
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    slug: "glassmorphism-modern-ui",
  },
];

export const BG_DARK = "#1c1c1c";
export const BG_LIGHT = "#b8b8b8";
