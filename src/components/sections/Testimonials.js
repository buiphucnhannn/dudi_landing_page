import { Star } from "lucide-react";
import { testimonialsData } from "@/constants/landing-data";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/Card";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 relative overflow-hidden">
      <Container>
        <SectionHeading
          title="Những Câu Chuyện Thành Công Cùng DUDI"
          description="Hơn 1.000 doanh nghiệp và chuyên gia đã bứt phá hiệu quả kinh doanh cùng chúng tôi."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item, index) => (
            <Card key={index} className="flex flex-col justify-between p-8">
              <div>
                {/* 5-Star Rating */}
                <div className="flex gap-1 text-amber-400 mb-6">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-base text-slate-700 dark:text-slate-300 italic leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-500/20"
                />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    {item.author}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {item.role}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
