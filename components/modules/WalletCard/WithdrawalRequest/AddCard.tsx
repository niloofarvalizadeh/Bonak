"use client";
import React, { FC } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Modal,
  Box
} from "@chakra-ui/react";

const AddCardModal: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Box
        as={Button}
        onClick={onOpen}
        className="walletCardSelect flex w-full flex-col gap-[25px] rounded-3xl p-[30px] lg:h-[349px] lg:w-[638px] lg:justify-between lg:gap-0 lg:pb-[44px] lg:pl-[38px] lg:pr-[44px] lg:pt-[25px]"
      >
        asd
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCardModal;
