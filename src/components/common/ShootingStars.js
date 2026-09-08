"use client";

import React, { useMemo } from "react";

export function ShootingStars() {
  // Generate random trajectories for shooting stars (meteors)
  const meteors = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      top: `${Math.floor(Math.random() * 85)}%`,
      left: `${Math.floor(Math.random() * 95)}%`,
      delay: `${(i * 1.8 + Math.random() * 2).toFixed(1)}s`,
      duration: `${(2.2 + Math.random() * 2.5).toFixed(1)}s`,
      size: Math.random() > 0.6 ? "w-[180px]" : "w-[120px]",
    }));
  }, []);

  // Floating ambient dust / embers
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: `${Math.floor(Math.random() * 100)}%`,
      left: `${Math.floor(Math.random() * 100)}%`,
      size: `${Math.floor(Math.random() * 3 + 2)}px`,
      delay: `${(i * 0.7).toFixed(1)}s`,
      duration: `${(4 + Math.random() * 4).toFixed(1)}s`,
      opacity: (0.2 + Math.random() * 0.4).toFixed(2),
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Dynamic Animated Shooting Stars (Sao băng rơi) */}
      <div className="absolute inset-0">
        {meteors.map((m) => (
          <span
            key={m.id}
            className={`absolute h-[1.5px] ${m.size} rotate-[-35deg] rounded-full bg-gradient-to-r from-transparent via-red-400/80 to-white shadow-[0_0_12px_#ef4444] animate-meteor`}
            style={{
              top: m.top,
              left: m.left,
              animationDelay: m.delay,
              animationDuration: m.duration,
            }}
          >
            {/* Bright head of meteor */}
            <span className="absolute right-0 top-1/2 -translate-y-1/2 h-[3px] w-[3px] rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
          </span>
        ))}
      </div>

      {/* Floating ambient embers / particle glow */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-red-400/70 shadow-[0_0_6px_#f43f5e] animate-float"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
}
