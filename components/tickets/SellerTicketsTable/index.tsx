"use client";
import React, { FC } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner
} from "@chakra-ui/react";
import { SearchNormal1 } from "iconsax-react";
import Link from "next/link";
import Title from "@/components/ui/typography/Title";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import { useGetSupportTickets, useGetTickets } from "@/services/queries";
import {
  convertToJalaliDate,
  mergeAndSortTickets,
  ticketStatusDisplayHandler
} from "@/utils";
import { UserRoleType } from "@/types";

const SellerTicketsTable: FC<UserRoleType> = ({ userRole }) => {
  const { data: tickets, isLoading: ticketsIsLoading } = useGetTickets();
  const { data: supportTickets, isLoading: supportTicketsIsLoading } =
    useGetSupportTickets();

  const mergedTickets = mergeAndSortTickets(
    tickets,
    supportTickets,
    ticketsIsLoading,
    supportTicketsIsLoading
  );

  return (
    <Box>
      <Box className="flex w-full items-center justify-between">
        <Box className="flex w-full items-center gap-8 lg:!w-3/4">
          <DashboardPageTitle>تیکت‌ها</DashboardPageTitle>
          <InputGroup width="80%">
            <InputLeftElement pointerEvents="none" paddingRight="13px">
              <SearchNormal1
                size="24"
                className="text-brand-blue-lightActive"
              />
            </InputLeftElement>
            <Input
              placeholder="جستجوی تیکت"
              paddingRight="47px"
              outline="none"
              rounded="8px"
              border="1px solid"
              borderColor="brand.white.normalHover"
              boxShadow="none"
              _focus={{ outline: "none", boxShadow: "none" }}
            />
          </InputGroup>
        </Box>
        <Link
          href={
            userRole == "seller"
              ? "/account/seller/tickets/new/support"
              : "/account/buyer/tickets/new"
          }
          className="hidden rounded-xl bg-brand-orange-normal px-6 py-2 text-white lg:block"
        >
          <Title level={2} bold>
            تیکت جدید
          </Title>
        </Link>
      </Box>
      <Box className="mt-4 w-full lg:hidden">
        <Link
          href={
            userRole == "seller"
              ? "/account/seller/tickets/new/support"
              : "/account/buyer/tickets/new"
          }
          className="rounded-xl bg-brand-orange-normal px-6 py-2 font-bold text-white"
        >
          تیکت جدید
        </Link>
      </Box>

      <Box className="flex flex-col">
        {ticketsIsLoading || supportTicketsIsLoading ? (
          <Box className="flex w-full items-center justify-center py-8">
            <Spinner size="lg" color="brand.orange.normal" />
          </Box>
        ) : !mergedTickets || mergedTickets.length === 0 ? (
          <Box className="flex w-full items-center justify-center py-8">
            <Title level={2} className="text-brand-blue-normal">
              هیچ تیکتی یافت نشد
            </Title>
          </Box>
        ) : (
          <>
            <Box className="mt-[21px] grid grid-cols-3 rounded-2xl bg-brand-white-normalHover px-[18px] py-[14px] lg:grid-cols-5 lg:py-[18px]">
              <Title level={1} className="col-span-1 hidden lg:block">
                شماره تیکت
              </Title>
              <Title level={1} className="col-span-1">
                عنوان
              </Title>
              <Title level={1} className="col-span-1">
                وضعیت
              </Title>
              <Title level={1} className="col-span-1 hidden lg:block">
                آخرین به‌روزرسانی
              </Title>
              <Box className="col-span-1"></Box>
            </Box>
            {mergedTickets?.map((item) => (
              <Box
                key={item.id}
                className="grid grid-cols-3 border-b border-brand-white-normalActive px-[18px] py-[26px] text-brand-blue-normalActive lg:grid-cols-5"
              >
                <Box className="col-span-1 hidden items-center justify-start lg:flex">
                  <Title level={1}>{item.id}</Title>
                </Box>
                <Box className="col-span-1 flex items-center justify-start">
                  <Title level={1} className="truncate">
                    {item.subject}
                  </Title>
                </Box>
                <Box className="col-span-1 flex items-center justify-start">
                  <Title level={1}>
                    {ticketStatusDisplayHandler(item.status)}
                  </Title>
                </Box>
                <Box className="col-span-1 hidden items-center justify-start lg:flex">
                  <Title level={1}>{convertToJalaliDate(item.createdAt)}</Title>
                </Box>
                <Box className="col-span-1 flex items-center justify-end">
                  <Link
                    href={`/account/${userRole}/tickets/${item.id}?type=${item.userType}`}
                    className="col-span-1 w-[102px] rounded-lg border border-brand-blue-normalActive p-[10px] text-center"
                  >
                    <Title level={1}>جزئیات</Title>
                  </Link>
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default SellerTicketsTable;
