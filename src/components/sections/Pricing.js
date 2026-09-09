"use client";

import { Check, Sparkles, Clock, RefreshCw, AlertCircle, ArrowRight } from "lucide-react";
import { pricingPlans } from "@/constants/landing-content";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { trackEvent } from "@/lib/tracking";
import { scrollToSection } from "@/lib/utils";

export function Pricing({ onSelectPackage }) {
  const handleSelect = (plan) => {
    trackEvent("package_select", {
      package_name: plan.name,
      package_price: plan.price,
    });

    if (onSelectPackage) {
      onSelectPackage(plan.packageValue);
    }

    // Cuộn mượt đến form với vị trí đẹp
    scrollToSection("#form-tu-van");
  };

  return (
    <section id="bang-gia" className="pt-4 pb-4 sm:pt-5 sm:pb-5 lg:pt-6 lg:pb-6 bg-transparent relative scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28">
      <Container>
        <RevealOnScroll duration={1100}>
          <SectionHeading
            titlePart1="Bảng"
            titlePart2="giá dịch vụ"
            description="Lựa chọn gói dịch vụ phù hợp với ngân sách và hiện trạng website của bạn. Mọi gói đều bao gồm bảo hành 30 ngày."
            action={{
              label: "Gửi website nhận báo giá",
              href: "#form-tu-van",
            }}
            breakLine={false}
            className="mb-2.5 sm:mb-3.5 lg:mb-3.5 pb-1"
          />
        </RevealOnScroll>

        {/* 3 Pricing Cards Grid with Slow Staggered Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-4 xl:gap-5 items-stretch">
          {pricingPlans.map((plan, idx) => {
            const displayFeatures = plan.features;

            return (
              <RevealOnScroll
                key={plan.id}
                delay={idx * 140}
                duration={1200}
                className="h-full flex flex-col"
              >
                <div
                  className={`relative flex-1 flex flex-col justify-between rounded-2xl p-3.5 sm:p-4 lg:p-4.5 transition-all duration-300 backdrop-blur-xl card-glow-hover cursor-pointer shadow-xl ${
                    plan.popular
                      ? "border-2 border-red-500 bg-gradient-to-b from-red-50/80 via-white to-white dark:from-red-950/45 dark:via-[#0D1527]/95 dark:to-[#0D1527]/95 text-slate-900 dark:text-white shadow-xl shadow-red-500/10 dark:shadow-2xl dark:shadow-red-950/60 ring-1 ring-red-500/30"
                      : "border border-slate-200/90 dark:border-slate-700/60 bg-white dark:bg-[#0D1527]/85 text-slate-900 dark:text-slate-100 hover:border-slate-400 dark:hover:border-slate-500 shadow-lg shadow-slate-200/50 dark:shadow-black/40"
                  }`}
                >
                  {/* Top neon line on popular card */}
                  {plan.popular && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-t-2xl" />
                  )}

                  <div>
                    {/* Header of Plan */}
                    <div className="mb-2">
                      {plan.popular ? (
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-600 shadow-xs shadow-red-600/30 border border-red-400/40">
                          <Sparkles className="h-2.5 w-2.5 fill-current text-yellow-300 animate-pulse shrink-0" />
                          <span>Khuyên Dùng — Phổ Biến Nhất</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                          <span>{plan.badge}</span>
                        </div>
                      )}

                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                        {plan.name}
                      </h3>
                      <p className="mt-0.5 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-snug min-h-[28px]">
                        {plan.target}
                      </p>
                    </div>

                    {/* Exact Price/Package Tag - STRICT NO MONTHLY TAG */}
                    <div className="mb-2 pb-2 border-b border-slate-200/90 dark:border-slate-800/80">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-[26px] font-black tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                          {plan.price}
                        </span>
                        <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800/60 px-1.5 py-0.5 rounded-md whitespace-nowrap">
                          GIÁ/GÓI
                        </span>
                      </div>
                      <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 leading-tight">
                        Thanh toán trọn gói 1 lần — Không phí duy trì tháng
                      </p>
                    </div>

                    {/* Delivery Time & Revision Stats */}
                    <div className="grid grid-cols-2 gap-1.5 mb-2.5 p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-[10.5px]">
                      <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                        <Clock className="h-3 w-3 text-slate-500 dark:text-slate-400 shrink-0" />
                        <span className="truncate">{plan.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                        <RefreshCw className="h-3 w-3 text-slate-500 dark:text-slate-400 shrink-0" />
                        <span className="truncate">{plan.revisions}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div>
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1.5 block">
                        Phạm vi bàn giao:
                      </span>
                      <ul className="space-y-1 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300">
                        {displayFeatures.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-1.5">
                            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Limitations note */}
                      <div className="mt-2 pt-1.5 border-t border-slate-200 dark:border-slate-800/80 text-[10px] text-slate-500 dark:text-slate-400 italic">
                        <strong className="text-slate-700 dark:text-slate-300">Giới hạn:</strong> {plan.limitations}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-3 pt-0">
                    <Button
                      onClick={() => handleSelect(plan)}
                      variant={plan.popular ? "dudiGradient" : "outline"}
                      className={`w-full py-2 h-9 text-xs sm:text-[13px] font-bold shadow-xs cursor-pointer transition-all ${
                        plan.popular
                          ? "glow-red"
                          : "border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {plan.ctaLabel}
                    </Button>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Ghi chú làm mới toàn bộ website — Thiết kế tinh gọn */}
        <RevealOnScroll delay={180} duration={1100}>
          <div className="mt-2.5 sm:mt-3 p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 dark:from-amber-950/35 dark:via-[#131B2E] dark:to-amber-950/35 border border-amber-300/80 dark:border-amber-500/30 text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 backdrop-blur-xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-400/40 dark:border-amber-500/30">
                <Sparkles className="h-3 w-3" />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 leading-snug">
                <strong className="text-slate-900 dark:text-white font-bold">Làm mới toàn bộ website:</strong>{" "}
                <span className="text-slate-600 dark:text-slate-300">
                  Báo giá riêng từ <span className="font-bold text-amber-700 dark:text-amber-300">10.000.000đ</span> khi code cũ khó bảo trì hoặc cần thiết kế mới.
                </span>
              </p>
            </div>

            <a
              href="#form-tu-van"
              onClick={(e) => {
                if (onSelectPackage) {
                  onSelectPackage("Làm mới toàn bộ website (Từ 10tr)");
                }
                scrollToSection("#form-tu-van", e);
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 underline underline-offset-4 decoration-amber-600/50 hover:decoration-amber-300 transition-colors shrink-0 cursor-pointer group"
            >
              <span>Liên hệ để được tư vấn</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

