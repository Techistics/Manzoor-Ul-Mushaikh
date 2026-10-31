import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

type ImagePlaceholderProps = {
  aspectRatio?: number | string;
  className?: string;
};

export function ImagePlaceholder({
  aspectRatio = "3 / 2",
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-sky-100 via-slate-100 to-amber-50",
        className,
      )}
      style={{ aspectRatio }}
    >
      <ImageIcon aria-hidden="true" className="size-10 text-ink/20" strokeWidth={1.4} />
    </div>
  );
}
