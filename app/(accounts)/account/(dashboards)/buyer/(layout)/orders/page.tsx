import BuyerDashboardOrdersContainer from "@/containers/dashboards/buyer/orders-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سفارشات"
};

export default async function BuyerDashboardOrdersPage() {
  return <BuyerDashboardOrdersContainer />;
}
