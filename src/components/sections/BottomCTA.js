"use client";

import { ArrowRight, Phone } from "lucide-react";
import { bottomCtaContent } from "@/constants/landing-content";
import { siteConfig } from "@/constants/site-config";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/Button";
import { ZaloIcon } from "@/components/ui/ZaloIcon";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { trackEvent } from "@/lib/tracking";

export function BottomCTA() {
  const handlePrimaryClick = () => {
    trackEvent("cta_click", {
      label: bottomCtaContent.primaryButtonLabel,
      position: "bottom_cta",
      target: "#form-tu-van",
    });
  };

  const handleZaloClick = () => {
    trackEvent("zalo_click", { position: "bottom_cta", page_path: window.location.pathname });
  };

  const handlePhoneClick = () => {
    trackEvent("phone_click", { position: "bottom_cta", page_path: window.location.pathname });
  };

  return (
    <section className="py-12 sm:py-16 bg-transparent relative">
      <Container>
        <RevealOnScroll duration={1300}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-rose-800 to-[#0B132B] border border-red-500/40 px-6 py-12 sm:px-12 sm:py-16 text-center text-white shadow-2xl glow-red-lg card-glow-hover">
          {/* Ambient Lighting */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-red-500/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl"
          />

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-sky-100 bg-clip-text text-transparent">
                Đừng để website cũ
              </span>{" "}
              <span className="bg-gradient-to-r from-pink-300 via-rose-200 to-red-200 bg-clip-text text-transparent">
                làm mất khách hàng tiềm năng mỗi ngày
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed font-normal">
              {bottomCtaContent.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a href="#form-tu-van" onClick={handlePrimaryClick} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-red-700 hover:bg-slate-100 shadow-xl font-bold py-4 px-8 text-base cursor-pointer"
                >
                  <span>{bottomCtaContent.primaryButtonLabel}</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </a>

              <a
                href={siteConfig.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleZaloClick}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-white/80 hover:border-blue-400 bg-white/10 text-white hover:bg-blue-900/30 font-bold py-4 px-6 gap-2"
                >
                  <ZaloIcon className="h-5 w-5" />
                  <span>{bottomCtaContent.zaloButtonLabel}</span>
                </Button>
              </a>

              <a href={siteConfig.hotlineTel} onClick={handlePhoneClick} className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto text-white hover:bg-white/10 font-bold py-4 px-5 gap-2 border border-white/20"
                >
                  <Phone className="h-4 w-4 text-white" />
                  <span>{bottomCtaContent.hotlineButtonLabel}</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
