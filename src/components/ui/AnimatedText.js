"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Character({ char, progress, range }) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0">{char === " " ? "\u00A0" : char}</span>
      <motion.span
        style={{ opacity }}
        className="absolute top-0 left-0"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </span>
  );
}

export function AnimatedText({
  text,
  className = "",
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });

  const characters = text.split("");
  const total = characters.length;

  return (
    <p
      ref={containerRef}
      className={`relative select-none flex flex-wrap justify-center ${className}`}
    >
      {characters.map((char, index) => {
        const start = index / total;
        const end = start + 1 / total;

        return (
          <Character
            key={index}
            char={char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
}
