"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FileText,
  Layers,
  Smartphone,
  Zap,
  Search,
  Send,
  Puzzle,
  CheckSquare,
  ArrowRight,
} from "lucide-react";
import { solutionsContent } from "@/constants/landing-content";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { scrollToSection } from "@/lib/utils";

const solutionIconMap = {
  FileText,
  Layers,
  SmartphoneCheck: Smartphone,
  Zap,
  SearchCheck: Search,
  Send,
  Puzzle,
  CheckSquare,
};

export function Solutions() {
  const marqueeItems = [...solutionsContent, ...solutionsContent];

  return (
    <section id="giai-phap" className="pt-10 pb-9 sm:pt-12 sm:pb-11 bg-transparent relative overflow-hidden scroll-mt-6 sm:scroll-mt-8">
      <Container>
        <RevealOnScroll duration={1200}>
          <SectionHeading
            titlePart1="Giải pháp"
            titlePart2="từ DUDI"
            description="Chúng tôi cập nhật và nâng cấp website tập trung vào những hạng mục mang lại hiệu quả thực tế."
            action={{
              label: "Xem chi tiết bảng giá",
              href: "#bang-gia",
            }}
            breakLine={false}
          />
        </RevealOnScroll>
      </Container>

      {/* Infinite Horizontal Marquee - No captions, pure sleek infinite scroll with pause on hover */}
      <div className="relative w-full overflow-hidden pt-1 pb-0">
        {/* Scrolling Marquee Track - PAUSES ON HOVER */}
        <div className="flex gap-6 animate-marquee pt-1 pb-1">
          {marqueeItems.map((sol, idx) => {
            const IconComp = solutionIconMap[sol.icon] || Zap;

            return (
              <div
                key={`${sol.id}-${idx}`}
                className="w-[290px] sm:w-[325px] shrink-0 flex flex-col justify-between p-6 rounded-2xl bg-[#0D1527]/85 border border-slate-700/60 hover:border-red-500/80 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-red-950/40 backdrop-blur-xl transition-all duration-300 group cursor-pointer hover:-translate-y-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800/80 text-slate-300 border border-slate-700/60 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-500 group-hover:text-red-400 transition-colors">
                      #0{(idx % 8) + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug group-hover:text-red-400 transition-colors text-balance">
                    {sol.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed text-justify line-clamp-3">
                    {sol.description}
                  </p>
                </div>

                <a
                  href="#bang-gia"
                  onClick={(e) => scrollToSection("#bang-gia", e)}
                  className="mt-5 pt-3 border-t border-slate-800 text-xs font-semibold text-slate-400 group-hover:text-red-400 transition-colors"
                >
                  <span>Xem trong bảng giá</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

