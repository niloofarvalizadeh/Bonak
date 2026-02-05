import SelectTicketSectionContainer from "@/containers/dashboards/ticket/SelectTicketSection-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تیکت جدید"
};

export default async function SellerDashboardSelectTicketSectionPage() {
  return <SelectTicketSectionContainer userRole="seller" />;
}
