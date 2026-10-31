"use client";

import type { ButtonHTMLAttributes, ComponentProps } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/src/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type SharedButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type LinkButtonProps = SharedButtonProps &
  Omit<ComponentProps<typeof Link>, "className" | "href"> & {
    href: ComponentProps<typeof Link>["href"];
    disabled?: never;
  };

type NativeButtonProps = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

function omitButtonStyles<T extends SharedButtonProps>(
  props: T,
): Omit<T, keyof SharedButtonProps> {
  const forwardedProps = { ...props };
  delete forwardedProps.variant;
  delete forwardedProps.size;
  delete forwardedProps.className;
  return forwardedProps;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-ink hover:bg-primary-dark disabled:hover:bg-primary",
  secondary: "bg-ink text-white hover:bg-ink/90 disabled:hover:bg-ink",
  outline:
    "border border-border bg-transparent text-ink hover:border-primary hover:bg-primary/10 disabled:hover:border-border disabled:hover:bg-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button(props: ButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const isDisabled = "disabled" in props && props.disabled === true;
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    variantClasses[props.variant ?? "primary"],
    sizeClasses[props.size ?? "md"],
    "disabled:cursor-not-allowed disabled:opacity-60",
    props.className,
  );

  const motionProps = {
    whileHover:
      shouldReduceMotion || isDisabled ? undefined : { scale: 1.02 },
    whileTap:
      shouldReduceMotion || isDisabled ? undefined : { scale: 0.98 },
    transition: { duration: 0.15, ease: "easeOut" as const },
  };

  if ("href" in props && props.href !== undefined) {
    const linkProps = omitButtonStyles(props);

    return (
      <motion.span className="inline-flex" {...motionProps}>
        <Link className={classes} {...linkProps} />
      </motion.span>
    );
  }

  const buttonProps = omitButtonStyles(props);

  return (
    <motion.span className="inline-flex" {...motionProps}>
      <button
        className={classes}
        type={props.type ?? "button"}
        {...buttonProps}
      />
    </motion.span>
  );
}
