"use client";
import React, { FC } from "react";

import { Box, Spinner } from "@chakra-ui/react";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import Title from "@/components/ui/typography/Title";
import { MoreSquare } from "iconsax-react";
import Link from "next/link";
import { useGetSellerOrders } from "@/services/queries";
import { convertToJalaliDate, productStatusMap } from "@/utils";

const SellerDashboardOrdersContainer: FC = () => {
  const { data: orderList, isLoading: orderListIsLoading } =
    useGetSellerOrders();

  console.log({ orderList });
  const getProductStatusText = (status: string): string => {
    return productStatusMap[status] || "نامشخص";
  };

  return (
    <Box className="relative">
      <DashboardPageTitle>سفارشات</DashboardPageTitle>
      <Box className="mt-2 flex w-full flex-col gap-2">
        <Box className="mt-4 grid w-full grid-cols-4 text-brand-blue-normal lg:grid-cols-5">
          <Box className="flex items-center justify-center">
            <Title level={2} bold>
              شناسه سفارش
            </Title>
          </Box>
          <Box className="hidden items-center justify-center lg:flex">
            <Title level={2} bold>
              نام خریدار
            </Title>
          </Box>
          <Box className="flex items-center justify-center">
            <Title level={2} bold>
              وضعیت
            </Title>
          </Box>
          <Box className="hidden items-center justify-center lg:flex">
            <Title level={2} bold>
              نوع خرید
            </Title>
          </Box>
          <Box className="flex items-center justify-center">
            <Title level={2} bold>
              تاریخ ثبت
            </Title>
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
                  quantity: number;
                  productStatus: string;
                  createdAt: Date;
                  paymentMethods: "cash";
                  buyer: {
                    firstName: string;
                    lastName: string;
                  };
                },
                index: number
              ) => (
                <Box
                  key={index}
                  className="relative grid w-full grid-cols-4 rounded-2xl border border-brand-white-normalHover px-6 py-2 lg:grid-cols-5"
                >
                  <Box className="flex items-center justify-center border-l border-brand-white-normalHover py-2 text-center text-brand-blue-normal">
                    <Title level={2} className="text-center" bold>
                      {item.id}
                    </Title>
                  </Box>
                  <Box className="hidden items-center justify-center border-l border-brand-white-normalHover py-2 text-center text-brand-blue-normal lg:flex">
                    <Title level={2} className="text-center">
                      {`${item.buyer.firstName} ${item.buyer.lastName}`}
                    </Title>
                  </Box>
                  <Box className="flex items-center justify-center border-l border-brand-white-normalHover py-2 text-center text-brand-blue-normal">
                    <Title level={2} className="text-center">
                      {getProductStatusText(item.productStatus)}
                    </Title>
                  </Box>
                  <Box className="hidden items-center justify-center border-l border-brand-white-normalHover py-2 text-center text-brand-blue-normal lg:flex">
                    <Title level={2} className="text-center">
                      نقدی
                    </Title>
                  </Box>
                  <Box className="relative flex items-center justify-center py-2 text-center text-brand-blue-normal">
                    <Title level={2} className="text-center" bold>
                      {convertToJalaliDate(item.createdAt)}
                    </Title>
                  </Box>
                  <Link
                    href={`orders/${item.id}`}
                    className="absolute left-3 top-3"
                  >
                    <MoreSquare className="text-brand-orange-normal" />
                  </Link>
                </Box>
              )
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SellerDashboardOrdersContainer;
