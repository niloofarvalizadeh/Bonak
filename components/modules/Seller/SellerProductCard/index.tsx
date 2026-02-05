import React, { FC, useRef } from "react";

import { SellerProductsType } from "@/types";
import {
  Box,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from "@chakra-ui/react";
import Image from "next/image";
import Title from "@/components/ui/typography/Title";
import { CloseSquare, Edit } from "iconsax-react";
import useSWRMutation from "swr/mutation";
import { deleteDataWithTokenAction } from "@/services/api";
import { useGetSellerProducts } from "@/services/queries";
import toast from "react-hot-toast";
import Button from "@/components/ui/elements/Button";
import Link from "next/link";

const SellerProductCard: FC<SellerProductsType> = ({
  id,
  image,
  itemsPerPackage,
  name,
  availableCount,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const { mutate: productMutate } = useGetSellerProducts();

  const { trigger: deleteProduct, isMutating: deleteProductIsLoading } =
    useSWRMutation(
      `/product/api/v1/delete_seller_product/${id}`,
      deleteDataWithTokenAction,
      {
        onSuccess: (res) => {
          if (res.status == 200) {
            productMutate();
            onClose();
            toast.success("محصول شما با موفقیت حذف شد");
          } else {
            toast.error(res.data.message);
          }
        },
        onError: () => {}
      }
    );

  return (
      <Box 
        className={`flex w-full items-center justify-between border-b border-brand-white-normalHover py-2 ${
          availableCount === 0 ? "opacity-50 bg-red-50" : ""
        }`}
      >
      <Box className="flex items-center gap-2">
        <Image
          src={image}
          alt="product image"
          width={1000}
          height={0}
          className={`size-20 ${availableCount === 0 ? "grayscale" : ""}`}
        />
        <Box className="flex flex-col gap-[18px] text-brand-blue-normalActive">
          <Box className="flex flex-col items-center gap-[14px] lg:flex-row">
            <Title level={1} className={availableCount === 0 ? "text-gray-500" : ""}>
              {name}
            </Title>
            <Box className={`flex items-center justify-center rounded-xl px-3 py-1 ${
              availableCount === 0 
                ? "bg-red-100 text-red-600" 
                : "bg-brand-white-normalHover"
            }`}>
              <Title level={1}>
                {availableCount === 0 ? "اتمام موجودی" : `کارتن ${itemsPerPackage} عددی`}
              </Title>
            </Box>
          </Box>
          {availableCount > 0 && (
            <Title level={2} className="text-green-600">
              موجودی: {availableCount} عدد
            </Title>
          )}
        </Box>
      </Box>
      <Box className="flex items-center gap-3 lg:gap-11">
        <Link href={`/account/seller/products/edit/${id}`}>
          <Edit size="24" className="text-brand-orange-normal" />
        </Link>
        <Button onClick={onOpen} bg="none" padding="0px">
          <CloseSquare size="24" color="red" />
        </Button>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              حذف محصول
            </AlertDialogHeader>

            <AlertDialogBody>
              آیا از حذف محصول خود مطمعن هستید ؟
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>صرف نظر</Button>
              <Button
                colorScheme="red"
                onClick={() => deleteProduct()}
                isLoading={deleteProductIsLoading}
                mr={3}
              >
                حذف کن
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default SellerProductCard;
