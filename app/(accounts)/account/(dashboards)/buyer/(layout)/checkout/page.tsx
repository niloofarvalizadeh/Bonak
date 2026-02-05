import BuyerDashboardCheckoutContainer from "@/containers/dashboards/buyer/checkout-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سبد خرید"
};

export default async function BuyerDashboardCheckoutPage() {
  return <BuyerDashboardCheckoutContainer />;
}