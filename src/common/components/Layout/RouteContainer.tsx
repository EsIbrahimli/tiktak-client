"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type RouteContainerProps = {
  children: React.ReactNode;
};

const noWidthRoutes = ["/auth/login"];

export default function RouteContainer({ children }: RouteContainerProps) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  const shouldUseFullWidth = noWidthRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  useEffect(() => {
    const parent = scrollRef.current?.closest(".overflow-y-auto") as HTMLElement | null;
    if (parent) {
      parent.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  return (
    <div ref={scrollRef} className={shouldUseFullWidth ? "h-full" : "w-[94%] sm:w-[92%] md:w-[90%] lg:w-[80%] mx-auto h-full"}>
      {children}
    </div>
  );
}