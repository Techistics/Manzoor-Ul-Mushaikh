import Image from "next/image";
import { BookOpen, HandHeart, MoonStar } from "lucide-react";
import { Container } from "@/src/components/ui/Container";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { ImagePlaceholder } from "@/src/components/ui/ImagePlaceholder";
import { siteConfig } from "@/src/config/site";

const patternSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72"><path d="M36 9 41 25 56 16 47 31 63 36 47 41 56 56 41 47 36 63 31 47 16 56 25 41 9 36 25 31 16 16 31 25Z" fill="none" stroke="#8F673F" stroke-opacity=".1" stroke-width=".8"/></svg>';

const backgroundPattern = `url("data:image/svg+xml,${encodeURIComponent(patternSvg)}")`;
const placeholderGradients = [
  "from-amber-100 via-stone-100 to-orange-50",
  "from-slate-200 via-sky-50 to-amber-50",
];

function GalleryImages() {
  return (
    <div className="flex gap-[27px]">
      {Array.from({ length: 2 }, (_, index) => {
        const image = siteConfig.images.aboutGallery[index];

        return (
          <div
            className="relative aspect-[4/5] min-w-0 flex-1 overflow-hidden"
            key={index}
          >
            {typeof image === "string" ? (
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="(max-width: 1023px) 45vw, 25vw"
                src={image}
              />
            ) : (
              <ImagePlaceholder
                aspectRatio="4 / 5"
                className={`h-full ${placeholderGradients[index]}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function HighlightList() {
  const icons = [MoonStar, BookOpen, HandHeart];

  return (
    <ul className="flex flex-col gap-10">
      {siteConfig.highlights.map((highlight, index) => {
        const Icon = icons[index % icons.length];

        return (
          <li key={`${highlight.title}-${index}`}>
            <FadeIn delay={index * 0.1}>
              <article className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary-deep text-white"
                >
                  <Icon className="size-7" strokeWidth={2.2} />
                </span>
                <div>
                  <h2 className="text-lg font-bold leading-6 text-ink">
                    {highlight.title}
                  </h2>
                  <p className="mt-1 text-[13px] leading-[1.4rem] text-muted">
                    {highlight.description}
                  </p>
                </div>
              </article>
            </FadeIn>
          </li>
        );
      })}
    </ul>
  );
}

export function Highlights() {
  return (
    <section
      aria-label="Highlights"
      className="relative isolate overflow-hidden bg-surface py-[60px]"
      style={{ backgroundImage: backgroundPattern }}
    >
      <div className="lg:hidden">
        <Container>
          <FadeIn direction="left">
            <GalleryImages />
          </FadeIn>
          <div className="mt-10">
            <HighlightList />
          </div>
        </Container>
      </div>

      <div className="hidden lg:grid lg:grid-cols-[54%_46%]">
        <FadeIn className="pl-[2vw]" direction="left">
          <GalleryImages />
        </FadeIn>
        <div className="flex items-center pl-[2vw] pr-[max(2rem,calc((100vw-1232px)/2))]">
          <HighlightList />
        </div>
      </div>
    </section>
  );
}
