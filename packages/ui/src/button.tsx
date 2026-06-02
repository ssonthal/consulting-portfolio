import { cn } from "./cn";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-teal-600 text-white hover:bg-teal-700 shadow-sm",
        variant === "secondary" &&
          "bg-slate-100 text-slate-900 hover:bg-slate-200",
        variant === "ghost" && "text-slate-700 hover:bg-slate-100",
        variant === "outline" &&
          "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-12 px-6 text-base",
        className,
      )}
      {...props}
    />
  );
}
