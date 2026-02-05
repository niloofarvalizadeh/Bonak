"use client";
import React, { FC } from "react";

import Caption from "@/components/ui/typography/Caption";
import { Box, IconButton } from "@chakra-ui/react";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { deleteBrandAction } from "@/services/api";
import { Trash } from "iconsax-react";
import { useGetAllBrands } from "@/services/queries";

interface BrandCardProps {
  id: number;
  name: string;
}

const BrandCard: FC<BrandCardProps> = ({ id, name }) => {
  const { mutate: brandsMutate } = useGetAllBrands();

  const { trigger: deleteBrand, isMutating: deleteBrandIsLoading } =
    useSWRMutation("/account/api/v1/seller_manage_brands/", deleteBrandAction, {
      onSuccess: (res) => {
        console.log({ res });
        if (res.status == 200) {
          toast.success("برند شما با موفقیت حذف شد");
          brandsMutate();
        } else {
          toast.error(res.data.message);
        }
      },
      onError: () => {}
    });

  const onSubmit = () => {
    deleteBrand({ brandId: id });
  };
  return (
    <Box
      key={id}
      className="relative !z-20 flex items-center justify-center gap-2 rounded-full bg-brand-orange-light px-[10px] py-1 text-brand-orange-normalActive"
    >
      <Caption>{name}</Caption>
      <IconButton
        aria-label="delete action"
        padding="0px"
        bg="none"
        onClick={onSubmit}
        isLoading={deleteBrandIsLoading}
        _hover={{ bg: "none" }}
        icon={<Trash color="red" />}
      />
    </Box>
  );
};

export default BrandCard;
