import React from "react";
import { cn } from "@/lib/utils";

/**
 * Standard container component to keep layout width consistent across all sections
 */
export function Container({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl xl:max-w-[1380px] 2xl:max-w-[1560px] px-4 sm:px-6 lg:px-8 2xl:px-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
