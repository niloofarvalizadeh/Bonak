"use client";
import React, { FC } from "react";

import ProductCard from "@/components/modules/ProductCard";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import { Box, Skeleton } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useGetProductsByCategory } from "@/services/queries";
import { ProductT } from "@/types";

interface HomeProductsProps {
  title: string;
  categoryId: number;
  path?: string;
  isAuthenticated: boolean;
}

const SwiperBreakpointsConfig = {
  768: {
    slidesPerView: 4,
    spaceBetween: 5
  },
  1024: {
    slidesPerView: 5,
    spaceBetween: 24
  },
  1280: {
    slidesPerView: 5,
    spaceBetween: 24
  }
};

// تابع کمکی برای بررسی تخفیف معتبر
const hasValidDiscount = (discountPercentage: number | null, discountedPrice: number | null, originalPrice: number) => {
  return (
    discountPercentage && 
    discountPercentage > 0 &&
    discountedPrice && 
    discountedPrice > 0 &&
    originalPrice > discountedPrice
  );
};

const HomeProducts: FC<HomeProductsProps> = ({
  title,
  categoryId,
  isAuthenticated
}) => {
  const { data: productsByCategory, isLoading: productsByCategoryIsLoading } =
    useGetProductsByCategory(true, categoryId, isAuthenticated);

  console.log({ productsByCategory });
  return (
    <Box className="flex flex-col gap-4">
      <CustomHeading level={5} className="text-brand-blue-normal" bold>
        {title}
      </CustomHeading>
      <Box className="w-full">
        <Swiper
          spaceBetween={12}
          slidesPerView={2}
          breakpoints={SwiperBreakpointsConfig}
          autoplay={{
            delay: 1000,
            disableOnInteraction: true
          }}
          modules={[Autoplay]}
        >
          {productsByCategoryIsLoading
            ? Array.from({ length: 5 })?.map((_, index) => (
                <SwiperSlide key={index}>
                  <Skeleton height="200px" width="100%" borderRadius="md" />
                </SwiperSlide>
              ))
            : productsByCategory?.slice(0, 10)?.map((item: ProductT) => {
                // محاسبه تخفیف معتبر برای هر محصول
                const isValidDiscount = hasValidDiscount(
                  item.minPrice?.discountPercentage || null,
                  item.minPrice?.discountedPrice || null,
                  item.minPrice?.price || 0
                );

                return (
                  <SwiperSlide
                    key={item.sellerProductId}
                    virtualIndex={item.sellerProductId}
                  >
                    <ProductCard
                      isfavorite={item.isFavorite}
                      imageSrc={item.compressedImage}
                      productName={item.name}
                      price={item.minPrice?.price ?? 0}
                      inventoryCount={item?.itemsPerPackage ?? 0}
                      sellerCount={item.sellerCount}
                      // فقط اگر تخفیف معتبر باشد، discountPercentage رو پاس بده
                      discountPercentage={isValidDiscount ? item.minPrice?.discountPercentage : null}
                      haveRounded={false}
                      sellerProductId={item.sellerProductId}
                      isAuthenticated={isAuthenticated}
                      sellerrating={item?.sellerRating ?? 0}
                      discountedPrice={item.minPrice?.discountedPrice}
                    />
                  </SwiperSlide>
                );
              })}
        </Swiper>
      </Box>
    </Box>
  );
};

export default HomeProducts;