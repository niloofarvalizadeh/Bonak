import React, { FC } from "react";

import CustomHeading from "@/components/ui/typography/CustomHeading";
import Logo from "@/components/ui/typography/Logo";
import SignInForm from "@/components/forms/auth/signinForm";
import Link from "next/link";
import Title from "@/components/ui/typography/Title";
import { Box } from "@chakra-ui/react";

const SignInContainer: FC = () => {
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

        <Box className="flex flex-col items-center gap-3">
          <span className="h-[104px] w-[69px]">
            <Logo />
          </span>
          <CustomHeading level={5} className="text-brand-blue-normal" bold>
            ورود در بنک سنتر
          </CustomHeading>
        </Box>
        <SignInForm />

        <Box
          as="div"
          className="absolute bottom-10 flex flex-col items-center gap-6"
        >
          <Link href="/signup?organizational=active">
            <Title level={2} className="text-brand-orange-normal">
              برای ثبت نام سازمانی کلیک کنید
            </Title>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInContainer;
