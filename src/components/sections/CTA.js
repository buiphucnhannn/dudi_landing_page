import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ctaData } from "@/constants/landing-data";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="py-20 relative">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 px-6 py-16 sm:px-12 sm:py-20 text-center text-white shadow-2xl">
          {/* Ambient light effects */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-white/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              {ctaData.title}
            </h2>

            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
              {ctaData.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={ctaData.buttonHref} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-indigo-700 hover:bg-slate-100 shadow-xl font-bold"
                >
                  {ctaData.buttonLabel}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={ctaData.secondaryButtonHref} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10"
                >
                  {ctaData.secondaryButtonLabel}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
