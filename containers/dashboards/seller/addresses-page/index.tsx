import React, { FC } from "react";

import { Box } from "@chakra-ui/react";
import AddressesBox from "@/components/modules/Addresses";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import { UserRoleType } from "@/types";

const SellerDashboardAddressesContainer: FC<UserRoleType> = () => {
  return (
    <Box>
      <DashboardPageTitle>آدرس ها</DashboardPageTitle>
      <AddressesBox userRole="seller" />
    </Box>
  );
};

export default SellerDashboardAddressesContainer;
