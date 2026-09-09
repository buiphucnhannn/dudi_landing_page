"use client";

import Image from "next/image";
import { Check, ArrowRight, ShieldCheck, ExternalLink } from "lucide-react";
import { caseStudiesContent } from "@/constants/landing-content";
import { Container } from "@/components/common/Container";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

import { SectionHeading } from "@/components/common/SectionHeading";
import { scrollToSection } from "@/lib/utils";

export function CaseStudies() {
  const scrollToForm = (e) => {
    scrollToSection("#form-tu-van", e);
  };

  return (
    <section id="case-thuc-te" className="pt-6 pb-6 sm:pt-7 sm:pb-7 lg:pt-8 lg:pb-8 bg-transparent relative scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28">
      <Container>
        {/* Section Header */}
        <RevealOnScroll duration={1100}>
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
        </RevealOnScroll>

        {/* 2 Comparison Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {caseStudiesContent.map((item, idx) => (
            <RevealOnScroll
              key={item.id}
              delay={idx * 150}
              duration={1200}
              className="h-full flex flex-col"
            >
              <div className="h-full flex flex-col justify-between rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-white dark:bg-[#0D1527]/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-700/60 hover:border-red-500/60 transition-all duration-300 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/50 hover:shadow-red-500/10 dark:hover:shadow-red-950/30 group relative overflow-hidden">
                {/* Subtle top ambient glow */}
                <div className="absolute top-0 right-0 w-60 h-60 bg-red-600/5 rounded-full blur-3xl pointer-events-none transition-opacity group-hover:opacity-100 opacity-60" />

                <div>
                  {/* Card Header: Title on Left, Price badge on Right */}
                  <div className="flex items-center justify-between gap-3 mb-2.5 sm:mb-3">
                    <div>
                      <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {item.shortTitle || item.client}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.client}</p>
                    </div>

                    <div className="shrink-0">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-500/20 dark:shadow-red-950/60 border border-red-400/40 tracking-wide">
                        {item.priceBadge || item.budget}
                      </span>
                    </div>
                  </div>

                  {/* Overlapping Before / After Mockup Showcase */}
                  <div className="relative w-full h-[155px] xs:h-[185px] sm:h-[215px] md:h-[230px] my-2 sm:my-3 select-none">
                    {/* Background screen: TRƯỚC (Before) */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[64%] sm:w-[62%] aspect-[16/10] rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 shadow-xl overflow-hidden z-10 opacity-90 transition-transform duration-300 group-hover:scale-[0.98]">
                      {/* Browser Mockup Top Bar */}
                      <div className="h-5 bg-slate-200/80 dark:bg-slate-950/90 border-b border-slate-300 dark:border-slate-800 flex items-center px-2.5 gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-700" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-700" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-700" />
                        <div className="ml-2 w-1/2 h-1.5 rounded bg-slate-300 dark:bg-slate-800/80" />
                      </div>

                      {/* Before Screenshot */}
                      <div className="relative w-full h-[calc(100%-20px)] bg-slate-200 dark:bg-slate-950">
                        <Image
                          src={item.beforeImage}
                          alt={`${item.shortTitle} - Giao diện trước khi làm`}
                          fill
                          className="object-cover object-top opacity-80 filter grayscale-[15%]"
                          sizes="(max-width: 768px) 50vw, 350px"
                        />
                      </div>

                      {/* "Trước" Badge */}
                      <div className="absolute bottom-2 left-2 z-20">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800/90 dark:bg-slate-900/90 text-white dark:text-slate-200 border border-slate-600 dark:border-slate-700/90 shadow-md backdrop-blur-md">
                          Trước
                        </span>
                      </div>
                    </div>

                    {/* Foreground screen: SAU (After) */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[72%] sm:w-[70%] aspect-[16/10] rounded-xl bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700/90 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden z-20 group-hover:border-red-500/50 group-hover:shadow-[0_15px_40px_rgba(220,38,38,0.2)] transition-all duration-300">
                      {/* Browser Mockup Top Bar */}
                      <div className="h-5 bg-slate-200 dark:bg-slate-950 flex items-center px-2.5 gap-1.5 border-b border-slate-300 dark:border-slate-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                        <div className="ml-2 w-3/5 h-2 rounded-full bg-slate-300 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700/50" />
                      </div>

                      {/* After Screenshot */}
                      <div className="relative w-full h-[calc(100%-20px)] bg-slate-200 dark:bg-slate-950">
                        <Image
                          src={item.afterImage}
                          alt={`${item.shortTitle} - Giao diện sau khi nâng cấp`}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 60vw, 420px"
                        />
                      </div>

                      {/* "Sau" Badge */}
                      <div className="absolute bottom-2 right-2 z-20">
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/30 dark:shadow-red-950/70 border border-red-400/50">
                          Sau
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bullet Checklist */}
                  <div className="mt-3 pt-1">
                    <ul className="space-y-1.5">
                      {item.highlights?.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-red-600 dark:text-red-500 shrink-0 stroke-[2.8]" />
                          <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Subtle Card Footer */}
                <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium text-[11px] sm:text-xs">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span>Bảo hành kỹ thuật 30 ngày</span>
                  </span>

                  <a
                    href="#form-tu-van"
                    onClick={scrollToForm}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold flex items-center gap-1 text-xs transition-colors"
                  >
                    <span>Tư vấn dự án</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
