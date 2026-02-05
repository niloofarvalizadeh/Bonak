import React, { FC } from "react";
import Title from "@/components/ui/typography/Title";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { getMediaUrl } from "@/utils/media"; // ✅ import اضافه شد

interface ProductCardProps {
  brandImage: string | null;
  brandName: string;
  name: string;
  barcode: string;
  onClick: () => void;
}

const ProductCard: FC<ProductCardProps> = ({
  name,
  brandName,
  barcode,
  brandImage,
  onClick
}) => {
  return (
    <Box
      as="button"
      className="flex w-full items-center rounded-xl border border-brand-blue-normal"
      onClick={onClick}
    >
      <Image
        src={getMediaUrl(brandImage)} // ✅ ساده‌تر و تمیزتر
        alt="product image"
        width={128}
        height={128}
        className="size-[120px] rounded-r-xl"
      />
      <Box className="flex w-full flex-col px-4">
        <Title level={2} className="text-brand-orange-dark">
          {name}
        </Title>
        <Box className="flex w-full flex-col gap-2">
          <Box className="flex w-full items-center justify-between">
            <Title level={2}>نام برند:</Title>
            <Title level={2}>{brandName}</Title>
          </Box>
          <Box className="flex w-full items-center justify-between">
            <Title level={2}>بارکد:</Title>
            <Title level={2}>{barcode}</Title>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;