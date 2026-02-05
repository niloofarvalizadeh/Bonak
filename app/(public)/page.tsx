import HomeContainer from "@/containers/home/home-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "خانه"
};

export default function Home() {
  return <HomeContainer />;
}
