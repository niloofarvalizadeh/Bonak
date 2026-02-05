import React, { FC } from "react";

import CustomHeading from "@/components/ui/typography/CustomHeading";
import Logo from "@/components/ui/typography/Logo";
import { Box } from "@chakra-ui/react";
import MarketerForm from "@/components/forms/auth/signinForm/Marketer";

const MarketerSignInContainer: FC = () => {
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
          ورود
        </CustomHeading>

        <Box className="flex flex-col items-center gap-3">
          <span className="h-[104px] w-[69px]">
            <Logo />
          </span>
          <CustomHeading level={5} className="text-brand-blue-normal" bold>
            ورود در بنک سنتر
          </CustomHeading>
        </Box>
        <MarketerForm />
      </Box>
    </Box>
  );
};

export default MarketerSignInContainer;
