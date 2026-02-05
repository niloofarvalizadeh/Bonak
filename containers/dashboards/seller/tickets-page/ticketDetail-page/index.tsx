import React, { FC } from "react";

import SellerTicketDetail from "@/components/tickets/SellerTicketDetail";

interface SellerDashboardTicketDetailContainerProps {
  ticketId: string;
  userRole: "seller" | "buyer";
}

const SellerDashboardTicketDetailContainer: FC<
  SellerDashboardTicketDetailContainerProps
> = ({ ticketId, userRole }) => {
  return <SellerTicketDetail ticketId={ticketId} userRole={userRole} />;
};

export default SellerDashboardTicketDetailContainer;
