"use client";

export function ContactButton({
  label = "Liên Hệ Ngay",
  onClick,
  className = "",
  size = "md",
}) {
  const sizeClasses = {
    sm: "px-6 py-2.5 text-xs",
    md: "px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base",
    lg: "px-10 py-4 sm:px-12 sm:py-4.5 text-sm sm:text-base",
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    const target = document.getElementById("form-tu-van");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`contact-button font-kanit font-medium uppercase tracking-widest text-white cursor-pointer select-none inline-flex items-center justify-center ${
        sizeClasses[size] || sizeClasses.md
      } ${className}`}
    >
      <span>{label}</span>
    </button>
  );
}
