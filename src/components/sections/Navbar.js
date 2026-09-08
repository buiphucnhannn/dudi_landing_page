"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, ArrowRight, Menu, X } from "lucide-react";
import { siteConfig } from "@/constants/site-config";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { isScrolled } = useScrollPosition(20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCtaClick = (label, position) => {
    trackEvent("cta_click", { label, position, target: "#form-tu-van" });
  };

  const handleZaloClick = (position) => {
    trackEvent("zalo_click", { position, page_path: window.location.pathname });
  };

  const handlePhoneClick = (position) => {
    trackEvent("phone_click", { position, page_path: window.location.pathname });
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#070B18]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30 py-2.5"
          : "bg-[#070B18]/75 backdrop-blur-sm py-4 border-b border-white/5"
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-lg overflow-hidden shadow-md border border-red-500/30 flex-shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/dudi/dudisoftware1.webp"
              alt={siteConfig.name}
              fill
              priority
              className="object-contain"
              sizes="40px"
            />
          </div>
          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-base sm:text-lg tracking-wider text-white group-hover:text-red-400 transition-colors">
                DUDI
              </span>
              <span className="font-bold text-base sm:text-lg tracking-wider bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
                SOFTWARE
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-widest text-slate-400 uppercase font-semibold mt-0.5">
              Cứu Hộ & Nâng Cấp Web
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {siteConfig.navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-red-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions & Contacts */}
        <div className="hidden md:flex items-center gap-3">
          {/* Hotline */}
          <a
            href={siteConfig.hotlineTel}
            onClick={() => handlePhoneClick("navbar")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-slate-800"
          >
            <Phone className="h-3.5 w-3.5 text-red-500" />
            <span>{siteConfig.hotline}</span>
          </a>

          {/* Zalo Button */}
          <a
            href={siteConfig.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleZaloClick("navbar")}
          >
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-blue-400 border-blue-500/40 bg-blue-950/20 hover:bg-blue-900/40"
            >
              <MessageCircle className="h-4 w-4 fill-blue-500 text-white" />
              <span>Zalo</span>
            </Button>
          </a>

          {/* Main CTA */}
          <a
            href="#form-tu-van"
            onClick={() => handleCtaClick("Liên hệ", "navbar")}
          >
            <Button variant="dudiGradient" size="sm" className="glow-red">
              <span>Liên hệ</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </a>
        </div>

        {/* Mobile Actions: CTA + Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="#form-tu-van"
            onClick={() => handleCtaClick("Liên hệ", "navbar_mobile")}
          >
            <Button variant="dudiGradient" size="sm" className="px-3 py-1.5 text-xs">
              Liên hệ
            </Button>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:bg-slate-800 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0B132B]/95 backdrop-blur-xl px-6 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4">
            {siteConfig.navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-200 hover:text-red-400"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Hotline hỗ trợ:</span>
                <a
                  href={siteConfig.hotlineTel}
                  className="text-sm font-bold text-red-400 flex items-center gap-1.5"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.hotline}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={siteConfig.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    handleZaloClick("navbar_drawer");
                    setMobileMenuOpen(false);
                  }}
                >
                  <Button variant="outline" className="w-full text-blue-400 border-blue-500/40 bg-blue-950/20 gap-1.5">
                    <MessageCircle className="h-4 w-4 fill-blue-500 text-white" />
                    Zalo Chat
                  </Button>
                </a>
                <a
                  href="#form-tu-van"
                  onClick={() => {
                    handleCtaClick("Liên hệ", "navbar_drawer");
                    setMobileMenuOpen(false);
                  }}
                >
                  <Button variant="dudiGradient" className="w-full">
                    Liên hệ
                  </Button>
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
