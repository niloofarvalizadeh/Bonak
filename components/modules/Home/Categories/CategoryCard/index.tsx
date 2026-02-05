import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";
import Image from "next/image";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import Link from "next/link";
import { getMediaUrl } from "@/utils/media"; 

interface CategoryCardProps {
  image: undefined | string;
  name: string;
  categoryId: number | string;
  sx?: string;
}

const CategoryCard: FC<CategoryCardProps> = ({ image, name, categoryId }) => {
  console.log({ image });
  const imgSrc = getMediaUrl(image); // ✅ از تابع helper استفاده کن
  
  return (
    <Box
      as={Link}
      href={`/products?category=${categoryId}`}
      className="flex flex-col items-center gap-2 lg:gap-4"
    >
      <Image
        src={imgSrc}
        alt="category image"
        className="size-20 rounded-full lg:size-32"
        width={128}
        height={128}
      />
      <Title level={2} className="text-brand-blue-normal lg:hidden">
        {name}
      </Title>
      <CustomHeading
        level={5}
        className="hidden text-brand-blue-normal lg:block"
      >
        {name}
      </CustomHeading>
    </Box>
  );
};

export default CategoryCard;