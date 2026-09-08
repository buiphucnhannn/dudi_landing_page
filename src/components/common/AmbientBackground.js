"use client";

import React from "react";

export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* 1. Subtle Cyber Tech Grid — animated drift */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 65% at 50% 35%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 35%, black 20%, transparent 80%)",
          animation: "grid-drift 55s linear infinite",
        }}
      />

      {/* 2. Large ambient nebula orbs — organic, asymmetric placement */}
      {/* Top-left warm crimson */}
      <div
        className="absolute -top-32 -left-20 w-[650px] h-[450px] rounded-full bg-red-600/12 blur-[120px] animate-ambient-slow"
      />

      {/* Top-right cool indigo */}
      <div
        className="absolute top-20 -right-16 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[140px] animate-ambient-delayed"
      />

      {/* Mid-left warm rose — offset to break symmetry */}
      <div
        className="absolute top-[38%] -left-12 w-[520px] h-[520px] rounded-full bg-rose-700/8 blur-[140px] animate-ambient-slow"
        style={{ animationDelay: "3s" }}
      />

      {/* Mid-right teal accent — breaks the red-blue monotony */}
      <div
        className="absolute top-[50%] -right-10 w-[400px] h-[400px] rounded-full bg-teal-700/6 blur-[130px] animate-ambient-delayed"
        style={{ animationDelay: "5s" }}
      />

      {/* Lower deep sapphire */}
      <div
        className="absolute top-[68%] -right-8 w-[580px] h-[580px] rounded-full bg-blue-900/12 blur-[150px] animate-ambient-delayed"
        style={{ animationDelay: "2s" }}
      />

      {/* Bottom warm — asymmetric offset */}
      <div
        className="absolute -bottom-24 left-[15%] w-[600px] h-[350px] rounded-full bg-red-600/8 blur-[130px] animate-ambient-slow"
        style={{ animationDelay: "4s" }}
      />

      {/* Small accent sparkle orbs for depth */}
      <div
        className="absolute top-[25%] left-[70%] w-[180px] h-[180px] rounded-full bg-amber-500/5 blur-[80px] animate-float"
      />
      <div
        className="absolute top-[75%] left-[20%] w-[150px] h-[150px] rounded-full bg-cyan-500/5 blur-[70px] animate-float-delayed"
      />
    </div>
  );
}
