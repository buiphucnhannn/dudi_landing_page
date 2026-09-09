"use client";

import { useState, useEffect } from "react";
import { Phone, ChevronUp } from "lucide-react";
import { siteConfig } from "@/constants/site-config";
import { ZaloIcon } from "@/components/ui/ZaloIcon";
import { trackEvent } from "@/lib/tracking";

export function FloatingWidgets() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePhoneClick = () => {
    trackEvent("phone_click", { position: "floating_widget" });
  };

  const handleZaloClick = () => {
    trackEvent("zalo_click", { position: "floating_widget" });
  };

  return (
    <aside
      aria-label="Liên hệ nhanh và điều hướng"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-3 select-none pointer-events-auto"
    >
      {/* 1. Nút Cuộn lên đầu trang (Scroll to Top) */}
      <div
        className={`transition-all duration-300 ease-out ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
            : "opacity-0 translate-y-4 pointer-events-none scale-75"
        }`}
      >
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Cuộn lên đầu trang"
          className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/95 dark:bg-[#0E172E]/95 text-slate-700 dark:text-slate-200 shadow-lg shadow-black/15 dark:shadow-black/40 border border-slate-200/90 dark:border-slate-700/80 backdrop-blur-md transition-all duration-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/40 hover:shadow-red-500/20 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />

          {/* Tooltip */}
          <span className="absolute right-full mr-3.5 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white bg-slate-900/95 dark:bg-slate-800/95 border border-white/10 rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
            Lên đầu trang
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900/95 dark:bg-slate-800/95 border-r border-t border-white/10 rotate-45" />
          </span>
        </button>
      </div>

      {/* 2. Nút Gọi Hotline (Với hiệu ứng sóng lan tỏa đỏ) */}
      <div className="relative flex items-center justify-center">
        {/* Radiating Ripple Wave Rings (Đỏ) */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-red-600/30 pointer-events-none animate-ripple-1"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-red-500/40 pointer-events-none animate-ripple-2"
        />

        <a
          href={siteConfig.hotlineTel}
          onClick={handlePhoneClick}
          aria-label={`Gọi ngay hotline ${siteConfig.hotline}`}
          className="group relative z-10 flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 text-white shadow-xl shadow-red-600/40 border border-white/20 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <Phone className="h-5 w-5 sm:h-5.5 sm:w-5.5 animate-phone-ring" />

          {/* Tooltip */}
          <span className="absolute right-full mr-3.5 px-3 py-1.5 text-xs font-bold tracking-wide text-white bg-slate-900/95 dark:bg-slate-800/95 border border-white/10 rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
            <span className="text-red-400 font-semibold mr-1">Hotline:</span>
            {siteConfig.hotline}
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900/95 dark:bg-slate-800/95 border-r border-t border-white/10 rotate-45" />
          </span>
        </a>
      </div>

      {/* 3. Nút Chat Zalo (Với hiệu ứng sóng lan tỏa xanh Zalo) */}
      <div className="relative flex items-center justify-center">
        {/* Radiating Ripple Wave Rings (Xanh Zalo) */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#0068FF]/30 pointer-events-none animate-ripple-1"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-blue-400/40 pointer-events-none animate-ripple-2"
        />

        <a
          href={siteConfig.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleZaloClick}
          aria-label="Chat trực tiếp qua Zalo với DUDI Software"
          className="group relative z-10 flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#0068FF] hover:bg-[#005ce6] text-white shadow-xl shadow-blue-600/40 border border-white/25 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ZaloIcon className="h-6 w-6 sm:h-7 sm:w-7 drop-shadow-sm" />

          {/* Tooltip */}
          <span className="absolute right-full mr-3.5 px-3 py-1.5 text-xs font-bold tracking-wide text-white bg-slate-900/95 dark:bg-slate-800/95 border border-white/10 rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
            <span className="text-blue-400 font-semibold mr-1">Zalo:</span>
            Chat ngay với DUDI
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900/95 dark:bg-slate-800/95 border-r border-t border-white/10 rotate-45" />
          </span>
        </a>
      </div>
    </aside>
  );
}
