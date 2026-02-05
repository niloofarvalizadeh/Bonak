"use client";
import React, { FC, useState } from "react";
import PhoneNumberInput from "@/components/ui/elements/PhoneNumberInput";
import Title from "@/components/ui/typography/Title";
import { Box, Button } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { sendOtpCodeAction } from "@/services/api";
import toast from "react-hot-toast";

const BuyerForm: FC<{ organizational?: string | null }> = ({
  organizational
}) => {
  const { push } = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const searchParams = useSearchParams();
  const refCode = searchParams.get("referral-code");

  const { trigger: sendOtpCode, isMutating: sendOtpCodeIsLoading } =
    useSWRMutation("/account/api/v1/send-otp/", sendOtpCodeAction, {
      onSuccess: (res) => {
        const removeExtraSpaceNumber = phoneNumber.split(" ").join("");
        if (res.status === 200) {
          const baseUrl = `/verify-code?phoneNumber=${removeExtraSpaceNumber}&status=si&role=buyer`;
          const refCodeParam = refCode ? `&referral-code=${refCode}` : "";
          const orgParam = organizational
            ? `&organizational=${organizational}`
            : "";
          push(`${baseUrl}${refCodeParam}${orgParam}`);
        } else {
          toast.error(res.data.message || "خطا در ارسال کد OTP");
        }
      },
      onError: () => {
        toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
      }
    });

  const submitHandler = () => {
    if(organizational == "active")
    {
      const removeExtraSpaceNumber = phoneNumber.split(" ").join("");
      const baseUrl = `/signup/organizational?phoneNumber=${removeExtraSpaceNumber}`;
      push(`${baseUrl}`);
    }
    else
    {
      const removeExtraSpaceNumber = phoneNumber.split(" ").join("");
      if (!removeExtraSpaceNumber) {
        toast.error("لطفاً شماره تماس را وارد کنید");
        return;
      }
      sendOtpCode({ phoneNumber: removeExtraSpaceNumber });
    }
  };

  return (
    <Box className="mt-[33px] w-full">
      <PhoneNumberInput
        label="شماره تماس"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Button
        className="!mt-[44px] !h-12 !w-full"
        borderRadius="12px"
        bg="brand.orange.light"
        _hover={{
          bg: "brand.orange.lightHover"
        }}
        onClick={submitHandler}
        isLoading={sendOtpCodeIsLoading}
      >
        <Title level={1} bold className="text-brand-orange-normal">
          {organizational == "active" ? "ثبت نام ": "دریافت کد" }
        </Title>
      </Button>
    </Box>
  );
};

export default BuyerForm;
