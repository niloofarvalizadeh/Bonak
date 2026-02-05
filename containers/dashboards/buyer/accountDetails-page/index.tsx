"use client";
import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import Title from "@/components/ui/typography/Title";
import Input from "@/components/ui/elements/Input";
import { useGetBuyerAccountDetail } from "@/services/queries";

const BuyerDashboardAccountDetailsContainer: FC = () => {
  const { data: buyerAccount, isLoading: buyerAccountIsLoading } =
    useGetBuyerAccountDetail();

  console.log({ buyerAccount });

  return (
    <Box className="flex flex-col">
      <Box className="flex w-full items-center justify-between">
        <DashboardPageTitle>حساب کاربری</DashboardPageTitle>
        <Box className="rounded-2xl bg-brand-orange-light px-6 py-2 text-brand-orange-normal">
          <Title level={1} bold>
            مغازه‌دار
          </Title>
        </Box>
      </Box>
      {buyerAccountIsLoading ? (
        <Box className="flex w-full items-center justify-center text-brand-blue-normal">
          <Title level={2}>لطفا منتظر بمانید</Title>
        </Box>
      ) : !buyerAccount?.data ? (
        <Box className="flex w-full items-center justify-center text-brand-blue-normal">
          <Title level={2}>اطلاعاتی یافت نشد</Title>
        </Box>
      ) : (
        <Box className="mt-3 grid grid-cols-1 gap-x-[24px] gap-y-[21px] lg:grid-cols-2">
          <Input
            label="نام"
            isReadOnly
            defaultValue={buyerAccount.data.firstName}
          />
          <Input
            label="نام خانوادگی"
            isReadOnly
            defaultValue={buyerAccount.data.lastName}
          />
          <Input
            label="نام فروشگاه"
            isReadOnly
            defaultValue={buyerAccount.data.shopName}
          />
          <Input
            label="شناسه صنفی"
            isReadOnly
            defaultValue={buyerAccount.data.tradeId}
            dir="ltr"
          />
          <Input
            label="کد ملی"
            isReadOnly
            defaultValue={buyerAccount.data.nationalCode}
            dir="ltr"
          />
          <Input
            label="شماره تلفن مغازه"
            isReadOnly
            defaultValue={buyerAccount.data.workPhoneNumber}
            dir="ltr"
          />
          <Input
            label="ساعت کاری"
            isReadOnly
            defaultValue={`${buyerAccount.data.wordTime}`}
          />
          <Box className="flex items-center gap-4">
            <Title level={1} className="text-brand-blue-normal">
              وضعیت حساب کاربری
            </Title>
            <Box className="rounded-2xl bg-brand-orange-light px-6 py-2 text-brand-orange-normal">
              <Title level={1} bold>
                {buyerAccount?.data.isVerified == "inactive"
                  ? "غیرفعال"
                  : buyerAccount?.data.isVerified == "verified"
                    ? "تایید شده"
                    : "در انتظار تأیید"}
              </Title>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BuyerDashboardAccountDetailsContainer;
