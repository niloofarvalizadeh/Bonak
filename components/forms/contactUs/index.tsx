"use client";
import React, { FC } from "react";

import Title from "@/components/ui/typography/Title";
import { Box, Button } from "@chakra-ui/react";
import Input from "@/components/ui/elements/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactUsFormSchema } from "@/schema";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { contactFormAction } from "@/services/api";
import Textarea from "@/components/ui/elements/Textarea";
import PhoneNumberInput from "@/components/ui/elements/PhoneNumberInput";

interface IFormInput {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  message: string;
}

const ContactUsForm: FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(ContactUsFormSchema)
  });

  const { trigger: contactFormSubmit, isMutating: contactFormIsSubmitLoading } =
    useSWRMutation("/home/api/v1/contact-us/", contactFormAction, {
      onSuccess: (res) => {
        console.log({ res });
        if (res.status == 200 || res.status == 201) {
          toast.success("با موفقیت ثبت شد");
        } else {
          toast.error(res.data.message);
        }
      },
      onError: () => {}
    });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { firstName, lastName, message, phoneNumber } = data;

    const removeExtraSpaceNumber = phoneNumber.split(" ").join("");

    contactFormSubmit({
      firstName,
      lastName,
      message,
      phoneNumber: removeExtraSpaceNumber
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

          <PhoneNumberInput
            label="شماره تماس"
            onChange={(e) => {
              setValue("phoneNumber", e.target.value);
            }}
          />
        </Box>
        <Box className="mt-[21px] flex w-full flex-col gap-[21px]">
          <Textarea
            label="متن پیام"
            textAreaClassName="!h-36 lg:!h-24"
            placeholder="پیام خود را وارد کنید"
            {...register("message")}
            error={errors.message?.message}
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
            isLoading={contactFormIsSubmitLoading}
          >
            <Title level={1} bold className="text-brand-white-normal">
              ارسال
            </Title>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ContactUsForm;
