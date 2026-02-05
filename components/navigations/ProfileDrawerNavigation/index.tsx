"use client";
import React, { FC, useRef } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Button,
  Box,
  Badge,
  Divider
} from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";
import { FilterRoutesByTagsProps } from "@/types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { filterRoutesByTags, generateRandomId } from "@/utils";
import { LogoutCurve } from "iconsax-react";
import { deleteSession } from "@/libs/session";
import { useGetUserCartDetail } from "@/services/queries";
import { HambergerMenu } from "iconsax-react";
const ProfileDrawerNavigation: FC<FilterRoutesByTagsProps> = ({
  tags,
  userRole
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const pathname = usePathname();
  const filterProps: FilterRoutesByTagsProps = { userRole, tags };
  const handleLogout = async () => {
    await deleteSession();
  };

  const { data: userCart, isLoading } = useGetUserCartDetail(
    userRole == "buyer"
  );

  const cartItemCount = userCart && !isLoading ? userCart.cartStores.length : 0;

  return (
    <>
      <Button
        ref={btnRef}
        height="44px"
        onClick={onOpen}
        bg="none"
        _hover={{
          bg: "none"
        }}
        className="lg:!hidden"
      >
        <HambergerMenu />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color="brand.orange.normal">بنک سنتر</DrawerHeader>

          <DrawerBody padding="0px">
            <Box className="flex h-full w-full flex-col items-center gap-3 p-3">
              {filterRoutesByTags(filterProps)?.map((item, index) => {
                const IconComponent = item.icon;
                const isLastItem =
                  index === filterRoutesByTags(filterProps).length - 1;
                return userRole == "buyer" && item.tag == "checkout" ? (
                  <React.Fragment key={generateRandomId()}>
                    <Link
                      href={item.path}
                      className={`flex h-9 w-full items-center justify-between rounded-lg px-3 py-[10px] ${pathname == item.path ? "bg-brand-orange-light text-brand-orange-normal hover:text-brand-orange-normalHover" : "text-brand-blue-lightActive hover:text-brand-blue-lightHover"}`}
                    >
                      <Box className="flex items-center gap-1">
                        <IconComponent
                          size="24"
                          variant={pathname == item.path ? "Bold" : "Outline"}
                        />
                        <Title level={2}>{item.title}</Title>
                      </Box>
                      <Badge
                        rounded="full"
                        height="20px"
                        width="20px"
                        color="brand.white.normal"
                        bg="brand.orange.normal"
                        textAlign="center"
                      >
                        <Title level={2} className="text-center">
                          {cartItemCount}
                        </Title>
                      </Badge>
                    </Link>
                    {!isLastItem && (
                      <Divider
                        width="100%"
                        height="1px"
                        color="brand.white.normalHover"
                      />
                    )}
                  </React.Fragment>
                ) : (
                  <React.Fragment key={generateRandomId()}>
                    <Link
                      href={item.path}
                      className={`flex h-9 w-full items-center gap-1 rounded-lg px-3 py-[10px] ${pathname == item.path ? "bg-brand-orange-light text-brand-orange-normal hover:text-brand-orange-normalHover" : "text-brand-blue-lightActive hover:text-brand-blue-lightHover"}`}
                    >
                      <IconComponent
                        size="24"
                        variant={pathname == item.path ? "Bold" : "Outline"}
                      />
                      <Title level={2}>{item.title}</Title>
                    </Link>
                    {!isLastItem && (
                      <Divider
                        width="100%"
                        height="1px"
                        color="brand.white.normalHover"
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </Box>
            <Button
              bg="none"
              className="!absolute !bottom-3 !flex !h-12 !w-full !items-center !justify-center !gap-2 !text-brand-logOut"
              onClick={handleLogout}
            >
              <LogoutCurve size="16" />
              <Title level={2}>خروج</Title>
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProfileDrawerNavigation;
