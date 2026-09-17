"use client";

import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { trackEvent } from "@/lib/tracking";
import { scrollToSection } from "@/lib/utils";

const PACKAGES = [
  {
    id: "coban",
    name: "Cơ Bản",
    badge: "Sửa nhanh & Tiết kiệm",
    price: "500.000đ",
    priceTag: "GIÁ/GÓI",
    priceNote: "Thanh toán trọn gói 1 lần — Không phí duy trì tháng",
    target: "Web đang hoạt động ổn định, chỉ cần chỉnh sửa nhẹ một vài lỗi nhỏ.",
    isFeatured: false,
    buttonText: "Chọn gói Cơ bản — 500.000đ",
    features: [
      "Áp dụng tối đa 3 trang",
      "Thay nội dung & hình ảnh do khách cung cấp",
      "Chỉnh sửa giao diện & bố cục nhẹ",
      "Sửa lỗi hiển thị mobile cơ bản",
      "Sửa lỗi form liên hệ & kiểm tra kỹ thuật",
    ],
  },
  {
    id: "tieuchuan",
    name: "Tiêu Chuẩn",
    badge: "Khuyên Dùng — Phổ Biến Nhất",
    price: "2.000.000đ",
    priceTag: "GIÁ/GÓI",
    priceNote: "Thanh toán trọn gói 1 lần — Không phí duy trì tháng",
    target: "Web cũ, hiển thị chưa tốt, cần cải thiện giao diện và trải nghiệm khách hàng.",
    isFeatured: true,
    buttonText: "Chọn gói Tiêu chuẩn — 2.000.000đ",
    features: [
      "Áp dụng tối đa 5 trang",
      "Viết lại câu chữ & tinh chỉnh layout trang",
      "Tối ưu chuẩn hiển thị trên mọi mobile",
      "Cải thiện tốc độ tải & chuẩn hóa SEO On-page",
      "Tối ưu form nhận khách + tích hợp Zalo/Maps",
    ],
  },
  {
    id: "caocap",
    name: "Cao Cấp",
    badge: "Nâng Cấp Toàn Diện",
    price: "5.000.000đ",
    priceTag: "GIÁ/GÓI",
    priceNote: "Thanh toán trọn gói 1 lần — Không phí duy trì tháng",
    target: "Web yếu, trải nghiệm kém, cần nâng cấp mạnh mẽ để tăng tỷ lệ chuyển đổi.",
    isFeatured: false,
    buttonText: "Chọn gói Cao cấp — 5.000.000đ",
    features: [
      "Áp dụng tối đa 10 trang",
      "Tối ưu nội dung theo tỷ lệ chuyển đổi",
      "Thiết kế lại giao diện các trang chính",
      "Tối ưu trải nghiệm mobile chuyên sâu & tốc độ cao",
      "Audit SEO on-page & thiết kế luồng thu lead chuẩn",
    ],
  },
];

export function Pricing({ onSelectPackage }) {
  const handleSelect = (pkg) => {
    trackEvent("package_select", {
      package_name: pkg.name,
      package_price: pkg.price,
    });

    if (onSelectPackage) {
      onSelectPackage(pkg.name);
    }

    scrollToSection("#form-tu-van");
  };

  return (
    <section id="bang-gia" className="py-6 sm:py-8 lg:py-10 bg-transparent relative overflow-x-clip scroll-mt-[58px] sm:scroll-mt-[68px] lg:scroll-mt-[72px]">
      <Container>
        {/* Header section with title and CTA on the right */}
        <ScrollReveal variant="fade-up" duration={900}>
          <div className="mb-8 sm:mb-10 lg:mb-11 pb-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <h2 className="text-[23px] sm:text-[28px] lg:text-[32px] xl:text-[35px] font-black tracking-tight text-slate-900 leading-tight">
                Bảng{" "}
                <span className="bg-gradient-to-r from-[#FF2B14] via-[#FF6800] to-[#FFA000] bg-clip-text text-transparent whitespace-nowrap">
                  giá dịch vụ
                </span>
              </h2>

              <a
                href="#form-tu-van"
                onClick={(e) => scrollToSection("#form-tu-van", e)}
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#FF6500] hover:text-[#E52E20] transition-colors shrink-0 group cursor-pointer"
              >
                <span>Gửi website nhận báo giá</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <p className="mt-2 text-xs sm:text-sm lg:text-[14.5px] text-slate-600 leading-relaxed max-w-3xl">
              Lựa chọn gói dịch vụ phù hợp với ngân sách và hiện trạng website của bạn. Mọi gói đều bao gồm bảo hành 30 ngày.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 xl:gap-7 items-stretch">
          {PACKAGES.map((pkg, idx) => {
            const cardVariant = idx === 0 ? "slide-left" : idx === 1 ? "zoom-in" : "slide-right";
            const cardDelay = idx === 0 ? 80 : idx === 1 ? 160 : 240;

            if (pkg.isFeatured) {
              return (
                /* FEATURED CARD: Tiêu Chuẩn with Richer Warm Background & Sparkling Stars */
                <ScrollReveal
                  key={pkg.id}
                  variant={cardVariant}
                  delay={cardDelay}
                  duration={900}
                  className="h-full flex flex-col"
                >
                  <div className="h-full relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between bg-gradient-to-b from-[#FFF2E8] via-[#FFF9F4] to-[#FFEBE0] border-2 border-[#FF3823] shadow-[0_10px_35px_-5px_rgba(255,56,35,0.25)] md:-translate-y-1.5 lg:-translate-y-2 z-10 transition-all duration-300 hover:shadow-[0_15px_45px_-5px_rgba(255,56,35,0.38)]">
                    {/* Centered Top Floating Badge for Tiêu Chuẩn */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-extrabold text-white bg-gradient-to-r from-[#FF2B1C] via-[#FF5500] to-[#FF6B00] shadow-md shadow-orange-500/35 whitespace-nowrap border border-orange-300/40">
                        <span className="text-amber-200 text-xs">✨</span>
                        <span>Phổ biến nhất</span>
                        <span className="text-amber-200 text-xs">✨</span>
                      </span>
                    </div>

                    {/* Sparkling Stars Animation around card borders */}
                    <span className="absolute -top-3.5 -right-2 text-amber-400 text-xl font-bold animate-sparkle drop-shadow-[0_0_8px_rgba(251,191,36,0.9)] select-none pointer-events-none z-30">
                      ✦
                    </span>
                    <span className="absolute -top-4 left-6 text-orange-500 text-lg animate-sparkle-delayed select-none pointer-events-none z-30">
                      ✨
                    </span>
                    <span className="absolute -bottom-3 -left-3 text-amber-400 text-lg font-bold animate-sparkle select-none pointer-events-none z-30">
                      ✦
                    </span>
                    <span className="absolute top-1/2 -right-3 text-amber-400 text-sm animate-sparkle-delayed select-none pointer-events-none z-30">
                      ✨
                    </span>

                    {/* Sparkling Stars INSIDE the card body */}
                    <span className="absolute top-16 right-5 text-amber-400 text-base font-bold animate-sparkle drop-shadow-[0_0_6px_rgba(251,191,36,0.8)] select-none pointer-events-none z-20">
                      ✦
                    </span>
                    <span className="absolute top-36 right-7 text-orange-400 text-xs animate-sparkle-delayed select-none pointer-events-none z-20">
                      ✨
                    </span>
                    <span className="absolute bottom-24 right-5 text-amber-400 text-sm animate-sparkle select-none pointer-events-none z-20">
                      ✦
                    </span>
                    <span className="absolute bottom-36 left-4 text-amber-400/80 text-xs animate-sparkle-delayed select-none pointer-events-none z-20">
                      ✨
                    </span>

                    {/* Silky Light Sweep Shine Beam Effect across the card */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none z-10">
                      <div className="w-[120px] h-[250%] bg-gradient-to-r from-transparent via-white/50 to-transparent transform -rotate-45 translate-x-[-150%] animate-light-sweep" />
                    </div>

                    {/* Card Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900">{pkg.name}</h3>

                      <p className="text-xs sm:text-[13px] text-slate-600 mt-1 font-medium mb-3 leading-snug">
                        {pkg.target}
                      </p>

                      {/* Price in BOLD RED with GIÁ/GÓI tag */}
                      <div className="mb-4 pb-3 border-b border-orange-200/80">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#E52E20] tracking-tight">
                            {pkg.price}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6500] bg-orange-100/90 border border-orange-300/80 px-2 py-0.5 rounded-md whitespace-nowrap">
                            {pkg.priceTag}
                          </span>
                          <span className="text-amber-400 text-sm animate-sparkle select-none drop-shadow-xs">
                            ✨
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium mt-1 leading-tight">
                          {pkg.priceNote}
                        </p>
                      </div>

                      {/* Features Checklist with Red Circular Checkmark */}
                      <ul className="space-y-2.5 mb-6">
                        {pkg.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-800 font-medium">
                            <div className="w-4.5 h-4.5 rounded-full bg-[#FF3B20] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <span className="leading-snug pt-0.5">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button: Gradient Orange with Sparkles */}
                    <div className="relative z-10 mt-2">
                      <button
                        onClick={() => handleSelect(pkg)}
                        className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#FF2B1C] via-[#FF5500] to-[#FF6B00] hover:from-[#E52012] hover:to-[#EB4A00] text-white shadow-md shadow-orange-500/35 hover:shadow-lg hover:shadow-orange-500/50 hover:scale-[1.01] transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-1.5"
                      >
                        <span className="text-amber-200 text-xs animate-sparkle">✨</span>
                        <span>{pkg.buttonText}</span>
                        <span className="text-amber-200 text-xs animate-sparkle-delayed">✨</span>
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              );
            }

            /* STANDARD CARDS: Cơ Bản & Cao Cấp */
            return (
              <ScrollReveal
                key={pkg.id}
                variant={cardVariant}
                delay={cardDelay}
                duration={900}
                className="h-full flex flex-col"
              >
                <div className="h-full relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between bg-white border border-orange-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-orange-200 transition-all duration-300">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">{pkg.name}</h3>

                    <p className="text-xs sm:text-[13px] text-slate-600 mt-1 font-medium mb-3 leading-snug">
                      {pkg.target}
                    </p>

                    {/* Price in BOLD RED with GIÁ/GÓI tag */}
                    <div className="mb-4 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#E52E20] tracking-tight">
                          {pkg.price}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6500] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-md whitespace-nowrap">
                          {pkg.priceTag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium mt-1 leading-tight">
                        {pkg.priceNote}
                      </p>
                    </div>

                    {/* Features Checklist with Red Circular Checkmark */}
                    <ul className="space-y-2.5 mb-6">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 font-medium">
                          <div className="w-4.5 h-4.5 rounded-full bg-[#FF3B20] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span className="leading-snug pt-0.5">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button: Pastel Peach with Bold Red Text */}
                  <div className="mt-2">
                    <button
                      onClick={() => handleSelect(pkg)}
                      className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#FFF0E6] hover:bg-[#FFE5D4] text-[#E52E20] transition-all duration-200 cursor-pointer text-center"
                    >
                      {pkg.buttonText}
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
