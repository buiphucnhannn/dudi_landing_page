"use client";

import { useState } from "react";
import {
  Send,
  SearchCheck,
  ClipboardCheck,
  Code2,
  CheckCircle2,
  Rocket,
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react";
import { processStepsContent } from "@/constants/landing-content";
import { Container } from "@/components/common/Container";
import { ScrollReveal } from "@/components/common/ScrollReveal";
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
      className="relative w-full max-w-[1920px] mx-auto overflow-hidden bg-gradient-to-b from-[#1C0E24] via-[#241229] to-[#120818] text-white select-none scroll-mt-[58px] sm:scroll-mt-[68px] lg:scroll-mt-[72px] py-6 sm:py-7 lg:py-8 min-[1921px]:rounded-[32px] min-[1921px]:my-8 min-[1921px]:shadow-[0_20px_50px_rgba(0,0,0,0.28)] min-[1921px]:border min-[1921px]:border-white/10"
    >
      {/* Top Wave Divider: Organic wave smoothly transitioning from #FFF9F5 */}
      <div className="absolute -top-1 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none min-[1921px]:hidden">
        <svg
          className="relative block w-full h-5 sm:h-7 lg:h-8 text-[#FFF9F5] fill-current"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1440,0 L1440,35 C1150,55 880,15 640,40 C400,60 180,20 0,35 Z" />
        </svg>
      </div>

      {/* Bottom Wave Divider: Organic wave smoothly transitioning to #FFF9F5 */}
      <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none min-[1921px]:hidden">
        <svg
          className="relative block w-full h-5 sm:h-7 lg:h-8 text-[#FFF9F5] fill-current"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
        >
          <path d="M0,60 L1440,60 L1440,25 C1150,5 880,45 640,20 C400,0 180,40 0,25 Z" />
        </svg>
      </div>

      {/* 2. Content Container */}
      <Container className="relative z-30 pt-6 pb-6 sm:pt-7 sm:pb-7 lg:pt-8 lg:pb-8 flex flex-col justify-between min-h-[440px] sm:min-h-[470px] lg:min-h-[500px]">
        <ScrollReveal variant="fade-up" duration={900}>
          {/* Top Header inside Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 sm:mb-5 lg:mb-6">
            {/* Left Title & Subtitle */}
            <div className="max-w-xl">
              <h2 className="text-[23px] sm:text-[28px] lg:text-[32px] xl:text-[35px] font-black tracking-tight text-white leading-tight">
                Quy trình{" "}
                <span className="bg-gradient-to-r from-[#FF2B14] via-[#FF6800] to-[#FFA000] bg-clip-text text-transparent">
                  làm việc
                </span>
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                Đơn giản, rõ ràng và minh bạch trong từng bước.
              </p>
            </div>

            {/* Right: Stylized Handwriting Quote horizontally aligned with Title */}
            <div className="flex items-center gap-1.5 font-handwriting text-slate-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] -rotate-1 self-start md:self-center">
              <span className="text-2xl sm:text-3xl text-[#FF6500] font-bold leading-none select-none">
                (
              </span>
              <span className="text-base sm:text-lg lg:text-xl font-bold tracking-wide text-white">
                Cùng bạn chinh phục phiên bản tốt hơn!
              </span>
              <span className="text-2xl sm:text-3xl text-[#FF6500] font-bold leading-none select-none">
                )
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* 3. The 6 Steps Path across the Mountain Terrain with slide-right reveal */}
        <ScrollReveal variant="slide-right" delay={150} duration={850} className="relative pt-2 sm:pt-3 pb-1 sm:pb-2">
          {/* Desktop Curved Glowing Trajectory Line */}
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
                <linearGradient id="summit-orange-path" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFA040" stopOpacity="0.85" />
                  <stop offset="35%" stopColor="#FF6500" stopOpacity="0.95" />
                  <stop offset="70%" stopColor="#FF7A00" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#E52E20" stopOpacity="0.9" />
                </linearGradient>
                <filter id="path-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#FF6500" floodOpacity="0.8" />
                </filter>
              </defs>

              {/* Smooth curved trail climbing up to the summit */}
              <path
                d="M 20 20 C 120 30, 200 42, 340 46 C 480 50, 600 32, 700 24 C 800 16, 880 20, 980 28"
                stroke="url(#summit-orange-path)"
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
                  {/* Interactive Detail Popup Card on Desktop (Hover / Click) */}
                  <div
                    className={`hidden lg:block w-[230px] sm:w-[250px] transition-all duration-200 ease-out absolute bottom-[calc(100%+14px)] left-1/2 -translate-x-1/2 z-40 before:content-[''] before:absolute before:-bottom-3 before:left-0 before:right-0 before:h-4 ${
                      isActive
                        ? "opacity-100 translate-y-0 pointer-events-auto visible"
                        : "opacity-0 translate-y-2 pointer-events-none invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-hover:visible"
                    }`}
                  >
                    <div className="p-3.5 rounded-xl bg-[#241229]/98 border border-[#FF6500]/40 shadow-2xl text-left backdrop-blur-2xl ring-1 ring-white/10 shadow-black/90">
                      {/* Triangle indicator pointing down */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#FF6500]/60" />

                      <div className="flex items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-white/10">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFA040]">
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
                        <div className="mt-2 pt-1.5 border-t border-[#FF6500]/30 text-[10px] font-semibold text-amber-300 flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-amber-400 shrink-0" />
                          <span>Cam kết không phát sinh chi phí</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step Number Circle */}
                  <div className="relative mb-3 z-10">
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full font-black text-sm sm:text-base flex items-center justify-center transition-all duration-300 border-2 border-white/40 shadow-lg ${
                        isActive
                          ? "bg-gradient-to-br from-[#FF3B30] to-[#FF6500] text-white scale-110 ring-4 ring-[#FF6500]/50 shadow-[0_0_25px_rgba(255,101,0,0.8)]"
                          : "bg-gradient-to-br from-[#FF5500] to-[#E52E20] text-white group-hover:scale-110 group-hover:ring-4 group-hover:ring-[#FF6500]/40 shadow-[0_0_18px_rgba(255,101,0,0.65)]"
                      }`}
                    >
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </div>
                  </div>

                  {/* Step Icon inside a rounded square */}
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-300 border mb-2 shadow-md ${
                      isActive
                        ? "bg-[#FF6500] text-white border-[#FF7A1A] scale-105 shadow-orange-500/40"
                        : "bg-white/10 text-white border-white/15 group-hover:bg-[#FF6500] group-hover:text-white group-hover:border-[#FF7A1A] group-hover:scale-105 shadow-black/40 backdrop-blur-md"
                    }`}
                  >
                    <IconComp className="h-5 w-5" />
                  </div>

                  {/* Main Title */}
                  <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#FFA040] transition-colors leading-snug">
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

          {/* Dedicated Mobile Step Detail Card */}
          {activeStep !== null && (
            <div className="lg:hidden mt-3 p-4 rounded-2xl bg-[#241229]/95 border border-[#FF6500]/50 shadow-2xl backdrop-blur-2xl animate-fade-in relative z-30">
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 rounded-full bg-gradient-to-br from-[#FF3B30] to-[#FF6500] text-white font-black text-xs items-center justify-center shadow-xs">
                    0{activeStep + 1}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {processStepsContent[activeStep]?.title || shortTitles[activeStep]}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveStep(null);
                  }}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Đóng chi tiết"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-normal text-justify">
                {processStepsContent[activeStep]?.description}
              </p>

              {activeStep === 2 && (
                <div className="mt-2.5 pt-2 border-t border-[#FF6500]/30 text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>Cam kết không phát sinh chi phí</span>
                </div>
              )}
            </div>
          )}

          {/* Mobile swipe hint */}
          <div className="lg:hidden flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-3">
            <span>Chạm bước để xem chi tiết • Vuốt để xem 6 bước</span>
            <ArrowRight className="h-3 w-3 animate-pulse" />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
