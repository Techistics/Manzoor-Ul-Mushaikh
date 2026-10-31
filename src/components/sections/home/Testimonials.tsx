"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/src/components/ui/Container";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { siteConfig } from "@/src/config/site";

const testimonials = siteConfig.testimonials;

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const previousIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
  const nextIndex = (activeIndex + 1) % testimonials.length;

  const showPrevious = () => {
    setActiveIndex((index) => (index - 1 + testimonials.length) % testimonials.length);
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % testimonials.length);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    touchStartX.current = null;

    if (startX === null) {
      return;
    }

    const distance = event.changedTouches[0].clientX - startX;

    if (distance < -50) {
      showNext();
    } else if (distance > 50) {
      showPrevious();
    }
  };

  const visibleTestimonials = [
    { testimonial: testimonials[previousIndex], index: previousIndex, position: "previous" },
    { testimonial: testimonials[activeIndex], index: activeIndex, position: "active" },
    { testimonial: testimonials[nextIndex], index: nextIndex, position: "next" },
  ];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-[60px] md:py-20"
      id="testimonials"
    >
      <Container>
        <FadeIn className="mx-auto mb-9 max-w-[660px] text-center md:mb-12">
          <h2
            className="text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl"
            id="testimonials-heading"
          >
            Our Testimonials
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet dolor
            mauris suscipit felis pellentesque et, dolor. Tristique ipsum
            mattis ut mauris nam dictum. Donec elementum suspendisse.
          </p>
        </FadeIn>

        <div className="relative pt-12 md:pt-10">
          <button
            aria-label="Show previous testimonial"
            className="absolute left-0 top-0 hidden size-10 items-center justify-center text-gray-400 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:inline-flex"
            onClick={showPrevious}
            type="button"
          >
            <ChevronLeft aria-hidden="true" className="size-7" />
          </button>
          <button
            aria-label="Show next testimonial"
            className="absolute right-0 top-0 hidden size-10 items-center justify-center text-ink transition-colors hover:text-ink/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:inline-flex"
            onClick={showNext}
            type="button"
          >
            <ChevronRight aria-hidden="true" className="size-7" />
          </button>

          <div
            aria-label="Testimonials carousel"
            className="grid grid-cols-1 gap-7 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 md:grid-cols-2 lg:grid-cols-3"
            onKeyDown={handleKeyDown}
            onTouchEnd={handleTouchEnd}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0].clientX;
            }}
            role="region"
            style={{ touchAction: "pan-y" }}
            tabIndex={0}
          >
            {visibleTestimonials.map(({ testimonial, index, position }) => {
              const isActive = position === "active";
              const image = siteConfig.images.testimonials[index];

              return (
                <motion.article
                  aria-live={isActive ? "polite" : undefined}
                  className={`min-w-0 text-center ${
                    position === "previous"
                      ? "hidden lg:block"
                      : position === "next"
                        ? "hidden md:block"
                        : "block"
                  } ${isActive ? "lg:-translate-y-7" : ""}`}
                  key={index}
                  layout
                  transition={{
                    layout: {
                      duration: shouldReduceMotion ? 0 : 0.4,
                      ease: "easeOut",
                    },
                  }}
                >
                  <div
                    className={`flex min-h-[174px] items-center justify-center rounded-xl p-7 pb-11 ${
                      isActive
                        ? "bg-ink text-white lg:min-h-[190px]"
                        : "bg-surface text-ink"
                    }`}
                  >
                    <p className="line-clamp-6 text-sm leading-[1.6]">
                      {testimonial.quote}
                    </p>
                  </div>
                  <div className="relative z-10 mx-auto -mt-8 flex size-16 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-sky-300 via-amber-200 to-primary text-lg font-bold text-ink">
                    {image ? (
                      <Image
                        alt=""
                        className="object-cover"
                        fill
                        sizes="64px"
                        src={image}
                      />
                    ) : (
                      <span aria-hidden="true">AA</span>
                    )}
                  </div>
                  <h3 className="mt-2 font-bold text-ink">{testimonial.name}</h3>
                  <p className="text-xs text-muted">{testimonial.role}</p>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
            <button
              aria-label="Show previous testimonial"
              className="inline-flex size-10 items-center justify-center text-gray-400 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              onClick={showPrevious}
              type="button"
            >
              <ChevronLeft aria-hidden="true" className="size-6" />
            </button>
            <div aria-label="Testimonial pages" className="flex items-center gap-2" role="group">
              {testimonials.map((testimonial, index) => (
                <button
                  aria-current={activeIndex === index ? "true" : undefined}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`size-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    activeIndex === index ? "bg-ink" : "bg-ink/20"
                  }`}
                  key={testimonial.name + index}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                />
              ))}
            </div>
            <button
              aria-label="Show next testimonial"
              className="inline-flex size-10 items-center justify-center text-ink transition-colors hover:text-ink/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              onClick={showNext}
              type="button"
            >
              <ChevronRight aria-hidden="true" className="size-6" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
