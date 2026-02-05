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
import Title from "@/components/ui/typography/Title";
import EditProfileForm from "@/components/forms/EditProfileForm";

const EditProfileModal: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        className="!flex !items-center !gap-2"
        bg="none"
        _hover={{ bg: "none" }}
      >
        <Edit size="24" className="text-brand-orange-normal" />
        <Title level={1} className="text-brand-orange-normal">
          ویرایش اطلاعات
        </Title>
      </Button>

      <Modal isOpen={isOpen} size="3xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent rounded="48px">
          <ModalBody>
            <EditProfileForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
