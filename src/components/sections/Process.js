import { processStepsContent } from "@/constants/landing-content";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

export function Process() {
  return (
    <section id="quy-trinh" className="py-12 sm:py-16 bg-transparent relative">
      <Container>
        <RevealOnScroll duration={1200}>
          <SectionHeading
            title="Minh Bạch Từng Giai Đoạn — Chốt Phạm Vi Trước Khi Làm"
            description="Khách hàng nắm rõ DUDI sẽ làm gì, cần chuẩn bị những gì và kết quả bàn giao sau từng bước."
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {processStepsContent.map((step, idx) => {
            const isScopeStep = step.step === "03";
            // Zigzag reveal: alternate left/right per row
            const directions = ["left", "up", "right"];
            const dir = directions[idx % 3];

            return (
              <RevealOnScroll
                key={step.step}
                delay={(idx % 3) * 130}
                duration={1300}
                direction={dir}
                className="h-full flex flex-col"
              >
                <div
                  className={`relative flex-1 flex flex-col justify-between rounded-2xl p-6 sm:p-7 transition-all backdrop-blur-xl card-tilt-hover cursor-pointer shadow-xl shadow-black/40 ${
                    isScopeStep
                      ? "border-2 border-red-500 shadow-2xl shadow-red-950/60 ring-1 ring-red-500/40 bg-gradient-to-b from-red-950/40 via-[#0D1527]/95 to-[#0D1527]/95 text-white"
                      : "border border-slate-700/60 bg-[#0D1527]/85 text-slate-100 hover:border-slate-500"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-mono font-black px-2.5 py-1 rounded-lg ${
                          isScopeStep
                            ? "bg-red-600 text-white shadow-xs"
                            : "bg-slate-800/80 text-slate-300 border border-slate-700/60"
                        }`}
                      >
                        BƯỚC {step.step}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {step.subtitle}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white leading-snug text-balance">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm text-slate-300 leading-relaxed text-balance">
                      {step.description}
                    </p>
                  </div>

                  {isScopeStep && (
                    <div className="mt-4 pt-3 border-t border-red-900/60 text-xs font-semibold text-red-400">
                      ★ Cam kết không phát sinh bất kỳ chi phí nào sau bước này
                    </div>
                  )}
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
