import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/src/config/site";

type LogoProps = {
  displayName?: string;
  isScrolled?: boolean;
  onClick?: () => void;
};

export function Logo({
  displayName = siteConfig.displayName,
  isScrolled = false,
  onClick,
}: LogoProps) {
  return (
    <Link
      className="inline-flex shrink-0 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      href="/"
      aria-label={`${displayName} home`}
      onClick={onClick}
    >
      <Image
        src={isScrolled ? "/logo.png" : "/logo2.png"}
        alt=""
        width={1600}
        height={900}
        className="h-12 w-auto object-contain"
      />
    </Link>
  );
}
