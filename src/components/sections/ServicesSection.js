"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const SERVICES_DATA = [
  {
    number: "01",
    name: "Tối Ưu Tốc Độ & Core Web Vitals",
    desc: "Tối ưu nén ảnh WebP/AVIF, tinh gọn mã nguồn JS/CSS và kích hoạt bộ nhớ đệm, đưa điểm tốc độ di động từ dưới 40 lên vùng xanh an toàn 80–95+.",
  },
  {
    number: "02",
    name: "Sửa Lỗi Giao Diện Mobile (Responsive)",
    desc: "Khắc phục triệt để lỗi tràn khung ngang, chữ nhảy dòng sai, nút bấm đè nhau và mất tương tác trên mọi dòng smartphone hiện nay.",
  },
  {
    number: "03",
    name: "Tái Cấu Trúc UI/UX & Tối Ưu Chuyển Đổi",
    desc: "Thiết kế lại bố cục trang chủ, danh mục dịch vụ và form liên hệ chuẩn hành vi khách hàng, tăng tỷ lệ bấm gọi hotline và điền form.",
  },
  {
    number: "04",
    name: "Tích Hợp Tiện Ích & Tự Động Hóa",
    desc: "Bổ sung nút Zalo/Hotline nổi, tích hợp Form đẩy dữ liệu tự động về Google Sheets / Email / CRM, cài đặt mã theo dõi Google Ads & Facebook Pixel.",
  },
  {
    number: "05",
    name: "Bảo Trì, Vá Lỗi & Dọn Dẹp Mã Nguồn",
    desc: "Gỡ bỏ plugin thừa gây nặng web, diệt mã độc tiềm ẩn, cập nhật nền tảng CMS và bàn giao tài liệu hướng dẫn quản trị rõ ràng.",
  },
];

export function ServicesSection() {
  return (
    <section className="relative w-full bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-10 overflow-hidden">
      {/* Services Heading */}
      <div className="text-center mb-16 sm:mb-20 md:mb-28">
        <FadeIn delay={0} y={20} duration={0.6}>
          <span className="inline-block font-kanit font-medium text-xs uppercase tracking-[0.35em] text-[#0C0C0C]/40 border border-[#0C0C0C]/20 rounded-full px-5 py-2 mb-5">
            Dịch Vụ Của DUDI
          </span>
        </FadeIn>
        <FadeIn delay={0.1} y={40} duration={0.8}>
          <h2 className="font-kanit font-black uppercase leading-none tracking-tight text-[#0C0C0C] text-[clamp(3rem,12vw,160px)]">
            SERVICES
          </h2>
        </FadeIn>
      </div>

      {/* Services List */}
      <div className="max-w-5xl mx-auto divide-y divide-[#0C0C0C]/15 border-t border-b border-[#0C0C0C]/15">
        {SERVICES_DATA.map((service, idx) => (
          <FadeIn key={service.number} delay={idx * 0.1} y={30} duration={0.7}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-10 py-8 sm:py-10 md:py-12 group hover:bg-black/[0.02] transition-colors px-2 sm:px-4 cursor-default">
              {/* Big Number */}
              <div className="shrink-0 font-kanit font-black leading-none text-[#0C0C0C] text-[clamp(3rem,10vw,140px)] select-none opacity-15 group-hover:opacity-100 group-hover:text-red-600 transition-all duration-300">
                {service.number}
              </div>

              {/* Name & Desc */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-kanit font-semibold uppercase text-[clamp(1.15rem,2.2vw,2.1rem)] text-[#0C0C0C] tracking-tight group-hover:text-red-600 transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="mt-2.5 font-kanit font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] text-[#0C0C0C]/60">
                  {service.desc}
                </p>
              </div>

              {/* Arrow indicator */}
              <div className="hidden sm:flex shrink-0 w-10 h-10 items-center justify-center rounded-full border border-[#0C0C0C]/20 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white text-[#0C0C0C]/40 transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
