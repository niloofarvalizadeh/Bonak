import BuyerDashboardAccountDetailsContainer from "@/containers/dashboards/buyer/accountDetails-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اطلاعات حساب کاربری"
};

export default async function BuyerDashboardAccountDetailsPage() {
  return <BuyerDashboardAccountDetailsContainer />;
}
