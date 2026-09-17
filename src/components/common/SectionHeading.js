import React from "react";
import { ArrowRight } from "lucide-react";
import { cn, scrollToSection } from "@/lib/utils";
import { ZaloIcon } from "@/components/ui/ZaloIcon";

export function SectionHeading({
  title,
  titlePart1,
  titlePart2,
  description,
  align = "left",
  className,
  showBorder = true,
  action, // { label: string, href: string, onClick?: () => void, external?: boolean }
  breakLine = false,
}) {
  const isCenter = align === "center";

  // Smart division into 2 parts: Color 1 (Pure White) + Color 2 (Vivid Red)
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
      if (words.length > 3) {
        const mid = Math.ceil(words.length * 0.6);
        p1 = words.slice(0, mid).join(" ");
        p2 = words.slice(mid).join(" ");
      } else {
        p1 = title;
        p2 = "";
      }
    }
  }

  return (
    <div
      className={cn(
        "mb-6 sm:mb-8",
        showBorder && "pb-3.5 border-b border-[#FFE4D6]",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col sm:flex-row sm:items-start justify-between gap-4",
          isCenter ? "text-center" : "text-left"
        )}
      >
        <div className="flex-1 min-w-0 max-w-4xl xl:max-w-5xl">
          <h2 className="text-[23px] sm:text-[28px] lg:text-[32px] xl:text-[35px] font-black tracking-tight text-slate-900 leading-[1.25]">
            <span className={breakLine && p2 ? "block" : "inline"}>
              {p1}{!breakLine || !p2 ? " " : ""}
            </span>
            {p2 ? (
              <span
                className={cn(
                  "bg-gradient-to-r from-[#FF2B14] via-[#FF6800] to-[#FFA000] bg-clip-text text-transparent",
                  breakLine ? "block mt-1 sm:mt-1.5" : "inline sm:whitespace-nowrap"
                )}
              >
                {p2}
              </span>
            ) : null}
          </h2>

          {description && (
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed text-justify">
              {description}
            </p>
          )}
        </div>

        {action && (
          <div className="shrink-0 pt-1 sm:pt-2">
            <a
              href={action.href}
              onClick={(e) => {
                if (action.onClick) {
                  action.onClick(e);
                }
                if (action.href && action.href.startsWith("#") && !action.external) {
                  scrollToSection(action.href, e);
                }
              }}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#FF6500] hover:text-[#E52E20] transition-colors group cursor-pointer"
            >
              {action.label && action.label.toLowerCase().includes("zalo") && (
                <ZaloIcon className="h-4 w-4 shrink-0" />
              )}
              <span>{action.label}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
