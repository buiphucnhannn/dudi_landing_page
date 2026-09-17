"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollReveal({
  children,
  variant = "fade-up", // fade-up, fade-down, slide-left, slide-right, zoom-in, card-3d, flip-in
  delay = 0,
  duration = 900,
  className = "",
  threshold = 0,
  rootMargin = "60px 0px 60px 0px", // Vùng đệm ngăn hiện tượng chớp/nhấp nháy ở mép màn hình
  once = false, // Hỗ trợ lướt 2 chiều (cuộn xuống và cuộn ngược lên)
  as: Component = "div",
  style = {},
  ...restProps
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return (
    <Component
      ref={ref}
      className={`reveal-init reveal-${variant} ${isRevealed ? "is-revealed" : ""} ${className}`}
      style={{
        "--reveal-duration": `${duration}ms`,
        "--reveal-delay": `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        ...style,
      }}
      {...restProps}
    >
      {children}
    </Component>
  );
}

export default ScrollReveal;
