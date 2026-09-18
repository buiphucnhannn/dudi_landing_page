"use client";

import Image from "next/image";
import { Check, ArrowRight, ShieldCheck, ExternalLink, Monitor, Smartphone } from "lucide-react";
import { caseStudiesContent } from "@/constants/landing-content";
import { Container } from "@/components/common/Container";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { scrollToSection } from "@/lib/utils";

export function CaseStudies() {
  const scrollToForm = (e) => {
    scrollToSection("#form-tu-van", e);
  };

  return (
    <section id="case-thuc-te" className="scroll-mt-[58px] sm:scroll-mt-[68px] lg:scroll-mt-[72px] py-8 sm:py-10 lg:py-12 bg-transparent relative">
      <Container>
        {/* Section Header */}
        <ScrollReveal variant="fade-up" duration={900}>
          <SectionHeading
            titlePart1="Một số dự án"
            titlePart2="thực tế"
            description="Nhiều doanh nghiệp đã tin tưởng DUDI để làm mới website và đạt hiệu quả tốt hơn."
            action={{
              label: "Xem bảng giá các gói",
              href: "#bang-gia",
            }}
            breakLine={false}
            className="mb-4 sm:mb-5 lg:mb-5 pb-2.5"
          />
        </ScrollReveal>

        {/* 2 Comparison Cards Grid: Left card slides left, Right card slides right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {caseStudiesContent.map((item, idx) => (
            <ScrollReveal
              key={item.id}
              variant={idx === 0 ? "slide-left" : "slide-right"}
              delay={idx * 120}
              duration={850}
              className="h-full flex flex-col"
            >
              <div className="h-full flex flex-col justify-between rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-white backdrop-blur-xl border border-[#FFE4D6] hover:border-[#FF6500] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 group relative overflow-hidden">
                <div>
                  {/* Card Header: Title on Left, Price badge on Right */}
                  <div className="flex items-center justify-between gap-3 mb-2.5 sm:mb-3">
                    <div>
                      <h3 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight">
                        {item.shortTitle || item.client}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{item.client}</p>
                    </div>

                    <div className="shrink-0">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#FF3B30] to-[#FF6500] text-white shadow-md shadow-orange-500/20 border border-orange-400/40 tracking-wide">
                        {item.priceBadge || item.budget}
                      </span>
                    </div>
                  </div>

                  {/* 3-Tier Layered Mockup Showcase: Trước + Sau Desktop View + Sau Mobile Phone */}
                  <div className="relative w-full h-[210px] xs:h-[235px] sm:h-[270px] md:h-[295px] lg:h-[305px] my-2 sm:my-3 select-none">
                    {/* Layer 1: Giao diện Cũ (Trước) */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[44%] sm:w-[42%] aspect-[16/10] rounded-xl bg-slate-100 border border-slate-200 shadow-md overflow-hidden z-10 opacity-70 group-hover:opacity-85 transition-all duration-300 group-hover:scale-[0.98]">
                      {/* Browser Mockup Top Bar */}
                      <div className="h-4 sm:h-5 bg-slate-200/90 border-b border-slate-300 flex items-center px-2 sm:px-2.5 gap-1 sm:gap-1.5">
                        <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-slate-400" />
                        <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-slate-400" />
                        <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-slate-400" />
                        <div className="ml-1.5 w-1/2 h-1 sm:h-1.5 rounded bg-slate-300" />
                      </div>

                      {/* Before Screenshot */}
                      <div className="relative w-full h-[calc(100%-16px)] sm:h-[calc(100%-20px)] bg-slate-200">
                        <Image
                          src={item.beforeImage}
                          alt={`${item.shortTitle} - Giao diện trước khi làm`}
                          fill
                          className="object-cover object-top opacity-80 filter grayscale-[15%]"
                          sizes="(max-width: 768px) 50vw, 300px"
                        />
                      </div>

                      {/* "Trước" Badge */}
                      <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 z-20">
                        <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-slate-800/90 text-white border border-slate-600 shadow-md backdrop-blur-md">
                          Trước
                        </span>
                      </div>
                    </div>

                    {/* Layer 2: Giao diện Mới (Sau - Desktop View chuẩn mẫu) */}
                    <div className="absolute left-[17%] sm:left-[16%] top-1/2 -translate-y-1/2 w-[65%] sm:w-[63%] aspect-[16/10] rounded-xl bg-white border-2 border-[#FFE4D6] shadow-xl ring-1 ring-black/5 overflow-hidden z-20 group-hover:border-[#FF6500] group-hover:shadow-[0_15px_40px_rgba(255,107,0,0.18)] transition-all duration-300">
                      {/* Browser Mockup Header với macOS dots và nhãn "Desktop View" */}
                      <div className="h-5 sm:h-6 bg-slate-100/95 flex items-center justify-between px-2.5 sm:px-3 border-b border-slate-200">
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#FF5F56]" />
                          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#FFBD2E]" />
                          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#27C93F]" />
                        </div>
                        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-slate-500">
                          <Monitor className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400" />
                          <span className="hidden xs:inline">Desktop View</span>
                        </div>
                      </div>

                      {/* After Desktop Screenshot */}
                      <div className="relative w-full h-[calc(100%-20px)] sm:h-[calc(100%-24px)] bg-slate-100">
                        <Image
                          src={item.afterImage}
                          alt={`${item.shortTitle} - Giao diện Desktop sau khi nâng cấp`}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 60vw, 420px"
                        />
                      </div>

                      {/* "Sau" Badge */}
                      <div className="absolute bottom-1.5 left-2 z-20">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-gradient-to-r from-[#FF3B30] to-[#FF6500] text-white shadow-md shadow-orange-500/25 border border-orange-300/40">
                          Sau
                        </span>
                      </div>
                    </div>

                    {/* Layer 3: Smartphone Mobile Mockup (Tỷ lệ 9/16.1 chuẩn không cắt lẹm, kích thước lớn và rõ nét) */}
                    {item.mobileImage && (
                      <div className="absolute right-0 sm:right-1.5 bottom-0 sm:bottom-1 w-[32%] sm:w-[30%] min-w-[120px] max-w-[160px] aspect-[9/16.1] rounded-[20px] sm:rounded-[26px] bg-slate-950 p-[3px] sm:p-[4px] shadow-[0_22px_45px_-8px_rgba(0,0,0,0.65)] border-2 sm:border-[2.5px] border-slate-800 ring-1 ring-white/20 z-30 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1.5 select-none">
                        {/* Loa thoại siêu mảnh ở viền bezel trên - hoàn toàn không che chữ logo */}
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-7 sm:w-9 h-1 bg-slate-800 rounded-full z-40" />

                        {/* Màn hình điện thoại hiển thị giao diện mobile trọn vẹn */}
                        <div className="relative w-full h-full rounded-[16px] sm:rounded-[22px] overflow-hidden bg-slate-900">
                          <Image
                            src={item.mobileImage}
                            alt={`${item.shortTitle} - Giao diện Mobile tối ưu`}
                            fill
                            unoptimized
                            priority
                            className="object-cover object-top"
                            sizes="220px"
                          />
                          {/* Phản chiếu bóng kính sang trọng */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Home Indicator Bar */}
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-0.5 bg-white/60 rounded-full z-40 pointer-events-none" />
                      </div>
                    )}
                  </div>

                  {/* Highlights Bullet Checklist */}
                  <div className="mt-3 pt-1">
                    <ul className="space-y-1.5">
                      {item.highlights?.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-[#FF6500] shrink-0 stroke-[2.8]" />
                          <span className="text-xs sm:text-sm text-slate-700 font-medium">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Subtle Card Footer */}
                <div className="mt-3 pt-2 border-t border-[#FFE4D6] flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 text-slate-600 font-medium text-[11px] sm:text-xs">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Bảo hành kỹ thuật 30 ngày</span>
                  </span>

                  <a
                    href="#form-tu-van"
                    onClick={scrollToForm}
                    className="text-[#FF6500] hover:text-[#E52E20] font-bold flex items-center gap-1 text-xs transition-colors cursor-pointer"
                  >
                    <span>Tư vấn dự án</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
