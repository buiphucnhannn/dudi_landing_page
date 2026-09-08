"use client";

import React, { useEffect, useRef, useState } from "react";

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  duration = 750,
  direction = "up", // 'up' | 'left' | 'right' | 'scale' | 'none'
  threshold = 0.05,
  rootMargin = "120px 0px -20px 0px",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hiệu ứng lazy load mượt mà, tự nhiên cả khi lướt lên và lướt xuống
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Chỉ reset khi phần tử đã lướt ra ngoài hẳn màn hình (có vùng đệm 120px)
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  // Chuyển động nhẹ nhàng 20px (translate-y-5) để mắt nhìn thoải mái, không giật gân
  const getTransformClass = () => {
    if (isVisible) return "opacity-100 translate-y-0 translate-x-0 scale-100";

    switch (direction) {
      case "left":
        return "opacity-0 translate-x-5 scale-[0.985]";
      case "right":
        return "opacity-0 -translate-x-5 scale-[0.985]";
      case "scale":
        return "opacity-0 scale-[0.96]";
      case "none":
        return "opacity-0";
      case "up":
      default:
        return "opacity-0 translate-y-5 scale-[0.985]";
    }
  };

  const cappedDelay = Math.min(delay, 120);

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: isVisible ? `${duration}ms` : "300ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: isVisible ? `${cappedDelay}ms` : "0ms",
      }}
      className={`transition-all will-change-[opacity,transform] ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  );
}
