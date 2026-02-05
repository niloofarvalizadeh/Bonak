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
import { Edit } from "iconsax-react";
import EditWalletCardForm from "@/components/forms/Wallet/EditWalletCardForm";

const EditWalletCard: FC<{ id: number }> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} className="" bg="none" _hover={{ bg: "none" }}>
        <Edit size="24" className="text-brand-orange-normal" />
      </Button>

      <Modal isOpen={isOpen} size="3xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent rounded="48px">
          <ModalBody>
            <EditWalletCardForm onClose={onClose} id={id} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditWalletCard;
