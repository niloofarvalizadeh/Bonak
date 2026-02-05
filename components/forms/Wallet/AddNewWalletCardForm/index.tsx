import React, { FC } from "react";

import Title from "@/components/ui/typography/Title";
import { Box, Button } from "@chakra-ui/react";
import Input from "@/components/ui/elements/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddNewWalletCardFormSchema } from "@/schema";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { manageWalletCardAction } from "@/services/api";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import { useGetBankCards } from "@/services/queries";

interface IFormInput {
  cardNumber: string;
  cardHolderName: string;
  ibanNumber: string;
}
interface AddNewWalletCardFormProps {
  onClose: () => void;
}

const AddNewWalletCardForm: FC<AddNewWalletCardFormProps> = ({ onClose }) => {
  const { mutate: bankCardsMutate } = useGetBankCards();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(AddNewWalletCardFormSchema)
  });

  const { trigger: addNewAddress, isMutating: addNewAddressIsLoading } =
    useSWRMutation(
      "/account/api/v1/create-bank-card/",
      manageWalletCardAction,
      {
        onSuccess: (res) => {
          if (res.status == 201) {
            toast.success("کارت شما با موفقیت اضافه شد");
            bankCardsMutate();
            onClose();
          } else {
            toast.error(res.data.message);
          }
        },
        onError: () => {}
      }
    );

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { cardNumber, cardHolderName, ibanNumber } = data;
    addNewAddress({
      cardNumber,
      cardHolderName,
      ibanNumber,
      type: "add"
    });
  };

  return (
    <Box className="mb-20 mt-[33px] w-full lg:mt-[87px]">
      <DashboardPageTitle>افزودن کارت جدید</DashboardPageTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <Box as="div" className="grid grid-cols-1 gap-x-[24px] gap-y-[21px]">
          <Input
            label="شماره کارت"
            {...register("cardNumber")}
            error={errors.cardNumber?.message}
            placeholder="6037123456789012"
            dir="ltr"
          />
          <Input
            label="شماره شبا"
            {...register("ibanNumber")}
            error={errors.ibanNumber?.message}
            placeholder="IR123456789012345678901234"
            dir="ltr"
          />
          <Input
            label="صاحب حساب"
            {...register("cardHolderName")}
            error={errors.cardHolderName?.message}
            placeholder="نام صاحب حساب"
          />
        </Box>

        <Box className="flex w-full items-center justify-center">
          <Button
            className="!mt-[44px] !h-11 !w-[134px] lg:!mt-[68px]"
            borderRadius="12px"
            bg="brand.orange.normal"
            _hover={{
              bg: "brand.orange.normalHover"
            }}
            type="submit"
            isLoading={addNewAddressIsLoading}
          >
            <Title level={2} bold className="text-brand-white-normal">
              ثبت
            </Title>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddNewWalletCardForm;
