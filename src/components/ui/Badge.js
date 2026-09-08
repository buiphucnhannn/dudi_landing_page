import React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default:
    "bg-slate-800/80 text-slate-300 border-slate-700",
  dudiRed:
    "bg-red-950/80 text-red-300 border-red-800/70 shadow-xs",
  success:
    "bg-emerald-950/80 text-emerald-300 border-emerald-800/70",
  blue:
    "bg-blue-950/80 text-blue-300 border-blue-800/70",
  warning:
    "bg-amber-950/80 text-amber-300 border-amber-800/70",
  outline:
    "bg-transparent text-slate-300 border-slate-700",
};

export function Badge({ children, variant = "dudiRed", className, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-colors",
        badgeVariants[variant] || badgeVariants.dudiRed,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
