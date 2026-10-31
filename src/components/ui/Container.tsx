import type { HTMLAttributes } from "react";
import { cn } from "@/src/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "max-w-[1296px] mx-auto w-full px-4 md:px-6 lg:px-8",
        className,
      )}
      {...props}
    />
  );
}
