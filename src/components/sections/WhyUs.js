"use client";

import Image from "next/image";
import {
  FileCheck2,
  BadgeDollarSign,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { whyUsContent } from "@/constants/landing-content";
import { Container } from "@/components/common/Container";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const whyUsIcons = [
  FileCheck2,
  BadgeDollarSign,
  ShieldCheck,
  UserCheck,
];

function WhyCard({ idx, item, IconComp, align = "left" }) {
  return (
    <ScrollReveal
      variant="fade-up"
      delay={idx * 110}
      duration={800}
      className="w-full"
    >
      <div
        className={`group relative w-full bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-[#FFE6D5] shadow-[0_12px_40px_-12px_rgba(255,101,0,0.22)] hover:shadow-[0_20px_50px_-12px_rgba(255,101,0,0.35)] hover:border-[#FF6500]/50 hover:-translate-y-1 transition-all duration-300 cursor-default
        ${align === "left" ? "lg:-rotate-1 lg:hover:rotate-0" : "lg:rotate-1 lg:hover:rotate-0"}`}
      >
        <div className="flex items-start gap-3.5">
          {/* Icon */}
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF9A3D] to-[#FF5500] text-white shadow-md shadow-orange-500/30 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
            <IconComp className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.2} />
          </div>

          <div className="min-w-0 flex-1">
            <span className="inline-block text-[11px] font-black tracking-widest text-[#FF8A3D] bg-[#FFF1E6] border border-orange-100 rounded-md px-1.5 py-0.5 mb-1.5">
              0{idx + 1}
            </span>
            <h3 className="text-[14px] sm:text-[15px] font-extrabold text-slate-900 leading-snug text-balance group-hover:text-[#E52E20] transition-colors">
              {item.title}
            </h3>
            <p className="mt-1.5 text-[12.5px] sm:text-[13px] text-slate-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>

        {/* Dotted connector toward mascot (desktop only) */}
        <svg
          aria-hidden="true"
          className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-10 h-10 pointer-events-none text-[#FF9A3D]/70
          ${align === "left" ? "-right-10 rotate-0" : "-left-10 rotate-180"}`}
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M4 20 C 14 8, 24 8, 32 18"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeDasharray="3 4"
            strokeLinecap="round"
          />
          <circle cx="33" cy="19" r="2.4" fill="currentColor" />
        </svg>
      </div>
    </ScrollReveal>
  );
}

export function WhyUs() {
  return (
    <section
      id="vi-sao-chon-dudi"
      className="scroll-mt-[58px] sm:scroll-mt-[68px] lg:scroll-mt-[72px] py-8 sm:py-10 lg:py-12 bg-[#FFF9F5] relative"
    >
      <Container className="relative z-10">
        {/* Heading — centered like mẫu */}
        <ScrollReveal variant="fade-up" duration={800}>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-[23px] sm:text-[28px] lg:text-[32px] xl:text-[35px] font-black tracking-tight text-slate-900 leading-[1.25]">
              Vì Sao Doanh Nghiệp Chọn
              <span className="block mt-1 bg-gradient-to-r from-[#FF2B14] via-[#FF6800] to-[#FFA000] bg-clip-text text-transparent">
                Đồng Hành Cùng DUDI?
              </span>
            </h2>
            <p className="mt-3 text-[13px] sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Sự rõ ràng, minh bạch và trách nhiệm là ba nền tảng giúp chúng tôi
              trở thành lựa chọn tin cậy của nhiều doanh nghiệp trong hành trình
              chuyển đổi số.
            </p>
          </div>
        </ScrollReveal>

        {/* 3-column: cards left / mascot center / cards right */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-6 lg:gap-5 xl:gap-8">
          {/* Left cards: 01, 02 */}
          <div className="flex flex-col gap-4 sm:gap-5 order-2 lg:order-1 lg:pr-2">
            <WhyCard idx={0} item={whyUsContent[0]} IconComp={whyUsIcons[0]} align="left" />
            <WhyCard idx={1} item={whyUsContent[1]} IconComp={whyUsIcons[1]} align="left" />
          </div>

          {/* Center mascot */}
          <ScrollReveal
            variant="zoom-in"
            duration={900}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-[240px] sm:w-[300px] lg:w-[320px] xl:w-[360px] shrink-0">
              {/* Nền sau linh vật đậm hơn xíu */}
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square rounded-full bg-[#FFE2CC] blur-[70px] pointer-events-none" />
              <div className="absolute left-1/2 bottom-2 -translate-x-1/2 w-[85%] h-12 bg-[#FF6500]/20 blur-2xl rounded-full" />
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[92%] h-16 rounded-[100%] border-[3px] border-[#FF6500]/25 border-t-[#FF6500]/60" />

              <Image
                src="/dudi/DUDI_partner.webp"
                alt="Linh vật DUDI Software — đối tác đồng hành cùng doanh nghiệp"
                width={560}
                height={560}
                sizes="(max-width: 1024px) 300px, 360px"
                className="relative z-10 w-full h-auto object-contain drop-shadow-[0_24px_40px_rgba(255,80,0,0.25)] select-none"
                priority={false}
              />
            </div>
          </ScrollReveal>

          {/* Right cards: 03, 04 */}
          <div className="flex flex-col gap-4 sm:gap-5 order-3 lg:pl-2">
            <WhyCard idx={2} item={whyUsContent[2]} IconComp={whyUsIcons[2]} align="right" />
            <WhyCard idx={3} item={whyUsContent[3]} IconComp={whyUsIcons[3]} align="right" />
          </div>
        </div>
      </Container>
    </section>
  );
}
