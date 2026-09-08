"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  MessageCircle,
  Phone,
  ShieldCheck,
  Zap,
  Smartphone,
  Sparkles,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import { heroContent } from "@/constants/landing-content";
import { siteConfig } from "@/constants/site-config";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeroBackground } from "@/components/common/HeroBackground";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { trackEvent } from "@/lib/tracking";

export function Hero() {
  const [activeTab, setActiveTab] = useState("after");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handlePrimaryCta = () => {
    trackEvent("cta_click", {
      label: "Liên hệ",
      position: "hero",
      target: "#form-tu-van",
    });
  };

  const handleZaloCta = () => {
    trackEvent("zalo_click", { position: "hero", page_path: window.location.pathname });
  };

  const handlePhoneCta = () => {
    trackEvent("phone_click", { position: "hero", page_path: window.location.pathname });
  };

  return (
    <section className="relative overflow-hidden bg-transparent">
      <HeroBackground />

      {/* Màn hình 1: Chiếm trọn không gian khi mới vào (Full Viewport) */}
      <div className="relative min-h-[94vh] sm:min-h-screen flex flex-col justify-between pt-24 pb-3 sm:pt-28 sm:pb-5 z-10">
        {/* Top spacer to balance flex-between */}
        <div className="h-4 sm:h-8" />

        <Container className="flex-1 flex flex-col justify-center">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

            {/* H1 — staggered word entrance animation */}
            <h1
              className={`max-w-5xl text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl sm:leading-[1.18] text-balance transition-all duration-1000 ease-out ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-300 bg-clip-text text-transparent">
                Website cũ, chậm hoặc khó ra khách?
              </span>{" "}
              <span
                className={`inline-block bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent transition-all duration-1000 ease-out delay-300 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                DUDI giúp cập nhật đúng phần cần thiết.
              </span>
            </h1>

            {/* Description */}
            <p
              className={`mt-5 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-normal text-balance transition-all duration-900 ease-out delay-500 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {heroContent.description}
            </p>

            {/* CTAs — staggered entrance */}
            <div
              className={`mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto transition-all duration-800 ease-out delay-700 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {/* Primary CTA with breathing glow */}
              <a
                href={heroContent.primaryCta.target}
                onClick={handlePrimaryCta}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="dudiGradient"
                  size="lg"
                  className="w-full sm:w-auto animate-glow-pulse text-base py-4 px-8 font-bold"
                >
                  <span>Liên hệ</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </a>

              {/* Zalo CTA */}
              <a
                href={heroContent.secondaryCta.target}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleZaloCta}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-blue-400 border-blue-500/40 bg-blue-950/20 hover:bg-blue-900/40 py-4 px-7"
                >
                  <MessageCircle className="h-5 w-5 fill-blue-500 text-white" />
                  <span>{heroContent.secondaryCta.label}</span>
                </Button>
              </a>

              {/* Phone CTA */}
              <a
                href={heroContent.hotlineCta.tel}
                onClick={handlePhoneCta}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto text-slate-200 hover:text-white hover:bg-white/10 py-4 px-5 border border-slate-800"
                >
                  <Phone className="h-4 w-4 text-red-500" />
                  <span>{heroContent.hotlineCta.label}</span>
                </Button>
              </a>
            </div>
          </div>
        </Container>

        {/* Gợi ý cuộn xuống ở đáy màn hình 1 — nhích xuống dưới */}
        <a
          href="#showcase-truoc-sau"
          className="flex flex-col items-center justify-center gap-1 text-slate-400/80 pt-2 pb-1 animate-pulse hover:text-red-400 transition-colors cursor-pointer group"
        >
          <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-400/70 group-hover:text-red-400 transition-colors">
            Cuộn xuống để xem kết quả
          </span>
          <ChevronDown className="h-4 w-4 text-red-400 animate-bounce" />
        </a>
      </div>

      {/* Màn hình 2: Before/After Showcase — Chuyên viên DUDI (Phải lướt xuống mới thấy) */}
      <div id="showcase-truoc-sau" className="pt-14 pb-20 sm:pt-20 sm:pb-28 relative z-10">
        <Container>
          <RevealOnScroll duration={900} delay={80}>
            <div className="relative w-full max-w-[1120px] mx-auto rounded-2xl border border-slate-700/80 bg-[#0B132B]/85 p-3 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
              {/* Robot Mascot */}
              <div className="absolute -top-11 -left-3 sm:-left-6 lg:-left-10 z-20 hidden sm:flex items-center gap-2.5 bg-[#0B132B]/95 border border-red-500/40 rounded-2xl p-2 shadow-2xl backdrop-blur-md animate-tilt-float">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-red-500/40 shrink-0 bg-slate-900 shadow-md">
                  <Image
                    src="/images/robot-mascot.jpg"
                    alt="DUDI Robot"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="text-left pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[11px] font-bold text-white">Chuyên viên DUDI</span>
                  </div>
                  <p className="text-[10px] text-slate-300">Khảo sát & sửa đúng phần</p>
                </div>
              </div>

              {/* Top Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-800 px-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 pl-2 hidden sm:inline">
                    https://yourcompany.com
                  </span>
                </div>

                {/* Tabs */}
                <div className="inline-flex rounded-xl bg-slate-950/80 p-1 text-xs font-bold border border-slate-800">
                  <button
                    onClick={() => setActiveTab("before")}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeTab === "before"
                        ? "bg-rose-950/80 text-rose-300 border border-rose-800/60 shadow-xs"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                    <span>Website hiện tại (Trước sửa)</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("after")}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeTab === "after"
                        ? "bg-red-600 text-white shadow-md glow-red"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                    <span>Sau khi DUDI nâng cấp</span>
                  </button>
                </div>
              </div>

              {/* Screen Content */}
              {activeTab === "after" ? (
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 via-[#070B18] to-slate-950 p-6 sm:p-10 text-white text-left transition-all duration-300 border border-slate-800/60">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <Badge variant="success" className="text-emerald-300 bg-emerald-950/80 border-emerald-700">
                        Đã tối ưu chuẩn kỹ thuật DUDI
                      </Badge>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">Bảo hành 30 ngày</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <div className="rounded-xl bg-white/5 p-5 border border-white/10 backdrop-blur-sm card-tilt-hover">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase">
                        <Zap className="h-4 w-4" />
                        <span>Tốc độ tải trang</span>
                      </div>
                      <p className="text-3xl sm:text-4xl font-black mt-2 text-white">0.78s</p>
                      <p className="text-xs text-emerald-300 mt-1 font-medium">
                        ✓ Nén ảnh chuẩn WebP, tải tức thì
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-5 border border-white/10 backdrop-blur-sm card-tilt-hover">
                      <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase">
                        <Smartphone className="h-4 w-4" />
                        <span>Hiển thị Mobile</span>
                      </div>
                      <p className="text-3xl sm:text-4xl font-black mt-2 text-white">100%</p>
                      <p className="text-xs text-blue-300 mt-1 font-medium">
                        ✓ Nút to rõ, không tràn khung ngang
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-5 border border-white/10 backdrop-blur-sm card-tilt-hover">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Form & Liên hệ</span>
                      </div>
                      <p className="text-3xl sm:text-4xl font-black mt-2 text-white">Ổn định</p>
                      <p className="text-xs text-amber-300 mt-1 font-medium">
                        ✓ Bấm gọi ngay, thông báo về email/Zalo
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
                    <span>Khảo sát và kiểm tra trang web của bạn hoàn toàn miễn phí</span>
                    <a
                      href="#form-tu-van"
                      className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 font-bold underline"
                    >
                      Gửi link website để kiểm tra ngay <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-xl bg-slate-950/90 p-6 sm:p-10 text-slate-200 text-left transition-all duration-300 border border-slate-800">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Badge variant="warning">Các vấn đề thường gặp trên web cũ</Badge>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">Chưa nâng cấp</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <div className="rounded-xl bg-slate-900/90 p-5 border border-rose-900/50 shadow-xs">
                      <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase">
                        <Zap className="h-4 w-4" />
                        <span>Tốc độ tải trang</span>
                      </div>
                      <p className="text-3xl sm:text-4xl font-black mt-2 text-rose-400">5.8s</p>
                      <p className="text-xs text-rose-300/80 mt-1">
                        ✗ Khách chờ lâu và bỏ sang đối thủ
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-900/90 p-5 border border-rose-900/50 shadow-xs">
                      <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase">
                        <Smartphone className="h-4 w-4" />
                        <span>Xem trên điện thoại</span>
                      </div>
                      <p className="text-3xl sm:text-4xl font-black mt-2 text-rose-400">Bị vỡ</p>
                      <p className="text-xs text-rose-300/80 mt-1">
                        ✗ Chữ bé li ti, nút bấm bị che khuất
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-900/90 p-5 border border-rose-900/50 shadow-xs">
                      <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Form liên hệ</span>
                      </div>
                      <p className="text-3xl sm:text-4xl font-black mt-2 text-rose-400">Lỗi gửi</p>
                      <p className="text-xs text-rose-300/80 mt-1">
                        ✗ Khách điền nhưng không nhận được tin
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                    <span>DUDI sẽ rà soát từng mục để đưa ra giải pháp sửa đúng chỗ cần thiết</span>
                    <button
                      onClick={() => setActiveTab("after")}
                      className="inline-flex items-center gap-1.5 text-red-400 font-bold hover:underline cursor-pointer"
                    >
                      Xem kết quả sau khi DUDI nâng cấp <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </RevealOnScroll>
        </Container>
      </div>
    </section>
  );
}
