"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { Solutions } from "@/components/sections/Solutions";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { WhyUs } from "@/components/sections/WhyUs";
import { FAQ } from "@/components/sections/FAQ";
import { LeadForm } from "@/components/sections/LeadForm";
import { Footer } from "@/components/sections/Footer";
import { AmbientBackground } from "@/components/common/AmbientBackground";
import { FloatingWidgets } from "@/components/common/FloatingWidgets";
import { scrollToSection } from "@/lib/utils";

function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <span className="dot" />
    </div>
  );
}

export default function LandingPage() {
  const [selectedPackage, setSelectedPackage] = useState("Chưa rõ");

  const handleSelectPackage = (packageName) => {
    setSelectedPackage(packageName);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // If page was loaded with a hash (e.g. /#dau-hieu), cleanly frame it and strip the hash
      if (window.location.hash) {
        const hash = window.location.hash;
        setTimeout(() => {
          scrollToSection(hash);
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }, 150);
      }

      const handleHashChange = () => {
        if (window.location.hash) {
          const hash = window.location.hash;
          scrollToSection(hash);
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      };

      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-dudi-gradient-mesh text-slate-100 selection:bg-red-600 selection:text-white transition-colors duration-300">
      {/* Soft Ambient Background Orbs & Subtle Grid */}
      <AmbientBackground />

      {/* S01 - Header / Navbar */}
      <Navbar />

      <main className="relative z-10 flex-1">
        {/* S02 - Hero Section */}
        <Hero />

        <SectionDivider />

        {/* S03 - 6 Dấu hiệu cần nâng cấp */}
        <Problems />

        <SectionDivider />

        {/* S04 - 8 Giải pháp DUDI */}
        <Solutions />

        <SectionDivider />

        {/* S05 - Case thực tế trung thực */}
        <CaseStudies />

        {/* S06 - Quy trình 6 bước rõ ràng (Full-width Anamorphic Mountain Banner) */}
        <Process />

        {/* S07 - Bảng giá 3 gói (GIÁ/GÓI) */}
        <Pricing onSelectPackage={handleSelectPackage} />

        <SectionDivider />

        {/* S08 - Vì sao chọn DUDI */}
        <WhyUs />

        <SectionDivider />

        {/* S10 - FAQ 8 câu hỏi cốt lõi */}
        <FAQ />

        <SectionDivider />

        {/* S11 - Form nhận yêu cầu thu Lead */}
        <LeadForm selectedPackage={selectedPackage} />
      </main>

      {/* S13 - Footer thông tin pháp lý DUDI */}
      <Footer />

      {/* Floating Quick Action Widgets: Scroll to Top, Phone & Zalo */}
      <FloatingWidgets />
    </div>
  );
}
