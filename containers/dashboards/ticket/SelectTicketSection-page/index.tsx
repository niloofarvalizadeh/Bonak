import React, { FC } from "react";

import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import Title from "@/components/ui/typography/Title";
import SelectTicketSectionForm from "@/components/forms/ticket/selectTicketSection";
import { Box } from "@chakra-ui/react";
import { UserRoleType } from "@/types";

const SelectTicketSectionContainer: FC<UserRoleType> = ({ userRole }) => {
  return (
    <Box>
      <DashboardPageTitle>تیکت</DashboardPageTitle>
      <Title level={2} className="mt-[22px] text-brand-blue-normal">
        دریافت کننده
      </Title>
      <SelectTicketSectionForm userRole={userRole} />
    </Box>
  );
};

export default SelectTicketSectionContainer;
