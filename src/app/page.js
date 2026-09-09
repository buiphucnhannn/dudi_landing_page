"use client";

import { useState } from "react";
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

        <SectionDivider />

        {/* S06 - Quy trình 6 bước rõ ràng */}
        <Process />

        <SectionDivider />

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
    </div>
  );
}
