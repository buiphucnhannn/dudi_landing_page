"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook theo dõi vị trí cuộn trang để xử lý hiệu ứng Navbar Blur/Sticky
 * @param {number} threshold - Ngưỡng pixel kích hoạt trạng thái scrolled (mặc định 20px)
 * @returns {{ scrollY: number, isScrolled: boolean }}
 */
export function useScrollPosition(threshold = 20) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);
    };

    // Chạy một lần khi mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { scrollY, isScrolled };
}
