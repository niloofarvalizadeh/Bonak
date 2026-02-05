import SellerDashboardTicketDetailContainer from "@/containers/dashboards/seller/tickets-page/ticketDetail-page";

export default async function BuyerDashboardTicketDetailPage({
  params
}: {
  params: { ticketId: string };
}) {
  return (
    <SellerDashboardTicketDetailContainer
      ticketId={params.ticketId}
      userRole="buyer"
    />
  );
}
