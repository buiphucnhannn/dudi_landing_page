import { cn } from "@/lib/utils";

export function ZaloIcon({ className = "h-4 w-4", ...props }) {
  return (
    <img
      src="/images/zalo-icon.webp"
      alt="Zalo"
      width={32}
      height={32}
      className={cn("shrink-0 object-contain inline-block select-none pointer-events-none", className)}
      loading="eager"
      decoding="async"
      {...props}
    />
  );
}
