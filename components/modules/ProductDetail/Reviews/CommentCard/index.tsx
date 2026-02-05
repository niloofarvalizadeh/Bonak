import React, { FC } from "react";

import Rating from "@/components/ui/elements/Rating";
import Title from "@/components/ui/typography/Title";
import { Box } from "@chakra-ui/react";
import { Shop } from "iconsax-react";

interface CommentCardProps {
  comment: string;
  companyName: string;
  rating: number;
}

const CommentCard: FC<CommentCardProps> = ({
  comment,
  companyName,
  rating
}) => {
  return (
    <Box className="flex w-full flex-col gap-4 border-b border-brand-white-normalHover pb-4">
      <Box className="flex items-center gap-2">
        <Rating rating={rating} size={16} />
      </Box>
      <Title level={1}>{comment}</Title>
      <Box className="flex items-center gap-2 text-brand-blue-normal">
        <Shop />
        <Title level={1}>{companyName}</Title>
      </Box>
    </Box>
  );
};

export default CommentCard;
