"use client";
import React, { FC, useRef } from "react";
import Link from "next/link";

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Box,
  Spinner
} from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";
import { useGetFavorites } from "@/services/queries";
import { Heart } from "iconsax-react";
import { convertToJalaliDate } from "@/utils";
import CustomBody from "@/components/ui/typography/CustomBody";

const FavoritesDrawer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const { data: product, isLoading: favoritesIsLoading } =
    useGetFavorites(isOpen);

  console.log({ product });

  return (
    <>
      <button
        ref={btnRef}
        onClick={onOpen}
        className="flex items-center gap-1 rounded-lg border border-brand-blue-normal px-4 py-[14px] text-brand-blue-normal"
      >
        <Heart size="20" />
        <Title level={2} className="lg:text-xs xl:text-base">
          علاقه مندی‌ها
        </Title>
      </button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color="brand.orange.normal">علاقه مندی‌ها</DrawerHeader>

          <DrawerBody>
            {favoritesIsLoading ? (
              <Box className="flex w-full items-center justify-center">
                <Spinner color="brand.orange.normal" />
              </Box>
            ) : (
                <>
                  {product?.map((item: {
                    sellerProductId: any; id: number; name: string; product?: any
}) =>
                  (
                    <Box as={Link} href={`/products/${item.sellerProductId}`} className="flex flex-col gap-3 text-brand-blue-normal">
                      <Title level={1} bold>
                      {item?.product.name}
                      </Title>
                      <CustomBody>
                        {convertToJalaliDate(item?.product.date)}
                      </CustomBody>
                      <Title level={2}>{item?.product.content}</Title>
                    </Box>
                  ))}
                
                </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FavoritesDrawer;
