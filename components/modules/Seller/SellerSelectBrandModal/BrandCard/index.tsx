"use client";
import React, { FC } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { addNewBrandAction } from "@/services/api";
import { useDisclosure } from "@chakra-ui/react";

interface BrandCardProps {
  id: number;
  name: string;
  onClose: () => void;
}

const BrandCard: FC<BrandCardProps> = ({ id, name, onClose }) => {
  const { isOpen, onOpen, onClose: onConfirmModalClose } = useDisclosure();
  const { trigger: addNewBrand, isMutating: addNewBrandIsLoading } =
    useSWRMutation("/account/api/v1/seller_manage_brands/", addNewBrandAction, {
      onSuccess: (res) => {
        if (res.status === 201) {
          toast.success("برند شما با موفقیت اضافه شد");
          onClose();
        } else {
          toast.error(res.data.message || "خطا در افزودن برند");
        }
      },
      onError: () => {
        toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
      }
    });

  const onSubmit = () => {
    addNewBrand({ brandId: id });
    onConfirmModalClose();
  };

  return (
    <>
      <Box
        as={Button}
        onClick={onOpen}
        isLoading={addNewBrandIsLoading}
        bg="none"
        _hover={{
          bg: "none"
        }}
        className="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 p-2 text-brand-blue-normal shadow-lg transition-colors hover:border-brand-orange-normal hover:text-brand-blue-normalHover"
      >
        <Title bold level={1}>
          {name}
        </Title>
      </Box>

      {/* مودال تأیید */}
      <Modal isOpen={isOpen} onClose={onConfirmModalClose} size="sm">
        <ModalOverlay />
        <ModalContent rounded="16px">
          <ModalHeader>
            <Title level={2} bold className="text-brand-blue-normal">
              تأیید افزودن برند
            </Title>
          </ModalHeader>
          <ModalBody>
            <Title level={2} className="text-brand-blue-normal">
              آیا می‌خواهید برند <strong>{name}</strong> را به لیست برندهای خود
              اضافه کنید؟
            </Title>
          </ModalBody>
          <ModalFooter className="flex gap-4">
            <Button
              bg="brand.blue.normal"
              color="brand.white.normal"
              rounded="12px"
              onClick={onSubmit}
              isLoading={addNewBrandIsLoading}
            >
              <Title level={2}>بله</Title>
            </Button>
            <Button
              bg="brand.white.normalHover"
              color="brand.blue.normal"
              rounded="12px"
              border="1px solid"
              borderColor="brand.blue.lightActive"
              onClick={onConfirmModalClose}
            >
              <Title level={2}>خیر</Title>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BrandCard;
