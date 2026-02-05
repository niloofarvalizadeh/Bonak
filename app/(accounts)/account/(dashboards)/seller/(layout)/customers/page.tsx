import SellerDashboardOrdersContainer from "@/containers/dashboards/seller/orders-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مشتریان"
};

export default async function SellerDashboardOrdersPage() {
  return <SellerDashboardOrdersContainer />;
}
