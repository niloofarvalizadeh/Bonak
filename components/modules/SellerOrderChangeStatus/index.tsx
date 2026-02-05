"use client";
import React, { FC } from "react";
import { sellerOrderChangeStatusAction } from "@/services/api";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { Box, Button } from "@chakra-ui/react";

interface SellerOrderChangeStatusProps {
  orderProductId: string;
}

const SellerOrderChangeStatus: FC<SellerOrderChangeStatusProps> = ({
  orderProductId
}) => {
  const {
    trigger: sellerOrderChangeStatus,
    isMutating: sellerOrderChangeStatusIsLoading
  } = useSWRMutation(
    `/product/api/v1/seller-change-order-status/${orderProductId}/`,
    sellerOrderChangeStatusAction,
    {
      onSuccess: (res) => {
        if (res.status == 200) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.error);
        }
      },
      onError: () => {}
    }
  );
  return (
    <Box className="flex w-full items-center justify-between lg:justify-end lg:gap-2">
      <Button
        onClick={() => sellerOrderChangeStatus({ status: "accept" })}
        isLoading={sellerOrderChangeStatusIsLoading}
        colorScheme="green"
      >
        تایید سفارش
      </Button>
      <Button
        onClick={() => sellerOrderChangeStatus({ status: "reject" })}
        isLoading={sellerOrderChangeStatusIsLoading}
        colorScheme="red"
      >
        رد سفارش
      </Button>
    </Box>
  );
};

export default SellerOrderChangeStatus;
