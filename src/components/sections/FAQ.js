import { faqContent } from "@/constants/landing-content";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-[58px] sm:scroll-mt-[68px] lg:scroll-mt-[72px] py-8 sm:py-10 lg:py-12 bg-transparent relative">
      <Container className="max-w-6xl">
        <ScrollReveal variant="fade-up" duration={900}>
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
        </ScrollReveal>

        <ScrollReveal variant="card-3d" delay={150} duration={850}>
          <Accordion items={faqContent} />
        </ScrollReveal>
      </Container>
    </section>
  );
}
