"use client";
import React, { FC } from "react";
import {
  convertToJalaliDate,
  getStatusWalletColor,
  getWalletStatusLabelText
} from "@/utils";
import { addCommas } from "@persian-tools/persian-tools";
import { Transaction } from "@/types";
import { useGetWithdrawalRequestList } from "@/services/queries";
import { Box, Divider, Spinner } from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";

const LatestTransactions: FC = () => {
  const {
    data: withdrawalRequestList,
    isLoading: withdrawalRequestListIsLoading
  } = useGetWithdrawalRequestList();
  console.log({ withdrawalRequestList });
  const latestTransactions = withdrawalRequestListIsLoading
    ? []
    : withdrawalRequestList
      ? [...withdrawalRequestList]
          .sort(
            (a, b) =>
              new Date(b.requestDate).getTime() -
              new Date(a.requestDate).getTime()
          )
          .slice(0, 2)
      : [];

  return (
    <Box className="mt-4 flex w-full flex-col lg:mt-11">
      {withdrawalRequestListIsLoading ? (
        <Box className="flex w-full items-center justify-center py-8">
          <Spinner size="lg" color="brand.orange.normal" />
        </Box>
      ) : !latestTransactions || latestTransactions.length === 0 ? (
        <Box className="flex w-full items-center justify-center py-8">
          <Title level={2} className="text-brand-blue-normal">
            هیچ تراکنشی یافت نشد
          </Title>
        </Box>
      ) : (
        <>
          {latestTransactions.map((transaction: Transaction, index: number) => (
            <Box key={index}>
              <Divider
                width="100%"
                height="1px"
                color="brand.white.normalHover"
              />
              <Box className="flex items-start justify-between py-6">
                <Box className="flex flex-col gap-2">
                  <Title
                    level={1}
                    className={getStatusWalletColor(transaction.status)}
                  >
                    {getWalletStatusLabelText(transaction.status)}
                  </Title>
                  <Title level={2} className="text-brand-blue-lightActive">
                    {convertToJalaliDate(transaction.requestDate as Date)}
                  </Title>
                </Box>
                <Title
                  level={1}
                  className={getStatusWalletColor(transaction.status)}
                >
                  {addCommas(transaction.amount)} تومان
                </Title>
              </Box>
            </Box>
          ))}
          <Divider width="100%" height="1px" color="brand.white.normalHover" />
        </>
      )}
    </Box>
  );
};

export default LatestTransactions;
