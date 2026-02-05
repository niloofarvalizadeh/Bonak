"use client";
import React, { FC, useState } from "react";
import { Box, Input, Spinner } from "@chakra-ui/react";
import Breadcrumb from "@/components/ui/elements/Breadcrumb";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import WalletCard from "@/components/modules/WalletCard/WithdrawalRequest/WalletCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import AddNewWalletCardModal from "@/components/modules/Wallet/AddNewWalletCardModal";
import { numberToWords } from "@persian-tools/persian-tools";
import { NumericFormat } from "react-number-format";
import Button from "@/components/ui/elements/Button";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { withdrawalRequestAction } from "@/services/api";
import toast from "react-hot-toast";
import Title from "@/components/ui/typography/Title";
import "swiper/css";
import { useGetBankCards } from "@/services/queries";
import { ArrowLeft, TickCircle } from "iconsax-react";
import Link from "next/link";

interface FormValues {
  amount: string;
  note: string;
}

const SwiperBreakpointsConfig = {
  320: {
    slidesPerView: 1,
    spaceBetween: 10
  },
  640: {
    slidesPerView: 1,
    spaceBetween: 15
  },
  768: {
    slidesPerView: 1,
    spaceBetween: 15
  },
  1024: {
    slidesPerView: 2,
    spaceBetween: 20
  },
  1280: {
    slidesPerView: 2,
    spaceBetween: 24
  }
};

const SellerDashboardWalletWithdrawalRequestContainer: FC<{
  userRole: "seller" | "buyer";
}> = ({ userRole }) => {
  const { data: bankCards, isLoading: isLoadingBankCards } = useGetBankCards();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      amount: "",
      note: ""
    }
  });

  const {
    trigger: increaseWalletBalance,
    isMutating: increaseWalletBalanceIsLoading
  } = useSWRMutation(
      "/account/api/v1/withdrawal-request/",
      withdrawalRequestAction,
      {
        onSuccess: (res) => {
          if (res.status === 201) {
            toast.success("درخواست با موفقیت ثبت شد");
            reset();
            setSelectedCardId(null);
          } else {
            toast.error(res.data.message || "خطا در ثبت درخواست");
          }
        },
        onError: () => {
          toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
        }
      }
  );

  const onSubmit = async (data: FormValues) => {
    if (!selectedCardId) {
      toast.error("لطفاً یک کارت انتخاب کنید");
      return;
    }
    await increaseWalletBalance({
      amount: data.amount,
      note: data.note,
      cardId: selectedCardId
    });
  };

  const amountValue = watch("amount");

  return (
      <Box>
        <Breadcrumb
            hidden
            userRole="seller"
            tags={["dashboard", "wallet", "walletWithdrawalRequest"]}
        />
        <Box className="flex w-full items-center justify-between">
          <DashboardPageTitle>انتقال موجودی به کارت</DashboardPageTitle>
          <Link href={`/account/${userRole}/wallet/`}>
            <Button
                variant="outline"
                colorScheme="orange"
                className="!flex !items-center !gap-2 !text-brand-orange-normal"
            >
              بازگشت
              <ArrowLeft />
            </Button>
          </Link>
        </Box>

        <Box className="w-full" as="form" onSubmit={handleSubmit(onSubmit)}>
          <Box className="mt-14 flex w-full flex-col items-center gap-4">
            <NumericFormat
                {...register("amount", { required: "مبلغ مورد نظر الزامی است" })}
                customInput={Input}
                width="100%"
                height="80px"
                rounded="8px"
                color="brand.yellow.normalActive"
                borderColor="brand.yellow.normalActive"
                fontSize="19px"
                fontWeight="bold"
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
              {String(
                  numberToWords(Number(amountValue)) === "صفر"
                      ? ""
                      : `${numberToWords(Number(amountValue))} تومان`
              )}
            </Title>
            <Input
                {...register("note")}
                width="100%"
                height="80px"
                rounded="8px"
                color="brand.blue.normal"
                borderColor="brand.blue.normal"
                fontSize="16px"
                textAlign="center"
                placeholder="یادداشت (اختیاری)"
            />
          </Box>

          <Box className="mt-6 flex w-full flex-col gap-4">
            <CustomHeading level={5} className="text-brand-blue-normal">
              انتخاب حساب واریزی
            </CustomHeading>
          </Box>
          <Title level={2} className="mt-4">
            لطفا یکی از کارت‌های خود را انتخاب کنید
          </Title>
          <Box className="mt-4 w-full">
            {isLoadingBankCards ? (
                <Box className="flex w-full items-center justify-center py-8">
                  <Spinner size="lg" color="brand.orange.normal" />
                </Box>
            ) : !bankCards?.data || bankCards.data.length === 0 ? (
                <AddNewWalletCardModal />
            ) : (
                <Box className="w-full">
                  <Swiper
                      spaceBetween={12}
                      slidesPerView={1}
                      breakpoints={SwiperBreakpointsConfig}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: true
                      }}
                      modules={[Autoplay]}
                      className="w-full"
                  >
                    {bankCards.data.map(
                        (card: {
                          id: number;
                          cardNumber: string;
                          cardholderName: string;
                          ibanNumber: string;
                        }) => (
                            <SwiperSlide key={card.id}>
                              <Box
                                  onClick={() => setSelectedCardId(card.id)}
                                  className={`relative cursor-pointer`}
                              >
                                {selectedCardId === card.id && (
                                    <TickCircle
                                        className="absolute right-5 top-5 z-20 text-green-500"
                                        size={44}
                                    />
                                )}
                                <WalletCard
                                    id={card.id}
                                    cardNumber={card.cardNumber}
                                    cardholderName={card.cardholderName}
                                    ibanNumber={card.ibanNumber}
                                />
                              </Box>
                            </SwiperSlide>
                        )
                    )}
                    <SwiperSlide>
                      <AddNewWalletCardModal />
                    </SwiperSlide>
                  </Swiper>
                </Box>
            )}
          </Box>
          <Button
              width="100%"
              height="52px"
              bg="brand.orange.normal"
              color="white"
              mt="32px"
              type="submit"
              isLoading={increaseWalletBalanceIsLoading}
              isDisabled={!selectedCardId || !amountValue}
          >
            <CustomHeading level={5} bold>
              تایید و انتقال موجودی
            </CustomHeading>
          </Button>
        </Box>
      </Box>
  );
};

export default SellerDashboardWalletWithdrawalRequestContainer;
