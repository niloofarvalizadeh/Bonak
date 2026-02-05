"use client";
import React, { FC } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Box
} from "@chakra-ui/react";
import { AddSquare } from "iconsax-react";
import Title from "@/components/ui/typography/Title";
import AddNewWalletCardForm from "@/components/forms/Wallet/AddNewWalletCardForm";

const AddNewWalletCardModal: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        as={Button}
        onClick={onOpen}
        className="flex !h-[207px] w-full !flex-col !items-center !justify-center !gap-2 !rounded-3xl border-2 border-dashed border-brand-orange-normal p-[30px] !text-brand-orange-normal lg:!h-[349px] lg:w-[638px] lg:pb-[44px] lg:pl-[38px] lg:pr-[44px] lg:pt-[25px]"
        bg="none"
        _hover={{ bg: "none" }}
        justifyContent="start"
      >
        <AddSquare size="44px" />
        <Title level={1}>اضافه کردن کارت جدید</Title>
      </Box>

      <Modal isOpen={isOpen} size="3xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent rounded="48px">
          <ModalBody>
            <AddNewWalletCardForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewWalletCardModal;
