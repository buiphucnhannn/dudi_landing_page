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
    subtitle: "Cập nhật, tối ưu nội dung",
    icon: FileText,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-50 dark:bg-blue-950/60 border-blue-200/80 dark:border-blue-800/50",
    offsetClass: "lg:-translate-x-1.5 xl:-translate-x-2",
  },
  {
    id: "uiux",
    title: "Giao diện UI/UX",
    subtitle: "Hiện đại, dễ sử dụng",
    icon: Layers,
    iconColor: "text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-50 dark:bg-rose-950/60 border-rose-200/80 dark:border-rose-800/50",
    offsetClass: "lg:translate-x-3.5 xl:translate-x-4",
  },
  {
    id: "mobile",
    title: "Tối ưu mobile",
    subtitle: "Hiển thị tốt trên mọi thiết bị",
    icon: Smartphone,
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-50 dark:bg-amber-950/60 border-amber-200/80 dark:border-amber-800/50",
    offsetClass: "lg:translate-x-3.5 xl:translate-x-4",
  },
  {
    id: "speed",
    title: "Tốc độ",
    subtitle: "Tăng tốc, tối ưu hiệu năng",
    icon: Zap,
    iconColor: "text-red-600 dark:text-red-400",
    iconBg: "bg-red-50 dark:bg-red-950/60 border-red-200/80 dark:border-red-800/50",
    offsetClass: "lg:-translate-x-1.5 xl:-translate-x-2",
  },
];

const rightSolutions = [
  {
    id: "seo",
    title: "SEO On-page",
    subtitle: "Thân thiện với Google",
    icon: SearchCheck,
    iconColor: "text-cyan-600 dark:text-cyan-400",
    iconBg: "bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200/80 dark:border-cyan-800/50",
    offsetClass: "lg:translate-x-1.5 xl:translate-x-2",
  },
  {
    id: "form",
    title: "Form & chức năng",
    subtitle: "Sửa lỗi, bổ sung tính năng",
    icon: Code2,
    iconColor: "text-violet-600 dark:text-violet-400",
    iconBg: "bg-violet-50 dark:bg-violet-950/60 border-violet-200/80 dark:border-violet-800/50",
    offsetClass: "lg:-translate-x-3.5 xl:-translate-x-4",
  },
  {
    id: "audit",
    title: "Kiểm tra lỗi",
    subtitle: "Rà soát và xử lý toàn diện",
    icon: ShieldCheck,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/80 dark:border-emerald-800/50",
    offsetClass: "lg:-translate-x-3.5 xl:-translate-x-4",
  },
  {
    id: "consulting",
    title: "Tư vấn thêm",
    subtitle: "Đề xuất các giải pháp phù hợp",
    icon: Headphones,
    iconColor: "text-orange-600 dark:text-orange-400",
    iconBg: "bg-orange-50 dark:bg-orange-950/60 border-orange-200/80 dark:border-orange-800/50",
    offsetClass: "lg:translate-x-1.5 xl:translate-x-2",
  },
];

const keyPoints = [
  "Tập trung đúng phần cần thiết, không vẽ vời chi phí",
  "Nâng cấp an toàn, không gián đoạn kinh doanh",
  "Bảo hành kỹ thuật chu đáo 30 ngày",
];

function SolutionCard({ item, className }) {
  const IconComp = item.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0D1527]/90 border border-slate-200/90 dark:border-slate-800/80 hover:border-red-500/70 shadow-md shadow-slate-200/50 dark:shadow-xl dark:shadow-black/40 hover:shadow-xl hover:shadow-red-500/15 dark:hover:shadow-red-950/40 backdrop-blur-xl transition-all duration-300 group cursor-pointer hover:-translate-y-0.5 select-none",
        className
      )}
    >
      {/* Icon with customized themed badge */}
      <div
        className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xs ${item.iconBg} ${item.iconColor}`}
      >
        <IconComp className="h-4.5 w-4.5" />
      </div>

      {/* Title & Subtitle */}
      <div className="min-w-0 flex-1 text-left">
        <h3 className="text-[13px] sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors truncate">
          {item.title}
        </h3>
        <p className="text-[10.5px] sm:text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug truncate">
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
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 xl:gap-16 2xl:gap-20">
              {/* 1. Left Column: Title & Description */}
              <div className="w-full lg:w-[27%] xl:w-[26%] shrink-0 text-left lg:pt-1.5 xl:pt-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.25]">
                  Giải pháp{" "}
                  <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-500 dark:from-red-500 dark:via-rose-500 dark:to-red-400 bg-clip-text text-transparent">
                    từ DUDI
                  </span>
                </h2>

                <p className="mt-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                  Chúng tôi tập trung vào những hạng mục mang lại hiệu quả thực tế, giúp website của bạn hoạt động tốt hơn, chuyên nghiệp hơn và dễ ra khách hơn.
                </p>

                {/* Trust Points */}
                <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80 flex flex-col gap-2.5">
                  {keyPoints.map((point, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <div className="h-4 w-4 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-300 dark:border-emerald-800/60">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span className="font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Right Section: 4 Cards Left (Curved) | Center Mascot in Halo | 4 Cards Right (Curved) */}
              <div className="w-full lg:w-[69%] xl:w-[70%]">
                {/* Desktop & Tablet Display with Radial Orbital Curvature */}
                <div className="hidden sm:grid sm:grid-cols-12 items-center gap-2 lg:gap-3 xl:gap-4 relative">
                  {/* Left 4 Cards: Curving inward toward the mascot (Cols 1-4) */}
                  <div className="sm:col-span-4 flex flex-col gap-2.5 sm:gap-3 relative z-10">
                    {leftSolutions.map((item) => (
                      <SolutionCard
                        key={item.id}
                        item={item}
                        className={item.offsetClass}
                      />
                    ))}
                  </div>

                  {/* Center Mascot with Glowing Circular Aura (Cols 5-8) */}
                  <div className="sm:col-span-4 flex flex-col items-center justify-center relative py-1 z-0">
                    {/* Concentric Halo Rings */}
                    <div className="relative w-38 h-38 lg:w-46 lg:h-46 xl:w-52 xl:h-52 flex items-center justify-center">
                      {/* Outer dashed spinning ring */}
                      <div
                        style={{ animation: "spin 40s linear infinite" }}
                        className="absolute inset-0 rounded-full border border-dashed border-red-500/25 dark:border-red-500/35 pointer-events-none"
                      />

                      {/* Inner glowing halo ring */}
                      <div className="absolute inset-2 rounded-full border-2 border-red-500/40 dark:border-red-500/50 bg-gradient-to-tr from-red-500/10 via-rose-500/5 to-transparent shadow-lg shadow-red-500/20 pointer-events-none" />

                      {/* Deep red core glow */}
                      <div className="absolute inset-4 rounded-full bg-red-600/15 dark:bg-red-600/25 blur-xl -z-10 animate-pulse" />

                      {/* Transparent Mascot Image (Seamless on both Light & Dark modes) */}
                      <div className="relative w-34 h-34 lg:w-42 lg:h-42 xl:w-48 xl:h-48 drop-shadow-[0_12px_25px_rgba(220,38,38,0.35)] animate-float transition-transform duration-500 hover:scale-105 select-none">
                        <Image
                          src="/images/solutions-mascot-transparent-v2.webp"
                          alt="Linh vật DUDI Software giải pháp toàn diện"
                          fill
                          priority
                          className="object-contain"
                          sizes="(max-width: 1024px) 180px, 220px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right 4 Cards: Curving inward toward the mascot (Cols 9-12) */}
                  <div className="sm:col-span-4 flex flex-col gap-2.5 sm:gap-3 relative z-10">
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
                  {/* Mascot with glowing circle on Mobile */}
                  <div className="relative w-44 h-44 flex items-center justify-center my-1">
                    <div
                      style={{ animation: "spin 35s linear infinite" }}
                      className="absolute inset-0 rounded-full border border-dashed border-red-500/30 pointer-events-none"
                    />
                    <div className="absolute inset-2 rounded-full border-2 border-red-500/40 bg-gradient-to-tr from-red-500/10 to-transparent shadow-md shadow-red-500/20 pointer-events-none" />
                    <div className="absolute inset-6 rounded-full bg-red-600/20 blur-xl -z-10 animate-pulse" />
                    <div className="relative w-38 h-38 drop-shadow-[0_10px_20px_rgba(220,38,38,0.35)] animate-float">
                      <Image
                        src="/images/solutions-mascot-transparent-v2.webp"
                        alt="Linh vật DUDI Software giải pháp toàn diện"
                        fill
                        priority
                        className="object-contain"
                        sizes="160px"
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
