"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { LiveProjectButton } from "@/components/ui/LiveProjectButton";
import { FadeIn } from "@/components/ui/FadeIn";

const PROJECTS = [
  {
    number: "01",
    category: "Bao Bì Khang Huy • Ngân sách 11.5M",
    title: "Tái Cấu Trúc Web Doanh Nghiệp",
    description: "Nâng cấp cấu trúc danh mục sản phẩm, sửa lỗi mobile toàn diện và tối ưu form báo giá tự động.",
    images: ["/dudi/dudisoftware1.webp", "/dudi/dudisoftware2.webp", "/dudi/dudisoftware3.webp"],
    tags: ["UI/UX", "Mobile", "Form"],
  },
  {
    number: "02",
    category: "Du Lịch Nam Á • Ngân sách 3.5M",
    title: "Tối Ưu Tốc Độ & Mobile Tour",
    description: "Tăng tốc tải trang tour, sửa lỗi form đặt phòng và làm mới điều hướng, tích hợp nút Zalo & Hotline.",
    images: ["/dudi/dudisoftware4.webp", "/dudi/dudisoftware5.webp", "/dudi/dudisoftware1.webp"],
    tags: ["Tốc Độ", "SEO", "Zalo"],
  },
  {
    number: "03",
    category: "Doanh Nghiệp B2B • Thiết kế trọn gói",
    title: "Nâng Cấp UI/UX Hiện Đại",
    description: "Thiết kế lại giao diện trang chủ, chuẩn hóa bố cục sản phẩm và tối ưu tỷ lệ chuyển đổi.",
    images: ["/dudi/dudisoftware2.webp", "/dudi/dudisoftware3.webp", "/dudi/dudisoftware4.webp"],
    tags: ["Thiết Kế", "Chuyển Đổi", "B2B"],
  },
];

function Card({ project, index, progress, targetScale }) {
  const scale = useTransform(progress, [0, 1], [1, targetScale]);

  return (
    <div
      className="sticky flex items-center justify-center"
      style={{
        top: `calc(5rem + ${index * 28}px)`,
        height: "85vh",
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] border-2 border-[#D7E2EA]/20 bg-[#111111] p-4 sm:p-6 md:p-8 shadow-2xl flex flex-col justify-between"
      >
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 sm:pb-6 border-b border-[#D7E2EA]/15">
          <div className="flex items-start gap-4 sm:gap-6">
            <span className="font-kanit font-black text-3xl sm:text-5xl text-[#D7E2EA]/40 select-none shrink-0">
              {project.number}
            </span>
            <div>
              <span className="block font-kanit text-xs uppercase tracking-widest text-[#D7E2EA]/50 mb-1">
                {project.category}
              </span>
              <h3 className="font-kanit font-bold text-lg sm:text-2xl md:text-3xl text-white leading-tight">
                {project.title}
              </h3>
              <p className="mt-2 font-kanit font-light text-xs sm:text-sm text-[#D7E2EA]/60 max-w-md leading-relaxed">
                {project.description}
              </p>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-kanit text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-red-500/30 text-red-400 bg-red-950/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <LiveProjectButton label="Xem Chi Tiết" />
          </div>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
          {project.images.map((src, i) => (
            <div
              key={i}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#1a1a1a] border border-white/5"
              style={{ height: i === 1 ? "clamp(140px,20vw,300px)" : "clamp(110px,16vw,240px)" }}
            >
              <Image
                src={src}
                alt={`${project.title} preview ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 400px"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="du-an"
      ref={containerRef}
      className="relative w-full bg-[#0C0C0C] text-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-20 px-5 sm:px-8 md:px-10 pt-20 pb-32"
    >
      {/* Heading */}
      <div className="text-center mb-16 sm:mb-20">
        <FadeIn delay={0} y={40} duration={0.8}>
          <span className="inline-block font-kanit text-xs uppercase tracking-[0.3em] text-red-500 mb-4">
            Dự Án Thực Tế
          </span>
          <h2 className="hero-heading font-kanit font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">
            PROJECT
          </h2>
        </FadeIn>
      </div>

      {/* Sticky Stacking Cards */}
      <div className="relative max-w-6xl mx-auto space-y-12">
        {PROJECTS.map((project, idx) => {
          const targetScale = 1 - (PROJECTS.length - 1 - idx) * 0.03;
          return (
            <Card
              key={project.number}
              project={project}
              index={idx}
              progress={scrollYProgress}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
