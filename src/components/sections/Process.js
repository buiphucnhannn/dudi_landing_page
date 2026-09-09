"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Send,
  SearchCheck,
  ClipboardCheck,
  Code2,
  CheckCircle2,
  Rocket,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { processStepsContent } from "@/constants/landing-content";
import { Container } from "@/components/common/Container";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { scrollToSection } from "@/lib/utils";

const stepIcons = [
  Send,
  SearchCheck,
  ClipboardCheck,
  Code2,
  CheckCircle2,
  Rocket,
];

const shortTitles = [
  "Gửi website",
  "Đánh giá",
  "Chốt phạm vi",
  "Triển khai",
  "Nghiệm thu",
  "Bàn giao",
];

const shortDescriptions = [
  "Bạn gửi đường dẫn website hiện tại",
  "DUDI kiểm tra và đề xuất giải pháp",
  "Thống nhất hạng mục và báo giá trước",
  "Thực hiện theo kế hoạch an toàn",
  "Bạn kiểm tra và góp ý chỉnh sửa",
  "Bàn giao đầy đủ và bảo hành 30 ngày",
];

export function Process() {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section
      id="quy-trinh"
      className="relative w-full overflow-x-clip bg-[#060A14] text-white select-none my-4 sm:my-5 lg:my-7 scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28"
    >
      {/* 1. Full-width Panoramic Background Image with Mascot on Summit */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <Image
          src="/images/process-summit-mascot-v4.webp"
          alt="Quy trình làm việc DUDI Software cùng linh vật chinh phục đỉnh cao"
          fill
          priority
          className="object-cover md:object-contain md:object-right opacity-95 transition-all duration-700"
          style={{ objectPosition: "right center" }}
          sizes="100vw"
        />
        {/* Atmospheric lighting gradient overlays for maximum text clarity & smooth edge blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060913]/95 via-[#060913]/50 sm:via-[#060913]/15 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-transparent to-[#060A14]/70 pointer-events-none" />
      </div>

      {/* Top Wave Divider: Single organic wave extending into previous section with zero straight line */}
      <div className="absolute -top-5 sm:-top-7 lg:-top-9 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg
          className="relative block w-full h-5 sm:h-7 lg:h-9 text-[#060A14] fill-current"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
        >
          <path d="M0,62 L1440,62 L1440,25 C1150,5 880,45 640,20 C400,0 180,40 0,25 Z" />
        </svg>
      </div>

      {/* Bottom Wave Divider: Single organic wave extending into next section with zero straight line */}
      <div className="absolute -bottom-5 sm:-bottom-7 lg:-bottom-9 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg
          className="relative block w-full h-5 sm:h-7 lg:h-9 text-[#060A14] fill-current"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
        >
          <path d="M0,-2 L1440,-2 L1440,35 C1150,55 880,15 640,40 C400,60 180,20 0,35 Z" />
        </svg>
      </div>

      {/* 2. Content Container: Perfectly scaled & compact with full panoramic background visible */}
      <Container className="relative z-30 pt-5 pb-5 sm:pt-6 sm:pb-6 lg:pt-7 lg:pb-7 flex flex-col justify-between min-h-[440px] sm:min-h-[470px] lg:min-h-[500px] xl:min-h-[530px]">
        <RevealOnScroll duration={1100}>
          {/* Top Header inside Banner */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2 sm:mb-3 lg:mb-4">
            {/* Left Title & Subtitle */}
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                Quy trình{" "}
                <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-400 bg-clip-text text-transparent">
                  làm việc
                </span>
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                Đơn giản, rõ ràng và minh bạch trong từng bước.
              </p>
            </div>

            {/* Right: Handwriting Quote beside Mascot + Navigation link */}
            <div className="flex flex-col items-start md:items-end gap-2">
              {/* Handwriting quote with artistic brackets matching reference */}
              <div className="flex items-center gap-1.5 font-handwriting text-slate-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] -rotate-1">
                <span className="text-2xl sm:text-3xl text-red-500 font-bold leading-none select-none">
                  (
                </span>
                <span className="text-base sm:text-lg lg:text-xl font-bold tracking-wide text-white">
                  Cùng bạn chinh phục phiên bản tốt hơn!
                </span>
                <span className="text-2xl sm:text-3xl text-red-500 font-bold leading-none select-none">
                  )
                </span>
              </div>

              <a
                href="#bang-gia"
                onClick={(e) => scrollToSection("#bang-gia", e)}
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-red-400 hover:text-red-300 transition-colors group cursor-pointer pt-0.5"
              >
                <span>Xem bảng giá các gói</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </RevealOnScroll>

        {/* 3. The 6 Steps Path across the Mountain Terrain */}
        <div className="relative pt-2 sm:pt-3 pb-1 sm:pb-2">
          {/* Desktop Curved Red Glowing Trajectory Line */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-8 right-8 top-[48px] h-12 pointer-events-none z-0"
          >
            <svg
              viewBox="0 0 1000 60"
              fill="none"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="summit-red-path" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
                  <stop offset="35%" stopColor="#DC2626" stopOpacity="0.95" />
                  <stop offset="70%" stopColor="#F43F5E" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity="0.9" />
                </linearGradient>
                <filter id="path-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#DC2626" floodOpacity="0.8" />
                </filter>
              </defs>

              {/* Smooth curved trail climbing up to the summit */}
              <path
                d="M 20 20 C 120 30, 200 42, 340 46 C 480 50, 600 32, 700 24 C 800 16, 880 20, 980 28"
                stroke="url(#summit-red-path)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#path-glow)"
              />

              {/* Intermediate glowing dots on the line */}
              <circle cx="180" cy="38" r="3" fill="#FFFFFF" opacity="0.8" />
              <circle cx="510" cy="42" r="3" fill="#FFFFFF" opacity="0.8" />
              <circle cx="780" cy="18" r="3" fill="#FFFFFF" opacity="0.8" />
            </svg>
          </div>

          {/* Steps Layout: Horizontal swipe on mobile, 6 columns on desktop */}
          <div className="flex lg:grid lg:grid-cols-6 gap-5 sm:gap-6 lg:gap-4 overflow-x-auto lg:overflow-visible pb-3 pt-1 scrollbar-none snap-x snap-mandatory">
            {processStepsContent.map((step, idx) => {
              const IconComp = stepIcons[idx] || Rocket;
              const isScope = idx === 2;
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.step}
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                  onClick={() => setActiveStep(isActive ? null : idx)}
                  className="flex-shrink-0 w-[170px] sm:w-[190px] lg:w-auto snap-center flex flex-col items-center text-center cursor-pointer group select-none relative"
                >
                  {/* Interactive Detail Popup Card on Hover / Tap */}
                  <div
                    className={`w-[230px] sm:w-[250px] transition-all duration-200 ease-out absolute bottom-[calc(100%+14px)] left-1/2 -translate-x-1/2 z-40 before:content-[''] before:absolute before:-bottom-3 before:left-0 before:right-0 before:h-4 ${
                      isActive
                        ? "opacity-100 translate-y-0 pointer-events-auto block"
                        : "opacity-0 translate-y-2 pointer-events-none hidden lg:block lg:invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-hover:visible"
                    }`}
                  >
                    <div className="p-3.5 rounded-xl bg-[#0A1124]/98 border border-red-500/40 shadow-2xl text-left backdrop-blur-2xl ring-1 ring-white/10 shadow-black/90">
                      {/* Triangle indicator pointing down */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-red-500/60" />

                      <div className="flex items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-slate-700/80">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
                          Chi tiết bước 0{idx + 1}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          DUDI Software
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-normal text-justify">
                        {step.description}
                      </p>

                      {isScope && (
                        <div className="mt-2 pt-1.5 border-t border-red-900/60 text-[10px] font-semibold text-rose-400 flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-amber-400 shrink-0" />
                          <span>Cam kết không phát sinh chi phí</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step Number Circle (Badge đỏ phát sáng trên đường cong) */}
                  <div className="relative mb-3 z-10">
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full font-black text-sm sm:text-base flex items-center justify-center transition-all duration-300 border-2 border-white/40 shadow-lg ${
                        isActive
                          ? "bg-gradient-to-br from-red-500 to-rose-600 text-white scale-110 ring-4 ring-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.8)]"
                          : "bg-gradient-to-br from-red-600 to-red-700 text-white group-hover:scale-110 group-hover:ring-4 group-hover:ring-red-500/40 shadow-[0_0_18px_rgba(220,38,38,0.65)]"
                      }`}
                    >
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </div>
                  </div>

                  {/* Step Icon inside a rounded square */}
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-300 border mb-2 shadow-md ${
                      isActive
                        ? "bg-red-600 text-white border-red-500 scale-105 shadow-red-500/40"
                        : "bg-slate-900/80 text-white border-slate-700/80 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 group-hover:scale-105 shadow-black/40 backdrop-blur-md"
                    }`}
                  >
                    <IconComp className="h-5 w-5" />
                  </div>

                  {/* Main Title (Ý chính luôn hiển thị) */}
                  <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-red-400 transition-colors leading-snug">
                    {shortTitles[idx] || step.title}
                  </h3>

                  {/* Subtitle / summary */}
                  <p className="text-[11px] sm:text-xs text-slate-300/80 mt-1 font-normal leading-relaxed max-w-[150px]">
                    {shortDescriptions[idx]}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mobile swipe hint */}
          <div className="lg:hidden flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-3">
            <span>Vuốt ngang để xem 6 bước</span>
            <ArrowRight className="h-3 w-3 animate-pulse" />
          </div>
        </div>
      </Container>
    </section>
  );
}
