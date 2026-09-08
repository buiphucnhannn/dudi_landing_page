import { faqContent } from "@/constants/landing-content";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

export function FAQ() {
  return (
    <section id="faq" className="py-12 sm:py-16 bg-transparent relative">
      <Container className="max-w-5xl">
        <RevealOnScroll duration={1200}>
          <SectionHeading
            titlePart1="Giải Đáp Thắc Mắc"
            titlePart2="Về Dịch Vụ Nâng Cấp Web"
            description="Nếu bạn có bất kỳ câu hỏi nào khác chưa được liệt kê dưới đây, hãy liên hệ ngay với DUDI qua Hotline hoặc Zalo."
          />
        </RevealOnScroll>

        <RevealOnScroll delay={150} duration={1300}>
          <Accordion items={faqContent} />
        </RevealOnScroll>
      </Container>
    </section>
  );
}
