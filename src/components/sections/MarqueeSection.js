"use client";

import { useEffect, useRef, useState } from "react";

const GIF_IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

const ROW_1_IMAGES = [...GIF_IMAGES.slice(0, 11), ...GIF_IMAGES.slice(0, 11), ...GIF_IMAGES.slice(0, 11)];
const ROW_2_IMAGES = [...GIF_IMAGES.slice(11), ...GIF_IMAGES.slice(11), ...GIF_IMAGES.slice(11)];

export function MarqueeSection() {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setOffset(calculatedOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-slate-50/50 dark:bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-14 select-none border-y border-slate-200/80 dark:border-transparent transition-colors"
    >
      {/* Section label */}
      <div className="text-center mb-10 sm:mb-14">
        <span className="inline-block font-kanit font-medium text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-[#D7E2EA]/40 border border-slate-300 dark:border-[#D7E2EA]/15 rounded-full px-5 py-2">
          ✦ Chất Lượng Được Chứng Minh Bằng Kết Quả ✦
        </span>
      </div>

      {/* Row 1: Moves RIGHT on scroll */}
      <div
        className="flex gap-3 will-change-transform"
        style={{
          transform: `translateX(${offset - 200}px)`,
          transition: "transform 0.1s linear",
        }}
      >
        {ROW_1_IMAGES.map((url, idx) => (
          <div
            key={`row1-${idx}`}
            className="w-[300px] h-[190px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[268px] shrink-0 rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#161616] relative border border-slate-200 dark:border-white/8 hover:border-red-500/50 transition-colors shadow-sm"
          >
            <img
              src={url}
              alt={`Website showcase ${idx + 1}`}
              loading="lazy"
              className="w-full h-full object-cover opacity-90 dark:opacity-85 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>

      {/* Row 2: Moves LEFT on scroll */}
      <div
        className="flex gap-3 mt-3 will-change-transform"
        style={{
          transform: `translateX(${-(offset - 200)}px)`,
          transition: "transform 0.1s linear",
        }}
      >
        {ROW_2_IMAGES.map((url, idx) => (
          <div
            key={`row2-${idx}`}
            className="w-[300px] h-[190px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[268px] shrink-0 rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#161616] relative border border-slate-200 dark:border-white/8 hover:border-red-500/50 transition-colors shadow-sm"
          >
            <img
              src={url}
              alt={`Website showcase ${idx + 12}`}
              loading="lazy"
              className="w-full h-full object-cover opacity-90 dark:opacity-85 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
