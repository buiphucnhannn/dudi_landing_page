import React from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  titlePart1,
  titlePart2,
  description,
  align = "center",
  className,
}) {
  const isCenter = align === "center";

  // Smart division into 2 parts: Color 1 (Sky Blue/Cyan) + Color 2 (Hot Pink to Crimson Red)
  let p1 = titlePart1;
  let p2 = titlePart2;

  if (!p1 && !p2 && typeof title === "string") {
    if (title.includes(" — ")) {
      const parts = title.split(" — ");
      p1 = parts[0].trim();
      p2 = parts.slice(1).join(" — ").trim();
    } else if (title.includes(" - ")) {
      const parts = title.split(" - ");
      p1 = parts[0].trim();
      p2 = parts.slice(1).join(" - ").trim();
    } else {
      const words = title.trim().split(/\s+/);
      if (words.length > 2) {
        const mid = Math.ceil(words.length / 2);
        p1 = words.slice(0, mid).join(" ");
        p2 = words.slice(mid).join(" ");
      } else {
        p1 = title;
        p2 = "";
      }
    }
  }

  const content = (
    <>
      <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(56,189,248,0.25)]">
        {p1}
      </span>
      {p2 ? (
        <span className="block mt-1 sm:mt-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(244,63,94,0.25)]">
          {p2}
        </span>
      ) : null}
    </>
  );

  return (
    <div
      className={cn(
        "max-w-3xl mb-8 sm:mb-12",
        isCenter ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-[1.24] drop-shadow-[0_2px_16px_rgba(244,63,94,0.15)]">
        {content}
      </h2>
      {/* Decorative colorful accent line matching the 2 colors */}
      <div
        className="mt-3.5 h-[3.5px] rounded-full bg-gradient-to-r from-sky-400 via-purple-500 to-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)]"
        style={{
          width: "80px",
          marginLeft: isCenter ? "auto" : "0",
          marginRight: isCenter ? "auto" : undefined,
        }}
      />
      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed text-balance max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
