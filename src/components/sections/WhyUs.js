import {
  FileCheck2,
  BadgeDollarSign,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { whyUsContent } from "@/constants/landing-content";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

const whyUsIcons = [
  FileCheck2,
  BadgeDollarSign,
  ShieldCheck,
  UserCheck,
];

export function WhyUs() {
  return (
    <section id="vi-sao-chon-dudi" className="pt-10 pb-10 sm:pt-12 sm:pb-12 bg-transparent relative scroll-mt-6 sm:scroll-mt-8">
      <Container>
        <RevealOnScroll duration={1200}>
          <SectionHeading
            titlePart1="Vì Sao Doanh Nghiệp Chọn"
            titlePart2="Đồng Hành Cùng DUDI?"
            description="Sự rõ ràng và trách nhiệm kỹ thuật là ưu tiên hàng đầu trong mọi dự án chúng tôi tiếp nhận."
            action={{
              label: "Xem quy trình làm việc",
              href: "#quy-trinh",
            }}
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {whyUsContent.map((item, idx) => {
            const IconComp = whyUsIcons[idx] || ShieldCheck;

            return (
              <RevealOnScroll
                key={idx}
                delay={idx * 110}
                duration={1300}
                className="h-full flex flex-col"
              >
                <div
                  className={`h-full flex-1 flex flex-col p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-700/60 bg-white dark:bg-[#0D1527]/85 text-slate-900 dark:text-slate-100 card-glow-hover cursor-pointer backdrop-blur-xl group transition-all duration-300 hover:border-red-500/80 hover:-translate-y-2 shadow-lg shadow-slate-200/50 dark:shadow-xl dark:shadow-black/40 hover:shadow-xl hover:shadow-red-500/10 dark:hover:shadow-red-950/40 ${
                    idx % 2 === 0 ? "sm:animate-float" : "sm:animate-float-delayed"
                  }`}
                >
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-red-50 dark:bg-slate-800/80 text-red-600 dark:text-red-400 border border-red-100 dark:border-slate-700/60 group-hover:bg-red-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mb-4 shadow-sm">
                    <IconComp className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors text-balance">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                    {item.desc}
                  </p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
