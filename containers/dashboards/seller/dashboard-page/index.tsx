"use client";
import React, { FC } from "react";

import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import Title from "@/components/ui/typography/Title";
import { Box } from "@chakra-ui/react";
import { useGetFullUserName } from "@/services/queries";

const SellerDashboardContainer: FC = () => {
  const { data: userInformation, isLoading: userInformationIsLoading } =
    useGetFullUserName();
  return (
    <Box className="flex w-full flex-col gap-11">
      <Box className="flex flex-col gap-3">
        <DashboardPageTitle>پیشخوان</DashboardPageTitle>
        <Title level={1}>
          {userInformationIsLoading ? null : userInformation?.name} عزیز!
        </Title>
      </Box>
    </Box>
  );
};

export default SellerDashboardContainer;
