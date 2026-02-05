"use client";
import React, { FC, useState } from "react";

import PhoneNumberInput from "@/components/ui/elements/PhoneNumberInput";
import Title from "@/components/ui/typography/Title";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { sendOtpCodeAction } from "@/services/api";
import toast from "react-hot-toast";

const SellerForm: FC = () => {
  const { push } = useRouter();
  const [phonerNumber, setPhoneNumber] = useState("");

  const { trigger: sendOtpCode, isMutating: sendOtpCodeIsLoading } =
    useSWRMutation("/account/api/v1/send-otp/", sendOtpCodeAction, {
      onSuccess: (res) => {
        console.log({ res });
        const removeExtraSpaceNumber = phonerNumber.split(" ").join("");
        if (res.status == 200) {
          push(
            `/verify-code?phoneNumber=${removeExtraSpaceNumber}&code=${res.data.data.otpCode}&status=si&role=seller`
          );
        } else {
          toast.error(res.data.message);
        }
      },
      onError: () => {}
    });

  const submitHandler = () => {
    const removeExtraSpaceNumber = phonerNumber.split(" ").join("");
    sendOtpCode({ phoneNumber: removeExtraSpaceNumber });
  };
  return (
    <Box className="mt-[33px] w-full">
      <PhoneNumberInput
        label="شماره تماس"
        value={phonerNumber}
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
          دریافت کد
        </Title>
      </Button>
    </Box>
  );
};

export default SellerForm;
