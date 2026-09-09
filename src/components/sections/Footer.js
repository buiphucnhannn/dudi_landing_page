"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/constants/site-config";
import { Container } from "@/components/common/Container";
import { ZaloIcon } from "@/components/ui/ZaloIcon";
import { scrollToSection } from "@/lib/utils";

export function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#050811] text-slate-600 dark:text-slate-300 py-12 transition-colors">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-8">
          {/* Cột 1: Logo & Thông tin pháp nhân */}
          <div className="w-full md:w-[38%] lg:w-[36%] max-w-md space-y-4">
            <Link
              href="/"
              onClick={scrollToTop}
              className="inline-flex items-center gap-3 group mb-2 cursor-pointer"
            >
              <div className="relative h-10 w-10 rounded-lg overflow-hidden shadow-md border border-red-500/30 flex-shrink-0 transition-transform group-hover:scale-105">
                <Image
                  src={siteConfig.logoUrl}
                  alt={siteConfig.companyName}
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <div className="flex flex-col leading-none">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-lg tracking-wider text-slate-900 dark:text-white">
                    DUDI
                  </span>
                  <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-red-600 to-rose-500 dark:from-red-500 dark:to-rose-400 bg-clip-text text-transparent">
                    SOFTWARE
                  </span>
                </div>
                <span className="text-[10px] tracking-widest text-slate-500 dark:text-slate-400 uppercase font-semibold mt-0.5">
                  Cứu Hộ & Nâng Cấp Web
                </span>
              </div>
            </Link>

            <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
              {siteConfig.companyName}
            </h4>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Mã số thuế (MST): <strong className="text-slate-900 dark:text-white font-mono">{siteConfig.taxId}</strong>
            </p>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-md text-justify">
              Chuyên cung cấp dịch vụ cập nhật, sửa lỗi và nâng cấp website doanh nghiệp trọn gói. Khảo sát kỹ thuật miễn phí, báo giá trước minh bạch và bảo hành lỗi 30 ngày.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Pháp nhân hợp pháp — Sẵn sàng xuất hóa đơn VAT</span>
            </div>
          </div>

          {/* Cột 2: Danh mục liên kết nhanh (Căn giữa cân đối) */}
          <div className="w-full md:w-auto shrink-0">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Nội dung chính
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              {siteConfig.navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => scrollToSection(item.href, e)}
                    className="hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#form-tu-van"
                  onClick={(e) => scrollToSection("#form-tu-van", e)}
                  className="hover:text-red-700 dark:hover:text-red-400 transition-colors text-red-600 dark:text-red-400 font-semibold cursor-pointer"
                >
                  Gửi website kiểm tra
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Thông tin liên hệ trực tiếp (Căn sát lề phải container) */}
          <div className="w-full md:w-auto shrink-0">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Thông tin liên hệ
            </h4>
            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-red-600 dark:text-red-500 mt-0.5" />
                <span className="leading-relaxed">{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-red-600 dark:text-red-500" />
                <a href={siteConfig.hotlineTel} className="text-slate-900 dark:text-white font-bold hover:text-red-600 dark:hover:text-red-400">
                  {siteConfig.hotline}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <ZaloIcon className="h-4 w-4 shrink-0" />
                <a
                  href={siteConfig.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0068FF] dark:hover:text-blue-400"
                >
                  Zalo Chat DUDI (0909 163 821)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-red-600 dark:text-red-500" />
                <a href={siteConfig.emailMailto} className="hover:text-red-600 dark:hover:text-red-400">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-center text-xs text-slate-500 gap-3 text-center">
          <p>© {new Date().getFullYear()} {siteConfig.companyName}. MST: {siteConfig.taxId}. Tất cả các quyền được bảo lưu.</p>
        </div>
      </Container>
    </footer>
  );
}
