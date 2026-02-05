import type { Metadata } from "next";
import { YekanBakh } from "./fonts";
import { Providers } from "./providers";

import NextTopLoader from "nextjs-toploader";

import "@/styles/globals.css";
import "swiper/css";
import "@smastrom/react-rating/style.css";
import "react-calendar/dist/Calendar.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={YekanBakh.className}>
        <NextTopLoader showSpinner={false} color="#ff7b00" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
