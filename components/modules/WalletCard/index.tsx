"use client";
import React, { FC } from "react";

import CustomHeading from "@/components/ui/typography/CustomHeading";
import Logo from "@/components/ui/typography/Logo";
import Title from "@/components/ui/typography/Title";
import { Box } from "@chakra-ui/react";
import { UserRoleType } from "@/types";
import { useGetWalletBalance } from "@/services/queries";
import { addCommas } from "@persian-tools/persian-tools";

const WalletCard: FC<UserRoleType> = () => {
  const { data: walletBalance, isLoading: walletBalanceIsLoading } =
    useGetWalletBalance();

  return (
    <Box className="walletBalanceBackground flex w-full flex-col gap-[25px] rounded-3xl p-[30px] lg:justify-between lg:gap-0 lg:pb-[44px] lg:pl-[38px] lg:pr-[44px] lg:pt-[25px]">
      <Box className="flex w-full items-end justify-end">
        <Box
          as="span"
          className="h-[52px] w-[34px] items-end lg:h-[104px] lg:w-[69px]"
        >
          <Logo />
        </Box>
      </Box>
      {/* WALLET BALANCE */}
      <Box className="flex flex-col gap-[9px] text-brand-white-normal">
        <Title level={2} className="">
          موجودی کیف پول:
        </Title>
        <CustomHeading level={4} bold className="lg:hidden">
          {walletBalanceIsLoading ? null : addCommas(walletBalance?.balance)}
        </CustomHeading>
        <CustomHeading level={2} bold className="hidden lg:block">
          {walletBalanceIsLoading ? null : addCommas(walletBalance?.balance)}
        </CustomHeading>
      </Box>
    </Box>
  );
};

export default WalletCard;
