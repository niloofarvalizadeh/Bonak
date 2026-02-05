import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";
import Caption from "@/components/ui/typography/Caption";
import { Heart } from "iconsax-react";

interface SellerRatingProps {
  sellerRating?: { numRatings: number; averageRating: number };
  sellerRatingIsLoading: boolean;
}

const SellerRating: FC<SellerRatingProps> = ({
  sellerRating,
  sellerRatingIsLoading
}) => {
  const progressWidth = sellerRatingIsLoading
    ? "0%"
    : `${((sellerRating?.averageRating ?? 0) / 5) * 100}%`;

  return (
    <>
      <Title level={2} className="text-brand-yellow-normal">
        از {sellerRatingIsLoading ? "..." : sellerRating?.numRatings} نظر
      </Title>
      <Box className="flex flex-row items-center gap-2 text-brand-yellow-normal">
        <Box
          as="div"
          dir="ltr"
          className="relative h-1 w-full bg-brand-white-normalHover"
        >
          <Box
            height="5px"
            width={progressWidth}
            bg="brand.yellow.normal"
            position="absolute"
            borderRadius="4px"
          />
        </Box>
        <Box className="flex items-center justify-center gap-[2px] text-brand-yellow-normal">
          <Caption>
            {sellerRatingIsLoading
              ? "..."
              : sellerRating?.averageRating.toFixed(1)}
          </Caption>
          <Heart
            variant="Bold"
            className="text-brand-yellow-normal"
            size={12}
          />
        </Box>
      </Box>
    </>
  );
};

export default SellerRating;
