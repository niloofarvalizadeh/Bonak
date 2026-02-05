"use client";
import React, { FC, useState } from "react";

import PhoneNumberInput from "@/components/ui/elements/PhoneNumberInput";
import Title from "@/components/ui/typography/Title";
import { Box, Button } from "@chakra-ui/react";
import useSWRMutation from "swr/mutation";
import { sendInviteCodeAction } from "@/services/api";
import toast from "react-hot-toast";
import { useGetUserReferralCodeStatus } from "@/services/queries";

interface InviteFormProps {
  isMarketer: boolean;
}

const InviteForm: FC<InviteFormProps> = ({ isMarketer }) => {
  const [phonerNumber, setPhoneNumber] = useState("");
  const { mutate: refCodeStatusMuatet } = useGetUserReferralCodeStatus();
  const { trigger: sendInviteCode, isMutating: sendInviteCodeIsLoading } =
    useSWRMutation(
      isMarketer ? "/marketer/api/v1/send_sms/" : "/account/api/v1/send_sms/",
      sendInviteCodeAction,
      {
        onSuccess: (res) => {
          if (res.status == 200) {
            toast.success(res.data.message);
            refCodeStatusMuatet();
          } else {
            toast.error(res.data.message);
          }
        },
        onError: () => {}
      }
    );

  const submitHandler = () => {
    const removeExtraSpaceNumber = phonerNumber.split(" ").join("");
    sendInviteCode({ phoneNumber: removeExtraSpaceNumber });
  };
  return (
    <Box className="flex w-full items-center justify-center">
      <Box className="mt-[33px] w-full lg:w-[50%]">
        <PhoneNumberInput
          label="شماره تماس"
          value={phonerNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Button
          className="!mt-[20px] !h-12 !w-full"
          borderRadius="12px"
          bg="brand.orange.light"
          _hover={{
            bg: "brand.orange.lightHover"
          }}
          onClick={submitHandler}
          isLoading={sendInviteCodeIsLoading}
        >
          <Title level={1} bold className="text-brand-orange-normal">
            ارسال لینک دعوت
          </Title>
        </Button>
      </Box>
    </Box>
  );
};

export default InviteForm;
