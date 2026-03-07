import { useEffect, useRef } from "react";

// biome-ignore lint/correctness/useExhaustiveDependencies: options intentionally omitted (stable pattern)
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      el.classList.add("visible");
      return;
    }

    el.classList.add("fade-in-up");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useScrollRevealChildren(selector = ".reveal-child") {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const children = Array.from(
      container.querySelectorAll(selector),
    ) as HTMLElement[];

    if (mediaQuery.matches) {
      for (const el of children) {
        el.classList.add("visible");
      }
      return;
    }

    for (const el of children) {
      el.classList.add("fade-in-up");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 },
    );

    for (const el of children) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, [selector]);

  return containerRef;
}
