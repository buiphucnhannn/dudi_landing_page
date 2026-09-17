"use client";

export function SectionDivider({ className = "" }) {
  return (
    <div
      className={`w-full h-4 my-3 sm:my-4 lg:my-5 flex items-center justify-center max-w-[280px] sm:max-w-[340px] mx-auto px-4 pointer-events-none select-none opacity-85 ${className}`}
      aria-hidden="true"
    >
      {/* Left fading line */}
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#FF9E54]/30 to-[#FF8A3D]/75" />

      {/* Center Diamond / Rhombus (SVG vector ensures complete top & bottom tips with 0 clipping) */}
      <svg
        viewBox="0 0 10 10"
        className="w-2 h-2 sm:w-2.5 sm:h-2.5 mx-2.5 sm:mx-3 shrink-0 fill-[#FF7A1A]"
      >
        <polygon points="5,0.8 9.2,5 5,9.2 0.8,5" />
      </svg>

      {/* Right fading line */}
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#FF9E54]/30 to-[#FF8A3D]/75" />
    </div>
  );
}

export default SectionDivider;
