import React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children, hoverEffect = true, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-700/60 bg-[#0D1527]/85 backdrop-blur-xl p-6 shadow-xl shadow-black/40 text-slate-100 transition-all duration-300",
        hoverEffect && "card-glow-hover cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3
      className={cn("text-xl font-bold tracking-tight text-white", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p
      className={cn("text-sm text-slate-300 leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }) {
  return <div className={cn("pt-2", className)} {...props}>{children}</div>;
}
