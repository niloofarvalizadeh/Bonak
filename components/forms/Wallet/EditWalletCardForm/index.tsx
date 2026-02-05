import React, { FC, useEffect } from "react";

import Title from "@/components/ui/typography/Title";
import { Box, Button, Spinner } from "@chakra-ui/react";
import Input from "@/components/ui/elements/Input";
import { useGetBankCardDetail, useGetBankCards } from "@/services/queries";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddNewWalletCardFormSchema } from "@/schema";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { manageWalletCardAction } from "@/services/api";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";

interface IFormInput {
  cardNumber: string;
  cardHolderName: string;
  ibanNumber: string;
}

interface EditWalletCardFormProps {
  onClose: () => void;
  id: number;
}

const EditWalletCardForm: FC<EditWalletCardFormProps> = ({ onClose, id }) => {
  const { mutate: bankCardsMutate } = useGetBankCards();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(AddNewWalletCardFormSchema)
  });

  const { data: bankCardsDetail, isLoading: bankCardsDetailIsLoading } =
    useGetBankCardDetail(id);

  console.log({ bankCardsDetail });
  useEffect(() => {
    if (bankCardsDetail) {
      const { cardholderName, ibanNumber, cardNumber } = bankCardsDetail.data;
      setValue("cardHolderName", cardholderName);
      setValue("ibanNumber", ibanNumber);
      setValue("cardNumber", cardNumber);
    }
  }, [bankCardsDetail, setValue]);

  const { trigger: editBankCard, isMutating: editBankCardIsLoading } =
    useSWRMutation(
      `/account/api/v1/update-bank-card/${id}/`,
      manageWalletCardAction,
      {
        onSuccess: (res) => {
          console.log({ res });
          if (res.status == 200) {
            toast.success("کارت شما با موفقیت ویرایش شد");
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
    editBankCard({
      type: "edit",
      ...data
    });
  };

  return (
    <Box className="mb-20 mt-[33px] w-full lg:mt-[87px]">
      <DashboardPageTitle>ویرایش کارت بانکی</DashboardPageTitle>
      {bankCardsDetailIsLoading && (
        <Box className="absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center rounded-xl bg-white">
          <Spinner size="xl" color="brand.orange.normal" />
        </Box>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <Box as="div" className="grid grid-cols-1 gap-x-[24px] gap-y-[21px]">
          <Input
            label="شماره کارت"
            {...register("cardNumber")}
            error={errors.cardNumber?.message}
            isDisabled={bankCardsDetailIsLoading}
            dir="ltr"
          />
          <Input
            label="شماره شبا"
            {...register("ibanNumber")}
            error={errors.ibanNumber?.message}
            isDisabled={bankCardsDetailIsLoading}
            dir="ltr"
          />
          <Input
            label="صاحب حساب"
            {...register("cardHolderName")}
            error={errors.cardHolderName?.message}
            isDisabled={bankCardsDetailIsLoading}
          />
        </Box>

        <Box className="flex w-full items-center justify-center gap-2">
          <Button
            className="!mt-[44px] !h-11 !w-[134px] lg:!mt-[68px]"
            borderRadius="12px"
            bg="brand.orange.normal"
            _hover={{
              bg: "brand.orange.normalHover"
            }}
            type="submit"
            isLoading={editBankCardIsLoading}
          >
            <Title level={2} bold className="text-brand-white-normal">
              ویرایش اطلاعات
            </Title>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditWalletCardForm;
