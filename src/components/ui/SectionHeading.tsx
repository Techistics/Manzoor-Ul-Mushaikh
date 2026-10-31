import { cn } from "@/src/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <h2 className="text-2xl font-bold leading-tight text-ink">{title}</h2>
      {subtitle && <p className="text-sm leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}
