import React, { FC } from "react";

import SellerTicketsTable from "@/components/tickets/SellerTicketsTable";
import { UserRoleType } from "@/types";

const SellerDashboardTicketsContainer: FC<UserRoleType> = ({ userRole }) => {
  return <SellerTicketsTable userRole={userRole} />;
};

export default SellerDashboardTicketsContainer;
