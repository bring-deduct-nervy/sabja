import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:opacity-90 focus:ring-primary shadow-md hover:shadow-lg",
    secondary:
      "bg-secondary text-secondary-foreground hover:opacity-90 focus:ring-secondary shadow-md hover:shadow-lg",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground focus:ring-primary",
    ghost: "text-foreground hover:bg-muted focus:ring-ring",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
