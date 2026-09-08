"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccordionItem({ question, answer, isOpenDefault = false }) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="border-b border-slate-800 last:border-none py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left text-base font-bold text-white transition-colors hover:text-red-400 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300",
            isOpen && "rotate-180 text-red-400"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out text-slate-300 text-sm leading-relaxed",
          isOpen ? "grid-rows-[1fr] opacity-100 pt-3" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">{answer}</div>
      </div>
    </div>
  );
}

export function Accordion({ items = [] }) {
  return (
    <div className="w-full divide-y divide-slate-800 rounded-2xl border border-slate-700/60 bg-[#0D1527]/85 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-black/40">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpenDefault={index === 0}
        />
      ))}
    </div>
  );
}
