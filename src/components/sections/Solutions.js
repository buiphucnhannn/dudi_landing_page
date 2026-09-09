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
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { cn } from "@/lib/utils";

const leftSolutions = [
  {
    id: "content",
    title: "Nội dung",
    subtitle: "Chuẩn hóa & tối ưu",
    icon: FileText,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-50 dark:bg-blue-950/60 border-blue-200/80 dark:border-blue-800/50",
    offsetClass: "translate-x-0",
  },
  {
    id: "uiux",
    title: "Giao diện UI/UX",
    subtitle: "Hiện đại & dễ dùng",
    icon: Layers,
    iconColor: "text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-50 dark:bg-rose-950/60 border-rose-200/80 dark:border-rose-800/50",
    offsetClass: "sm:translate-x-2.5 lg:translate-x-3",
  },
  {
    id: "mobile",
    title: "Tối ưu mobile",
    subtitle: "Chuẩn mọi thiết bị",
    icon: Smartphone,
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-50 dark:bg-amber-950/60 border-amber-200/80 dark:border-amber-800/50",
    offsetClass: "sm:translate-x-2.5 lg:translate-x-3",
  },
  {
    id: "speed",
    title: "Tốc độ",
    subtitle: "Tải nhanh & mượt mà",
    icon: Zap,
    iconColor: "text-red-600 dark:text-red-400",
    iconBg: "bg-red-50 dark:bg-red-950/60 border-red-200/80 dark:border-red-800/50",
    offsetClass: "translate-x-0",
  },
];

const rightSolutions = [
  {
    id: "seo",
    title: "SEO On-page",
    subtitle: "Thân thiện Google",
    icon: SearchCheck,
    iconColor: "text-cyan-600 dark:text-cyan-400",
    iconBg: "bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200/80 dark:border-cyan-800/50",
    offsetClass: "translate-x-0",
  },
  {
    id: "form",
    title: "Form & chức năng",
    subtitle: "Sửa lỗi & thêm tính năng",
    icon: Code2,
    iconColor: "text-violet-600 dark:text-violet-400",
    iconBg: "bg-violet-50 dark:bg-violet-950/60 border-violet-200/80 dark:border-violet-800/50",
    offsetClass: "sm:-translate-x-2.5 lg:-translate-x-3",
  },
  {
    id: "audit",
    title: "Kiểm tra lỗi",
    subtitle: "Xử lý triệt để",
    icon: ShieldCheck,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/80 dark:border-emerald-800/50",
    offsetClass: "sm:-translate-x-2.5 lg:-translate-x-3",
  },
  {
    id: "consulting",
    title: "Tư vấn thêm",
    subtitle: "Giải pháp tối ưu",
    icon: Headphones,
    iconColor: "text-orange-600 dark:text-orange-400",
    iconBg: "bg-orange-50 dark:bg-orange-950/60 border-orange-200/80 dark:border-orange-800/50",
    offsetClass: "translate-x-0",
  },
];

const keyPoints = [
  "Không vẽ thêm chi phí",
  "Không gián đoạn kinh doanh",
  "Bảo hành kỹ thuật 30 ngày",
];

function SolutionCard({ item, className }) {
  const IconComp = item.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0D1527]/90 border border-slate-200/90 dark:border-slate-800/80 hover:border-red-500/70 shadow-sm hover:shadow-md hover:shadow-red-500/10 dark:shadow-xl dark:shadow-black/40 backdrop-blur-xl transition-all duration-300 group cursor-pointer hover:-translate-y-0.5 select-none",
        className
      )}
    >
      {/* Icon with customized themed badge */}
      <div
        className={`h-9 w-9 sm:h-9.5 sm:w-9.5 shrink-0 rounded-lg sm:rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xs ${item.iconBg} ${item.iconColor}`}
      >
        <IconComp className="h-4.5 w-4.5" />
      </div>

      {/* Title & Subtitle */}
      <div className="min-w-0 flex-1 text-left">
        <h3 className="text-xs sm:text-[13.5px] font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors truncate tracking-tight">
          {item.title}
        </h3>
        <p className="text-[11px] sm:text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug truncate font-normal">
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
      className="pt-8 pb-10 sm:pt-12 sm:pb-14 bg-transparent relative scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28"
    >
      <Container>
        <RevealOnScroll duration={1100}>
          {/* Natural horizontal composition directly on page background (No boxed card boundary) */}
          <div className="relative w-full">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 right-[25%] -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-red-600/12 via-rose-500/6 to-transparent blur-[130px] pointer-events-none -z-10" />

            {/* Main Flex Layout: Left Intro Column + Right Mascot & Orbital Curved Cards */}
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-8 xl:gap-10">
              {/* 1. Left Column: Title, Description & Trust Points */}
              <div className="w-full lg:w-[310px] xl:w-[335px] shrink-0 text-left lg:pt-1">
                <h2 className="text-2xl sm:text-[28px] lg:text-[30px] xl:text-[32px] font-black tracking-tight text-slate-900 dark:text-white leading-[1.2] whitespace-nowrap">
                  Giải pháp{" "}
                  <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-500 dark:from-red-500 dark:via-rose-500 dark:to-red-400 bg-clip-text text-transparent">
                    từ DUDI
                  </span>
                </h2>

                <p className="mt-2.5 text-sm sm:text-[14.5px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Tối ưu đúng phần cần thiết, giúp website chuyên nghiệp, mượt mà và chuyển đổi tốt hơn.
                </p>

                {/* Trust Points */}
                <div className="mt-4 pt-3.5 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2.5">
                  {keyPoints.map((point, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-700 dark:text-slate-200">
                      <div className="h-4.5 w-4.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-300 dark:border-emerald-800/60 shadow-xs">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span className="font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Right Section: 4 Cards Left | Center Mascot in Halo | 4 Cards Right */}
              <div className="w-full lg:flex-1 min-w-0">
                {/* Desktop & Tablet Display with Balanced Spacing */}
                <div className="hidden sm:flex items-center justify-center gap-2.5 sm:gap-3.5 lg:gap-4.5 xl:gap-5 relative w-full">
                  {/* Left 4 Cards */}
                  <div className="w-[175px] sm:w-[190px] lg:w-[205px] xl:w-[220px] shrink-0 flex flex-col gap-2 sm:gap-2.5 relative z-10">
                    {leftSolutions.map((item) => (
                      <SolutionCard
                        key={item.id}
                        item={item}
                        className={item.offsetClass}
                      />
                    ))}
                  </div>

                  {/* Center Mascot with Glowing Circular Aura */}
                  <div className="shrink-0 flex flex-col items-center justify-center relative py-1 z-0 px-1.5 sm:px-2.5">
                    {/* Concentric Halo Rings */}
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-[250px] lg:h-[250px] xl:w-[280px] xl:h-[280px] flex items-center justify-center">
                      {/* Outer dashed spinning ring */}
                      <div
                        style={{ animation: "spin 40s linear infinite" }}
                        className="absolute inset-0 rounded-full border border-dashed border-red-500/25 dark:border-red-500/35 pointer-events-none"
                      />

                      {/* Inner glowing halo ring */}
                      <div className="absolute inset-2 sm:inset-3 rounded-full border-2 border-red-500/40 dark:border-red-500/50 bg-gradient-to-tr from-red-500/10 via-rose-500/5 to-transparent shadow-lg shadow-red-500/20 pointer-events-none" />

                      {/* Deep red core glow */}
                      <div className="absolute inset-4 sm:inset-6 rounded-full bg-red-600/15 dark:bg-red-600/25 blur-2xl -z-10 animate-pulse" />

                      {/* Transparent Mascot Image */}
                      <div className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-[225px] lg:h-[225px] xl:w-[255px] xl:h-[255px] drop-shadow-[0_16px_32px_rgba(220,38,38,0.35)] animate-float transition-transform duration-500 hover:scale-105 select-none">
                        <Image
                          src="/dudi/dudi_mascot_solution.webp"
                          alt="Linh vật DUDI Software giải pháp toàn diện"
                          fill
                          priority
                          className="object-contain"
                          sizes="(max-width: 640px) 220px, (max-width: 1024px) 230px, 260px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right 4 Cards */}
                  <div className="w-[175px] sm:w-[190px] lg:w-[205px] xl:w-[220px] shrink-0 flex flex-col gap-2 sm:gap-2.5 relative z-10">
                    {rightSolutions.map((item) => (
                      <SolutionCard
                        key={item.id}
                        item={item}
                        className={item.offsetClass}
                      />
                    ))}
                  </div>
                </div>

                {/* Mobile Display: Mascot in center with 2 columns of cards */}
                <div className="flex sm:hidden flex-col items-center gap-5">
                  {/* Mascot with glowing circle on Mobile (Scaled Up) */}
                  <div className="relative w-60 h-60 xs:w-64 xs:h-64 flex items-center justify-center my-1">
                    <div
                      style={{ animation: "spin 35s linear infinite" }}
                      className="absolute inset-0 rounded-full border border-dashed border-red-500/30 pointer-events-none"
                    />
                    <div className="absolute inset-2 rounded-full border-2 border-red-500/40 bg-gradient-to-tr from-red-500/10 to-transparent shadow-md shadow-red-500/20 pointer-events-none" />
                    <div className="absolute inset-6 rounded-full bg-red-600/20 blur-xl -z-10 animate-pulse" />
                    <div className="relative w-52 h-52 xs:w-56 xs:h-56 drop-shadow-[0_14px_28px_rgba(220,38,38,0.35)] animate-float">
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

                  {/* 8 Cards in 2 columns on mobile */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 w-full">
                    {[...leftSolutions, ...rightSolutions].map((item) => (
                      <SolutionCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
