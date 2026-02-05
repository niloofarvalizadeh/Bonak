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
import { Edit } from "iconsax-react";
import Title from "@/components/ui/typography/Title";
import EditOrDeleteAddressForm from "@/components/forms/Addresses/EditOrDeleteAddressForm";
import { AddressDetailType } from "@/types";

const EditOrDeleteAddressModal: FC<AddressDetailType> = ({
  id,
  city,
  region,
  address
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box className="flex items-center justify-between rounded-xl border border-brand-white-normalHover p-3">
        <Title level={1} className="text-brand-blue-normal">
          {city.name}،{region.name}،{address}
        </Title>
        <Button onClick={onOpen} className="" bg="none" _hover={{ bg: "none" }}>
          <Edit size="24" className="text-brand-orange-normal" />
        </Button>
      </Box>

      <Modal isOpen={isOpen} size="3xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent rounded="48px">
          <ModalBody>
            <EditOrDeleteAddressForm onClose={onClose} addressId={id} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditOrDeleteAddressModal;
