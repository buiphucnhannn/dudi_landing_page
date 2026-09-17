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
 * Ensures URL stays clean WITHOUT appending `#hash` to the browser address bar
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
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    
    // Header height calculation: clamped to prevent mobile drawer expansion skewing the offset
    const header = document.querySelector("header");
    let navHeight = isMobile ? 56 : 64;
    if (header) {
      const rect = header.getBoundingClientRect();
      navHeight = Math.min(rect.height, isMobile ? 58 : 68);
    }

    // Scroll accurately to align the section start right under the fixed navbar
    // The section's internal padding (py-8/py-10/py-12) provides the perfect framing for the heading
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const targetScrollTop = Math.max(0, Math.round(elementPosition - navHeight));

    window.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });

    // Clean URL: Do NOT add `#hash` to the address bar.
    if (typeof window !== "undefined" && window.history && window.history.replaceState && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }
}
