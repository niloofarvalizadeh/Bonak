"use client";
import React, { FC, useState } from "react";

import Title from "@/components/ui/typography/Title";
import { Box, Button } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/ui/elements/Input";
import Select from "@/components/ui/elements/Select";
import { useGetCities, useGetNeighborhoods } from "@/services/queries";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompleteSignUpBuyerFormSchema } from "@/schema";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { completeInformationSignUpBuyerAction } from "@/services/api";
import Textarea from "@/components/ui/elements/Textarea";
import { deleteSession } from "@/libs/session";  // از تابع deleteSession استفاده کنیم

interface IFormInput {
  firstName: string;
  lastName: string;
  storeName: string;
  businessId: string;
  nationalCode: string;
  workPhone: string;
  wordTime: string;
  cityId: string;
  neighborhoodId: string;
  address: string;
}

const CompleteSignUpBuyerForm: FC = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const phoneNumberFromSlug = searchParams.get("phoneNumber");
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(CompleteSignUpBuyerFormSchema)
  });

  const [cityId, setCityId] = useState<null | string>(null);

  const { data: cities, isLoading: citiesIsLoading } = useGetCities();
  const { data: neighborhoods, isLoading: neighborhoodsIsLoading } =
    useGetNeighborhoods(cityId!, cityId !== null);

  const {
    trigger: completeInformationSignUpBuyer,
    isMutating: completeInformationSignUpBuyerIsLoading,
  } = useSWRMutation(
    "/account/api/v1/buyer/complete-buyer-information/",
    completeInformationSignUpBuyerAction,
    {
      onSuccess: async (res) => {
        console.log({ res });
        if (res.status == 200 || res.status == 201) {
          toast.success("حساب شما ثبت شد، لطفا منتظر تایید حساب خود بمانید.");

          // استفاده از async/await برای حذف سشن
          await deleteSession(); // فراخوانی تابع deleteSession به صورت async

          // هدایت به صفحه اصلی
          push(`/`);
        } else {
          toast.error("اکانت شما در دست تایید میباشد");
        }
      },
      onError: (err) => {
        if (err.code == "user_inactive") {
          toast.error("اکانت شما در دست تایید میباشد");
        }
      },
    }
  );

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    completeInformationSignUpBuyer({
      firstName: data.firstName,
      lastName: data.lastName,
      shopName: data.storeName,
      tradeID: data.businessId,
      nationalCode: data.nationalCode,
      workPhoneNumber: data.workPhone,
      wordTime: data.wordTime,
      neighborhoodId: data.neighborhoodId,
      address: data.address,
      user: phoneNumberFromSlug as string,
    });
  };

  return (
    <Box className="mt-[33px] w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          as="div"
          className="grid grid-cols-1 gap-x-[24px] gap-y-[21px] lg:grid-cols-2"
        >
          <Input
            label="نام"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <Input
            label="نام خانوادگی"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
          <Input
            label="اسم فروشگاه"
            {...register("storeName")}
            error={errors.storeName?.message}
          />
          <Input
            label="شناسه صنفی"
            {...register("businessId")}
            error={errors.businessId?.message}
          />
          <Input
            label="کد ملی"
            {...register("nationalCode")}
            error={errors.nationalCode?.message}
          />
          <Input
            label="شماره تلفن کاری"
            {...register("workPhone")}
            error={errors.workPhone?.message}
          />
          <Input
            label="ساعت کاری"
            {...register("wordTime")}
            error={errors.wordTime?.message}
          />
          <Input
            label="شماره تماس"
            isReadOnly
            isDisabled
            defaultValue={phoneNumberFromSlug! || ""}
          />
          <Select
            label="شهر"
            isDisabled={citiesIsLoading}
            placeholder={
              citiesIsLoading ? "لطفا منتظر بمانید" : "شهر خود را انتخاب کنید"
            }
            {...register("cityId")}
            onChange={(e) => setCityId(e.target.value)}
          >
            {citiesIsLoading
              ? null
              : cities?.map((item: { id: number; name: string }) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
          </Select>
          <Select
            label="منطقه"
            placeholder={
              cityId == null
                ? "لطفا ابتدا شهر خود را انتخاب کنید"
                : neighborhoodsIsLoading
                ? "لطفا منتظر بمانید"
                : neighborhoods?.length == 0
                ? "هیچ منقطه ای وجود ندارد"
                : ""
            }
            isDisabled={
              neighborhoodsIsLoading ||
              neighborhoods?.length == 0 ||
              cityId == null
            }
            {...register("neighborhoodId")}
          >
            {cityId == null
              ? null
              : neighborhoodsIsLoading
              ? null
              : neighborhoods?.map((item: { id: number; name: string }) => (
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
            isLoading={completeInformationSignUpBuyerIsLoading}
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

export default CompleteSignUpBuyerForm;
