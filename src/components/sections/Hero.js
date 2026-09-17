"use client";

import Image from "next/image";
import { ArrowRight, Zap, ShieldCheck, Users, ChevronUp } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { scrollToSection } from "@/lib/utils";
import { trackEvent } from "@/lib/tracking";

const TRUST_BADGES = [
  {
    icon: Zap,
    title: "Phản hồi nhanh",
    subtitle: "tiếp nhận tức thì",
  },
  {
    icon: ShieldCheck,
    title: "Kỹ thuật chuyên môn",
    subtitle: "giàu kinh nghiệm",
  },
  {
    icon: Users,
    title: "Minh bạch chi phí",
    subtitle: "báo giá trước khi làm",
  },
];

export function Hero() {
  const handlePrimaryCta = (e) => {
    scrollToSection("#form-tu-van", e);
    trackEvent("cta_click", {
      label: "Bắt đầu ngay",
      position: "hero",
      target: "#form-tu-van",
    });
  };

  const handleConsultClick = () => {
    trackEvent("cta_click", {
      label: "Tư vấn ngay - hero image badge",
      position: "hero_image",
      target: "#form-tu-van",
    });
  };

  return (
    <section
      id="hero"
      className="scroll-mt-16 sm:scroll-mt-20 lg:scroll-mt-24 relative isolate w-full overflow-hidden bg-[#FFF9F5] lg:h-[100svh] lg:min-h-[660px] lg:max-h-[940px] flex flex-col justify-center"
    >
      {/* ===== DESKTOP ONLY: nền full-bleed, robot nằm gọn nửa phải ===== */}
      <div className="hidden lg:block absolute inset-0 z-0 select-none pointer-events-none" aria-hidden="true">
        <Image
          src="/dudi/DUDI_herosection.webp"
          alt="DUDI Software | Cập nhật & Nâng cấp website doanh nghiệp"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[70%_38%] xl:object-[72%_38%] select-none pointer-events-none"
        />
      </div>
      {/* Lớp phủ cream nhẹ bên trái để chữ đọc rõ mà nền vẫn thoáng, tan dần sang phải */}
      <div
        className="hidden lg:block absolute inset-0 z-[1] bg-gradient-to-r from-[#FFF9F5]/90 via-[#FFF9F5]/70 via-[25%] via-[#FFF9F5]/35 via-[42%] to-transparent to-[60%] pointer-events-none select-none"
        aria-hidden="true"
      />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 lg:h-full lg:flex lg:flex-col lg:justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-center lg:h-full">
          {/* Cột chữ */}
          <div className="lg:col-span-7 xl:col-span-6 w-full max-w-none sm:max-w-lg lg:max-w-[460px] xl:max-w-[490px] flex flex-col items-stretch sm:items-start justify-center text-left pt-[84px] sm:pt-[96px] pb-6 sm:pb-8 lg:py-14 xl:py-16 lg:transform lg:-translate-x-5 xl:-translate-x-7">
            {/* Eyebrow */}
            <ScrollReveal variant="fade-up" delay={50} duration={800}>
              <span className="text-[#FF6500] font-black text-[11px] sm:text-[13px] tracking-[0.22em] uppercase mb-3 sm:mb-4 inline-block">
                DUDI SOFTWARE
              </span>
            </ScrollReveal>

            {/* H1: bỏ whitespace-nowrap trên mobile để không tràn 320px */}
            <ScrollReveal variant="fade-up" delay={120} duration={800}>
              <h1 className="text-balance text-[27px] min-[400px]:text-[29px] sm:text-[32px] md:text-[34px] lg:text-[34px] xl:text-[38px] font-black text-slate-900 leading-[1.2] sm:leading-[1.22] tracking-tight mb-3.5 sm:mb-4 lg:mb-4">
                <span className="block">Cập nhật &amp; Nâng cấp</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF2B14] via-[#FF6800] to-[#FFA000] lg:whitespace-nowrap">
                  Website Doanh Nghiệp
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF2B14] via-[#FF6800] to-[#FFA000] lg:whitespace-nowrap">
                  đúng phần cần thiết
                </span>
              </h1>
            </ScrollReveal>

            {/* Mô tả: mobile căn trái cho dễ đọc, sm+ justify */}
            <ScrollReveal variant="fade-up" delay={200} duration={800}>
              <p className="text-[13.5px] sm:text-[14.5px] lg:text-[14.5px] xl:text-[15px] text-slate-700 font-medium leading-[1.7] text-left sm:text-justify mb-5 sm:mb-7 lg:mb-6 max-w-none sm:max-w-[390px] lg:max-w-[400px]">
                DUDI Software tối ưu đúng phần website chậm, lỗi thời hoặc khó ra khách: tăng tốc tải trang, chuẩn hóa di động và sửa lỗi triệt để — giữ chân khách hàng hiệu quả, không cần làm lại từ đầu.
              </p>
            </ScrollReveal>

            {/* CTA: mobile full-width xếp dọc như mẫu, sm+ xếp ngang */}
            <ScrollReveal variant="fade-up" delay={280} duration={800} className="w-full sm:w-auto">
              <div className="flex flex-col min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center gap-2.5 sm:gap-3.5 mb-7 sm:mb-8 lg:mb-8 w-full sm:w-auto">
                <a
                  href="#form-tu-van"
                  onClick={handlePrimaryCta}
                  className="inline-flex w-full min-[420px]:w-auto items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 min-h-[48px] rounded-full text-[13px] sm:text-sm font-extrabold text-white bg-gradient-to-r from-[#FF3823] via-[#FF5500] to-[#FF6B00] hover:from-[#E52E20] hover:to-[#E55A00] shadow-md hover:shadow-lg shadow-orange-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5500] cursor-pointer"
                >
                  <span>Bắt đầu ngay</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>
                <a
                  href="#bang-gia"
                  onClick={(e) => scrollToSection("#bang-gia", e)}
                  className="inline-flex w-full min-[420px]:w-auto items-center justify-center gap-1.5 px-5 sm:px-6 py-3.5 sm:py-4 min-h-[48px] rounded-full text-[13px] sm:text-sm font-bold text-slate-800 bg-white border border-orange-200/90 hover:border-orange-300 hover:text-[#E52E20] hover:bg-orange-50/60 shadow-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500] cursor-pointer"
                >
                  <span>Xem bảng giá</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Trust badges: hàng cuối của cụm nội dung */}
            <ScrollReveal variant="fade-up" delay={360} duration={800} className="w-full">
              <div className="w-full">
                <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-x-4 lg:gap-x-4.5 sm:gap-y-2.5">
                  {TRUST_BADGES.map((b, i) => (
                    <div
                      key={b.title}
                      className="flex items-center gap-2.5 rounded-xl bg-white/80 border border-orange-100/80 px-3 py-2.5 shadow-xs min-[420px]:flex-col min-[420px]:text-center min-[420px]:gap-1.5 min-[420px]:px-2 sm:bg-transparent sm:border-0 sm:shadow-none sm:p-0 sm:flex-row sm:text-left sm:gap-2"
                    >
                      <b.icon className="w-4 h-4 text-[#FF6B00] shrink-0" strokeWidth={2.4} />
                      <div className="flex flex-col text-left min-[420px]:items-center min-[420px]:text-center sm:items-start sm:text-left min-w-0">
                        <span className="font-bold text-slate-800 text-xs lg:text-[12px] leading-tight">
                          {b.title}
                        </span>
                        <span className="text-[10.5px] sm:text-[10px] lg:text-[10.5px] text-slate-500 font-medium leading-tight mt-0.5">
                          {b.subtitle}
                        </span>
                      </div>
                      {i < TRUST_BADGES.length - 1 && (
                        <span className="hidden" aria-hidden="true">
                          |
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Cột phải desktop để trống cho linh vật */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 pointer-events-none min-h-[380px]" aria-hidden="true" />
        </div>

        {/* ===== MOBILE/TABLET: ảnh nền đem xuống dưới dạng card bo góc như mẫu ===== */}
        <div className="lg:hidden pb-8 sm:pb-10">
          <ScrollReveal variant="zoom-in" delay={150} duration={900}>
            <div className="relative overflow-hidden rounded-[20px] sm:rounded-[24px] border border-orange-100/90 shadow-[0_16px_40px_-12px_rgba(255,107,0,0.28)] bg-white">
              <div className="relative aspect-[4/3] min-[420px]:aspect-[16/10] w-full">
                <Image
                  src="/dudi/DUDI_herosection.webp"
                  alt="Linh vật DUDI Software hỗ trợ nâng cấp website doanh nghiệp"
                  fill
                  priority={false}
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 0vw"
                  className="object-cover object-[72%_center] min-[420px]:object-[50%_35%] select-none"
                />
                {/* gradient chân ảnh cho badge nổi dễ đọc */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" aria-hidden="true" />
              </div>

              {/* Badge nổi "Tư vấn ngay" như mẫu */}
              <a
                href="#form-tu-van"
                onClick={(e) => {
                  handleConsultClick();
                  scrollToSection("#form-tu-van", e);
                }}
                className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-[#7C3A12]/95 backdrop-blur-sm pl-1.5 pr-2.5 py-1.5 shadow-lg shadow-black/20 text-white hover:bg-[#7C3A12] active:scale-[0.98] transition-all cursor-pointer"
                aria-label="Tư vấn ngay"
              >
                <span className="relative h-7 w-7 overflow-hidden rounded-full bg-white ring-2 ring-white/70 shrink-0">
                  <Image
                    src="/dudi/dudisoftware1.webp"
                    alt="DUDI"
                    fill
                    className="object-contain"
                    sizes="28px"
                  />
                </span>
                <span className="text-xs font-bold whitespace-nowrap">Tư vấn ngay</span>
                <ChevronUp className="h-3.5 w-3.5 opacity-90" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Cầu nối mềm xuống section sau trên mobile */}
      <div className="lg:hidden absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-transparent to-[#FFF9F5] pointer-events-none" aria-hidden="true" />
    </section>
  );
}
