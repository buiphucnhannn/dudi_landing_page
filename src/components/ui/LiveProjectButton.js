"use client";

export function LiveProjectButton({
  label = "Live Project",
  href,
  onClick,
  className = "",
}) {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      const target = document.getElementById("form-tu-van");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`live-project-button font-kanit font-medium text-xs sm:text-sm md:text-base px-6 py-2 sm:px-8 sm:py-3 cursor-pointer select-none inline-flex items-center justify-center ${className}`}
    >
      <span>{label}</span>
    </button>
  );
}
