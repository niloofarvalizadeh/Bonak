"use client";
import React, { FC, memo } from "react";
import { Box, Skeleton, Alert, AlertIcon } from "@chakra-ui/react";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import Title from "@/components/ui/typography/Title";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import { useGetFullUserName, useGetUserMessages } from "@/services/queries";

interface Message {
  id: string | number;
  message: string;
  color: "red" | "green" | "gray" | "yellow" | "blue";
}

const MessageItem: FC<{ message: Message }> = memo(({ message }) => {
  const dynamicClass = {
    gray: "rounded-2xl bg-gray-400 px-[18px] py-[14px]",
    blue: "rounded-2xl bg-blue-400 px-[18px] py-[14px]",
    yellow: "rounded-2xl bg-brand-ogBox px-[18px] py-[14px]",
    red: "rounded-2xl bg-brand-logOut px-[18px] py-[14px]",
    green: "rounded-2xl bg-brand-grBox px-[18px] py-[14px]"
  };

  return (
    <Box className={dynamicClass[message.color]} role="alert">
      <CustomHeading level={5}>{message.message}</CustomHeading>
    </Box>
  );
});

MessageItem.displayName = "MessageItem";

const BuyerDashboardContainer: FC = () => {
  const {
    data: userMessages,
    isLoading: userMessagesIsLoading,
    error: userMessagesError
  } = useGetUserMessages();
  const { data: userInformation, isLoading: userInformationIsLoading } =
    useGetFullUserName();

  const renderMessages = () => {
    if (userMessagesError) {
      return (
        <Alert status="error">
          <AlertIcon />
          خطایی در بارگذاری پیام‌ها رخ داد. لطفاً دوباره تلاش کنید.
        </Alert>
      );
    }

    if (userMessagesIsLoading) {
      return (
        <>
          {Array(3)
            .fill(0)
            ?.map((_, index) => (
              <Skeleton key={index} height="60px" borderRadius="2xl" />
            ))}
        </>
      );
    }

    if (!userMessages || userMessages.length === 0) {
      return (
        <Box textAlign="center" p={4}>
          <CustomHeading level={5}>
            هیچ پیامی برای نمایش وجود ندارد.
          </CustomHeading>
        </Box>
      );
    }

    return userMessages?.map((item: Message) => (
      <MessageItem key={item.id} message={item} />
    ));
  };

  return (
    <Box className="flex w-full flex-col gap-11" as="section">
      <Box className="flex flex-col gap-3">
        <DashboardPageTitle>پیشخوان</DashboardPageTitle>
        <Title level={1}>
          {userInformationIsLoading ? (
            <Skeleton height="40px" width="200px" />
          ) : (
            `${userInformation?.name} عزیز!`
          )}
        </Title>
      </Box>
      <Box className="flex w-full flex-col gap-6">{renderMessages()}</Box>
    </Box>
  );
};

export default BuyerDashboardContainer;
