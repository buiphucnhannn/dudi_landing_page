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
    <section className="py-12 sm:py-16 bg-transparent relative">
      <Container>
        <RevealOnScroll duration={1200}>
          <SectionHeading
            titlePart1="Vì Sao Doanh Nghiệp Chọn"
            titlePart2="Đồng Hành Cùng DUDI?"
            description="Sự rõ ràng và trách nhiệm kỹ thuật là ưu tiên hàng đầu trong mọi dự án chúng tôi tiếp nhận."
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
                  className={`h-full flex-1 flex flex-col p-6 rounded-2xl border border-slate-700/60 bg-[#0D1527]/85 text-slate-100 card-glow-hover cursor-pointer backdrop-blur-xl group transition-all duration-300 hover:border-red-500/80 hover:-translate-y-2 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-red-950/40 ${
                    idx % 2 === 0 ? "sm:animate-float" : "sm:animate-float-delayed"
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 text-red-400 border border-slate-700/60 group-hover:bg-red-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mb-4 shadow-sm">
                    <IconComp className="h-6 w-6" />
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors text-balance">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed text-balance">
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
