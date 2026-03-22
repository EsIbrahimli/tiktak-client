"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

const hiddenPrefixes = ["/auth"];

export default function HeaderVisibility() {
  const pathname = usePathname();

  const shouldHideHeader = hiddenPrefixes.some((prefix) =>
    pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (shouldHideHeader) {
    return null;
  }

  return <Header />;
}