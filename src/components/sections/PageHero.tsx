import Image from "next/image";
import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { siteConfig } from "@/src/config/site";

type PageHeroProps = {
  title: string;
};

export function PageHero({ title }: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-hero-heading"
      className="relative isolate h-[clamp(280px,30vw,400px)] min-h-[280px] overflow-hidden"
    >
      <Image
        alt={siteConfig.images.heroAlt}
        className="object-cover object-[70%_30%]"
        fill
        fetchPriority="high"
        quality={80}
        sizes="100vw"
        src={siteConfig.images.hero}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-ink/70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-transparent"
      />

      <Container className="relative z-10 flex h-full flex-col justify-end pb-10 pt-28 md:pb-12">
        <h1
          className="text-4xl font-extrabold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] md:text-5xl"
          id="page-hero-heading"
        >
          {title}
        </h1>
        <nav aria-label="Breadcrumb" className="mt-3">
          <ol className="flex items-center gap-2 text-sm text-white/80">
            <li>
              <Link
                className="rounded-sm hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                href="/"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/50">
              /
            </li>
            <li aria-current="page">{title}</li>
          </ol>
        </nav>
      </Container>
    </section>
  );
}
