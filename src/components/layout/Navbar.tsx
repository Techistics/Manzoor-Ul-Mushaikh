"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "@/src/components/ui/Container";
import { Button } from "@/src/components/ui/Button";
import { siteConfig } from "@/src/config/site";
import { Logo } from "./Logo";

type NavLinksProps = {
  activeHash: string;
  isScrolled: boolean;
  onNavigate: (href: string) => void;
  pathname: string;
  className?: string;
};

function NavLinks({
  activeHash,
  isScrolled,
  onNavigate,
  pathname,
  className,
}: NavLinksProps) {
  return (
    <ul className={className}>
      {siteConfig.navLinks.map((link) => {
        const isHashLink = link.href.startsWith("/#");
        const isActive = isHashLink
          ? pathname === "/" && activeHash === link.href.slice(2)
          : pathname === link.href &&
            (link.href !== "/" || activeHash.length === 0);

        return (
          <li key={link.label}>
            <Link
              aria-current={isActive && !isHashLink ? "page" : undefined}
              className={`rounded-sm text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                isActive
                  ? isScrolled
                    ? "text-primary-dark"
                    : "text-primary"
                  : isScrolled
                    ? "text-ink hover:text-primary-dark"
                    : "text-white hover:text-primary"
              } ${
                isScrolled
                  ? "focus-visible:ring-offset-white"
                  : "focus-visible:ring-offset-ink"
              }`}
              href={link.href}
              onClick={() => onNavigate(link.href)}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 40);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const updateLocationState = () => {
      setActiveHash(window.location.hash.slice(1));
      setIsMenuOpen(false);
    };

    window.addEventListener("hashchange", updateLocationState);
    window.addEventListener("popstate", updateLocationState);
    return () => {
      window.removeEventListener("hashchange", updateLocationState);
      window.removeEventListener("popstate", updateLocationState);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const handleNavigation = (href: string) => {
    setActiveHash(href.startsWith("/#") ? href.slice(2) : "");
    closeMenu();
  };

  return (
    <header
      className={`inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        isScrolled
          ? "fixed bg-white/90 shadow-sm backdrop-blur-md"
          : "absolute bg-transparent"
      }`}
    >
      <Container className="flex min-h-[76px] items-center justify-between gap-5">
        <div className="flex min-w-0 items-center gap-12">
          <Logo isScrolled={isScrolled} onClick={() => handleNavigation("/")} />
          <nav
            aria-label={siteConfig.accessibilityLabels.mainNavigation}
            className="hidden lg:absolute lg:left-1/2 lg:top-1/2 lg:block lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <NavLinks
              activeHash={activeHash}
              isScrolled={isScrolled}
              onNavigate={handleNavigation}
              pathname={pathname}
              className="flex items-center gap-6 xl:gap-8"
            />
          </nav>
        </div>

        <div className="hidden shrink-0 items-center gap-6 lg:flex">
          {/* <Button
            href="/#donate"
            variant="primary"
            className="whitespace-nowrap"
            onClick={() => handleNavigation("/#donate")}
          >
            Donate Now
          </Button> */}
        </div>

        <button
          aria-controls="mobile-navigation-panel"
          aria-expanded={isMenuOpen}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          className={`inline-flex size-11 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden ${
            isScrolled
              ? "text-ink hover:bg-ink/5 focus-visible:ring-offset-white"
              : "text-white hover:bg-white/10 focus-visible:ring-offset-ink"
          }`}
          onClick={() => setIsMenuOpen((open) => !open)}
          type="button"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" className="size-6" />
          ) : (
            <Menu aria-hidden="true" className="size-6" />
          )}
        </button>
      </Container>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="absolute inset-x-0 top-full overflow-hidden border-t border-border bg-white shadow-lg lg:hidden"
            exit={{ height: 0, opacity: 0 }}
            id="mobile-navigation-panel"
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            <Container className="flex flex-col gap-6 py-6">
              <nav aria-label={siteConfig.accessibilityLabels.mainNavigation}>
                <NavLinks
                  activeHash={activeHash}
                  isScrolled
                  onNavigate={handleNavigation}
                  pathname={pathname}
                  className="flex flex-col gap-5"
                />
              </nav>
              <div className="flex items-center gap-6">
                <Link
                  className="rounded-sm text-sm font-semibold text-ink transition-colors hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  href="/#sign-up"
                  onClick={() => handleNavigation("/#sign-up")}
                >
                  Sign Up
                </Link>
                <Button
                  href="/#donate"
                  variant="primary"
                  className="whitespace-nowrap"
                  onClick={() => handleNavigation("/#donate")}
                >
                  Donate Now
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
