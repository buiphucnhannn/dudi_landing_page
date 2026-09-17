"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  RotateCw,
  Globe,
  ShieldCheck,
  Users,
  Rocket,
  ShoppingCart,
  Search,
  Wrench,
} from "lucide-react";
import { siteConfig, ECOSYSTEM_SERVICES } from "@/constants/site-config";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/Button";
import { ZaloIcon } from "@/components/ui/ZaloIcon";
import { trackEvent } from "@/lib/tracking";
import { cn, scrollToSection } from "@/lib/utils";

const ICON_MAP = {
  RotateCw,
  Globe,
  ShieldCheck,
  Users,
  Rocket,
  ShoppingCart,
  Search,
  Wrench,
};

export function Navbar() {
  const { isScrolled } = useScrollPosition(20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesDropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 180);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target)
      ) {
        setServicesOpen(false);
      }
    };

    if (servicesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [servicesOpen]);

  const handleCtaClick = (e, label, position) => {
    trackEvent("cta_click", { label, position, target: "#form-tu-van" });
    scrollToSection(e, "#form-tu-van");
  };

  const handleZaloClick = (position) => {
    trackEvent("zalo_click", { position, page_path: window.location.pathname });
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setServicesOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#FFE4D6] shadow-sm py-2 sm:py-2.5"
          : "bg-transparent border-b border-transparent py-2.5 sm:py-3.5"
      )}
    >
      <Container className="relative flex items-center justify-between">
        {/* 1. Left: Brand Logo - Dịch nhẹ qua phải để căn thẳng hàng với tiêu đề Hero bên dưới */}
        <div className="flex items-center self-center justify-start lg:flex-1 transform translate-x-2 sm:translate-x-3 lg:translate-x-5 xl:translate-x-6">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center group cursor-pointer"
            aria-label={siteConfig.name}
          >
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-xl overflow-hidden shadow-xs hover:shadow-md border border-red-500/20 bg-white flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
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

        {/* 2. Center: Desktop Navigation - Đúng 5 mục chuẩn + Mục thứ 6 "Dịch vụ khác" kèm Mega Dropdown */}
        <nav
          className="hidden md:flex items-center gap-5 lg:gap-6 xl:gap-7 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-label="Menu chính"
        >
          {siteConfig.navItems.map((item) =>
            item.isExternal ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13.5px] xl:text-[14px] font-bold tracking-tight text-slate-800 hover:text-[#FF6500] transition-colors cursor-pointer py-1.5 whitespace-nowrap"
              >
                {item.label}
              </a>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-[13.5px] xl:text-[14px] font-bold tracking-tight text-slate-800 hover:text-[#FF6500] transition-colors cursor-pointer py-1.5 whitespace-nowrap"
              >
                {item.label}
              </a>
            )
          )}

          {/* Mục thứ 6: "Dịch vụ khác" Dropdown Trigger & Panel chuẩn y hệt LP5 */}
          <div
            className="relative py-1.5"
            ref={servicesDropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              className={`inline-flex items-center gap-1 text-[13.5px] xl:text-[14px] font-bold transition-colors duration-150 py-1 cursor-pointer bg-transparent border-0 whitespace-nowrap ${
                servicesOpen
                  ? "text-[#FF6500] font-black"
                  : "text-slate-800 hover:text-[#FF6500]"
              }`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              <span>Dịch vụ khác</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  servicesOpen ? "rotate-180 text-[#FF6500]" : "text-slate-500"
                }`}
              />
            </button>

            {/* Mega Menu Dropdown Panel chuẩn theo LP5 */}
            {servicesOpen && (
              <div
                className="absolute top-full pt-2 right-[-140px] sm:right-[-180px] lg:right-[-220px] xl:right-[-240px] z-50 pointer-events-auto"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="w-[720px] xl:w-[750px] bg-white rounded-2xl sm:rounded-3xl pt-4 pb-3.5 px-6 sm:px-7 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.18)] border border-orange-100/90 animate-in fade-in zoom-in-95 duration-150">
                  {/* Ecosystem Title Header */}
                  <div className="flex items-center justify-center gap-2 mb-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block shadow-xs shadow-emerald-400"></span>
                    <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-slate-800 select-none">
                      HỆ SINH THÁI DỊCH VỤ DUDI
                    </span>
                  </div>

                  {/* 2-Column Grid of 8 Services */}
                  <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-1 sm:gap-y-1.5">
                    {ECOSYSTEM_SERVICES.map((item) => {
                      const Icon = ICON_MAP[item.icon] || Globe;
                      return (
                        <a
                          key={item.id}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setServicesOpen(false)}
                          className="flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-orange-50/80 transition-all duration-150 group cursor-pointer"
                        >
                          <div className="w-[34px] h-[34px] rounded-xl bg-slate-100/90 group-hover:bg-orange-100/80 flex items-center justify-center text-slate-600 group-hover:text-[#FF6500] shrink-0 transition-colors duration-150">
                            <Icon className="w-4 h-4 stroke-[1.8]" />
                          </div>
                          <div className="flex flex-col flex-1 min-w-0 pr-1">
                            <span className="text-[12.5px] sm:text-[13px] font-bold text-slate-900 group-hover:text-[#E52E20] transition-colors leading-snug whitespace-nowrap">
                              {item.title}
                            </span>
                            <span className="text-[10.5px] sm:text-[11px] text-slate-500 leading-tight mt-0.5 whitespace-nowrap">
                              {item.description}
                            </span>
                          </div>
                          <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover:text-[#FF6500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-auto" />
                        </a>
                      );
                    })}
                  </div>

                  {/* Bottom Footer Bar */}
                  <div className="pt-2.5 mt-3 border-t border-slate-100/90 flex items-center justify-between text-[11px] sm:text-xs">
                    <span className="text-slate-500 font-normal">
                      Cần tư vấn giải pháp phù hợp doanh nghiệp?
                    </span>
                    <a
                      href="tel:0909163821"
                      className="text-[#E52E20] hover:text-[#FF5500] font-bold tracking-tight transition-colors flex items-center gap-1"
                    >
                      <span>Hotline: 0909 163 821</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* 3. Right: Nút Kiểm tra website miễn phí */}
        <div className="hidden md:flex items-center justify-end gap-3 lg:flex-1">
          <a
            href="#form-tu-van"
            onClick={(e) => handleCtaClick(e, "Kiểm tra website miễn phí", "navbar")}
          >
            <button
              type="button"
              className="group inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 text-xs sm:text-[13px] font-extrabold text-white bg-gradient-to-r from-[#FF3823] via-[#FF5500] to-[#FF6B00] rounded-full shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
            >
              <span>Kiểm tra website miễn phí</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </a>
        </div>

        {/* Mobile Actions: CTA + Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="#form-tu-van"
            onClick={(e) => handleCtaClick(e, "Kiểm tra ngay", "navbar_mobile")}
          >
            <button
              type="button"
              className="px-3.5 py-1.5 text-xs font-extrabold text-white bg-gradient-to-r from-[#FF3823] via-[#FF5500] to-[#FF6B00] rounded-full shadow-xs cursor-pointer"
            >
              Kiểm tra ngay
            </button>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-9 w-9 flex items-center justify-center rounded-xl text-slate-700 border border-slate-200 bg-slate-50 hover:bg-slate-100 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-[#FF6500]" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[60px] bg-black/40 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden relative z-50 border-b border-[#FFE4D6] bg-white/98 backdrop-blur-2xl px-5 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-70px)] overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {siteConfig.navItems.map((item) =>
              item.isExternal ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold text-slate-800 hover:text-[#E52E20] py-2.5 px-2 rounded-lg hover:bg-orange-50/70 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                </a>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (e && e.preventDefault) e.preventDefault();
                    setMobileMenuOpen(false);
                    setTimeout(() => {
                      scrollToSection(item.href);
                    }, 50);
                  }}
                  className="text-sm font-bold text-slate-800 hover:text-[#E52E20] py-2.5 px-2 rounded-lg hover:bg-orange-50/70 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                </a>
              )
            )}

            {/* Mobile "Dịch vụ khác" Accordion */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full py-2.5 px-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-orange-50/70 hover:text-[#E52E20] transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                  <span>Dịch vụ khác</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 text-slate-500 ${
                    mobileServicesOpen ? "rotate-180 text-[#FF5500]" : ""
                  }`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="px-1 pt-1.5 pb-2 space-y-1 bg-orange-50/60 rounded-xl mt-1">
                  {ECOSYSTEM_SERVICES.map((item) => {
                    const Icon = ICON_MAP[item.icon] || Globe;
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          setMobileServicesOpen(false);
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#E52E20] hover:bg-white transition-colors"
                      >
                        <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-slate-600 shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate">{item.title}</span>
                        <ArrowUpRight className="w-3 h-3 text-slate-400 ml-auto shrink-0" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-3 mt-2 border-t border-[#FFE4D6] flex flex-col gap-3">
              <div className="flex items-center justify-between py-1 px-2">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Hotline hỗ trợ:</span>
                <a
                  href={siteConfig.hotlineTel}
                  className="text-sm font-bold text-[#FF6500] flex items-center gap-1.5"
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
                  <Button variant="outlineZalo" className="w-full text-[#0068FF] border-blue-500/50 hover:border-[#0068FF] bg-blue-50 hover:bg-blue-100 gap-1.5 cursor-pointer text-xs py-2.5">
                    <ZaloIcon className="h-4 w-4" />
                    Zalo Chat
                  </Button>
                </a>
                <a
                  href="#form-tu-van"
                  onClick={(e) => {
                    if (e && e.preventDefault) e.preventDefault();
                    setMobileMenuOpen(false);
                    setTimeout(() => {
                      handleCtaClick(e, "Liên hệ", "navbar_drawer");
                    }, 50);
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
