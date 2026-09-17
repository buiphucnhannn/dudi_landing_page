"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function HeroBackground() {
  const canvasRef = useRef(null);

  // Dynamic twinkling cosmic stars canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight * 2);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight * 2;
    };

    window.addEventListener("resize", handleResize);

    // Generate twinkling cosmic stars
    const starCount = 100;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.012 + 0.004,
      color: Math.random() > 0.5 ? "#ffffff" : Math.random() > 0.5 ? "#FCA5A5" : "#93C5FD",
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 0.95 || star.alpha < 0.15) {
          star.speed = -star.speed;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.08, Math.min(1, star.alpha));
        ctx.shadowBlur = star.radius * 3;
        ctx.shadowColor = star.color;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* 1. Cosmic Universe SVG Wallpaper */}
      <div className="hero-cosmic-bg absolute inset-0 w-full h-full opacity-25 transition-opacity duration-500">
        <Image
          src="/images/hero-cosmic-bg.svg"
          alt="DUDI Cosmic Space Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* 2. Twinkling Starlight Canvas */}
      <canvas
        ref={canvasRef}
        className="hero-starlight-canvas absolute inset-0 w-full h-full opacity-40 transition-opacity duration-500 pointer-events-none"
      />

      {/* 4. Left Hero Mascot: DUDI Flying Hero (Cứu hộ & Tăng tốc website) — Desktop Flank */}
      <div 
        style={{ left: "clamp(16px, calc(25vw - 330px), 220px)" }}
        className="hidden sm:block absolute top-[24vh] lg:top-[25vh] sm:w-60 sm:h-60 lg:w-[285px] lg:h-[285px] xl:w-[320px] xl:h-[320px] pointer-events-none animate-tilt-float opacity-90 transition-all duration-700"
      >
        {/* Mascot Image */}
        <div className="relative w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)]">
          <Image
            src="/dudi/dudi_mascot_left_hero_section.webp"
            alt="Linh vật DUDI bay cứu hộ website"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 240px, (max-width: 1280px) 285px, 320px"
          />
        </div>
      </div>

      {/* 5. Right Hero Mascot: DUDI Tech Inspector (Khảo sát & Kiểm tra website) — Desktop Flank */}
      <div 
        style={{ right: "clamp(16px, calc(25vw - 330px), 220px)" }}
        className="hidden sm:block absolute top-[24vh] lg:top-[25vh] sm:w-60 sm:h-60 lg:w-[285px] lg:h-[285px] xl:w-[320px] xl:h-[320px] pointer-events-none animate-float opacity-90 transition-all duration-700"
      >
        {/* Mascot Image */}
        <div className="relative w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)]">
          <Image
            src="/images/mascot-hero-tech-v2.webp"
            alt="Linh vật DUDI kiểm tra website"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 240px, (max-width: 1280px) 285px, 320px"
          />
        </div>
      </div>

      {/* 6. Bottom fade */}
      <div className="hero-bottom-fade absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#FFF9F5] via-[#FFF9F5]/70 to-transparent transition-colors duration-500" />
    </div>
  );
}
