"use client";
import React, { FC } from "react";
import { useGetBanners } from "@/services/queries";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";

interface BannerProps {
  sx?: string;
}

interface BannerData {
  bannerImage: string | null;
  bannerName: string;
  uniqueCode: string;
  url: string;
}

const Banner: FC<BannerProps> = () => {
  const { data: banners, isLoading: bannerIsLoading } = useGetBanners();

  // Filter banners to only include those with a valid bannerImage
  const validBanners = banners?.filter(
    (banner: BannerData) => banner.bannerImage
  );

  if (bannerIsLoading || !validBanners || validBanners.length === 0) {
    return null;
  }

  return (
    <Box className="mt-10 h-[261px] w-full rounded-lg lg:h-[419px]">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        className="h-full w-full"
      >
        {validBanners.map((banner: BannerData) => (
          <SwiperSlide key={banner.uniqueCode}>
            <Link
              href={banner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full w-full"
            >
              <Image
                src={banner.bannerImage || ""}
                alt={banner.bannerName}
                className="h-full w-full rounded-lg object-cover"
                width={1000}
                height={419}
                priority
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Banner;
