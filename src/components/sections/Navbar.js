"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, Menu, X, ExternalLink } from "lucide-react";
import { siteConfig } from "@/constants/site-config";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/Button";
import { ZaloIcon } from "@/components/ui/ZaloIcon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { trackEvent } from "@/lib/tracking";
import { cn, scrollToSection } from "@/lib/utils";

export function Navbar() {
  const { isScrolled } = useScrollPosition(20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCtaClick = (e, label, position) => {
    trackEvent("cta_click", { label, position, target: "#form-tu-van" });
    scrollToSection(e, "#form-tu-van");
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
          ? "bg-white/90 dark:bg-[#070B18]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-md shadow-slate-200/50 dark:shadow-black/30 py-2.5"
          : "bg-white/80 dark:bg-[#070B18]/75 backdrop-blur-sm py-3 border-b border-slate-200/40 dark:border-white/5"
      )}
    >
      <Container className="flex items-center justify-between">
        {/* 1. Left: Brand Logo Only (clean, modern, uncluttered) */}
        <div className="flex items-center justify-start lg:flex-1">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center group cursor-pointer"
            title={siteConfig.name}
            aria-label={siteConfig.name}
          >
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-red-500/20 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/dudi/dudisoftware1.webp"
                alt={siteConfig.name}
                fill
                priority
                className="object-contain"
                sizes="44px"
              />
            </div>
          </Link>
        </div>

        {/* 2. Center: Desktop Navigation (Dead-center horizontal alignment & balanced spacing) */}
        <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-shrink-0">
          {siteConfig.navItems.map((item) =>
            item.isExternal ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-slate-800/70 hover:bg-red-50 dark:hover:bg-red-950/30 border border-slate-200/70 dark:border-slate-700/70 group"
                title="Đến website chính DUDI Software"
              >
                <span>{item.label}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer py-1"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* 3. Right: Only Light/Dark Mode & Nút Liên hệ (Evenly aligned) */}
        <div className="hidden md:flex items-center justify-end gap-3 lg:flex-1">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Main CTA */}
          <a
            href="#form-tu-van"
            onClick={(e) => handleCtaClick(e, "Liên hệ", "navbar")}
          >
            <Button
              variant="dudiGradient"
              size="sm"
              className="glow-red cursor-pointer h-9 px-4 text-xs sm:text-sm font-bold shadow-md shadow-red-500/20"
            >
              <span>Liên hệ</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </a>
        </div>

        {/* Mobile Actions: ThemeToggle + CTA + Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
          <ThemeToggle className="h-9 w-9" />

          <a
            href="#form-tu-van"
            onClick={(e) => handleCtaClick(e, "Liên hệ", "navbar_mobile")}
          >
            <Button variant="dudiGradient" size="sm" className="px-3 py-1.5 text-xs font-bold cursor-pointer h-9">
              Liên hệ
            </Button>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-9 w-9 flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-red-500" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[60px] bg-black/60 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden relative z-50 border-b border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-[#0B132B]/98 backdrop-blur-2xl px-5 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            {siteConfig.navItems.map((item) =>
              item.isExternal ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 py-2.5 px-2 rounded-lg bg-red-50/70 dark:bg-red-950/25 hover:bg-red-100/70 dark:hover:bg-red-900/30 cursor-pointer flex items-center justify-between transition-colors mt-1"
                >
                  <span className="flex items-center gap-2">
                    <span>{item.label}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-medium">
                      Web chính
                    </span>
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    scrollToSection(e, item.href);
                  }}
                  className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 py-2.5 px-2 rounded-lg hover:bg-slate-100/70 dark:hover:bg-white/5 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                </a>
              )
            )}

            <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between py-1 px-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Hotline hỗ trợ:</span>
                <a
                  href={siteConfig.hotlineTel}
                  className="text-sm font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.hotline}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={siteConfig.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    handleZaloClick("navbar_drawer");
                    setMobileMenuOpen(false);
                  }}
                >
                  <Button variant="outlineZalo" className="w-full text-[#0068FF] dark:text-blue-400 border-blue-500/50 hover:border-[#0068FF] bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 gap-1.5 cursor-pointer text-xs py-2.5">
                    <ZaloIcon className="h-4 w-4" />
                    Zalo Chat
                  </Button>
                </a>
                <a
                  href="#form-tu-van"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleCtaClick(e, "Liên hệ", "navbar_drawer");
                  }}
                >
                  <Button variant="dudiGradient" className="w-full cursor-pointer text-xs py-2.5">
                    Liên hệ ngay
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
