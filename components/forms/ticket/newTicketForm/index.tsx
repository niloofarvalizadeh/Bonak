"use client";
import React, { FC, useState } from "react";

import { Box } from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";
import Input from "@/components/ui/elements/Input";
import Textarea from "@/components/ui/elements/Textarea";
import Button from "@/components/ui/elements/Button";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewTicketFromSchema } from "@/schema";
import CustomBody from "@/components/ui/typography/CustomBody";
import useSWRMutation from "swr/mutation";
import {
  createNewSellerTicketAction,
  createNewTicketAction
} from "@/services/api";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { UserRoleType } from "@/types";

interface IFormInput {
  subject: string;
  content: string;
  file?: File;
}

const NewTicketForm: FC<UserRoleType> = ({ userRole }) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const ticketType = searchParams.get("type");

  const sellerId = searchParams.get("id");

  const [fileName, setFileName] = useState<string | null>(null);
  const { trigger: createNewTicket, isMutating: createNewTicketIsLoading } =
    useSWRMutation(
      "/account/api/v1/support_ticket_create/",
      createNewTicketAction,
      {
        onSuccess: (res) => {
          if (res.status == 201) {
            toast.success("تیکت شما با موفقیت ساخته شد");
            push(`/account/${userRole}/tickets`);
          } else {
            toast.error(res.data.message);
          }
        },
        onError: () => {}
      }
    );
  const {
    trigger: createNewSellerTicket,
    isMutating: createNewSellerTicketIsLoading
  } = useSWRMutation(
    "/account/api/v1/seller_buyer_ticket_create/",
    createNewSellerTicketAction,
    {
      onSuccess: (res) => {
        if (res.status == 201) {
          toast.success("تیکت شما با موفقیت ساخته شد");
          push(`/account/${userRole}/tickets`);
        } else {
          toast.error(res.data.message);
        }
      },
      onError: () => {}
    }
  );
  console.log({ ticketType });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IFormInput>({
    resolver: yupResolver(NewTicketFromSchema)
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "application/pdf": []
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setValue("file", acceptedFiles[0]);
        setFileName(acceptedFiles[0].name);
      }
    }
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (ticketType == null) {
      createNewTicket({ ...data });
      console.log("nist");
    } else {
      if (!sellerId) {
        toast.error("شناسه فروشنده الزامی است");
        return;
      }
      console.log(sellerId, "hast");
      createNewSellerTicket({ ...data, seller: sellerId });
    }
  };
  return (
    <Box
      as="form"
      className="mt-11 flex flex-col items-center text-brand-blue-normal"
      onSubmit={handleSubmit(onSubmit, (e) => console.log({ e }))}
    >
      <Box className="flex w-full flex-col gap-11">
        {/* SUBJECT */}
        <Box className="flex flex-col gap-2">
          <Title level={2}>موضوع تیکت</Title>
          <Input {...register("subject")} />
          {errors.subject && (
            <CustomBody className="text-red-500">
              {errors.subject.message}
            </CustomBody>
          )}
        </Box>
        {/* DESCRIPTION */}
        <Box className="flex w-full flex-col gap-2">
          <Title level={2}>پیام تیکت</Title>
          <Textarea
            {...register("content")}
            textAreaClassName="lg:!h-[156px]"
          />
          {errors.content && (
            <CustomBody className="text-red-500">
              {errors.content.message}
            </CustomBody>
          )}
        </Box>
      </Box>
      {/* FILE */}
      <Box
        {...getRootProps()}
        className="fileUploadBox mt-[30px] flex w-full flex-col items-center justify-center rounded-xl py-[26px] lg:mt-[170px]"
      >
        <input {...getInputProps()} />
        <Title level={2} bold className="text-brand-orange-normal">
          بارگذاری فایل
        </Title>
        <Title level={2}>
          {fileName == null
            ? "فایل خود را انتخاب یا اینجا Drag کنید"
            : fileName}
        </Title>
      </Box>
      {errors.file && (
        <CustomBody className="text-red-500">{errors.file.message}</CustomBody>
      )}
      <Button
        type="submit"
        color="white"
        bg="brand.orange.normal"
        height="44px"
        width="128px"
        rounded="12px"
        marginTop="66px"
        isLoading={createNewTicketIsLoading || createNewSellerTicketIsLoading}
      >
        <Title level={2}>ارسال تیکت</Title>
      </Button>
    </Box>
  );
};

export default NewTicketForm;
