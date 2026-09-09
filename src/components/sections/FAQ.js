import { faqContent } from "@/constants/landing-content";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";

export function FAQ() {
  return (
    <section id="faq" className="pt-10 pb-10 sm:pt-12 sm:pb-12 bg-transparent relative scroll-mt-6 sm:scroll-mt-8">
      <Container className="max-w-6xl">
        <RevealOnScroll duration={1200}>
          <SectionHeading
            titlePart1="Câu hỏi"
            titlePart2="thường gặp"
            description="Nếu bạn có bất kỳ câu hỏi nào khác chưa được liệt kê dưới đây, hãy liên hệ ngay với DUDI qua Hotline hoặc Zalo."
            action={{
              label: "Chat Zalo để được hỗ trợ",
              href: "https://zalo.me/2871243904030074512",
              external: true,
            }}
            breakLine={false}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={150} duration={1300}>
          <Accordion items={faqContent} />
        </RevealOnScroll>
      </Container>
    </section>
  );
}
