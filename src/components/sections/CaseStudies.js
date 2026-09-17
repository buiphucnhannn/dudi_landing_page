"use client";

import Image from "next/image";
import { Check, ArrowRight, ShieldCheck, ExternalLink } from "lucide-react";
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

                  {/* Overlapping Before / After Mockup Showcase */}
                  <div className="relative w-full h-[155px] xs:h-[185px] sm:h-[215px] md:h-[230px] my-2 sm:my-3 select-none">
                    {/* Background screen: TRƯỚC (Before) */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[64%] sm:w-[62%] aspect-[16/10] rounded-xl bg-slate-100 border border-slate-200 shadow-xl overflow-hidden z-10 opacity-90 transition-transform duration-300 group-hover:scale-[0.98]">
                      {/* Browser Mockup Top Bar */}
                      <div className="h-5 bg-slate-200/80 border-b border-slate-300 flex items-center px-2.5 gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <div className="ml-2 w-1/2 h-1.5 rounded bg-slate-300" />
                      </div>

                      {/* Before Screenshot */}
                      <div className="relative w-full h-[calc(100%-20px)] bg-slate-200">
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
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800/90 text-white border border-slate-600 shadow-md backdrop-blur-md">
                          Trước
                        </span>
                      </div>
                    </div>

                    {/* Foreground screen: SAU (After) */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[72%] sm:w-[70%] aspect-[16/10] rounded-xl bg-white border-2 border-[#FFE4D6] shadow-2xl ring-1 ring-black/5 overflow-hidden z-20 group-hover:border-[#FF6500] group-hover:shadow-[0_15px_40px_rgba(255,107,0,0.2)] transition-all duration-300">
                      {/* Browser Mockup Top Bar */}
                      <div className="h-5 bg-slate-100 flex items-center px-2.5 gap-1.5 border-b border-slate-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6500]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                        <div className="ml-2 w-3/5 h-2 rounded-full bg-slate-200 border border-slate-300" />
                      </div>

                      {/* After Screenshot */}
                      <div className="relative w-full h-[calc(100%-20px)] bg-slate-100">
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
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#FF3B30] to-[#FF6500] text-white shadow-lg shadow-orange-500/30 border border-orange-300/50">
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
