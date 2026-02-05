import SellerDashboardWalletWithdrawalRequestContainer from "@/containers/dashboards/seller/wallet-page/withdrawalRequest-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "درخواست برداشت"
};

export default async function SellerDashboardWalletWithdrawalRequestPage() {
  return <SellerDashboardWalletWithdrawalRequestContainer userRole="buyer" />;
}
