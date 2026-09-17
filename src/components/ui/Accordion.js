"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccordionCard({ question, answer, isOpenDefault = false }) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div
      className={cn(
        "rounded-xl sm:rounded-2xl border transition-all duration-300 backdrop-blur-xl group overflow-hidden",
        isOpen
          ? "border-[#FF6500] bg-white shadow-md shadow-orange-500/5"
          : "border-[#FFE4D6] bg-white hover:border-orange-300 shadow-xs"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-3 sm:gap-4 p-4 sm:p-4.5 text-left transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "text-sm sm:text-[15px] font-semibold transition-colors",
            isOpen ? "text-[#FF6500]" : "text-slate-800 group-hover:text-[#FF6500]"
          )}
        >
          {question}
        </span>
        <div
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300",
            isOpen
              ? "bg-[#FF6500] text-white rotate-45 scale-105"
              : "text-[#FF6500] bg-orange-100/80 group-hover:bg-[#FF6500] group-hover:text-white group-hover:scale-110"
          )}
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
        </div>
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out text-slate-600 text-xs sm:text-sm leading-relaxed",
          isOpen
            ? "grid-rows-[1fr] opacity-100 px-4 sm:px-4.5 pb-4 pt-0"
            : "grid-rows-[0fr] opacity-0 px-4 sm:px-4.5 pb-0 pt-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[#FFE4D6] pt-3 text-slate-600 leading-relaxed text-justify">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items = [] }) {
  const half = Math.ceil(items.length / 2);
  const col1 = items.slice(0, half);
  const col2 = items.slice(half);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
      <div className="flex flex-col gap-3 sm:gap-4">
        {col1.map((item, index) => (
          <AccordionCard
            key={`col1-${index}`}
            question={item.question}
            answer={item.answer}
            isOpenDefault={false}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        {col2.map((item, index) => (
          <AccordionCard
            key={`col2-${index}`}
            question={item.question}
            answer={item.answer}
            isOpenDefault={false}
          />
        ))}
      </div>
    </div>
  );
}
