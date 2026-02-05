import AboutUsContainer from "@/containers/home/aboutUs-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "درباره ما"
};

export default async function AboutUsPage() {
  return <AboutUsContainer />;
}
