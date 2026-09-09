import {
  Gauge,
  Smartphone,
  LayoutDashboard,
  FileEdit,
  MailWarning,
  TrendingDown,
  ArrowDown,
} from "lucide-react";
import { problemsContent } from "@/constants/landing-content";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

const problemIconMap = {
  Gauge,
  Smartphone,
  LayoutDashboard,
  FileEdit,
  MailWarning,
  TrendingDown,
};

export function Problems() {
  return (
    <section id="dau-hieu" className="pt-10 pb-9 sm:pt-12 sm:pb-11 bg-transparent relative scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28">
      <Container>
        <RevealOnScroll duration={1200}>
          <SectionHeading
            title="Website Của Bạn Có Đang Gặp Phải — 6 Vấn Đề Này?"
            description="Đừng để những lỗi kỹ thuật âm thầm làm giảm uy tín thương hiệu và đánh mất khách hàng tiềm năng mỗi ngày."
            action={{
              label: "Xem giải pháp DUDI",
              href: "#giai-phap",
            }}
          />
        </RevealOnScroll>

        {/* Infinite Horizontal Marquee Track for 6 Problem Cards */}
      </Container>

      <div className="relative w-full overflow-hidden pt-1 pb-0">
        {/* Scrolling Marquee Track - PAUSES ON HOVER */}
        <div className="flex gap-6 animate-marquee-reverse pt-1 pb-1 hover:[animation-play-state:paused]">
          {[...problemsContent, ...problemsContent].map((item, idx) => {
            const IconComp = problemIconMap[item.icon] || Gauge;

            return (
              <div
                key={`${item.id}-${idx}`}
                className="w-[285px] sm:w-[325px] shrink-0 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0D1527]/85 border border-slate-200/90 dark:border-slate-700/60 hover:border-red-500/80 shadow-lg shadow-slate-200/50 dark:shadow-xl dark:shadow-black/40 hover:shadow-xl hover:shadow-red-500/10 dark:hover:shadow-red-950/40 backdrop-blur-xl transition-all duration-300 group cursor-pointer hover:-translate-y-2 min-h-[230px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 dark:bg-slate-800/80 text-red-600 dark:text-red-400 border border-red-100 dark:border-slate-700/60 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 px-2.5 py-0.5 rounded-full border border-red-200/80 dark:border-red-900/40">
                      0{(idx % 6) + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal text-justify">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

