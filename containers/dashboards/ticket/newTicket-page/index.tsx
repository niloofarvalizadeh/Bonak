import React, { FC } from "react";

import NewTicketForm from "@/components/forms/ticket/newTicketForm";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import { Box } from "@chakra-ui/react";
import { UserRoleType } from "@/types";
import Title from "@/components/ui/typography/Title";

const NewTicketContainer: FC<UserRoleType> = ({ userRole }) => {
  return (
    <Box>
      <DashboardPageTitle>تیکت جدید</DashboardPageTitle>
      {userRole == "seller" ? (
        <Title level={2} className="text-red-500">
          لطفا توجه داشته باشید که تیکت شما برای پشتیبان سایت فرستاده میشود.
        </Title>
      ) : null}
      <NewTicketForm userRole={userRole} />
    </Box>
  );
};

export default NewTicketContainer;
