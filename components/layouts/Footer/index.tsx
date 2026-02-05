"use client";
import React, { FC } from "react";

import { Box } from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";
import { InstagramIcon, TelegramIcon, WhatsappIcon } from "@/utils/Icons";
import CustomBody from "@/components/ui/typography/CustomBody";
import Link from "next/link";
import Image from "next/image";
import { useGetSocialLinks } from "@/services/queries";

const Footer: FC = () => {
  const { data: socialLinks, isLoading: socialLinksIsLoading } =
    useGetSocialLinks();

  console.log({ socialLinks });
  return (
    <Box as="footer" className="w-full lg:px-[70px]">
      <Box className="mt-20 w-full rounded-t-3xl border-l border-r border-t border-brand-white-normalHover">
        <Box className="flex w-full items-center justify-between p-5 lg:px-10 lg:pb-5 lg:pt-10">
          <Box className="flex flex-col gap-[14px] text-brand-blue-normal lg:flex-row lg:gap-20">
            <Link href="/about-us">
              <Title level={2}>درباره ما</Title>
            </Link>

            <Link href="/about-us">
              <Title level={2}>تماس با ما</Title>
            </Link>

            <Link href="/faq">
              <Title level={2}>سوالات متداول</Title>
            </Link>

            <Link href="/rules/buyer">
              <Title level={2}>شرایط و قوانین</Title>
            </Link>
          </Box>
          <Box className="flex h-full flex-col gap-[40px]">
            <Box className="flex items-center justify-center gap-7">
              {socialLinksIsLoading ? null : (
                <>
                  <Link
                    target="_blank"
                    href={`https://${socialLinks?.telegram}`}
                  >
                    <TelegramIcon />
                  </Link>
                  <Link
                    target="_blank"
                    href={`https://${socialLinks?.whatsapp}`}
                  >
                    <WhatsappIcon />
                  </Link>
                  <Link
                    target="_blank"
                    href={`https://${socialLinks?.instagram}`}
                  >
                    <InstagramIcon />
                  </Link>
                </>
              )}
            </Box>
            <Box className="flex items-center gap-6 lg:hidden">
              {socialLinksIsLoading ? null : (
                <>
                  <Link target="_blank" href={`${socialLinks?.digitalCert}`}>
                    <Image
                      src="/rezi.png"
                      alt="rezi"
                      className="size-[44px]"
                      width={1000}
                      height={0}
                    />
                  </Link>
                  <Link target="_blank" href={`${socialLinks?.ecunion}`}>
                    <Image
                      src="/kasbokar.png"
                      alt="kasbokar"
                      className="size-[44px]"
                      width={1000}
                      height={0}
                    />
                  </Link>
                  <Link 
                    target="_blank" 
                    rel="noopener noreferrer"
                    href="https://trustseal.enamad.ir/?id=657855&code="
                  >
                    <Image
                      src="https://reg2.enamad.ir/rc/outResource/dist/img/logopng/010.png"
                      alt="نماد اعتماد الکترونیکی"
                      className="size-[44px] cursor-pointer"
                      width={44}
                      height={44}
                    />
                  </Link>
                </>
              )}
            </Box>
          </Box>
        </Box>

        <Box className="mb-5 hidden w-full items-center justify-center lg:flex">
          <Box className="flex items-center gap-6">
            {socialLinksIsLoading ? null : (
              <>
                <Link target="_blank" href={`${socialLinks?.digitalCert}`}>
                  <Image
                    src="/rezi.png"
                    alt="rezi"
                    className="size-[44px]"
                    width={1000}
                    height={0}
                  />
                </Link>
                <Link target="_blank" href={`${socialLinks?.ecunion}`}>
                  <Image
                    src="/kasbokar.png"
                    alt="kasbokar"
                    className="size-[44px]"
                    width={1000}
                    height={0}
                  />
                </Link>
                <Link 
                  target="_blank" 
                  rel="noopener noreferrer"
                  href="https://trustseal.enamad.ir/?id=657855&code="
                >
                  <Image
                    src="https://reg2.enamad.ir/rc/outResource/dist/img/logopng/010.png"
                    alt="نماد اعتماد الکترونیکی"
                    className="size-[44px] cursor-pointer"
                    width={44}
                    height={44}
                  />
                </Link>
              </>
            )}
          </Box>
        </Box>
        <Box className="flex items-center justify-between bg-brand-orange-light py-[15px] pl-3 pr-4 lg:hidden">
          <CustomBody>
            برای تجربه بهتر و روان‌تر از برنامه استفاده کنید
          </CustomBody>
          <Link
            href="#"
            className="rounded-xl bg-brand-orange-normal px-4 py-2 text-white"
          >
            <CustomBody bold>دانلود برنامه</CustomBody>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;