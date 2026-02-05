"use client";
import React, { FC, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Spinner
} from "@chakra-ui/react";
import Button from "@/components/ui/elements/Button";
import { useGetAllBrands } from "@/services/queries";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import { Add, SearchNormal1 } from "iconsax-react";
import { SellerProductType } from "@/types";

import Caption from "@/components/ui/typography/Caption";
import BrandCard from "./BrandCard";

const SellerSelectBrandModal: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: brands, isLoading: brandsIsLoading } = useGetAllBrands();

  console.log({ brands });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredbrands = brands?.brands?.filter((item: SellerProductType) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Button
        onClick={onOpen}
        className="!flex !h-[24px] !items-center !gap-1 !rounded-[30px] !border !border-dashed !border-brand-blue-lightActive !px-[10px]"
        bg="none"
        _hover={{
          bg: "none"
        }}
        color="brand.blue.lightActive"
      >
        <Add size={12} />
        <Caption>اضافه کردن</Caption>
      </Button>

      <Modal isOpen={isOpen} size="3xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent rounded="48px">
          <ModalBody>
            <Box className="flex w-full flex-col items-center gap-4 py-2">
              <DashboardPageTitle>لیست برند ها</DashboardPageTitle>
              <InputGroup bg="brand.white.normalHover" rounded="8px">
                <InputLeftElement pointerEvents="none" paddingRight="13px">
                  <SearchNormal1
                    size="24"
                    className="text-brand-blue-lightActive"
                  />
                </InputLeftElement>
                <Input
                  placeholder="جستجوی برند ..."
                  paddingRight="47px"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              {brandsIsLoading ? (
                <Spinner color="brand.orange.normal" size="2xl" />
              ) : (
                filteredbrands?.map((item: { id: number; name: string }) => (
                  <BrandCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    onClose={onClose}
                  />
                ))
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SellerSelectBrandModal;
