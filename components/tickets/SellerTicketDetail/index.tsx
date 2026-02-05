"use client";
import React, { FC, useState } from "react";

import CustomHeading from "@/components/ui/typography/CustomHeading";
import Title from "@/components/ui/typography/Title";
import { useGetTicketDetail } from "@/services/queries";
import { Box, Input, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TicketMessageType } from "@/types";
import UserMessageCard from "../UserMessageCard";
import SupportMessageCard from "../SupportMessageCard";
import Button from "@/components/ui/elements/Button";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { snedNewMesseageInTicketAction } from "@/services/api";
import { convertToJalaliDate, ticketStatusDisplayHandler } from "@/utils";

interface SellerTicketDetailProps {
  ticketId: string;
  userRole: "seller" | "buyer";
}

const SellerTicketDetail: FC<SellerTicketDetailProps> = ({
  ticketId,
  userRole
}) => {
  const searchParams = useSearchParams();
  const ticketUserTypeFromSlug = searchParams.get("type");
  const [messageValue, setMessageValue] = useState("");
  const {
    data: ticketDetail,
    isLoading: ticketDetailIsLoading,
    mutate: ticketDetailMutate
  } = useGetTicketDetail(
    ticketUserTypeFromSlug as "seller" | "support",
    ticketId
  );

  console.log({ ticketDetail });
  const { trigger: sendMessage, isMutating: sendMessageIsLoading } =
    useSWRMutation(
      ticketUserTypeFromSlug == "support"
        ? `/account/api/v1/send_support_ticket_message/${ticketId}/`
        : `/account/api/v1/send_ticket_message/${ticketId}/`,
      snedNewMesseageInTicketAction,
      {
        onSuccess: (res) => {
          if (res.status == 201) {
            ticketDetailMutate();
            setMessageValue("");
          } else {
            toast.error(res.data.message);
          }
        },
        onError: () => {}
      }
    );

  const submitNewMessageHandle = () => {
    if (messageValue.length == 0) {
      toast.error("لطفا پیغام خود را بنویسید");
    } else {
      sendMessage({ content: messageValue });
    }
  };

  const ticketCreatedAt = ticketDetail?.[0]?.createdAt
    ? convertToJalaliDate(ticketDetail[0].createdAt)
    : "نامشخص";

  const ticketStatus = ticketDetail?.[0]?.status
    ? ticketDetail[0].status
    : "نامشخص";

  return (
    <Box className="flex w-full flex-col gap-11 lg:flex-row-reverse lg:gap-6">
      {/* TICKET INFORMATION */}
      <Box className="flex w-full flex-col gap-4 rounded-lg border border-brand-white-normalHover p-4 text-brand-blue-normal lg:h-dvh lg:w-[266px] lg:p-6">
        <CustomHeading level={5} bold>
          تیکت {ticketId}
        </CustomHeading>
        <Box className="flex items-center justify-between">
          <Title level={2}>وضعیت</Title>
          <Title level={2}>
            {ticketStatus !== "نامشخص"
              ? ticketStatusDisplayHandler(
                  ticketStatus as "open" | "in_progress" | "answered" | "closed"
                )
              : "نامشخص"}
          </Title>
        </Box>
        <Box className="flex items-center justify-between">
          <Title level={2}>تاریخ ثبت:</Title>
          <Title level={2}>{ticketCreatedAt}</Title>
        </Box>
        <Link
          href={`/account/${userRole}/tickets`}
          className="w-full rounded-xl border border-brand-orange-normal px-6 py-2 text-center text-brand-orange-normal lg:mt-16"
        >
          <Title level={2} bold>
            تیکت جدید
          </Title>
        </Link>
      </Box>
      {/* TICKET DETAIL */}
      <Box className="relative flex w-full flex-col gap-6 rounded-xl border-brand-white-normalHover p-4 pb-16 lg:border lg:p-6">
        {ticketDetailIsLoading && (
          <Box className="absolute flex h-full w-full items-center justify-center rounded-xl bg-white">
            <Spinner size="xl" color="brand.orange.normal" />
          </Box>
        )}
        {ticketDetailIsLoading
          ? null
          : ticketDetail?.map((item: TicketMessageType) => {
              if (ticketUserTypeFromSlug === "seller") {
                return item.senderType === "buyer" ? (
                  <UserMessageCard
                    key={item.id}
                    content={item.content}
                    createdAt={item.createdAt}
                    file={item.file}
                  />
                ) : (
                  <SupportMessageCard
                    key={item.id}
                    content={item.content}
                    createdAt={item.createdAt}
                    file={item.file}
                  />
                );
              }
              return item.senderType === "user" ? (
                <UserMessageCard
                  key={item.id}
                  content={item.content}
                  createdAt={item.createdAt}
                  file={item.file}
                />
              ) : (
                <SupportMessageCard
                  key={item.id}
                  content={item.content}
                  createdAt={item.createdAt}
                  file={item.file}
                />
              );
            })}
        <Box className="fixed bottom-12 left-0 flex w-full items-center gap-3 p-6 lg:absolute lg:bottom-0">
          <Input
            bg="brand.white.normalHover"
            width="70%"
            placeholder="پیغام جدید بفرستید"
            padding="16px"
            rounded="12px"
            height="54px"
            color="brand.blue.normal"
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
          />
          <Button
            width="30%"
            height="54px"
            padding="16px"
            bg="brand.blue.normal"
            color="brand.white.normal"
            rounded="12px"
            onClick={submitNewMessageHandle}
            isLoading={sendMessageIsLoading}
          >
            <Title level={2}>ارسال</Title>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SellerTicketDetail;
