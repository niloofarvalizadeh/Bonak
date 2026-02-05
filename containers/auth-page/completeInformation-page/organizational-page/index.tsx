import React, { FC } from "react";

import CustomHeading from "@/components/ui/typography/CustomHeading";
import Logo from "@/components/ui/typography/Logo";
import { Box } from "@chakra-ui/react";
import OrganizationSignUpForm from "@/components/forms/auth/signupForm/OrganizationSignUpForm";

const OrganizationContainer: FC = () => {
  return (
    <Box
      as="main"
      className="relative flex h-dvh flex-col items-center px-4 pt-[60px] lg:px-[70px]"
    >
      <Box as="section" className="flex w-full flex-col items-center lg:w-full">
        <CustomHeading
          level={5}
          className="w-full text-start text-brand-blue-normal lg:hidden"
          bold
        >
          ورود/ثبت نام
        </CustomHeading>

        <Box
          as="div"
          className="flex w-full items-center justify-center lg:justify-start"
        >
          <Box
            as="div"
            className="flex flex-col items-center gap-3 lg:flex-row lg:gap-[31px]"
          >
            <span className="h-[104px] w-[69px]">
              <Logo />
            </span>
            <CustomHeading level={5} className="text-brand-blue-normal" bold>
              ثبت نام سازمانی
            </CustomHeading>
          </Box>
        </Box>
        <OrganizationSignUpForm />
      </Box>
    </Box>
  );
};

export default OrganizationContainer;
