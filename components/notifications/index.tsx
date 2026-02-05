"use client";
import React, { FC } from "react";

import Title from "@/components/ui/typography/Title";
import { Box, Spinner } from "@chakra-ui/react";
import { useGetNotifications } from "@/services/queries";
import { convertToJalaliDate } from "@/utils";
import NotificationDetail from "./NotificationDetail";

const NotificationList: FC = () => {
  const { data: notifications, isLoading: notificationsIsLoading } =
    useGetNotifications();

  return (
    <Box className="flex flex-col">
      <Box className="mt-[21px] grid grid-cols-3 px-[18px] py-[14px] lg:grid-cols-5 lg:py-[18px]">
        <Title level={1} className="col-span-1">
          عنوان
        </Title>
        <Title level={1} className="col-span-1">
          تاریخ
        </Title>
        <Title level={1} className="col-span-1">
          وضعیت
        </Title>
        <Box className="col-span-1"></Box>
      </Box>
      {notificationsIsLoading ? (
        <Spinner color="brand.orange.normal" />
      ) : notifications?.data?.length == 0 ? null : (
        notifications?.data?.map(
          (item: {
            id: number;
            title: string;
            createdAt: Date;
            status: string;
          }) => (
            <Box
              key={item.id}
              className="grid grid-cols-3 border-b border-brand-white-normalActive px-[18px] py-[26px] text-brand-blue-normalActive lg:grid-cols-5"
            >
              <Box className="col-span-1 flex items-center justify-start">
                <Title level={1}>{item.title}</Title>
              </Box>
              <Box className="col-span-1 flex items-center justify-start">
                <Title level={1}>{convertToJalaliDate(item.createdAt)}</Title>
              </Box>
              <Box className="col-span-1 flex items-center justify-start">
                {/* <Title level={1}>{convertToJalaliDate(item.createdAt)}</Title> */}
                <Title level={1}>
                  {item.status == "unread" ? "خوانده‌نشده" : "خوانده‌شده"}
                </Title>
              </Box>
              <Box className="col-span-2 flex items-center justify-end">
                <NotificationDetail id={item.id} />
              </Box>
            </Box>
          )
        )
      )}
    </Box>
  );
};

export default NotificationList;
