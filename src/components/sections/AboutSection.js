"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ContactButton } from "@/components/ui/ContactButton";

const STATS = [
  { value: "5+", label: "Năm Kinh Nghiệm" },
  { value: "50+", label: "Dự Án Hoàn Thành" },
  { value: "30", label: "Ngày Bảo Hành" },
  { value: "100%", label: "Báo Giá Minh Bạch" },
];

export function AboutSection() {
  const aboutParagraph =
    "DUDI Software chuyên cứu hộ và nâng cấp website doanh nghiệp — tối ưu tốc độ, sửa lỗi mobile, tái cấu trúc UI/UX và tối ưu chuyển đổi. Chúng tôi kiểm tra thực tế, báo rõ phạm vi và cam kết không phát sinh chi phí trước khi làm.";

  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-24 overflow-hidden"
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-red-900/10 blur-[160px] pointer-events-none" />

      {/* Top-left: Cyber planet */}
      <div className="absolute top-[2%] left-[0%] sm:left-[1%] md:left-[3%] z-0 pointer-events-none opacity-80">
        <FadeIn delay={0.1} x={-60} y={0} duration={1}>
          <div className="relative w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[200px] md:h-[200px] animate-float-slow">
            <Image
              src="/images/cyber-planet.webp"
              alt="Cyber Planet"
              fill
              className="object-contain rounded-full"
              sizes="200px"
            />
          </div>
        </FadeIn>
      </div>

      {/* Top-right: Speed Rocket */}
      <div className="absolute top-[2%] right-[0%] sm:right-[1%] md:right-[3%] z-0 pointer-events-none opacity-80">
        <FadeIn delay={0.15} x={60} y={0} duration={1}>
          <div className="relative w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[190px] md:h-[190px] animate-float">
            <Image
              src="/images/speed-rocket.webp"
              alt="Speed Rocket"
              fill
              className="object-contain"
              sizes="190px"
            />
          </div>
        </FadeIn>
      </div>

      {/* Bottom-left: DUDI showcase */}
      <div className="absolute bottom-[5%] left-[2%] sm:left-[4%] md:left-[6%] z-0 pointer-events-none opacity-60">
        <FadeIn delay={0.25} x={-60} y={0} duration={1}>
          <div className="relative w-[80px] h-[56px] sm:w-[120px] sm:h-[80px] md:w-[160px] md:h-[108px] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/dudi/dudisoftware1.webp"
              alt="DUDI Project"
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        </FadeIn>
      </div>

      {/* Bottom-right: DUDI showcase */}
      <div className="absolute bottom-[5%] right-[2%] sm:right-[4%] md:right-[6%] z-0 pointer-events-none opacity-60">
        <FadeIn delay={0.3} x={60} y={0} duration={1}>
          <div className="relative w-[80px] h-[56px] sm:w-[120px] sm:h-[80px] md:w-[160px] md:h-[108px] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/dudi/dudisoftware2.webp"
              alt="DUDI Project 2"
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        </FadeIn>
      </div>

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl text-center">
        {/* Heading */}
        <FadeIn delay={0} y={40} duration={0.8}>
          <h2 className="hero-heading font-kanit font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">
            ABOUT US
          </h2>
        </FadeIn>

        {/* Stats row */}
        <FadeIn delay={0.2} y={30} duration={0.7}>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 mt-10 sm:mt-12">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="font-kanit font-black text-3xl sm:text-4xl md:text-5xl text-white">
                  {stat.value}
                </span>
                <span className="font-kanit font-light text-xs sm:text-sm text-[#D7E2EA]/60 uppercase tracking-widest mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Animated Paragraph */}
        <div className="mt-10 sm:mt-14 max-w-[600px]">
          <AnimatedText
            text={aboutParagraph}
            className="text-[#D7E2EA] font-kanit font-medium leading-relaxed text-[clamp(1rem,2vw,1.35rem)]"
          />
        </div>

        {/* Contact Button */}
        <div className="mt-14 sm:mt-20">
          <FadeIn delay={0.4} y={30}>
            <ContactButton label="Liên Hệ Với DUDI" size="lg" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
