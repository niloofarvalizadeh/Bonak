import BuyerDashboardContainer from "@/containers/dashboards/buyer/dashboard-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "داشبورد"
};

export default async function BuyerDashboardPage() {
  return <BuyerDashboardContainer />;
}
