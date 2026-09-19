"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Phone, ChevronUp } from "lucide-react";
import { siteConfig } from "@/constants/site-config";
import { trackEvent } from "@/lib/tracking";

const TOOLTIP_BASE =
  "pointer-events-none absolute top-1/2 right-full mr-3.5 hidden -translate-y-1/2 items-center gap-1.5 rounded-full border border-slate-100 bg-white px-3 py-1.5 text-xs font-extrabold whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.15)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:flex";

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

  const handleAiClick = () => {
    trackEvent("ai_chat_click", { position: "floating_widget" });
    window.dispatchEvent(new CustomEvent("toggle-ai-chat"));
  };

  return (
    <aside
      aria-label="Liên hệ nhanh và điều hướng"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-3 select-none pointer-events-auto"
    >
      {/* 1. Nút Cuộn lên đầu trang (trên cùng) */}
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
          className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg shadow-black/10 border border-slate-200/90 backdrop-blur-md transition-all duration-300 hover:text-[#E52E20] hover:border-orange-300/60 hover:shadow-orange-500/20 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />

          {/* Tooltip pill trắng */}
          <span className={TOOLTIP_BASE}>
            <span className="text-slate-700">Lên đầu trang</span>
          </span>
        </button>
      </div>

      {/* 2. Nút Chat trợ lý AI DU — icon DU_head */}
      <div className="relative flex items-center justify-center">
        {/* Hào quang đỏ nhẹ hài hòa với nút Zalo/Hotline */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#E52E20]/25 pointer-events-none animate-ping [animation-duration:2.2s]"
        />
        <button
          type="button"
          data-ai-chat-toggle
          onClick={handleAiClick}
          aria-label="Chat ngay với trợ lý AI DU"
          className="group relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF6F0] border-2 border-white shadow-xl shadow-[#E52E20]/30 ring-2 ring-[#E52E20]/20 transition-all duration-300 hover:scale-110 hover:ring-[#E52E20]/45 hover:shadow-[#E52E20]/45 active:scale-95 cursor-pointer"
        >
          <span className="absolute inset-[2px] overflow-hidden rounded-full bg-[#FFF1E8]">
            <Image
              src="/images/ai-du-icon.webp"
              alt="Trợ lý AI DU"
              fill
              sizes="48px"
              className="object-cover"
            />
          </span>
          {/* Tooltip pill trắng */}
          <span className={TOOLTIP_BASE}>
            <span className="text-[#E52E20]">Chat ngay với trợ lý AI DU</span>
          </span>
        </button>
      </div>

      {/* 3. Nút Chat Zalo (chữ Zalo trắng trên nền xanh #0068FF) */}
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
          className="group relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#0068FF] hover:bg-[#005ce6] text-white shadow-xl shadow-blue-600/40 border border-white/25 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <span className="text-white font-bold text-[14px] tracking-tight leading-none select-none">
            Zalo
          </span>

          {/* Tooltip pill trắng */}
          <span className={TOOLTIP_BASE}>
            <span className="text-[#0068FF]">Zalo:</span>
            <span className="text-slate-800">Chat ngay với DUDI</span>
          </span>
        </a>
      </div>

      {/* 4. Nút Gọi Hotline (dưới cùng, giữ nguyên hiệu ứng sóng cam DUDI) */}
      <div className="relative flex items-center justify-center">
        {/* Radiating Ripple Wave Rings (Cam) */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#FF4500]/30 pointer-events-none animate-ripple-1"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-[#FF6500]/40 pointer-events-none animate-ripple-2"
        />

        <a
          href={siteConfig.hotlineTel}
          onClick={handlePhoneClick}
          aria-label={`Gọi ngay hotline ${siteConfig.hotline}`}
          className="group relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF3B30] to-[#FF6500] text-white shadow-xl shadow-[#FF6500]/40 border border-white/20 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <Phone className="h-5 w-5 animate-phone-ring" />

          {/* Tooltip pill trắng kiểu Image 2 */}
          <span className={TOOLTIP_BASE}>
            <span className="text-[#FF6500]">Hotline:</span>
            <span className="text-slate-800">{siteConfig.hotline}</span>
          </span>
        </a>
      </div>
    </aside>
  );
}
