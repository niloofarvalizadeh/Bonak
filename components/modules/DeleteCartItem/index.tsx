import { deleteCartItemAction } from "@/services/api";
import { useGetUserCartDetail } from "@/services/queries";
import { Button } from "@chakra-ui/react";
import { Trash } from "iconsax-react";
import React, { FC } from "react";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";

interface DeleteCartItemProps {
  id: number | string;
}

const DeleteCartItem: FC<DeleteCartItemProps> = ({ id }) => {
  const { mutate: mutateUserCart } = useGetUserCartDetail();

  const { trigger: deleteCartItem, isMutating: deleteCartItemIsLoading } =
    useSWRMutation(`/product/api/v1/cart-delete-item/`, deleteCartItemAction, {
      onSuccess: (res) => {
        if (res.status == 200) {
          toast.success("محصول شما با موفقیت حذف شد");
          mutateUserCart();
        } else {
          toast.error(res.data.message);
        }
      },
      onError: () => {}
    });

  const onSubmit = () => {
    deleteCartItem({ id });
  };
  return (
    <Button
      position="absolute"
      left="15px"
      top="35px"
      zIndex={30}
      bg="none"
      _hover={{ bg: "none" }}
      onClick={onSubmit}
      isLoading={deleteCartItemIsLoading}
    >
      <Trash className="text-red-500" />
    </Button>
  );
};

export default DeleteCartItem;
