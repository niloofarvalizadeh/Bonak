import FaqContainer from "@/containers/home/faq-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سوالات متداول"
};

export default async function FaqPage() {
  return <FaqContainer />;
}
