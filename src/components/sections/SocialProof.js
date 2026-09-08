import { partnersData } from "@/constants/landing-data";
import { Container } from "@/components/common/Container";

export function SocialProof() {
  return (
    <section className="py-12 border-y border-slate-200/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-8">
          Được tin tưởng và đồng hành bởi các thương hiệu tiên phong
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-75">
          {partnersData.map((partner) => (
            <div
              key={partner.name}
              className="font-black text-xl sm:text-2xl text-slate-400 dark:text-slate-600 tracking-wider hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
            >
              {partner.logoText}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
