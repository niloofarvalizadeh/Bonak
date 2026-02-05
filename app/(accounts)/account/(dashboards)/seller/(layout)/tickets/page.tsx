import SellerDashboardTicketsContainer from "@/containers/dashboards/seller/tickets-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تیکت ها"
};

export default async function SellerDashboardTicketsPage() {
  return <SellerDashboardTicketsContainer userRole="seller" />;
}
