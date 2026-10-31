"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left";
  animateOnMount?: boolean;
};

export function FadeIn({
  children,
  delay = 0,
  className,
  direction = "up",
  animateOnMount = false,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const initialPosition =
    direction === "left" ? { x: -16, y: 0 } : { x: 0, y: 16 };
  const visibleState = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...initialPosition }}
      animate={animateOnMount ? visibleState : undefined}
      whileInView={animateOnMount ? undefined : visibleState}
      viewport={{ once: true }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: "easeOut", delay }
      }
    >
      {children}
    </motion.div>
  );
}
