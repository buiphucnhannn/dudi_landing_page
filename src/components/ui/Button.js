import React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  primary:
    "bg-gradient-to-r from-[#FF3B30] to-[#FF6500] hover:from-[#E52E20] hover:to-[#E55A00] text-white shadow-md shadow-orange-500/25 active:scale-[0.98] border border-orange-400/30",
  dudiGradient:
    "bg-gradient-to-r from-[#FF3823] via-[#FF6500] to-[#FF8A00] text-white hover:from-[#E52E20] hover:to-[#FF6500] shadow-lg shadow-orange-500/30 active:scale-[0.98] border border-orange-400/40",
  secondary:
    "bg-[#FFF0E6] text-slate-800 hover:bg-[#FFE5D4] active:scale-[0.98] border border-[#FFDEC9]",
  outline:
    "border border-[#FFDEC9] hover:border-[#FF7A00] bg-white hover:bg-[#FFF5EE] text-slate-800 hover:text-[#FF6500] shadow-xs",
  outlineRed:
    "border-2 border-[#FF6500] bg-orange-50/50 text-[#FF6500] hover:bg-[#FF6500] hover:text-white hover:border-[#FF6500]",
  ghost:
    "bg-transparent hover:bg-orange-50/80 text-slate-700 hover:text-[#FF6500]",
  zalo:
    "bg-[#0068FF] text-white hover:bg-[#0052cc] border border-blue-400/30 shadow-md shadow-blue-600/30 active:scale-[0.98]",
  outlineZalo:
    "border border-blue-500/50 hover:border-[#0068FF] bg-blue-50/50 hover:bg-blue-100 text-[#0068FF] hover:text-[#0052cc] shadow-xs hover:shadow-[0_0_20px_rgba(0,104,255,0.25)]",
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
