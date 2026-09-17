"use client";

import Image from "next/image";
import {
  FileText,
  Layers,
  Smartphone,
  Zap,
  SearchCheck,
  Code2,
  ShieldCheck,
  Headphones,
  Check,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { cn } from "@/lib/utils";

const leftSolutions = [
  {
    id: "content",
    title: "Nội dung",
    subtitle: "Chuẩn hóa & tối ưu",
    icon: FileText,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50 border-blue-200/80",
    offsetClass: "translate-x-0",
  },
  {
    id: "uiux",
    title: "Giao diện UI/UX",
    subtitle: "Hiện đại & dễ dùng",
    icon: Layers,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50 border-rose-200/80",
    offsetClass: "sm:translate-x-2.5 lg:translate-x-4",
  },
  {
    id: "mobile",
    title: "Tối ưu mobile",
    subtitle: "Chuẩn mọi thiết bị",
    icon: Smartphone,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50 border-amber-200/80",
    offsetClass: "sm:translate-x-2.5 lg:translate-x-4",
  },
  {
    id: "speed",
    title: "Tốc độ",
    subtitle: "Tải nhanh & mượt mà",
    icon: Zap,
    iconColor: "text-[#FF6500]",
    iconBg: "bg-orange-50 border-orange-200/80",
    offsetClass: "translate-x-0",
  },
];

const rightSolutions = [
  {
    id: "seo",
    title: "SEO On-page",
    subtitle: "Thân thiện Google",
    icon: SearchCheck,
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50 border-cyan-200/80",
    offsetClass: "translate-x-0",
  },
  {
    id: "form",
    title: "Form & chức năng",
    subtitle: "Sửa lỗi & thêm tính năng",
    icon: Code2,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50 border-violet-200/80",
    offsetClass: "sm:-translate-x-2.5 lg:-translate-x-4",
  },
  {
    id: "audit",
    title: "Kiểm tra lỗi",
    subtitle: "Xử lý triệt để",
    icon: ShieldCheck,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 border-emerald-200/80",
    offsetClass: "sm:-translate-x-2.5 lg:-translate-x-4",
  },
  {
    id: "consulting",
    title: "Tư vấn thêm",
    subtitle: "Giải pháp tối ưu",
    icon: Headphones,
    iconColor: "text-[#FF6500]",
    iconBg: "bg-orange-50 border-orange-200/80",
    offsetClass: "translate-x-0",
  },
];

const keyPoints = [
  "Không vẽ thêm chi phí",
  "Không gián đoạn kinh doanh",
  "Bảo hành kỹ thuật 30 ngày",
];

function SolutionCard({ item, className, large = false }) {
  const IconComp = item.icon;

  return (
    <div
      className={cn(
        "flex items-center rounded-xl sm:rounded-2xl bg-white border border-[#FFE4D6] hover:border-[#FF6500] shadow-sm hover:shadow-md hover:shadow-orange-500/10 backdrop-blur-xl transition-all duration-300 group cursor-pointer hover:-translate-y-0.5 select-none",
        large ? "gap-3 p-3 sm:p-3.5" : "gap-2.5 sm:gap-3 p-2.5 sm:p-3",
        className
      )}
    >
      {/* Icon with customized themed badge */}
      <div
        className={`shrink-0 rounded-lg sm:rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xs ${item.iconBg} ${item.iconColor} ${large ? "h-10 w-10 sm:h-11 sm:w-11" : "h-9 w-9 sm:h-9.5 sm:w-9.5"}`}
      >
        <IconComp className={large ? "h-5 w-5" : "h-4.5 w-4.5"} />
      </div>

      {/* Title & Subtitle */}
      <div className="min-w-0 flex-1 text-left">
        <h3 className={`font-bold text-slate-900 group-hover:text-[#FF6500] transition-colors tracking-tight break-words ${large ? "text-[13px] sm:text-sm" : "text-xs sm:text-[13.5px]"}`}>
          {item.title}
        </h3>
        <p className={`text-slate-500 mt-0.5 leading-snug font-normal break-words ${large ? "text-[11.5px] sm:text-xs" : "text-[11px] sm:text-[11.5px]"}`}>
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}

export function Solutions() {
  return (
    <section
      id="giai-phap"
      className="scroll-mt-[58px] sm:scroll-mt-[68px] lg:scroll-mt-[72px] py-8 sm:py-10 lg:py-12 bg-transparent relative"
    >
      <Container>
        {/* Natural horizontal composition directly on page background */}
        <div className="relative w-full">
          {/* Ambient Background Glows */}
          <div className="absolute top-1/2 right-[25%] -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#FF6500]/10 via-orange-400/5 to-transparent blur-[130px] pointer-events-none -z-10" />

          {/* Main Flex Layout: Left Intro Column + Right Mascot & Orbital Curved Cards */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-8 xl:gap-10">
            {/* 1. Left Column: Title, Description & Trust Points with slide-left reveal */}
            <ScrollReveal variant="slide-left" duration={800} className="w-full lg:w-[310px] xl:w-[335px] shrink-0">
              <div className="text-left lg:pt-1">
                <h2 className="text-[23px] sm:text-[28px] lg:text-[32px] xl:text-[35px] font-black tracking-tight text-slate-900 leading-[1.25]">
                  DUDI sẽ làm gì{" "}
                  <span className="bg-gradient-to-r from-[#FF2B14] via-[#FF6800] to-[#FFA000] bg-clip-text text-transparent">
                    cho website của bạn?
                  </span>
                </h2>

                <p className="mt-2.5 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed">
                  Tối ưu đúng phần cần thiết, giúp website chuyên nghiệp, mượt mà và chuyển đổi tốt hơn.
                </p>

                {/* Trust Points */}
                <div className="mt-4 pt-3.5 border-t border-[#FFE4D6] flex flex-col gap-2.5">
                  {keyPoints.map((point, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-700">
                      <div className="h-4.5 w-4.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-300 shadow-xs">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span className="font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* 2. Right Section: 4 Cards Left | Center Mascot in Halo | 4 Cards Right */}
            <div className="w-full lg:flex-1 min-w-0">
              {/* Desktop & Tablet Display with Balanced Spacing */}
              <div className="hidden sm:flex items-center justify-center gap-2.5 sm:gap-3.5 lg:gap-4.5 xl:gap-5 relative w-full">
                {/* Left 4 Cards: Slide right toward center */}
                <ScrollReveal variant="slide-right" delay={100} duration={850} className="shrink-0">
                  <div className="w-[190px] sm:w-[200px] lg:w-[210px] xl:w-[240px] flex flex-col gap-2 sm:gap-2.5 relative z-10">
                    {leftSolutions.map((item) => (
                      <SolutionCard
                        key={item.id}
                        item={item}
                        large
                        className={item.offsetClass}
                      />
                    ))}
                  </div>
                </ScrollReveal>

                {/* Center Mascot with Glowing Circular Aura: Zoom in with pulse */}
                <ScrollReveal variant="zoom-in" delay={180} duration={900} className="shrink-0">
                  <div className="flex flex-col items-center justify-center relative py-1 z-0 px-1.5 sm:px-2.5">
                    {/* Concentric Halo Rings */}
                    <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-[270px] lg:h-[270px] xl:w-[315px] xl:h-[315px] flex items-center justify-center">
                      {/* Outer dashed spinning ring */}
                      <div
                        style={{ animation: "spin 40s linear infinite" }}
                        className="absolute inset-0 rounded-full border border-dashed border-orange-400/30 pointer-events-none"
                      />

                      {/* Inner glowing halo ring */}
                      <div className="absolute inset-2 sm:inset-3 rounded-full border-2 border-[#FF6500]/40 bg-gradient-to-tr from-[#FF6500]/10 via-orange-400/5 to-transparent shadow-lg shadow-orange-500/20 pointer-events-none" />

                      {/* Deep orange core glow */}
                      <div className="absolute inset-4 sm:inset-6 rounded-full bg-[#FF6500]/20 blur-2xl -z-10 animate-pulse" />

                      {/* Transparent Mascot Image */}
                      <div className="relative w-48 h-48 sm:w-60 sm:h-60 lg:w-[244px] lg:h-[244px] xl:w-[286px] xl:h-[286px] drop-shadow-[0_16px_32px_rgba(255,107,0,0.35)] animate-float transition-transform duration-500 hover:scale-105 select-none">
                        <Image
                          src="/dudi/dudi_mascot_solution.webp"
                          alt="Linh vật DUDI Software giải pháp toàn diện"
                          fill
                          priority
                          className="object-contain"
                          sizes="(max-width: 640px) 230px, (max-width: 1024px) 250px, 290px"
                        />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Right 4 Cards: Slide left toward center */}
                <ScrollReveal variant="slide-left" delay={100} duration={850} className="shrink-0">
                  <div className="w-[190px] sm:w-[200px] lg:w-[210px] xl:w-[240px] flex flex-col gap-2 sm:gap-2.5 relative z-10">
                    {rightSolutions.map((item) => (
                      <SolutionCard
                        key={item.id}
                        item={item}
                        large
                        className={item.offsetClass}
                      />
                    ))}
                  </div>
                </ScrollReveal>
              </div>

              {/* Mobile Display: Mascot in center with 2 columns of cards */}
              <div className="flex sm:hidden flex-col items-center gap-5">
                {/* Mascot with glowing circle on Mobile: Zoom In */}
                <ScrollReveal variant="zoom-in" delay={100} duration={850}>
                  <div className="relative w-64 h-64 xs:w-64 xs:h-64 flex items-center justify-center my-1">
                    <div
                      style={{ animation: "spin 35s linear infinite" }}
                      className="absolute inset-0 rounded-full border border-dashed border-orange-400/30 pointer-events-none"
                    />
                    <div className="absolute inset-2 rounded-full border-2 border-[#FF6500]/40 bg-gradient-to-tr from-[#FF6500]/10 to-transparent shadow-md shadow-orange-500/20 pointer-events-none" />
                    <div className="absolute inset-6 rounded-full bg-[#FF6500]/20 blur-xl -z-10 animate-pulse" />
                    <div className="relative w-56 h-56 xs:w-56 xs:h-56 drop-shadow-[0_14px_28px_rgba(255,107,0,0.35)] animate-float">
                      <Image
                        src="/dudi/dudi_mascot_solution.webp"
                        alt="Linh vật DUDI Software giải pháp toàn diện"
                        fill
                        priority
                        className="object-contain"
                        sizes="(max-width: 480px) 220px, 240px"
                      />
                    </div>
                  </div>
                </ScrollReveal>

                {/* 8 Cards in 2 columns on mobile: Fade Up */}
                <ScrollReveal variant="fade-up" delay={200} duration={850} className="w-full">
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 w-full">
                    {[...leftSolutions, ...rightSolutions].map((item) => (
                      <SolutionCard key={item.id} item={item} />
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
