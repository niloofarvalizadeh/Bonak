import SellerDashboardNotificationsContainer from "@/containers/dashboards/seller/notifications";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اطلاع رسانی ها"
};

export default async function SellerDashboardNotificationsPage() {
  return <SellerDashboardNotificationsContainer />;
}
