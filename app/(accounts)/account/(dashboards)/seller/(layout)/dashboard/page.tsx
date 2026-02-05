import SellerDashboardContainer from "@/containers/dashboards/seller/dashboard-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "پیشخوان"
};

export default async function SellerDashboardPage() {
  return <SellerDashboardContainer />;
}
