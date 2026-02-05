import SellerDashboardWalletContainer from "@/containers/dashboards/seller/wallet-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "کیف پول"
};

export default async function SellerDashboardWalletPage() {
  return <SellerDashboardWalletContainer userRole="seller" />;
}
