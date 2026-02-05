"use client";
import React, { FC } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import { Add } from "iconsax-react";
import Title from "@/components/ui/typography/Title";
import AddNewAddressForm from "@/components/forms/Addresses/addNewAddressForm";

const AddNewAddressModal: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        className="addNewAddressBtn !mt-6 !flex !w-full !items-center !gap-2 !rounded-xl !p-3 !text-brand-blue-lightActive"
        bg="none"
        _hover={{ bg: "none" }}
        justifyContent="start"
      >
        <Add size="24" />
        <Title level={1}>اضافه کردن آدرس جدید</Title>
      </Button>

      <Modal isOpen={isOpen} size="3xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent rounded="48px">
          <ModalBody>
            <AddNewAddressForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewAddressModal;
