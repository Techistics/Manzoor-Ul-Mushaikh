"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { siteConfig } from "@/src/config/site";

const HERO_TINT = "bg-ink/25";
const HERO_TEXT_OVERLAY =
  "bg-gradient-to-b from-ink/80 via-ink/65 to-ink/55 lg:bg-gradient-to-r lg:from-ink/90 lg:via-ink/60 lg:via-[45%] lg:to-transparent lg:to-[65%]";
const HERO_TOP_OVERLAY = "h-[180px] bg-gradient-to-b from-ink/70 to-transparent";
const HERO_BOTTOM_OVERLAY =
  "h-[120px] bg-gradient-to-b from-transparent to-ink/50";

const contentVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate h-[clamp(700px,54.2vw,860px)] min-h-[640px] overflow-hidden"
    >
      <motion.div
        animate={shouldReduceMotion ? undefined : { scale: 1 }}
        className="absolute inset-0 motion-reduce:!transform-none"
        initial={shouldReduceMotion ? false : { scale: 1.08 }}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 1.6, ease: "easeOut" }
        }
      >
        <Image
          alt={siteConfig.images.heroAlt}
          className="object-cover object-[65%_50%] lg:object-[70%_40%]"
          fill
          fetchPriority="high"
          quality={80}
          sizes="100vw"
          src={siteConfig.images.hero}
        />
      </motion.div>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${HERO_TINT}`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${HERO_TEXT_OVERLAY}`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 ${HERO_TOP_OVERLAY}`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 ${HERO_BOTTOM_OVERLAY}`}
      />

      <Container className="relative z-10 flex h-full max-w-none items-start lg:items-center">
        <motion.div
          animate={shouldReduceMotion ? undefined : "visible"}
          className="mt-[132px] w-full max-w-[720px] lg:my-0 motion-reduce:!transform-none"
          initial={shouldReduceMotion ? false : "hidden"}
          variants={shouldReduceMotion ? undefined : contentVariants}
        >
          <motion.h1
            className="text-[clamp(36px,3.75vw,72px)] font-extrabold leading-[1.12] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] motion-reduce:!opacity-100 motion-reduce:!transform-none"
            id="hero-heading"
            variants={shouldReduceMotion ? undefined : itemVariants}
          >
            <br className="hidden lg:block" />A Doorway to the Remembrance of Allah
          </motion.h1>
          <motion.p
            className="mt-5 max-w-[440px] text-[15px] leading-[1.5] text-white/85 motion-reduce:!opacity-100 motion-reduce:!transform-none"
            variants={shouldReduceMotion ? undefined : itemVariants}
          >
            Astana Alia Manzoor-ul-Mashaikh is a Sufi sanctuary, rooted in the Chishtia Sabria Nizamia Qaddosia order. Come for peace, remembrance of Allah, and service to humanity.
          </motion.p>
          <motion.div
            className="mt-6 motion-reduce:!opacity-100 motion-reduce:!transform-none"
            variants={shouldReduceMotion ? undefined : itemVariants}
          >
            <Button href="/#what-we-do" size="md" variant="primary">
              Discover More
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
