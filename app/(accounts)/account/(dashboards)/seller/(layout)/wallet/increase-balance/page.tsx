import SellerDashboardIncreaseBalanceContainer from "@/containers/dashboards/seller/wallet-page/increaseBalance-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "افزایش موجودی"
};

export default async function SellerDashboardIncreaseBalancePage() {
  return <SellerDashboardIncreaseBalanceContainer userRole="seller" />;
}
