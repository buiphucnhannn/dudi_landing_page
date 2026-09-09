import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes safely with clsx
 * @param  {...any} inputs - Class names, conditions, or arrays
 * @returns {string} Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Smoothly scrolls to a target section with optimal framing under the fixed navbar
 * Supports both scrollToSection(href, e) and scrollToSection(e, href)
 */
export function scrollToSection(arg1, arg2) {
  let href = typeof arg1 === "string" ? arg1 : "";
  let e = arg2;

  if (arg1 && typeof arg1.preventDefault === "function") {
    e = arg1;
    href = typeof arg2 === "string" ? arg2 : "";
  }

  if (e && typeof e.preventDefault === "function") {
    e.preventDefault();
  }
  if (!href) return;

  const targetId = href.startsWith("#") ? href.slice(1) : href;
  if (typeof document === "undefined") return;

  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    // Dynamic framing: measures exact navbar height + comfortable breathing clearance
    // ensures section title, badges, or top wave are 100% visible and beautifully framed
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const navHeader = document.querySelector("header");
    const navHeight = navHeader ? navHeader.getBoundingClientRect().height : (isMobile ? 64 : 72);
    const extraPadding = isMobile ? 14 : 22;
    const totalOffset = navHeight + extraPadding;

    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const targetScrollTop = Math.max(0, elementPosition - totalOffset);

    window.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });

    if (typeof window !== "undefined" && window.history && window.history.pushState) {
      window.history.pushState(null, "", `#${targetId}`);
    }
  }
}
