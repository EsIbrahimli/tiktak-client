import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import HeaderVisibility from "@/common/components/Header/HeaderVisibility";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TikTak",
  description: "TikTak online shopping experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className="h-full  flex flex-col overflow-hidden">
        <HeaderVisibility />
        <div className="flex-1 bg-gray-100">
          <div className=" w-[80%] mx-auto h-full">
          {children}
          </div>
          </div>
      </body>
    </html>
  );
}