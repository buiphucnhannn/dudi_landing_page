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
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-cosmic-bg.svg"
          alt="DUDI Cosmic Space Background"
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
      </div>

      {/* 2. Twinkling Starlight Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-65 pointer-events-none"
      />

      {/* 3. Breathing Nebulas — asymmetric for depth */}
      <div className="absolute -top-24 left-[18%] -translate-x-1/2 w-[42rem] h-[32rem] rounded-full bg-gradient-to-tr from-red-600/20 via-rose-600/10 to-transparent blur-[140px] animate-ambient-slow" />
      <div className="absolute top-16 right-[5%] w-[38rem] h-[30rem] rounded-full bg-gradient-to-bl from-blue-600/15 via-indigo-600/8 to-transparent blur-[140px] animate-ambient-delayed" />

      {/* 4. Left Hero Mascot: DUDI Flying Hero (Cứu hộ & Tăng tốc website) */}
      <div 
        style={{ left: "clamp(16px, calc(25vw - 330px), 220px)" }}
        className="absolute top-[22vh] sm:top-[24vh] lg:top-[25vh] w-44 h-44 sm:w-60 sm:h-60 lg:w-[285px] lg:h-[285px] xl:w-[320px] xl:h-[320px] pointer-events-none animate-tilt-float opacity-35 sm:opacity-80 lg:opacity-95 transition-all duration-700"
      >
        {/* Glowing Speed Thruster Trail */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-red-600/30 via-rose-500/20 to-cyan-400/20 blur-3xl -z-10 animate-pulse" />
        
        {/* Mascot Image */}
        <div className="relative w-full h-full drop-shadow-[0_15px_35px_rgba(239,68,68,0.4)]">
          <Image
            src="/images/mascot-hero-flying.webp"
            alt="Linh vật DUDI bay cứu hộ website"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 240px, (max-width: 1280px) 285px, 320px"
          />
        </div>
      </div>

      {/* 5. Right Hero Mascot: DUDI Tech Inspector (Khảo sát & Kiểm tra website) */}
      <div 
        style={{ right: "clamp(16px, calc(25vw - 330px), 220px)" }}
        className="absolute top-[22vh] sm:top-[24vh] lg:top-[25vh] w-44 h-44 sm:w-60 sm:h-60 lg:w-[285px] lg:h-[285px] xl:w-[320px] xl:h-[320px] pointer-events-none animate-float opacity-35 sm:opacity-80 lg:opacity-95 transition-all duration-700"
      >
        {/* Holographic Cyan Glow */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-l from-cyan-500/30 via-blue-600/20 to-red-600/15 blur-3xl -z-10 animate-pulse" />
        
        {/* Subtle Tech Orbit Rings */}
        <div
          style={{ animation: "spin 35s linear infinite" }}
          className="absolute -inset-4 rounded-full border border-dashed border-cyan-400/20 pointer-events-none"
        />
        <div
          style={{ animation: "spin 28s linear infinite reverse" }}
          className="absolute -inset-10 rounded-full border border-red-500/15 pointer-events-none"
        />

        {/* Mascot Image */}
        <div className="relative w-full h-full drop-shadow-[0_15px_35px_rgba(6,182,212,0.4)]">
          <Image
            src="/images/mascot-hero-tech.webp"
            alt="Linh vật DUDI kiểm tra website"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 240px, (max-width: 1280px) 285px, 320px"
          />
        </div>
      </div>

      {/* 6. Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#060A14] via-[#060A14]/60 to-transparent" />
    </div>
  );
}
