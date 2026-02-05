"use client";
import React, { FC } from "react";
import { Box, Button } from "@chakra-ui/react";
import { WhiteLogo } from "@/components/ui/typography/Logo";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import Title from "@/components/ui/typography/Title";
import EditWalletCard from "../../Wallet/EditWalletCard";
import { CloseSquare } from "iconsax-react";
import { formatCardNumber, formatIbanNumber } from "@/utils";
import { deleteDataWithTokenAction } from "@/services/api";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { useGetBankCards } from "@/services/queries";

const WalletCard: FC<{
  id: number;
  cardNumber: string;
  cardholderName: string;
  ibanNumber: string;
}> = ({ id, cardNumber, cardholderName, ibanNumber }) => {
  const { mutate: bankCardsMutate } = useGetBankCards();

  const { trigger: deleteWalletCard, isMutating: deleteWalletCardIsLoading } =
    useSWRMutation(
      `/account/api/v1/delete-bank-card/${id}/`,
      deleteDataWithTokenAction,
      {
        onSuccess: (res) => {
          console.log({ res });
          if (res.status == 200) {
            bankCardsMutate();
            toast.success("کارت شما با موفقیت حذف شد");
          } else {
            toast.error(res.data.message);
          }
        },
        onError: () => {}
      }
    );
  return (
    <>
      <Box className="walletCardSelect flex w-full flex-col gap-[25px] rounded-3xl p-[30px] lg:h-[349px] lg:w-[638px] lg:justify-between lg:gap-0 lg:pb-[44px] lg:pl-[38px] lg:pr-[44px] lg:pt-[25px]">
        <Box className="flex w-full items-end justify-end pl-5 lg:pl-0">
          <Box
            as="span"
            className="h-[52px] w-[34px] items-end lg:h-[104px] lg:w-[69px]"
          >
            <WhiteLogo />
          </Box>
        </Box>

        <Box
          dir="ltr"
          className="hidden w-full flex-col items-center justify-center gap-2 text-white lg:flex"
        >
          <CustomHeading level={2}>
            {formatCardNumber(cardNumber)}
          </CustomHeading>
          <CustomHeading level={5}>
            {formatIbanNumber(ibanNumber)}
          </CustomHeading>
        </Box>
        <Box
          dir="ltr"
          className="flex w-full flex-col items-center justify-center gap-2 text-white lg:hidden"
        >
          <Title level={1}>{formatCardNumber(cardNumber)}</Title>
          <Title level={2}>{formatIbanNumber(ibanNumber)}</Title>
        </Box>
        {/* WALLET BALANCE */}
        <Box className="pt-[20px] text-brand-white-normal lg:pt-[63px]">
          <CustomHeading level={4} bold className="lg:hidden">
            {cardholderName}
          </CustomHeading>
          <CustomHeading level={2} bold className="hidden lg:block">
            {cardholderName}
          </CustomHeading>
        </Box>
      </Box>
      <Box className="flex w-full items-center justify-between lg:w-[638px]">
        <EditWalletCard id={id} />
        <Button
          onClick={() => {
            deleteWalletCard();
          }}
          isLoading={deleteWalletCardIsLoading}
          padding="0px"
          bg="none"
          _hover={{ bg: "none" }}
        >
          <CloseSquare className="text-red-500" />
        </Button>
      </Box>
    </>
  );
};

export default WalletCard;
