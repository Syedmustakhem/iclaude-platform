"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** e.g. "iclaude-delay-1" — staggers the entrance, reuses the existing delay utilities */
  delayClass?: string;
};

/**
 * Fades + rises content into view the first time it enters the viewport.
 * Uses the existing `iclaude-reveal` keyframes in globals.css so the motion
 * language stays consistent across the site.
 */
export default function Reveal({ children, className = "", delayClass = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`iclaude-scroll-reveal${visible ? " is-visible" : ""}${
        delayClass ? ` ${delayClass}` : ""
      }${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
