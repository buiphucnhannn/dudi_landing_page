"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import { heroContent } from "@/constants/landing-content";
import { siteConfig } from "@/constants/site-config";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "@/components/common/HeroBackground";
import { ZaloIcon } from "@/components/ui/ZaloIcon";
import { trackEvent } from "@/lib/tracking";
import { scrollToSection } from "@/lib/utils";

export function Hero() {
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
      <div className="relative min-h-[100dvh] sm:min-h-screen flex flex-col justify-between pt-20 pb-3 sm:pt-28 sm:pb-5 z-10">
        {/* Top spacer to balance flex-between */}
        <div className="h-2 sm:h-8" />

        <Container className="flex-1 flex flex-col justify-center px-4 sm:px-6">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

            {/* H1 — staggered word entrance animation */}
            <h1
              className={`max-w-5xl text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-snug sm:leading-[1.18] text-balance transition-all duration-1000 ease-out ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="hero-headline-p1 bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-300 bg-clip-text text-transparent">
                Website cũ, chậm hoặc khó ra khách?
              </span>{" "}
              <span
                className={`inline-block hero-headline-p2 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent transition-all duration-1000 ease-out delay-300 ${
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
              className={`hero-desc mt-4 sm:mt-5 max-w-2xl text-sm sm:text-lg text-slate-300 leading-relaxed font-normal text-balance transition-all duration-900 ease-out delay-500 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {heroContent.description}
            </p>

            {/* CTAs — staggered entrance */}
            <div
              className={`mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto transition-all duration-800 ease-out delay-700 ${
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
                  className="w-full sm:w-auto animate-glow-pulse text-sm sm:text-base py-3.5 sm:py-4 px-6 sm:px-8 font-bold cursor-pointer"
                >
                  <span>Liên hệ</span>
                  <ArrowRight className="h-4 sm:h-5 w-4 sm:w-5" />
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
                  variant="outlineZalo"
                  size="lg"
                  className="w-full sm:w-auto py-3.5 sm:py-4 px-6 sm:px-7 gap-2 border-blue-500/50 hover:border-[#0068FF] bg-blue-50/60 dark:bg-transparent hover:bg-blue-100 dark:hover:bg-blue-900/40 text-[#0068FF] dark:text-blue-400 hover:shadow-[0_0_20px_rgba(0,104,255,0.25)] text-sm sm:text-base cursor-pointer"
                >
                  <ZaloIcon className="h-4 sm:h-5 w-4 sm:w-5" />
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
                  className="w-full sm:w-auto text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white/80 dark:bg-transparent hover:bg-slate-100 dark:hover:bg-white/10 py-3.5 sm:py-4 px-5 border border-slate-300 dark:border-slate-800 shadow-sm text-sm sm:text-base cursor-pointer"
                >
                  <Phone className="h-4 w-4 text-red-600 dark:text-red-500" />
                  <span>{heroContent.hotlineCta.label}</span>
                </Button>
              </a>
            </div>
          </div>
        </Container>

        {/* Gợi ý cuộn xuống ở đáy màn hình 1 */}
        <a
          href="#dau-hieu"
          onClick={(e) => {
            scrollToSection("#dau-hieu", e);
          }}
          className="flex flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400/80 pt-2 pb-1 animate-pulse hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer group"
        >
          <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-500 dark:text-slate-400/70 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            Cuộn xuống để xem thêm
          </span>
          <ChevronDown className="h-4 w-4 text-red-600 dark:text-red-400 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
