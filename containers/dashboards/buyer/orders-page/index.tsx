"use client";
import React, { FC } from "react";

import { Box, Spinner } from "@chakra-ui/react";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import Title from "@/components/ui/typography/Title";
import { MoreSquare } from "iconsax-react";
import Link from "next/link";
import { addCommas } from "@persian-tools/persian-tools";
import ReturnOrder from "@/components/modules/Buyer/ReturnOrder";
import { useGetUserOrderList } from "@/services/queries";
import { convertToJalaliDate } from "@/utils";

const BuyerDashboardOrdersContainer: FC = () => {
  const { data: orderList, isLoading: orderListIsLoading } =
    useGetUserOrderList();

  console.log({ orderList });
  return (
    <Box className="relative">
      <DashboardPageTitle>سفارشات</DashboardPageTitle>
      <Box className="mt-2 flex w-full flex-col gap-2">
        <Box className="mt-4 grid w-full grid-cols-4 text-brand-blue-normal">
          <Box className="flex items-center justify-center">
            <Title level={2}>شناسه سفارش</Title>
          </Box>
          <Box className="flex items-center justify-center">
            <Title level={2}>مبلغ کل سفارش</Title>
          </Box>
          <Box className="flex items-center justify-center">
            <Title level={2}>تاریخ</Title>
          </Box>
          <Box className="flex items-center justify-center">
            <Title level={2}>مبلغ پرداخت شده</Title>
          </Box>
        </Box>
        <Box className="flex w-full flex-col gap-4">
          {orderListIsLoading ? (
            <Spinner />
          ) : orderList?.length == 0 ? (
            <Title level={2} className="text-center">
              سفارشی وجود ندارد
            </Title>
          ) : (
            orderList?.map(
              (
                item: {
                  id: number;
                  totalAmount: number;
                  createdAt: Date;
                  paidAmount: number;
                },
                index: number
              ) => (
                <Box
                  key={index}
                  className="grid w-full grid-cols-4 rounded-2xl border border-brand-white-normalHover px-6 py-2"
                >
                  <Box className="flex items-center justify-center border-l border-brand-white-normalHover py-2 text-center text-brand-blue-normal">
                    <Title level={2} className="text-center" bold>
                      {item.id}
                    </Title>
                  </Box>
                  <Box className="flex items-center justify-center border-l border-brand-white-normalHover py-2 text-center text-brand-blue-normal">
                    <Title level={2} className="text-center">
                      {addCommas(item.totalAmount)}
                    </Title>
                  </Box>
                  <Box className="flex items-center justify-center border-l border-brand-white-normalHover py-2 text-center text-brand-blue-normal">
                    <Title level={2} className="text-center">
                      {convertToJalaliDate(item.createdAt)}
                    </Title>
                  </Box>
                  <Box className="relative flex items-center justify-center py-2 text-center text-brand-blue-normal">
                    <Title level={2} className="text-center" bold>
                      {addCommas(item.paidAmount)}
                    </Title>
                    <Link
                      href={`orders/${item.id}`}
                      className="absolute left-0"
                    >
                      <MoreSquare className="text-brand-orange-normal" />
                    </Link>
                  </Box>
                </Box>
              )
            )
          )}
        </Box>
        <ReturnOrder />
      </Box>
    </Box>
  );
};

export default BuyerDashboardOrdersContainer;
