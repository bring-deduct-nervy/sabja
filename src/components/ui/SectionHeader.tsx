import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  className,
  children,
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div className={cn("flex flex-col gap-4", alignmentClasses[align], className)}>
      {subtitle && (
        <p className="text-sm uppercase tracking-wider font-semibold text-accent">{subtitle}</p>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">{title}</h2>
      {description && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">{description}</p>
      )}
      {children}
    </div>
  );
}
