"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface ResponsiveImageProps extends Omit<ImageProps, "onLoad"> {
  aspectRatio?: "square" | "video" | "portrait" | "landscape" | "wide";
  containerClassName?: string;
}

export function ResponsiveImage({
  aspectRatio = "video",
  containerClassName,
  className,
  alt,
  ...props
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  const aspectRatios = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    wide: "aspect-[21/9]",
  };

  return (
    <div className={cn("relative overflow-hidden", aspectRatios[aspectRatio], containerClassName)}>
      <Image
        className={cn(
          "object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        alt={alt}
        fill
        onLoad={() => setIsLoading(false)}
        {...props}
      />
      {isLoading && <div className="absolute inset-0 bg-muted animate-pulse" aria-hidden="true" />}
    </div>
  );
}
