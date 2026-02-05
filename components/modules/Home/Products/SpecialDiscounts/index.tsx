"use client";
import React, { FC } from "react";

import ProductCard from "@/components/modules/ProductCard";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import { Box, Spinner } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import { useGetSpecialDiscounts } from "@/services/queries";
import { ProductT } from "@/types";

interface SpecialDiscountedProductsProps {
  path?: string;
  isAuthenticated: boolean;
}

const SpecialDiscountedProducts: FC<SpecialDiscountedProductsProps> = ({
  isAuthenticated
}) => {
  const { data: specialDiscounts, isLoading } = useGetSpecialDiscounts();

  console.log({ specialDiscounts });
  return (
    <Box className="w-full pr-4 lg:px-[70px]">
      <Box className="flex w-full flex-col gap-[10px] rounded-r-xl bg-brand-orange-normal px-10 py-3 lg:rounded-xl">
        <CustomHeading level={5} bold className="text-brand-white-normal">
          تخفیفات ویژه
        </CustomHeading>
        <Box className="w-full" dir="ltr">
            <Marquee pauseOnHover direction="left" loop={0} autoFill>
              {isLoading ? (
                <Spinner size="xl" />
              ) : specialDiscounts?.length ? (
                specialDiscounts?.map((discountItem: any, index: number) => (
                  discountItem.sellers?.map((product: ProductT, index: number) => (
                    <Box key={index} className="mr-3 w-[220px]" dir="rtl">
                      <ProductCard
                        haveRounded
                        whiteBg
                        imageSrc={product.compressedImage}
                        productName={product.productName}
                        price={product.price}
                        inventoryCount={product.inventory}
                        discountedPrice={product.discountedPrice}
                        sellerCount={product.sellerCount}
                        discountPercentage={product.discountPercentage}
                        sellerProductId={product.sellerproductId}
                        isAuthenticated={isAuthenticated}
                        isfavorite={false}
                        companyName={product.companyName}
                        sellerId={(product as any).sellerId}
                      />
                      
                    </Box>
                  ))
                ))
              ) : null}
            </Marquee>
        </Box>

      </Box>
    </Box>
  );
};

export default SpecialDiscountedProducts;
