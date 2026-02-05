"use client";
import React, { FC } from "react";

import { Box, Input } from "@chakra-ui/react";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import Breadcrumb from "@/components/ui/elements/Breadcrumb";
import Title from "@/components/ui/typography/Title";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import { addCommas, numberToWords } from "@persian-tools/persian-tools";
import { useGetWalletBalance } from "@/services/queries";
import { NumericFormat } from "react-number-format";
import Button from "@/components/ui/elements/Button";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { increaseWalletBalanceAction } from "@/services/api";
import toast from "react-hot-toast";

interface Props {
  userRole: "seller" | "buyer";
}

interface FormValues {
  amount: string;
}

const SellerDashboardIncreaseBalanceContainer: FC<Props> = ({ userRole }) => {
  const {
    data: walletBalance,
    isLoading: walletBalanceIsLoading,
    mutate: walletBalanceMutate
  } = useGetWalletBalance();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      amount: ""
    }
  });

  const {
    trigger: increaseWalletBalance,
    isMutating: increaseWalletBalanceIsLoading
  } = useSWRMutation(
      `/account/api/v1/fake-payment/`,
      increaseWalletBalanceAction,
      {
        onSuccess: (res) => {
          console.log({ res });
          if (res.status == 200) {
            toast.success("کیف پول با موفقیت شارژ شد");
            walletBalanceMutate();
            reset();
            setValue("amount", "");
          } else {
            toast.error(res.data.message);
          }
        },
        onError: () => {}
      }
  );

  const onSubmit = async (data: FormValues) => {
    await increaseWalletBalance({ amount: data.amount });
  };

  const amountValue = watch("amount");

  const isValidNumber = (value: string) => /^[0-9]*$/.test(value);

  console.log({ amountValue });
  return (
      <Box className="relative h-full w-full">
        <Breadcrumb
            hidden
            userRole={userRole}
            tags={["dashboard", "wallet", "walletIncreaseBalance"]}
        />
        <Box className="flex w-full items-center justify-between">
          <DashboardPageTitle>افزایش موجودی</DashboardPageTitle>
          <Box className="flex items-center gap-2 text-brand-blue-lightActive lg:gap-7">
            <Title level={1}>موجودی کیف پول:</Title>
            <CustomHeading level={2} bold>
              {walletBalanceIsLoading ? null : addCommas(walletBalance?.balance)}
            </CustomHeading>
          </Box>
        </Box>

        <Box className="w-full" as="form" onSubmit={handleSubmit(onSubmit)}>
          <Box className="mt-14 flex w-full flex-col items-center gap-2">
            <NumericFormat
                {...register("amount", {
                  required: "مبلغ مورد نظر الزامی است",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "فقط عدد مجاز است"
                  },
                  validate: (value) => isValidNumber(value) || "فقط عدد مجاز است"
                })}
                customInput={Input}
                width="100%"
                height="80px"
                rounded="8px"
                color="brand.yellow.normalActive"
                borderColor="brand.yellow.normalActive"
                fontSize="19px"
                fontWeight="bold"
                type="text"
                textAlign="center"
                placeholder="مبلغ دلخواه"
                inputMode="numeric"
                allowNegative={false}
                thousandSeparator
                onValueChange={(values) => {
                  setValue("amount", values.value);
                }}
            />
            {errors.amount && (
                <span className="text-red-500">{errors.amount.message}</span>
            )}
            <Title level={1} className="text-center">
              {amountValue && isValidNumber(amountValue)
                  ? `${numberToWords(Number(amountValue))} تومان`
                  : ""}
            </Title>
          </Box>
          <Button
              width="100%"
              height="52px"
              bg="brand.orange.normal"
              color="white"
              mt="32px"
              type="submit"
              isLoading={increaseWalletBalanceIsLoading}
          >
            <CustomHeading level={5} bold>
              تایید و افزایش موجودی
            </CustomHeading>
          </Button>
        </Box>
      </Box>
  );
};

export default SellerDashboardIncreaseBalanceContainer;
