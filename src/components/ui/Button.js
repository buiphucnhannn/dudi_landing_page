import React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  primary:
    "bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-600/30 active:scale-[0.98] border border-red-500/40",
  dudiGradient:
    "bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white hover:from-red-700 hover:to-rose-800 shadow-lg shadow-red-600/30 active:scale-[0.98] border border-red-400/40",
  secondary:
    "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-[0.98] border border-slate-300 dark:border-slate-700",
  outline:
    "border border-slate-300 dark:border-slate-700 hover:border-red-500 bg-white dark:bg-slate-900/60 hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-white shadow-xs",
  outlineRed:
    "border-2 border-red-500 bg-red-50/50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600",
  ghost:
    "bg-transparent hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white",
  zalo:
    "bg-[#0068FF] text-white hover:bg-[#0052cc] border border-blue-400/30 shadow-md shadow-blue-600/30 active:scale-[0.98]",
  outlineZalo:
    "border border-blue-500/50 hover:border-[#0068FF] bg-blue-50/50 dark:bg-blue-950/25 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-[#0068FF] dark:text-blue-300 hover:text-[#0052cc] dark:hover:text-white shadow-xs hover:shadow-[0_0_20px_rgba(0,104,255,0.25)]",
};

const buttonSizes = {
  sm: "px-3.5 py-1.5 text-xs font-semibold rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-sm font-semibold rounded-xl gap-2",
  lg: "px-7 py-3.5 text-base font-bold rounded-xl gap-2.5",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none",
        buttonVariants[variant] || buttonVariants.primary,
        buttonSizes[size] || buttonSizes.md,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
