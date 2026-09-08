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

      {/* 4. Left Cosmic Asset: Speed Craft — centered vertically in Hero Screen 1 */}
      <div className="absolute top-[24vh] sm:top-[26vh] lg:top-[28vh] -left-24 sm:-left-10 lg:-left-4 xl:left-4 w-52 h-52 sm:w-72 sm:h-72 lg:w-[340px] lg:h-[340px] pointer-events-none animate-tilt-float opacity-45">
        <div className="absolute inset-8 rounded-full bg-cyan-600/15 blur-3xl -z-10" />
        <div
          className="relative w-full h-full mix-blend-screen"
          style={{
            maskImage: "radial-gradient(circle at 55% 45%, black 40%, transparent 68%)",
            WebkitMaskImage: "radial-gradient(circle at 55% 45%, black 40%, transparent 68%)",
          }}
        >
          <Image
            src="/images/speed-rocket.jpg"
            alt="DUDI Speed Technology"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 1280px) 288px, 340px"
          />
        </div>
      </div>

      {/* 5. Right Cosmic Asset: Celestial Planet — centered vertically in Hero Screen 1 */}
      <div className="absolute top-[22vh] sm:top-[24vh] lg:top-[26vh] -right-20 sm:-right-8 lg:-right-2 xl:right-6 w-56 h-56 sm:w-76 sm:h-76 lg:w-[360px] lg:h-[360px] pointer-events-none animate-float opacity-50">
        <div className="absolute inset-8 rounded-full bg-red-600/18 blur-3xl -z-10" />
        <div
          className="relative w-full h-full mix-blend-screen"
          style={{
            maskImage: "radial-gradient(circle at center, black 38%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 38%, transparent 70%)",
          }}
        >
          <Image
            src="/images/cyber-planet.jpg"
            alt="DUDI Celestial Planet"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1280px) 304px, 360px"
          />
        </div>

        {/* Orbit Ring — subtle, thin */}
        <div
          style={{ animation: "spin 40s linear infinite" }}
          className="absolute -inset-5 rounded-full border border-dashed border-cyan-400/15"
        />
        <div
          style={{ animation: "spin 32s linear infinite reverse" }}
          className="absolute -inset-12 rounded-full border border-red-500/12"
        />
      </div>

      {/* 6. Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#060A14] via-[#060A14]/60 to-transparent" />
    </div>
  );
}
