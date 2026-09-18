"use client";

import { useState, useRef, useEffect } from "react";
import {
  Gauge,
  Smartphone,
  LayoutDashboard,
  FileEdit,
  MailWarning,
  TrendingDown,
} from "lucide-react";
import { problemsContent } from "@/constants/landing-content";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const problemIconMap = {
  Gauge,
  Smartphone,
  LayoutDashboard,
  FileEdit,
  MailWarning,
  TrendingDown,
};

export function Problems() {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const isPaused = useRef(false);
  const resumeTimeout = useRef(null);

  // Auto-scroll loop using requestAnimationFrame
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let reqId;
    const speed = 0.6; // smooth auto-scroll speed (px per frame)

    // Ensure initial scroll position starts in the middle set
    const initTimer = setTimeout(() => {
      if (el && el.scrollWidth > 0 && el.scrollLeft === 0) {
        el.scrollLeft = el.scrollWidth / 3;
      }
    }, 50);

    const tick = () => {
      if (!isPaused.current && el) {
        const singleSetWidth = el.scrollWidth / 3;
        if (singleSetWidth > 50) {
          el.scrollLeft += speed;

          // Seamless loop
          if (el.scrollLeft >= singleSetWidth * 2) {
            el.scrollLeft -= singleSetWidth;
          } else if (el.scrollLeft <= 0) {
            el.scrollLeft += singleSetWidth;
          }
        }
      }
      reqId = requestAnimationFrame(tick);
    };

    reqId = requestAnimationFrame(tick);
    return () => {
      clearTimeout(initTimer);
      cancelAnimationFrame(reqId);
    };
  }, []);

  // Handle boundary wrapping during manual swipe or drag
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += singleSetWidth;
    }
  };

  // Mouse Drag Events (Desktop)
  const handleMouseDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    isPaused.current = true;
    clearTimeout(resumeTimeout.current);
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.35; // drag multiplier
    el.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      clearTimeout(resumeTimeout.current);
      resumeTimeout.current = setTimeout(() => {
        isPaused.current = false;
      }, 1500);
    }
  };

  // Touch Events (Mobile swipe)
  const handleTouchStart = () => {
    isPaused.current = true;
    clearTimeout(resumeTimeout.current);
  };

  const handleTouchEnd = () => {
    clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      isPaused.current = false;
    }, 2000);
  };

  // Hover Events (Pause on hover)
  const handleMouseEnter = () => {
    if (!isDragging.current) {
      isPaused.current = true;
    }
  };

  const handleMouseLeaveContainer = () => {
    if (!isDragging.current) {
      isPaused.current = false;
    }
    handleMouseUpOrLeave();
  };

  // Triplicate list for continuous infinite looping
  const cardsList = [...problemsContent, ...problemsContent, ...problemsContent];

  return (
    <section id="dau-hieu" className="scroll-mt-[58px] sm:scroll-mt-[68px] lg:scroll-mt-[72px] py-8 sm:py-10 lg:py-12 bg-transparent relative">
      <Container>
        <ScrollReveal variant="fade-up" duration={900}>
          <SectionHeading
            title="Website Của Bạn Có Đang Gặp Phải — 6 Vấn Đề Này?"
            description="Đừng để những lỗi kỹ thuật âm thầm làm giảm uy tín thương hiệu và đánh mất khách hàng tiềm năng mỗi ngày."
            showBorder={false}
            breakLine={false}
            action={{
              label: "Xem giải pháp DUDI",
              href: "#giai-phap",
            }}
          />
        </ScrollReveal>
      </Container>

      {/* Interactive Horizontal Track */}
      <div
        className="relative w-full max-w-[1920px] mx-auto overflow-hidden pt-1 pb-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeaveContainer}
      >
        {/* Soft edge gradient masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 lg:w-28 bg-gradient-to-r from-[#FFF9F5] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 lg:w-28 bg-gradient-to-l from-[#FFF9F5] to-transparent z-10" />

          {/* Scrollable & Draggable Track */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar touch-pan-x cursor-grab active:cursor-grabbing select-none px-4 sm:px-8 py-2"
          >
            {cardsList.map((item, idx) => {
              const IconComp = problemIconMap[item.icon] || Gauge;
              const number = (idx % problemsContent.length) + 1;

              return (
                <div
                  key={`${item.id}-${idx}`}
                  className="w-[280px] sm:w-[325px] shrink-0 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-[#FFE4D6] hover:border-[#FF6500] shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 group cursor-pointer hover:-translate-y-1.5 min-h-[230px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#FF6500] border border-orange-100 group-hover:bg-[#FF6500] group-hover:text-white group-hover:border-[#FF6500] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xs">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#FF6500] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200/80">
                        0{number}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6500] transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal text-justify">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    </section>
  );
}
