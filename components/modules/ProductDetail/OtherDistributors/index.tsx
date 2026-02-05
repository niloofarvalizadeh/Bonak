import React, { FC } from "react";

import { Box, Tooltip } from "@chakra-ui/react";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import Title from "@/components/ui/typography/Title";
import Link from "next/link";
import camelcaseKeys from "camelcase-keys";
import { addCommas } from "@persian-tools/persian-tools";

async function getOtherSellers(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DEV_API_URL}/product/api/v1/other_sellers/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ seller_product_id: id })
    }
  );

  const productDetail = await res.json();

  const camelCasedProductDetail = camelcaseKeys(productDetail, {
    deep: true
  });

  return camelCasedProductDetail;
}

interface OtherDistributorsProps {
  productId: string;
  isAuth: boolean;
}

const getOriginalPrice = (pricingDetails: any) => {
  return pricingDetails.price || pricingDetails.maxPrice || "0";
};

const hasDiscount = (pricingDetails: any) => {
  return pricingDetails.discountedPrice > 0;
};

const OtherDistributors: FC<OtherDistributorsProps> = async ({
  productId,
  isAuth
}) => {
  const otherSellers = await getOtherSellers(productId);
  console.log({ productId });
  console.log({ otherSellers });
  console.log({ otherSellers: otherSellers.sellerInfo });

  return (
    <>
      {/* SM */}
      <Box className="mt-10 flex w-full flex-col gap-2 lg:hidden">
        <CustomHeading level={5} bold className="text-brand-blue-normal">
          پخش کننده‌های دیگر
        </CustomHeading>
        <Box className="flex w-full flex-col gap-2">
          {otherSellers.length == 0 ? (
            <Box className="flex w-full items-center justify-center text-brand-blue-normal">
              <Title level={1} bold>
                در حال حاضر پخش کننده دیگری وجود ندارد
              </Title>
            </Box>
          ) : (
            otherSellers?.map(
              (
                item: {
                  sellerInfo: {
                    companyName: string;
                    sellerId: number;
                  };
                  pricingDetails: {
                    price?: string;
                    maxPrice?: string;
                    discountedPrice: null | string;
                  };
                  id: number;
                },
                index: number
              ) => (
                <Box
                  key={index}
                  className="flex flex-col gap-3 border-b border-brand-white-normalHover py-2 text-brand-blue-normal"
                >
                  <Box className="flex w-full items-center justify-between">
                    <Tooltip 
                      label="نمایش اطلاعات فروشگاه" 
                      hasArrow 
                      bg="brand.blue.normal" 
                      color="white"
                      fontSize="sm"
                      placement="top"
                      borderRadius="md"
                      px={3}
                      py={2}
                    >
                      <Link href={`/sellers/${item.sellerInfo.sellerId}`}>
                        <Title 
                          level={1} 
                          bold 
                          className="text-brand-blue-normal hover:text-brand-blue-dark transition-colors duration-200 cursor-pointer"
                        >
                          کمپانی {item.sellerInfo.companyName}
                        </Title>
                      </Link>
                    </Tooltip>
                    <Box className="relative flex flex-col items-end">
                      {!isAuth && (
                        <Box className="blrPrice absolute left-0 top-0 z-20 h-full w-full"></Box>
                      )}
                      {/* نمایش قیمت با تخفیف */}
                      {hasDiscount(item.pricingDetails) ? (
                        <>
                          <Title level={1} className="text-brand-orange-normal z-10">
                          {addCommas(item.pricingDetails.discountedPrice || 0)} تومان
                          </Title>
                          <Title level={2} className="text-brand-blue-lightActive line-through z-10">
                            {addCommas(getOriginalPrice(item.pricingDetails))} تومان
                          </Title>
                        </>
                      ) : (
                        <Title level={1} className="text-brand-blue-normal z-10">
                          {addCommas(getOriginalPrice(item.pricingDetails))} تومان
                        </Title>
                      )}
                    </Box>
                  </Box>
                  <Box className="flex w-full items-center justify-between">
                    <Box>
                    {item.pricingDetails.discountedPrice && Number(item.pricingDetails.discountedPrice) > 0 ? (
                      <Title level={2} className="animate-pulse text-red-500">
                        دارای تخفیف
                      </Title>
                    ) : null}
                    </Box>
                    <Link
                      href={`${item.id}`}
                      className="rounded-lg bg-brand-orange-light px-3 py-[10px]"
                    >
                      <Title
                        level={2}
                        bold
                        className="text-brand-orange-normal"
                      >
                        خرید از این پخش کننده
                      </Title>
                    </Link>
                  </Box>
                </Box>
              )
            )
          )}
        </Box>
      </Box>
      {/* LG */}
      <Box className="relative z-10 mt-[100px] hidden w-full flex-col items-center gap-6 rounded-3xl border border-brand-white-normalHover pb-6 pt-[54px] lg:flex">
        <Box className="absolute -top-8 left-1/2 z-20 -translate-x-1/2 transform">
          <CustomHeading
            level={3}
            bold
            className="bg-brand-white-normal p-[10px] text-brand-blue-normal"
          >
            پخش کننده‌های دیگر
          </CustomHeading>
        </Box>

        <Box className="flex w-full flex-col gap-6">
          {otherSellers.length == 0 ? (
            <Box className="flex w-full items-center justify-center text-brand-blue-normal">
              <CustomHeading level={5} bold>
                در حال حاضر پخش کننده دیگری وجود ندارد
              </CustomHeading>
            </Box>
          ) : (
            otherSellers?.map(
              (
                item: {
                  sellerInfo: {
                    companyName: string;
                    sellerId: number;
                  };
                  pricingDetails: {
                    maxPrice: string;
                    discountedPrice: null | string;
                  };
                  id: number;
                },
                index: number
              ) => (
                <Box
                  key={index}
                  className="flex flex-col gap-3 border-b border-brand-white-normalHover px-6 py-2 text-brand-blue-normal"
                >

                  <Box className="flex w-full items-center justify-between">
                    <Tooltip 
                      label="نمایش اطلاعات فروشگاه" 
                      hasArrow 
                      bg="brand.blue.normal" 
                      color="white"
                      fontSize="sm"
                      placement="top"
                      borderRadius="md"
                      px={3}
                      py={2}
                    >
                      <Link href={`/sellers/${item.sellerInfo.sellerId}`}>
                        <CustomHeading 
                          level={4} 
                          bold 
                          className="text-brand-blue-normal hover:text-brand-blue-dark transition-colors duration-200 cursor-pointer"
                        >
                          کمپانی {item.sellerInfo.companyName}
                        </CustomHeading>
                      </Link>
                    </Tooltip>
                    <Box className="relative flex flex-col items-end">
                      {!isAuth && (
                        <Box className="blrPrice absolute left-0 top-0 z-20 h-full w-full"></Box>
                      )}
                      {/* نمایش قیمت با تخفیف */}
                      {hasDiscount(item.pricingDetails) ? (
                        <>
                          <CustomHeading level={4} className="text-brand-orange-normal z-10">
                            {addCommas(Number(item.pricingDetails.discountedPrice) || 0)} تومان
                          </CustomHeading>
                          <CustomHeading level={5} className="text-brand-blue-lightActive line-through z-10">
                            {addCommas(getOriginalPrice(item.pricingDetails))} تومان
                          </CustomHeading>
                        </>
                      ) : (
                        <CustomHeading level={4} className="text-brand-blue-normal z-10">
                          {addCommas(getOriginalPrice(item.pricingDetails))} تومان
                        </CustomHeading>
                      )}
                    </Box>
                  </Box>
                  <Box className="flex w-full items-center justify-between">
                    <Box>
                    {item.pricingDetails.discountedPrice && Number(item.pricingDetails.discountedPrice) > 0 ? (
                        <CustomHeading
                          level={5}
                          bold
                          className="animate-pulse text-red-500"
                        >
                          دارای تخفیف
                        </CustomHeading>
                      ) : null}
                    </Box>
                    <Link
                      href={`${item.id}`}
                      className="rounded-lg bg-brand-orange-light px-3 py-[10px]"
                    >
                      <CustomHeading
                        level={5}
                        bold
                        className="text-brand-orange-normal"
                      >
                        خرید از این پخش کننده
                      </CustomHeading>
                    </Link>
                  </Box>

                </Box>
              )
            )
          )}
        </Box>
      </Box>
    </>
  );
};

export default OtherDistributors;