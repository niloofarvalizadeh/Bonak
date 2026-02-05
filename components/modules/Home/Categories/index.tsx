import CustomHeading from "@/components/ui/typography/CustomHeading";
import { Box } from "@chakra-ui/react";
import React, { FC } from "react";
// import CategoryCard from "./CategoryCard";
import Title from "@/components/ui/typography/Title";
import CustomBody from "@/components/ui/typography/CustomBody";
import DynamicCategories from "./DynamicCategories";
import Link from "next/link";

const HomeCategories: FC = () => {
  return (
    <Box className="mt-4 py-[10px] lg:mt-[41px]">
      {/* TITLE */}
      <Box className="relative">
        <Box className="relative z-10 h-[1px] w-full bg-brand-blue-light"></Box>
        <Box className="absolute -top-5 left-1/2 z-20 -translate-x-1/2 transform bg-white p-[10px] lg:-top-8">
          <CustomHeading
            level={3}
            className="hidden w-full overflow-hidden text-ellipsis whitespace-nowrap text-brand-blue-normal lg:block"
            bold
          >
            دسته بندی محصولات
          </CustomHeading>
          <CustomHeading
            level={5}
            className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-brand-blue-normal lg:hidden"
            bold
          >
            دسته بندی محصولات
          </CustomHeading>
        </Box>
      </Box>

      <DynamicCategories />
      {/* SHOW ALL BUTTON */}
      <Box className="relative mt-[14px] lg:mt-6">
        <Box className="relative z-10 h-[1px] w-full bg-brand-blue-light"></Box>
        <Box
          as={Link}
          href="/categories"
          className="absolute -top-5 left-1/2 z-20 -translate-x-1/2 transform bg-white p-[10px] lg:-top-5"
        >
          <Title
            level={1}
            className="hidden w-full overflow-hidden text-ellipsis whitespace-nowrap text-brand-blue-normal lg:block"
          >
            مشاهده همه
          </Title>
          <CustomBody className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-brand-blue-normal lg:hidden">
            مشاهده همه
          </CustomBody>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeCategories;
