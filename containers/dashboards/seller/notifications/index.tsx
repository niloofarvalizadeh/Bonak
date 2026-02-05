import React, { FC } from "react";

import { Box } from "@chakra-ui/react";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import NotificationList from "@/components/notifications";

const SellerDashboardNotificationsContainer: FC = () => {
  return (
    <Box className="flex flex-col gap-11">
      <DashboardPageTitle>اطلاع رسانی ها</DashboardPageTitle>
      <NotificationList />
    </Box>
  );
};

export default SellerDashboardNotificationsContainer;
