"use client";
import React, { FC } from "react";
import { Box, Button } from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";
import Input from "@/components/ui/elements/Input";
import Textarea from "@/components/ui/elements/Textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useSWRMutation from "swr/mutation";
import { editSellerProfileAction } from "@/services/api";
import toast from "react-hot-toast";

interface IFormInput {
  fullName?: string;
  companyName?: string;
  workPhoneNumber?: string;
  address?: string;
  description?: string;
}

const EditProfileFormSchema = Yup.object().shape({
  fullName: Yup.string().optional(),
  companyName: Yup.string().optional(),
  workPhoneNumber: Yup.string().optional(),
  address: Yup.string().optional(),
  description: Yup.string().optional()
});

const EditProfileForm: FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(EditProfileFormSchema)
  });

  const { trigger: editSellerProfile, isMutating: editSellerProfileIsLoading } =
    useSWRMutation(
      "/account/api/v1/seller_information_change_request/",
      editSellerProfileAction,
      {
        onSuccess: (res) => {
          console.log({ res });
          if (res.status === 200 || res.status === 201) {
            toast.success(
              "درخواست ویرایش اطلاعات با موفقیت ارسال شد. لطفا منتظر تایید ادمین باشید."
            );
            onClose();
          } else {
            toast.error(res.data.message || "خطا در ارسال درخواست");
          }
        },
        onError: () => {
          toast.error("خطا در ارتباط با سرور");
        }
      }
    );

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { fullName, companyName, workPhoneNumber, address, description } =
      data;
    const payload: {
      fullName?: string;
      companyName?: string;
      address?: string;
      workPhoneNumber?: string;
      description?: string;
    } = {};

    if (fullName) payload.fullName = fullName;
    if (companyName) payload.companyName = companyName;
    if (workPhoneNumber) payload.workPhoneNumber = workPhoneNumber;
    if (address) payload.address = address;
    if (description) payload.description = description;

    if (Object.keys(payload).length === 0) {
      toast.error("لطفا حداقل یک فیلد را پر کنید");
      return;
    }

    editSellerProfile(payload);
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
            label="شماره تلفن کاری"
            {...register("workPhoneNumber")}
            error={errors.workPhoneNumber?.message}
            type="number"
          />
          <Input
            label="نام فروشگاه"
            {...register("companyName")}
            error={errors.companyName?.message}
          />
          <Box className=""></Box>
          <Textarea
            label="آدرس"
            {...register("address")}
            error={errors.address?.message}
          />
          <Textarea
            label="توضیحات"
            {...register("description")}
            error={errors.description?.message}
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
            isLoading={editSellerProfileIsLoading}
          >
            <Title level={1} bold className="text-brand-white-normal">
              ارسال درخواست
            </Title>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditProfileForm;
