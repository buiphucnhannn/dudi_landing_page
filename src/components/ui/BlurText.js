"use client";

import React from "react";
import { motion } from "framer-motion";

export function BlurText({
  text = "",
  className = "",
  delay = 0,
  staggerDelay = 0.08,
  duration = 0.7,
}) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
      y: 35,
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className={`inline-flex flex-wrap justify-center items-center ${className}`}
      style={{ rowGap: "0.1em" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={wordVariants}
          className="inline-block"
          style={{ marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
