"use client";

import { usePathname } from "next/navigation";

type RouteContainerProps = {
  children: React.ReactNode;
};

const noWidthRoutes = ["/auth/login"];

export default function RouteContainer({ children }: RouteContainerProps) {
  const pathname = usePathname();

  const shouldUseFullWidth = noWidthRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  return (
    <div className={shouldUseFullWidth ? "h-full" : "w-[80%] mx-auto h-full"}>
      {children}
    </div>
  );
}