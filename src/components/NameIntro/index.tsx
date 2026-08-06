"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { FONT_SEQUENCE } from "./FONT_SEQUENCE";
import { SWAP_INTERVALS } from "./SWAP_INTERVALS";
import styles from "./NameIntro.module.css";

interface NameIntroProps {
  onComplete: () => void;
}

export default function NameIntro({ onComplete }: NameIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(true);

  useLayoutEffect(() => {
    // Check if prefers reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReduced) {
      setTimeout(() => setShouldRender(false), 0);
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    if (!shouldRender || !textRef.current || !containerRef.current) return;

    // Lock scroll
    document.body.style.overflow = "hidden";
    
    // Ensure Lenis is stopped even if it initializes after this component mounts
    let lenisInterval: NodeJS.Timeout;
    const stopLenis = () => {
      const l = (window as unknown as { __lenis?: { stop: () => void } }).__lenis;
      if (l) {
        l.stop();
      } else {
        lenisInterval = setTimeout(stopLenis, 50);
      }
    };
    stopLenis();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Final beat lock-in effect
          gsap.to(textRef.current, {
            scale: 1.04,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.out",
            onComplete: () => {
              // Fade out container
              gsap.to(containerRef.current, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut",
                onComplete: () => {
                  document.body.style.overflow = "";
                  // @ts-expect-error: __lenis added to window
                  if (window.__lenis) window.__lenis.start();
                  setShouldRender(false);
                  onComplete();
                }

              });
            }
          });
        }
      });

      // Build the sequence
      let timeOffset = 0;
      
      FONT_SEQUENCE.forEach((frame, index) => {
        // Apply the frame styles
        tl.call(() => {
          if (!textRef.current) return;
          const el = textRef.current;
          
          el.style.fontFamily = frame.fontFamily;
          el.style.fontWeight = frame.fontWeight.toString();
          el.style.fontStyle = frame.fontStyle || 'normal';
          el.style.letterSpacing = frame.letterSpacing || 'normal';
          el.style.textTransform = frame.textTransform || 'none';
          el.style.fontStretch = frame.fontStretch || 'normal';
          
          if (frame.fillMode === 'outline') {
            el.style.color = 'transparent';
            el.style.webkitTextStroke = '2px currentColor';
          } else {
            el.style.color = 'currentColor';
            el.style.webkitTextStroke = '0';
          }

          if (frame.glitch) {
            el.style.textShadow = '2px 0px 0px rgba(255,0,0,0.8), -2px 0px 0px rgba(0,255,255,0.8)';
          } else {
            el.style.textShadow = 'none';
          }

          // Tiny flicker/jitter for the transition
          if (index < FONT_SEQUENCE.length - 1) {
            gsap.fromTo(el, 
              { filter: 'blur(2px)', y: (Math.random() - 0.5) * 4 },
              { filter: 'blur(0px)', y: 0, duration: 0.05, clearProps: "filter,y" }
            );
          }
        }, undefined, timeOffset);

        // Advance timeOffset by the interval for this frame
        // Fallback to 100ms if we run out of SWAP_INTERVALS
        const interval = SWAP_INTERVALS[index] || 100;
        timeOffset += interval / 1000; 
      });
      
    }, containerRef);

    return () => {
      ctx.revert();
      clearTimeout(lenisInterval);
      document.body.style.overflow = "";
      // @ts-expect-error: __lenis added to window
      if (window.__lenis) window.__lenis.start();
    };
  }, [shouldRender, onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white"
    >
      <div 
        ref={textRef} 
        className={`flex select-none items-center justify-center whitespace-nowrap ${styles.nameText}`}
      >
        HARSH
      </div>
    </div>
  );
}
