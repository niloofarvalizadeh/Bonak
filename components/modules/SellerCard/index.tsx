import React, { FC } from "react";

import { Box } from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";
import Caption from "@/components/ui/typography/Caption";

interface SellerCardProps {
  sx?: string;
  logoImage: string | null;
  companyName: string;
  description: string | null;
}

const SellerCard: FC<SellerCardProps> = ({companyName,description,sx,logoImage}) => {
  return (
    <Box className="relative z-10 flex h-[158px] flex-col items-center justify-center gap-2 rounded-xl border border-brand-blue-light bg-brand-white-normal p-2">
      <img src={logoImage ?? ""} alt="" className="absolute -top-8 left-1/2 z-20 size-16 -translate-x-1/2 transform rounded-full bg-gray-300 p-[10px]" />
      <Title level={1} bold className="mt-5 text-brand-blue-normal">
        {companyName}
      </Title>
      <Caption className="h-[68px] w-full text-center text-lg text-brand-blue-lightActive">
        {description}
      </Caption>
    </Box>
  );
};

export default SellerCard;
