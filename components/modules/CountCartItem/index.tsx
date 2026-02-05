import Title from "@/components/ui/typography/Title";
import { cartProductCountAction } from "@/services/api";
import { useGetUserCartDetail } from "@/services/queries";
import { Box, Button } from "@chakra-ui/react";
import { Add, Minus } from "iconsax-react";
import React, { FC } from "react";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";

interface CountCartItemProps {
  id: number | string;
  quantity: number | string;
}

const CountCartItem: FC<CountCartItemProps> = ({ id, quantity }) => {
  const { mutate: mutateUserCart } = useGetUserCartDetail();

  const { trigger: productIncrease, isMutating: productIncreaseIsLoading } =
    useSWRMutation(
      `/product/api/v1/cart-product-increase/`,
      cartProductCountAction,
      {
        onSuccess: (res) => {
          if (res.status == 200) {
            toast.success("محصول شما با موفقیت افزایش یافت");
            mutateUserCart();
          } else {
            toast.error(res.data.message);
          }
        },
        onError: () => {}
      }
    );
  const { trigger: productDecrease, isMutating: productDecreaseIsLoading } =
    useSWRMutation(
      `/product/api/v1/cart-product-decrease/`,
      cartProductCountAction,
      {
        onSuccess: (res) => {
          if (res.status == 200) {
            toast.success("محصول شما با موفقیت کاهش یافت");
            mutateUserCart();
          } else {
            toast.error(res.data.message);
          }
        },
        onError: () => {}
      }
    );

  const productIncreaseHandler = () => {
    productIncrease({ id });
  };

  const productDecreaseHandler = () => {
    productDecrease({ id });
  };
  return (
    <Box className="flex items-center gap-2 rounded-lg border border-brand-white-normalHover px-3 py-2">
      <Button
        padding="0px"
        bg="none"
        _hover={{ bg: "none" }}
        onClick={productIncreaseHandler}
        isLoading={productIncreaseIsLoading}
      >
        <Add className="text-brand-orange-normal" />
      </Button>

      <Title level={2} className="text-brand-blue-normal">
        {quantity}
      </Title>
      <Button
        padding="0px"
        bg="none"
        _hover={{ bg: "none" }}
        onClick={productDecreaseHandler}
        isLoading={productDecreaseIsLoading}
      >
        <Minus className="text-brand-orange-normal" />
      </Button>
    </Box>
  );
};

export default CountCartItem;
