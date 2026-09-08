"use client";

import Image from "next/image";
import { ArrowRight, RefreshCcw } from "lucide-react";
import { rebuildBannerContent } from "@/constants/landing-content";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { trackEvent } from "@/lib/tracking";

export function RebuildBanner({ onSelectPackage }) {
  const handleRebuildClick = () => {
    trackEvent("cta_click", {
      label: rebuildBannerContent.ctaLabel,
      position: "rebuild_banner",
      target: "#form-tu-van",
    });

    if (onSelectPackage) {
      onSelectPackage(rebuildBannerContent.packageValue);
    }

    const formEl = document.getElementById("form-tu-van");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 sm:py-10 bg-transparent relative">
      <Container>
        <RevealOnScroll duration={1300}>
          <div className="relative overflow-hidden rounded-3xl bg-[#0D1527]/90 border border-slate-700/60 p-8 sm:p-10 text-white shadow-2xl shadow-black/40 backdrop-blur-xl">
            {/* Subtle glow circle */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-600/20 blur-3xl"
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-xl text-left">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-300 bg-clip-text text-transparent">
                    Website quá cũ hoặc cần làm lại
                  </span>{" "}
                  <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent">
                    toàn bộ giao diện & tính năng?
                  </span>
                </h3>

                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                  {rebuildBannerContent.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-red-400">
                  <RefreshCcw className="h-4 w-4" />
                  <span>Khảo sát, thiết kế UI/UX độc quyền và code chuẩn mới từ đầu</span>
                </div>
              </div>

              {/* 3D Cyber Planet Holographic Card */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl shrink-0 animate-float hidden md:block bg-slate-950">
                <Image
                  src="/images/cyber-planet.jpg"
                  alt="Hệ sinh thái số DUDI"
                  fill
                  className="object-cover"
                  sizes="176px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="shrink-0 w-full lg:w-auto">
                <Button
                  onClick={handleRebuildClick}
                  variant="dudiGradient"
                  size="lg"
                  className="w-full sm:w-auto py-4 px-8 text-sm font-bold shadow-lg glow-red cursor-pointer"
                >
                  <span>{rebuildBannerContent.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
