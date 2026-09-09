"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className, ...props }) {
  const { theme, toggleTheme, mounted } = useTheme();

  // Until mounted, render a placeholder with fixed dimensions to avoid hydration layout shift
  if (!mounted) {
    return (
      <button
        aria-label="Đổi giao diện Sáng / Tối"
        className={cn(
          "h-9 w-9 rounded-xl flex items-center justify-center border border-slate-700/60 bg-slate-800/40 text-slate-400 opacity-60 cursor-pointer",
          className
        )}
        disabled
        {...props}
      >
        <span className="h-4 w-4 block" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
      title={isDark ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
      className={cn(
        "relative h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer group select-none",
        isDark
          ? "border border-slate-700/80 bg-slate-900/80 text-amber-400 hover:bg-slate-800 hover:border-amber-500/50 hover:shadow-md hover:shadow-amber-500/20"
          : "border border-slate-200 bg-white text-slate-700 hover:bg-rose-50/80 hover:text-red-600 hover:border-red-300 shadow-xs hover:shadow-md hover:shadow-red-500/15",
        className
      )}
      {...props}
    >
      <div className="relative h-4 w-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="h-4 w-4 transition-transform duration-500 rotate-0 scale-100 group-hover:rotate-90 group-hover:scale-110" />
        ) : (
          <Moon className="h-4 w-4 transition-transform duration-500 -rotate-12 scale-100 group-hover:rotate-0 group-hover:scale-110" />
        )}
      </div>
    </button>
  );
}
