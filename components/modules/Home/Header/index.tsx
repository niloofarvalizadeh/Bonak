import React, { FC } from "react";

import { Box } from "@chakra-ui/react";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import Title from "@/components/ui/typography/Title";
import Link from "next/link";
import TitleImageShape from "@/utils/shapes/TitleImageShape";
import Image from "next/image";

const HomeHeader: FC = () => {
  return (
    <Box className="mt-11 flex w-full items-center justify-between">
      <Box className="flex w-full flex-col items-center lg:items-start">
        {/* TITLE SM */}
        <Box className="relative lg:hidden">
          <CustomHeading
            level={3}
            bold
            className="relative z-20 text-center text-brand-blue-normal"
          >
            از پخش‌کننده‌ها <br /> راحت‌تر و امن‌تر خرید کن!
          </CustomHeading>
        </Box>

        {/* TITLE LG */}
        <Box className="relative hidden lg:block">
          <h1 className="relative z-20 text-start text-[54px] font-bold text-brand-blue-normalActive">
            از پخش‌کننده‌ها <br /> راحت‌تر و امن‌تر خرید کن!
          </h1>
        </Box>

        {/* CAPTION SM */}
        <Title
          level={2}
          className="mt-[18px] text-center text-brand-blue-lightActive lg:hidden"
        >
          با بنک‌سنتر با خیال راحت و خیلی ساده از بهترین پخش کننده ها با بهترین
          قیمت خرید کن!
        </Title>

        {/* CAPTION LG */}
        <CustomHeading
          level={5}
          className="mt-[30px] hidden text-start text-brand-blue-lightActive lg:block"
        >
          با بنک‌سنتر با خیال راحت و خیلی ساده از بهترین پخش کننده <br /> ها با
          بهترین قیمت خرید کن!
        </CustomHeading>

        <Link
          href="/products"
          className="mt-6 flex h-11 w-[157px] items-center justify-center rounded-2xl border border-brand-orange-normal text-center"
        >
          <Title level={1} className="text-brand-orange-normal">
            محصولات
          </Title>
        </Link>
      </Box>
      <Box className="relative hidden lg:block">
        <Box className="relative z-10">
          <TitleImageShape />
        </Box>
        <Image
          src="/HomeHeaderBanner.png"
          alt="Home Header Banner"
          width={1000}
          height={0}
          className="absolute -bottom-6 left-0 z-20"
        />
      </Box>
    </Box>
  );
};

export default HomeHeader;
