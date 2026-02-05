import MarketerDashboardContainer from "@/containers/dashboards/marketer/dashboard-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "پیشخوان"
};

export default async function SellerDashboardPage() {
  return <MarketerDashboardContainer />;
}
