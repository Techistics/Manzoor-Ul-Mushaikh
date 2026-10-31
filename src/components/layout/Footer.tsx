import { Suspense } from "react";
import { io } from "next/cache";
import { Container } from "@/src/components/ui/Container";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { siteConfig } from "@/src/config/site";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

async function CurrentYear() {
  await io();
  return <>{new Date().getFullYear()}</>;
}

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case "facebook":
      return (
        <svg
          aria-hidden="true"
          className="size-4"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M9.25 15V8.7h2.12l.32-2.46H9.25V4.67c0-.71.2-1.2 1.23-1.2h1.31V1.27A17.5 17.5 0 0 0 9.88 1.2c-1.9 0-3.2 1.16-3.2 3.3v1.74H4.54V8.7h2.14V15h2.57Z" />
        </svg>
      );
    case "twitter":
      return (
        <svg
          aria-hidden="true"
          className="size-4"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M14.4 4.1c-.46.2-.95.34-1.47.4a2.56 2.56 0 0 0 1.12-1.42 5.1 5.1 0 0 1-1.62.62 2.55 2.55 0 0 0-4.35 2.33 7.24 7.24 0 0 1-5.26-2.67 2.55 2.55 0 0 0 .79 3.4 2.53 2.53 0 0 1-1.16-.32v.03c0 1.23.88 2.26 2.05 2.5-.22.06-.45.1-.67.1-.16 0-.32-.02-.48-.05a2.56 2.56 0 0 0 2.39 1.78A5.12 5.12 0 0 1 1.97 11.9c-.16 0-.32 0-.47-.03a7.22 7.22 0 0 0 3.91 1.15c4.7 0 7.27-3.9 7.27-7.27v-.33c.5-.36.92-.81 1.26-1.32Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          aria-hidden="true"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          viewBox="0 0 16 16"
        >
          <rect height="11" rx="3" width="11" x="2.5" y="2.5" />
          <circle cx="8" cy="8" r="2.5" />
          <circle
            cx="11.65"
            cy="4.4"
            fill="currentColor"
            r=".75"
            stroke="none"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg
          aria-hidden="true"
          className="size-4"
          fill="currentColor"
          fillRule="evenodd"
          viewBox="0 0 16 16"
        >
          <path d="M15.2 4.6a1.8 1.8 0 0 0-1.27-1.27C12.8 3 8 3 8 3s-4.8 0-5.93.33A1.8 1.8 0 0 0 .8 4.6C.5 5.73.5 8 .5 8s0 2.27.3 3.4a1.8 1.8 0 0 0 1.27 1.27C3.2 13 8 13 8 13s4.8 0 5.93-.33a1.8 1.8 0 0 0 1.27-1.27c.3-1.13.3-3.4.3-3.4s0-2.27-.3-3.4ZM6.5 10.2V5.8L10.3 8l-3.8 2.2Z" />
        </svg>
      );
    default:
      return null;
  }
}

export function Footer() {
  const { footer } = siteConfig;

  return (
    <footer className="bg-ink text-white">
      <FadeIn animateOnMount>
        <Container className="grid gap-12 py-14 md:gap-14 lg:gap-16 lg:py-16 min-[1200px]:grid-cols-2">
          <div>
            <Logo displayName={footer.displayName} />
            <p className="mt-5 max-w-[400px] text-sm leading-6 text-white/70">
              {footer.description}
            </p>

            <div className="mt-7">
              <h2 className="text-base font-bold text-white">
                {footer.socialHeading}
              </h2>
              <nav aria-label={footer.socialLinksLabel} className="mt-3">
                <ul className="flex flex-wrap gap-x-6 gap-y-3">
                  {footer.socialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        className="inline-flex items-center gap-2 text-xs text-white transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        href={link.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <SocialIcon name={link.icon} />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              {footer.newsletter.heading}
            </h2>
            <NewsletterForm config={footer.newsletter} />

            <div className="mt-7 grid grid-cols-2 gap-8">
              {footer.linkColumns.map((column) => (
                <nav key={column.heading} aria-label={column.heading}>
                  <h2 className="font-bold text-white">{column.heading}</h2>
                  <ul className="mt-3 space-y-2">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          className="text-xs text-white/70 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          href={link.href}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
        </Container>
      </FadeIn>

      <div className="bg-ink-darker">
        <Container className="flex flex-col items-center gap-3 py-4 text-center text-xs text-white sm:flex-row sm:justify-between sm:text-left">
          <p>
            ©
            <Suspense fallback={null}>
              <CurrentYear />
            </Suspense>{" "}
            {footer.displayName}. {footer.rightsText}
          </p>
          <nav aria-label={footer.legalLinksLabel}>
            <ul className="flex flex-wrap justify-center gap-6">
              {footer.legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    className="transition-colors hover:text-primary"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
