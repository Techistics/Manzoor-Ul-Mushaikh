"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/src/components/ui/Container";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { ImagePlaceholder } from "@/src/components/ui/ImagePlaceholder";
import { siteConfig } from "@/src/config/site";

const gap = 30;

function getItemsPerView() {
  if (window.innerWidth >= 1024) {
    return 3;
  }

  return window.innerWidth >= 768 ? 2 : 1;
}

export function WhatWeDo() {
  const shouldReduceMotion = useReducedMotion();
  const firstCardRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [carousel, setCarousel] = useState({ itemsPerView: 1, stride: 0 });
  const hasLoop = siteConfig.services.length > carousel.itemsPerView;
  const maxIndex = hasLoop
    ? siteConfig.services.length
    : Math.max(0, siteConfig.services.length - carousel.itemsPerView);
  const [isResettingLoop, setIsResettingLoop] = useState(false);
  const displayedServices = hasLoop
    ? [
        ...siteConfig.services,
        ...siteConfig.services.slice(0, carousel.itemsPerView),
      ]
    : siteConfig.services;

  useEffect(() => {
    const updateCarousel = () => {
      const itemsPerView = getItemsPerView();
      const cardWidth = firstCardRef.current?.getBoundingClientRect().width ?? 0;

      setCarousel({ itemsPerView, stride: cardWidth + gap });
      setActiveIndex((index) =>
        Math.min(
          index,
          siteConfig.services.length > itemsPerView
            ? siteConfig.services.length
            : Math.max(0, siteConfig.services.length - itemsPerView),
        ),
      );
    };

    updateCarousel();
    window.addEventListener("resize", updateCarousel);

    return () => window.removeEventListener("resize", updateCarousel);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || maxIndex === 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => Math.min(index + 1, maxIndex));
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, [maxIndex, shouldReduceMotion]);

  const slideTo = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const handleAnimationComplete = () => {
    if (isResettingLoop) {
      setIsResettingLoop(false);
    } else if (hasLoop && activeIndex === siteConfig.services.length) {
      setIsResettingLoop(true);
      setActiveIndex(0);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } },
  ) => {
    if (!carousel.stride) {
      return;
    }

    if (info.offset.x < -carousel.stride * 0.2 || info.velocity.x < -500) {
      slideTo(activeIndex + 1);
    } else if (
      info.offset.x > carousel.stride * 0.2 ||
      info.velocity.x > 500
    ) {
      slideTo(activeIndex - 1);
    }
  };

  const cardWidthClasses =
    "w-full shrink-0 md:w-[calc((100%_-_30px)_/_2)] lg:w-[calc((100%_-_60px)_/_3)]";

  return (
    <section
      aria-labelledby="what-we-do-heading"
      className="relative isolate overflow-hidden py-[60px]"
      id="what-we-do"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-72 top-8 z-0 size-[430px] rounded-full border-[20px] border-ink/[0.035] md:-left-96 md:size-[570px]"
      />
      <Container className="relative z-10">
        <FadeIn className="mx-auto mb-9 max-w-[660px] text-center md:mb-12">
          <h2
            className="text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl"
            id="what-we-do-heading"
          >
            What We Do
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Beyond spiritual guidance, the Astana serves the community through four free welfare projects.
          </p>
        </FadeIn>

        <div className="relative">
          <div className="-mx-2 overflow-hidden px-2 pt-2 pb-12">
            <motion.div
              animate={{ x: -activeIndex * carousel.stride }}
              className="flex w-full gap-[30px]"
              drag="x"
              dragConstraints={{
                left: -maxIndex * carousel.stride,
                right: 0,
              }}
              dragElastic={0.08}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              style={{ touchAction: "pan-y" }}
              onAnimationComplete={handleAnimationComplete}
              transition={
                shouldReduceMotion || isResettingLoop
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 32 }
              }
            >
              {displayedServices.map((service, index) => {
                const serviceIndex = index % siteConfig.services.length;
                const image = siteConfig.images.services[serviceIndex];

                return (
                  <FadeIn
                    className={cardWidthClasses}
                    delay={serviceIndex * 0.05}
                    key={`${service.title}-${serviceIndex}-${index >= siteConfig.services.length ? "clone" : "original"}`}
                  >
                    <article
                      className="group relative flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out hover:scale-[1.02]"
                      ref={index === 0 ? firstCardRef : undefined}
                    >
                      {typeof image === "string" ? (
                        <div className="relative aspect-[3/2] w-full overflow-hidden">
                          <Image
                            alt=""
                            className="object-cover"
                            fill
                            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                            src={image}
                          />
                        </div>
                      ) : (
                        <ImagePlaceholder
                          aspectRatio="3 / 2"
                          className="rounded-t-lg"
                        />
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-emerald-900/0 transition-colors duration-300 group-hover:bg-emerald-900/10" />
                      <div className="relative z-10 flex flex-1 flex-col items-center px-5 pb-6 pt-4 text-center">
                        <h3 className="text-lg font-bold leading-6 text-ink">
                          {service.title}
                        </h3>
                        <p className="mt-2 line-clamp-4 min-h-[5.5rem] text-xs leading-[1.4rem] text-muted">
                          {service.description}
                        </p>
                      </div>
                    </article>
                  </FadeIn>
                );
              })}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
