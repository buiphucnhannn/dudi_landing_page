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
    <section id="bang-gia" className="pt-10 pb-10 sm:pt-12 sm:pb-12 bg-transparent relative scroll-mt-6 sm:scroll-mt-8">
      <Container>
        <RevealOnScroll duration={1200}>
          <SectionHeading
            titlePart1="Bảng"
            titlePart2="giá dịch vụ"
            description="Lựa chọn gói dịch vụ phù hợp với ngân sách và hiện trạng website của bạn. Mọi gói đều bao gồm bảo hành 30 ngày."
            action={{
              label: "Gửi website nhận báo giá",
              href: "#form-tu-van",
            }}
            breakLine={false}
          />
        </RevealOnScroll>

        {/* 3 Pricing Cards Grid with Slow Staggered Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
          {pricingPlans.map((plan, idx) => {
            return (
              <RevealOnScroll
                key={plan.id}
                delay={idx * 160}
                duration={1300}
                className="h-full flex flex-col"
              >
                <div
                  className={`relative flex-1 flex flex-col rounded-3xl p-7 sm:p-8 transition-all duration-300 backdrop-blur-xl card-glow-hover cursor-pointer shadow-xl shadow-black/40 ${
                    plan.popular
                      ? "border-2 border-red-500 bg-gradient-to-b from-red-950/45 via-[#0D1527]/95 to-[#0D1527]/95 text-white shadow-2xl shadow-red-950/60 scale-100 lg:-translate-y-2 z-10 ring-1 ring-red-500/30"
                      : "border border-slate-700/60 bg-[#0D1527]/85 text-slate-100 hover:border-slate-500"
                  }`}
                >
                  {/* Top neon line on popular card */}
                  {plan.popular && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                  )}

                  {/* Header of Plan - Badge cleanly inside header without any line break */}
                  <div className="mb-4">
                    {plan.popular ? (
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-600 shadow-md shadow-red-600/40 border border-red-400/40 whitespace-nowrap">
                        <Sparkles className="h-3.5 w-3.5 fill-current text-yellow-300 animate-pulse shrink-0" />
                        <span>Khuyên Dùng — Phổ Biến Nhất</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 bg-slate-800/80 border border-slate-700/60 whitespace-nowrap">
                        <span>{plan.badge}</span>
                      </div>
                    )}

                    <h3 className="text-2xl font-black text-white mt-3">{plan.name}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-300 min-h-[42px] leading-relaxed text-justify">
                      {plan.target}
                    </p>
                  </div>

                  {/* Exact Price/Package Tag - STRICT NO MONTHLY TAG */}
                  <div className="mb-6 pb-6 border-b border-slate-800">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black tracking-tight text-white whitespace-nowrap">
                        {plan.price}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-red-300 bg-red-950/80 border border-red-800/60 px-2.5 py-1 rounded-md whitespace-nowrap">
                        GIÁ/GÓI
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium mt-1.5 whitespace-nowrap">
                      Thanh toán trọn gói 1 lần — Không phí duy trì tháng
                    </p>
                  </div>

                  {/* Delivery Time & Revision Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-6 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>{plan.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <RefreshCw className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>{plan.revisions}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-white mb-3 block">
                      Phạm vi bàn giao:
                    </span>
                    <ul className="space-y-3 text-sm text-slate-300">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                          <span className="text-xs sm:text-sm leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Limitations note */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 italic">
                      <strong className="text-slate-300">Giới hạn:</strong> {plan.limitations}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 pt-4">
                    <Button
                      onClick={() => handleSelect(plan)}
                      variant={plan.popular ? "dudiGradient" : "outline"}
                      className={`w-full py-3 text-sm font-bold shadow-xs cursor-pointer transition-all ${
                        plan.popular
                          ? ""
                          : "border-slate-700 text-slate-200 hover:bg-white/10 hover:text-white"
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

        {/* Ghi chú làm mới toàn bộ website — Thay thế 2 khối cũ theo mẫu */}
        <RevealOnScroll delay={200} duration={1200}>
          <div className="mt-8 sm:mt-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/35 via-[#131B2E] to-amber-950/35 border border-amber-500/30 text-xs sm:text-sm text-slate-200 backdrop-blur-xl shadow-xl shadow-black/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-xs">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-white font-bold">Làm mới toàn bộ website:</strong>{" "}
                <span className="text-slate-300">
                  Báo giá riêng từ <span className="font-bold text-amber-300">10.000.000đ</span> khi code cũ khó bảo trì hoặc cần thiết kế lại.
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
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4 decoration-amber-400/50 hover:decoration-amber-300 transition-colors shrink-0 cursor-pointer ml-13 sm:ml-0 group"
            >
              <span>Liên hệ để được tư vấn</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

