"use client";

import { useEffect, useState } from "react";
import { throttle } from "@/lib/utils";

export function useScrollPosition(): number {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollPosition(window.scrollY);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPosition;
}
