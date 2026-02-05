import NewTicketContainer from "@/containers/dashboards/ticket/newTicket-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تیکت جدید"
};

export default async function BuyerDashboardNewTicketPage() {
  return <NewTicketContainer userRole="buyer" />;
}
