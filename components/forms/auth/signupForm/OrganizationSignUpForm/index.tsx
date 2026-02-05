"use client";
import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";
import Input from "@/components/ui/elements/Input";
import Select from "@/components/ui/elements/Select";
import Textarea from "@/components/ui/elements/Textarea";
import Button from "@/components/ui/elements/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { organizationSignUpAction } from "@/services/api";
import { OrganizationSignUpSchema } from "@/schema";
import { useRouter } from "next/navigation";

interface IFormInput {
  name: string;
  numberContact: string;
  typeEntity: "company" | "individual";
  categoryBusiness: string;
  address: string;
  fieldCollaboration: string;
  descriptionRequest?: string | null;
}

const OrganizationSignUpForm: FC = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(OrganizationSignUpSchema),
    defaultValues: {
      name: "",
      numberContact: "",
      typeEntity: "company",
      categoryBusiness: "",
      address: "",
      fieldCollaboration: "",
      descriptionRequest: ""
    }
  });

  const {
    trigger: completeOrganizationSignUp,
    isMutating: completeOrganizationSignUpIsLoading
  } = useSWRMutation(
    "/account/api/v1/organizational-request/",
    organizationSignUpAction,
    {
      onSuccess: (res) => {
        if (res.status === 200 || res.status === 201) {
          toast.success("از ثبت درخواست همکاری شما متشکریم. منتظر تماس کارشناسان بنک سنتر باشید.\n");
          push("/signin");
        } else {
          toast.error("خطا در ثبت‌نام");
          if(res.data.request_description == "This field may not be blank.")
          {
            toast.error("لطفا تمامی مقادیر را کامل کنید")
          }
        }
      },
      onError: () => {
        toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
      }
    }
  );

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    completeOrganizationSignUp({
      name: data.name,
      numberContact: data.numberContact,
      typeEntity: data.typeEntity,
      categoryBusiness: data.categoryBusiness,
      address: data.address,
      fieldCollaboration: data.fieldCollaboration,
      descriptionRequest: data.descriptionRequest || ""
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
            label="نام شرکت/شخص درخواست‌کننده"
            {...register("name")}
            error={errors.name?.message}
            placeholder="نام شرکت یا شخص را وارد کنید"
          />
          <Input
            label="شماره تماس"
            {...register("numberContact")}
            error={errors.numberContact?.message}
            placeholder="شماره تماس (11 رقم)"
            inputMode="numeric"
          />
          <Select
            label="نوع شخصیت"
            {...register("typeEntity")}
            placeholder="نوع شخصیت را انتخاب کنید"
          >
            <option value="company">حقوقی</option>
            <option value="individual">حقیقی</option>
          </Select>
          <Input
            label="رسته کاری"
            {...register("categoryBusiness")}
            error={errors.categoryBusiness?.message}
            placeholder="رشته کاری را وارد کنید"
          />
          <Input
            label="آدرس"
            {...register("address")}
            error={errors.address?.message}
            placeholder="آدرس را وارد کنید"
          />
          <Input
            label="زمینه همکاری"
            {...register("fieldCollaboration")}
            error={errors.fieldCollaboration?.message}
            placeholder="زمینه همکاری را وارد کنید"
          />
        </Box>
        <Box className="mt-[21px] flex w-full flex-col gap-[21px]">
          <Textarea
            label="توضیحات درخواست"
            textAreaClassName="!h-36 lg:!h-24"
            placeholder="توضیحات درخواست"
            {...register("descriptionRequest")}
            error={errors.descriptionRequest?.message}
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
            isLoading={completeOrganizationSignUpIsLoading}
          >
            <Title level={1} bold className="text-brand-white-normal">
              تأیید اطلاعات
            </Title>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default OrganizationSignUpForm;
