"use client";

import Image from "next/image";
import { MapPin, Phone, Mail, ChevronUp } from "lucide-react";
import { Container } from "@/components/common/Container";

const servicesList = [
  "Phát triển ứng dụng",
  "Ứng dụng di động",
  "Thiết kế UI/UX",
  "Giải pháp đám mây",
  "AI & Học máy",
];

const exploreList = [
  "Về chúng tôi",
  "Dịch vụ",
  "Dự án",
  "Blog",
  "Đánh giá",
];

export function Footer() {
  const scrollToTop = (e) => {
    e?.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#060913] text-slate-300 pt-14 sm:pt-16 pb-7 border-t border-slate-800/80 overflow-hidden select-none">
      {/* Subtle Atmospheric Ambient Glow at Top */}
      <div className="pointer-events-none absolute top-0 left-1/4 -translate-x-1/2 w-[650px] h-[260px] bg-gradient-to-b from-purple-900/15 via-rose-950/10 to-transparent blur-[110px]" />

      <Container className="relative z-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-9 lg:gap-8 mb-12">
          {/* Cột 1: Logo (Không bo góc), Đoạn giới thiệu, Thông tin pháp nhân & Mạng xã hội */}
          <div className="lg:col-span-4 space-y-4 text-left">
            {/* Logo DUDI (Sharp corners, rounded-none) + Text DUDI Software */}
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 rounded-none overflow-hidden">
                <Image
                  src="/dudi/dudisoftware1.webp"
                  alt="DUDI Software"
                  fill
                  className="object-contain"
                  sizes="44px"
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                DUDI Software
              </span>
            </div>

            <p className="text-xs sm:text-[13px] text-slate-300/85 leading-relaxed max-w-sm">
              Công ty phần mềm hàng đầu với các giải pháp công nghệ hiện đại và sáng tạo, giúp doanh nghiệp phát triển bền vững.
            </p>

            {/* Thông tin pháp nhân */}
            <div className="space-y-0.5 pt-1">
              <h5 className="text-xs sm:text-[13px] font-bold text-white tracking-wide uppercase">
                CÔNG TY TNHH GIẢI PHÁP PHẦN MỀM DUDI
              </h5>
              <p className="text-[11px] font-medium text-slate-400 tracking-wider uppercase">
                DUDI SOFTWARE SOLUTION CO., LTD
              </p>
              <p className="text-[11px] font-medium text-slate-400">
                MST: 0319641544
              </p>
            </div>

            {/* Dãy biểu tượng mạng xã hội (7 icons chuẩn xác theo mẫu) */}
            <div className="flex items-center gap-3.5 pt-2 text-slate-400">
              {/* 1. Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-white transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* 2. LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-white transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                </svg>
              </a>

              {/* 3. TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="hover:text-white transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.86-4.48V8.71a8.29 8.29 0 0 0 4.91 1.63v-3.65z" />
                </svg>
              </a>

              {/* 4. YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-white transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* 5. X (Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="hover:text-white transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* 6. Reddit */}
              <a
                href="https://reddit.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reddit"
                className="hover:text-white transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.703zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
              </a>

              {/* 7. Zalo */}
              <a
                href="https://zalo.me/2871243904030074512"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo"
                className="hover:text-white transition-colors"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                  <path
                    d="M9 8h6l-5.5 8H16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Cột 2: Dịch vụ của chúng tôi (Chấm đỏ •) */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-base font-bold text-white mb-4 sm:mb-5">
              Dịch vụ của chúng tôi
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-slate-300">
              {servicesList.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-red-500 font-bold text-base leading-none select-none">•</span>
                  <a
                    href="https://dudisoftware.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Khám phá (Chấm xanh •) */}
          <div className="lg:col-span-2 text-left">
            <h4 className="text-base font-bold text-white mb-4 sm:mb-5">
              Khám phá
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-slate-300">
              {exploreList.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-blue-500 font-bold text-base leading-none select-none">•</span>
                  <a
                    href="https://dudisoftware.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4: Liên hệ (Badge tròn icon) */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-base font-bold text-white mb-4 sm:mb-5">
              Liên hệ
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-[13px] text-slate-300">
              {/* Địa chỉ 1 */}
              <li className="flex items-start gap-3">
                <div className="h-7 w-7 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 shrink-0 mt-0.5">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span className="leading-snug">
                  232 Đường Nguyễn Thị Minh Khai, phường Xuân Hòa, TP.Hồ Chí Minh
                </span>
              </li>

              {/* Địa chỉ 2 */}
              <li className="flex items-start gap-3">
                <div className="h-7 w-7 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 shrink-0 mt-0.5">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span className="leading-snug">
                  49/2 Đường 14, Phường Thủ Đức, TP.Hồ Chí Minh
                </span>
              </li>

              {/* Số điện thoại */}
              <li className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 shrink-0">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <a
                  href="tel:0909163821"
                  className="hover:text-white transition-colors font-medium"
                >
                  (+84) 909 163 821
                </a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 shrink-0">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <a
                  href="mailto:contact@dudisoftware.com"
                  className="hover:text-white transition-colors font-medium"
                >
                  contact@dudisoftware.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Links & Scroll-to-top */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2023 DUDI Software. Bảo lưu mọi quyền.</p>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3 text-slate-400">
              <a
                href="https://www.dudisoftware.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Điều khoản dịch vụ
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="https://www.dudisoftware.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Chính sách bảo mật
              </a>
            </div>

            {/* Nút cuộn lên đầu trang */}
            <button
              onClick={scrollToTop}
              aria-label="Cuộn lên đầu trang"
              className="h-8 w-8 rounded-full bg-[#131B2E] hover:bg-[#1C2740] border border-slate-700/60 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
