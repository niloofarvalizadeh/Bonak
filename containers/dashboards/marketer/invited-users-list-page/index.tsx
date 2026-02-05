"use client";
import React, { FC } from "react";

import { Box, Spinner } from "@chakra-ui/react";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import Title from "@/components/ui/typography/Title";
import { useGetMarketerInvitedUsersList } from "@/services/queries";
import UserInvitedDetail from "./UserInvitedDetail";
import { UserInvited } from "@/types";

const InvitedUsersListContainer: FC = () => {
  const {
    data: marketerInviterUserList,
    isLoading: marketerInviterUserListIsLoading
  } = useGetMarketerInvitedUsersList();

  return (
    <Box className="flex flex-col">
      <DashboardPageTitle>لیست کاربر های دعوت شده</DashboardPageTitle>
      <Box className="mt-2 flex w-full flex-col gap-2">
        <Box className="mt-4 grid w-full grid-cols-3 text-brand-blue-normal">
          <Title level={1} className="col-span-1">
            نام
          </Title>
          <Title level={1} className="col-span-1">
            نام خانوادگی
          </Title>
          <Title level={1} className="col-span-1">
            شماره تماس
          </Title>
        </Box>
        {marketerInviterUserListIsLoading ? (
          <Spinner color="brand.orange.normal" />
        ) : marketerInviterUserList?.results?.length == 0 ? (
          <Title level={2} className="text-center">
            لیستی وجود ندارد
          </Title>
        ) : (
          marketerInviterUserList?.results?.map((item: UserInvited) => (
            <Box
              key={item.userId}
              className="grid grid-cols-3 border-b border-brand-white-normalActive px-[18px] py-[26px] text-brand-blue-normalActive lg:grid-cols-5"
            >
              <Box className="col-span-1 flex items-center justify-start">
                <Title level={1}>{item.buyerInfo.firstName}</Title>
              </Box>
              <Box className="col-span-1 flex items-center justify-start">
                <Title level={1}>{item.buyerInfo.lastName}</Title>
              </Box>
              <Box className="col-span-1 flex items-center justify-start">
                <Title level={1}>{item.phoneNumber}</Title>
              </Box>
              <Box className="col-span-2 flex items-center justify-end">
                <UserInvitedDetail user={item} id={item.userId} />
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default InvitedUsersListContainer;
