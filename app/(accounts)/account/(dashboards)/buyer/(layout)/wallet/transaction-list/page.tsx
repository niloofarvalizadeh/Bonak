import SellerDashboardTransactionListContainer from "@/containers/dashboards/seller/wallet-page/transactionList-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "لیست تراکنش ها"
};

export default async function SellerDashboardTransactionListPage() {
  return <SellerDashboardTransactionListContainer />;
}
