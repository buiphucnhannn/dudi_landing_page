"use client";

import { useState } from "react";
import {
  Send,
  SearchCheck,
  ClipboardCheck,
  Code2,
  CheckCircle2,
  Rocket,
} from "lucide-react";
import { processStepsContent } from "@/constants/landing-content";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

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
    <section id="quy-trinh" className="pt-10 pb-10 sm:pt-12 sm:pb-12 bg-transparent relative scroll-mt-6 sm:scroll-mt-8">
      <Container>
        <RevealOnScroll duration={1100}>
          <SectionHeading
            titlePart1="Quy trình"
            titlePart2="làm việc"
            description="Đơn giản, rõ ràng và minh bạch trong từng bước."
            action={{
              label: "Xem bảng giá các gói",
              href: "#bang-gia",
            }}
            breakLine={false}
          />
        </RevealOnScroll>

        {/* Interactive Stepper Container: dynamically expands only when hovering a step */}
        <RevealOnScroll delay={150} duration={1200}>
          <div
            className={`relative pt-2 pb-0 sm:pt-3 sm:pb-0 transition-all duration-300 ease-out ${
              activeStep !== null ? "lg:pb-32" : "lg:pb-0"
            }`}
          >
            {/* Horizontal Connector Line (hidden on very small screens, visible on md+) */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-8 left-[8%] right-[8%] h-[2px] bg-slate-800 z-0"
            >
              {/* Subtle Red glow on line */}
              <div className="h-full w-full bg-gradient-to-r from-red-600/30 via-red-500/50 to-red-600/30" />
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-4 relative z-10">
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
                    className="flex flex-col items-center text-center cursor-pointer group select-none relative"
                  >
                    {/* Step Number Circle */}
                    <div className="relative mb-3">
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full font-black text-sm sm:text-base flex items-center justify-center transition-all duration-300 border-2 border-[#04060E] shadow-lg ${
                          isActive
                            ? "bg-red-500 text-white scale-110 ring-4 ring-red-500/40 shadow-red-900/80"
                            : "bg-red-600 text-white group-hover:scale-110 group-hover:ring-4 group-hover:ring-red-500/30 shadow-red-950/60"
                        }`}
                      >
                        {idx + 1}
                      </div>
                    </div>

                    {/* Step Icon */}
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 border mb-2.5 shadow-md ${
                        isActive
                          ? "bg-red-600 text-white border-red-500 scale-105 shadow-red-900/40"
                          : "bg-slate-900/90 text-red-400 border-slate-700/70 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 group-hover:scale-105"
                      }`}
                    >
                      <IconComp className="h-5 w-5" />
                    </div>

                    {/* Main Title (Ý chính luôn hiển thị) */}
                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-red-400 transition-colors leading-snug">
                      {shortTitles[idx] || step.title}
                    </h3>

                    {/* Subtitle / summary */}
                    <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed max-w-[150px]">
                      {shortDescriptions[idx]}
                    </p>

                    {/* Floating Detail Card on Hover — Centered right under the step icon */}
                    <div
                      className={`w-[220px] sm:w-[240px] transition-all duration-200 ease-out lg:absolute lg:top-[calc(100%+10px)] lg:left-1/2 lg:-translate-x-1/2 lg:z-30 mt-3 lg:mt-0 before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-4 ${
                        isActive
                          ? "opacity-100 translate-y-0 pointer-events-auto visible"
                          : "opacity-0 -translate-y-2 pointer-events-none invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-hover:visible"
                      }`}
                    >
                      <div className="p-3.5 rounded-xl bg-[#0D1527]/98 border border-slate-700/90 shadow-2xl text-left backdrop-blur-2xl ring-1 ring-white/10 shadow-black/80">
                        <div className="flex items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-slate-800">
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
                          <div className="mt-2 pt-1.5 border-t border-red-900/60 text-[10px] font-semibold text-rose-400">
                            ★ Cam kết không phát sinh chi phí
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
