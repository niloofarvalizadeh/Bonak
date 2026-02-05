"use client";
import React, { FC } from "react";

import Title from "@/components/ui/typography/Title";
import { Box, Button } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/ui/elements/Input";
import Select from "@/components/ui/elements/Select";
import { useGetCities } from "@/services/queries";
import Textarea from "@/components/ui/elements/Textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompleteSignUpSellerFormSchema } from "@/schema";
import useSWRMutation from "swr/mutation";
import { completeInformationSignUpSellerAction } from "@/services/api";
import toast from "react-hot-toast";
import { deleteSession } from "@/libs/session"; // تابع deleteSession برای حذف سشن‌ها

interface IFormInput {
  fullName: string;
  companyName: string;
  workPhoneNumber: string;
  cityId: string;
  address: string;
}

const CompleteSignUpSellerForm: FC = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const phoneNumberFromSlug = searchParams.get("phoneNumber");
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(CompleteSignUpSellerFormSchema)
  });

  const { data: cities, isLoading: citiesIsLoading } = useGetCities();
  const {
    trigger: completeInformationSignUpSeller,
    isMutating: completeInformationSignUpSellerIsLoading
  } = useSWRMutation(
    "/account/api/v1/seller/create/",
    completeInformationSignUpSellerAction,
    {
      onSuccess: async (res) => {
        console.log({ res });
        if (res.status == 200 || res.status == 201) {
          toast.success("حساب شما ثبت شد، لطفا منتظر تایید حساب خود بمانید");

          // استفاده از async/await برای حذف سشن‌ها
          await deleteSession(); // اینجا تابع deleteSession فراخوانی می‌شود

          // هدایت به صفحه اصلی بعد از حذف سشن
          push(`/`);
        } else {
          toast.error(res.data.message);
        }
      },
      onError: () => {
        toast.error("خطا در ارسال اطلاعات");
      }
    }
  );

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { address, companyName, fullName, workPhoneNumber } = data;
    completeInformationSignUpSeller({
      fullName,
      user: phoneNumberFromSlug as string,
      workPhoneNumber,
      address,
      companyName
    });
  };

  return (
    <Box className="mt-[33px] w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="grid grid-cols-1 gap-x-[24px] gap-y-[21px] lg:grid-cols-2">
          <Input
            label="نام و نام خانوادگی"
            {...register("fullName")}
            error={errors.fullName?.message}
          />

          <Input
            label="شماره تماس"
            isReadOnly
            isDisabled
            defaultValue={phoneNumberFromSlug! || ""}
          />
          <Input
            label="شماره تلفن کاری"
            {...register("workPhoneNumber")}
            error={errors.workPhoneNumber?.message}
          />
          <Input
            label="نام فروشگاه"
            {...register("companyName")}
            error={errors.companyName?.message}
          />

          <Select
            label="شهر"
            isDisabled={citiesIsLoading}
            placeholder={
              citiesIsLoading ? "لطفا منتظر بمانید" : "شهر خود را انتخاب کنید"
            }
            {...register("cityId")}
          >
            {citiesIsLoading
              ? null
              : cities?.map((item: { id: number; name: string }) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
          </Select>
        </Box>
        <Box className="mt-[21px] flex w-full flex-col gap-[21px]">
          <Textarea
            label="آدرس"
            textAreaClassName="!h-36 lg:!h-24"
            placeholder="آدرس خود را وارد کنید"
            {...register("address")}
            error={errors.address?.message}
          />
        </Box>

        <Box className="flex w-full items-center justify-center">
          <Button
            className="!mt-[44px] !h-12 !w-full lg:!w-[494px]"
            borderRadius="12px"
            bg="brand.orange.normal"
            _hover={{
              bg: "brand.orange.normalHover"
            }}
            type="submit"
            isLoading={completeInformationSignUpSellerIsLoading}
          >
            <Title level={1} bold className="text-brand-white-normal">
              تایید اطلاعات
            </Title>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CompleteSignUpSellerForm;
