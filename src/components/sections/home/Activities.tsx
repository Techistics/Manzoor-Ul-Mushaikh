"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/src/components/ui/Container";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { ImagePlaceholder } from "@/src/components/ui/ImagePlaceholder";
import { siteConfig } from "@/src/config/site";

const placeholderGradients = [
  "from-amber-100 via-stone-100 to-orange-50",
  "from-slate-200 via-sky-50 to-amber-50",
  "from-sky-100 via-slate-100 to-teal-50",
];

export function Activities() {
  const [activeTile, setActiveTile] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="activities-heading"
      className="py-[60px]"
      id="activities"
    >
      <Container>
        <FadeIn className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-start md:justify-between md:gap-10">
          <h2
            className="text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl"
            id="activities-heading"
          >
            Our Proud Projects
          </h2>
        </FadeIn>
      </Container>

      <div className="group/gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {siteConfig.activities.map((activity, index) => {
          const image = siteConfig.images.gallery[index];
          const isActive = activeTile === index;
          const isDefaultVisible = index === 1;

          return (
            <button
              aria-expanded={isActive}
              className="group/tile relative aspect-[107/100] min-w-0 overflow-hidden bg-ink text-left focus-visible:z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-primary"
              key={`${activity.title}-${index}`}
              onClick={() =>
                setActiveTile((current) => (current === index ? null : index))
              }
              type="button"
            >
              {typeof image === "string" ? (
                <Image
                  alt={activity.title}
                  className="object-cover transition-transform duration-500 group-hover/tile:scale-[1.04]"
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  src={image}
                />
              ) : (
                <ImagePlaceholder
                  aspectRatio="107 / 100"
                  className={`h-full transition-transform duration-500 group-hover/tile:scale-[1.04] ${placeholderGradients[index % placeholderGradients.length]}`}
                />
              )}

              <span
                className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-ink/70 px-6 text-center text-white opacity-0 transition-opacity duration-500 group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100 ${
                  isActive ? "opacity-100" : ""
                } ${
                  isDefaultVisible
                    ? "lg:opacity-100 lg:group-hover/gallery:[&:not(:hover)]:opacity-0"
                    : ""
                }`}
              >
                <span className="text-2xl font-bold leading-tight">
                  {activity.title}
                </span>
                <span className="mt-3 max-w-[320px] text-xs leading-5 text-white/85">
                  {activity.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
