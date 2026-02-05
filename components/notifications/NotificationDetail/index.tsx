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
  Spinner
} from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";
import { useGetNotificationDetail } from "@/services/queries";
import CustomBody from "@/components/ui/typography/CustomBody";
import { convertToJalaliDate } from "@/utils";

interface NotificationDetailProps {
  id: number;
}

const NotificationDetail: FC<NotificationDetailProps> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const { data: notificationDetail, isLoading: notificationDetailIsLoading } =
    useGetNotificationDetail(isOpen, id);

  return (
    <>
      <Button
        ref={btnRef}
        height="44px"
        py="8px"
        px="24px"
        rounded="8px"
        onClick={onOpen}
        bg="brand.orange.light"
        color="brand.orange.normal"
        _hover={{
          bg: "brand.orange.lightHover"
        }}
      >
        <Title level={2}>مشاهده</Title>
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
          <DrawerHeader color="brand.orange.normal">
            جزئیات اطلاع رسانی
          </DrawerHeader>

          <DrawerBody>
            {notificationDetailIsLoading ? (
              <Box className="flex w-full items-center justify-center">
                <Spinner color="brand.orange.normal" />
              </Box>
            ) : (
              <Box className="flex flex-col gap-3 text-brand-blue-normal">
                <Title level={1} bold>
                  {notificationDetail?.data.title}
                </Title>
                <CustomBody>
                  {convertToJalaliDate(notificationDetail?.data.date)}
                </CustomBody>
                <Title level={2}>{notificationDetail?.data.content}</Title>
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NotificationDetail;
