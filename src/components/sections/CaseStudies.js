import { CheckCircle2, ShieldCheck, ExternalLink, Briefcase } from "lucide-react";
import { caseStudiesContent } from "@/constants/landing-content";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

export function CaseStudies() {
  return (
    <section id="case-thuc-te" className="py-12 sm:py-16 bg-transparent relative">
      <Container>
        <RevealOnScroll duration={1200}>
          <SectionHeading
            titlePart1="Được Khách Hàng Tin Tưởng"
            titlePart2="Và Lựa Chọn Nghiệm Thu"
            description="DUDI chỉ công bố các dữ liệu thực tế đã được xác minh, không thổi phồng số liệu hay phóng đại kết quả."
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudiesContent.map((item, idx) => (
            <RevealOnScroll
              key={item.id}
              delay={idx * 160}
              duration={1300}
              className="h-full flex flex-col"
            >
              <Card
                className="h-full flex flex-col justify-between p-7 sm:p-9 border-slate-700/60 bg-[#0D1527]/85 text-slate-100 hover:border-red-500/80 hover:shadow-2xl hover:shadow-red-950/40 transition-all backdrop-blur-xl shadow-xl shadow-black/40"
              >
                <div>
                  {/* Header of case */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/80 text-slate-300 border border-slate-700/60">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{item.client}</h3>
                        <span className="text-xs text-slate-400 font-medium">Hợp đồng thực hiện</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                        Chi phí trọn gói
                      </span>
                      <span className="text-xl font-bold text-red-400">
                        {item.budget}
                      </span>
                    </div>
                  </div>

                  {/* Status tag */}
                  <div className="mt-5">
                    <Badge variant="success" className="gap-1.5 py-1 px-3 bg-emerald-950/80 text-emerald-300 border-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {item.tag}
                    </Badge>
                  </div>

                  {/* Summary */}
                  <p className="mt-4 text-base font-medium text-slate-200 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Status Detail Note */}
                  <div className="mt-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed italic">
                    <strong className="text-white">Hiện trạng:</strong> {item.statusDetail}
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="mt-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-white mb-3 block">
                      Đầu việc đã bàn giao:
                    </span>
                    <ul className="space-y-2.5 text-sm text-slate-300">
                      {item.deliverables.map((deliv, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-slate-400" />
                    Bảo hành kỹ thuật 30 ngày
                  </span>
                  <span className="font-mono text-slate-400">Nghiệm thu chuẩn DUDI</span>
                </div>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
