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
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

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

    // Start in the middle of triplicated list so user can scroll both directions immediately
    const singleSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft === 0) {
      el.scrollLeft = singleSetWidth;
    }

    let reqId;
    const speed = 0.6; // smooth auto-scroll speed (px per frame)

    const tick = () => {
      if (!isPaused.current && el) {
        el.scrollLeft += speed;

        // Seamless loop
        if (el.scrollLeft >= singleSetWidth * 2) {
          el.scrollLeft -= singleSetWidth;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += singleSetWidth;
        }
      }
      reqId = requestAnimationFrame(tick);
    };

    reqId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(reqId);
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
    <section id="dau-hieu" className="pt-10 pb-9 sm:pt-12 sm:pb-11 bg-transparent relative scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28">
      <Container>
        <RevealOnScroll duration={1200}>
          <SectionHeading
            title="Website Của Bạn Có Đang Gặp Phải — 6 Vấn Đề Này?"
            description="Đừng để những lỗi kỹ thuật âm thầm làm giảm uy tín thương hiệu và đánh mất khách hàng tiềm năng mỗi ngày."
            action={{
              label: "Xem giải pháp DUDI",
              href: "#giai-phap",
            }}
          />
        </RevealOnScroll>
      </Container>

      {/* Interactive Horizontal Track */}
      <div
        className="relative w-full overflow-hidden pt-1 pb-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeaveContainer}
      >
        {/* Soft edge gradient masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-16 bg-gradient-to-r from-white/90 dark:from-[#070B18]/90 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-16 bg-gradient-to-l from-white/90 dark:from-[#070B18]/90 to-transparent z-10" />

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
                className="w-[280px] sm:w-[325px] shrink-0 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0D1527]/85 border border-slate-200/90 dark:border-slate-700/60 hover:border-red-500/80 shadow-lg shadow-slate-200/50 dark:shadow-xl dark:shadow-black/40 hover:shadow-xl hover:shadow-red-500/10 dark:hover:shadow-red-950/40 backdrop-blur-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1.5 min-h-[230px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 dark:bg-slate-800/80 text-red-600 dark:text-red-400 border border-red-100 dark:border-slate-700/60 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xs">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 px-2.5 py-0.5 rounded-full border border-red-200/80 dark:border-red-900/40">
                      0{number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal text-justify">
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
