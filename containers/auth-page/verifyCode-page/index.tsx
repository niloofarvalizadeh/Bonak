import React, { FC } from "react";

import CustomHeading from "@/components/ui/typography/CustomHeading";
import VerifyCodeForm from "@/components/forms/auth/verifyCodeForm";
import { Box } from "@chakra-ui/react";

const VerifyCodeContainer: FC = () => {
  return (
    <Box
      as="main"
      className="relative flex h-dvh flex-col items-center px-4 pt-[60px]"
    >
      <Box
        as="section"
        className="flex w-full flex-col items-center lg:w-[494px]"
      >
        <CustomHeading
          level={5}
          className="w-full text-start text-brand-blue-normal lg:hidden"
          bold
        >
          ورود/ثبت نام
        </CustomHeading>

        <VerifyCodeForm />
      </Box>
    </Box>
  );
};

export default VerifyCodeContainer;
