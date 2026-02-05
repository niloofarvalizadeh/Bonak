"use client";
import React, { FC } from "react";

import ProductCard from "@/components/modules/ProductCard";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import { Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const SwiperBreakpointsConfig = {
  768: {
    slidesPerView: 4,
    spaceBetween: 24
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
interface SellerSuggestionProductsProps {
  title: string;
  path?: string;
}

const SellerSuggestionProducts: FC<SellerSuggestionProductsProps> = ({
  title
}) => {
  return (
    <Box className="flex flex-col gap-3">
      <CustomHeading
        level={5}
        className="text-brand-blue-normal lg:hidden"
        bold
      >
        {title}
      </CustomHeading>
      <CustomHeading
        level={3}
        className="hidden text-brand-blue-normal lg:block"
        bold
      >
        {title}
      </CustomHeading>
      <Box className="w-full">
        <Swiper
          spaceBetween={24}
          slidesPerView={2}
          breakpoints={SwiperBreakpointsConfig}
          autoplay={{
            delay: 1000,
            disableOnInteraction: true
          }}
          modules={[Autoplay]}
        >
          {[...Array(20)]?.map((_, index) => (
            <SwiperSlide key={index}>
              <ProductCard
                haveRounded
                imageSrc={null}
                productName={""}
                price={null}
                inventoryCount={null}
                sellerCount={null}
                discountPercentage={null}
                sellerProductId={0}
                isAuthenticated={false}
                isfavorite={false}
                discountedPrice={null}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default SellerSuggestionProducts;
