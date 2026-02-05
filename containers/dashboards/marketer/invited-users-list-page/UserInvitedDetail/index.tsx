"use client";
import React, { FC, useRef, useEffect, useState } from "react";
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
import CustomBody from "@/components/ui/typography/CustomBody";
import { convertToJalaliDate } from "@/utils";
import useSWRMutation from "swr/mutation";
import { getUserInvitedDataAction } from "@/services/api";
import toast from "react-hot-toast";
import { UserInvited } from "@/types";

interface UserInvitedDetailProps {
  id: number;
  user: UserInvited;
}

interface UserInvitedResponse {
  totalPurchases: number;
  totalCommission: number;
}

const UserInvitedDetail: FC<UserInvitedDetailProps> = ({ id, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [responseData, setResponseData] = useState<UserInvitedResponse | null>(
    null
  );

  const {
    trigger: getUserInvitedData,
    isMutating: getUserInvitedDataIsLoading
  } = useSWRMutation(
    "/marketer/api/v1/marketer-report/",
    getUserInvitedDataAction,
    {
      onSuccess: (res) => {
        if (res.status === 200) {
          setResponseData({
            totalPurchases: res.data.totalPurchases,
            totalCommission: res.data.totalCommission
          });
        } else {
          toast.error(res.data.message);
        }
      },
      onError: () => {
        toast.error("خطا در دریافت اطلاعات خرید");
      }
    }
  );

  const submitHandler = () => {
    getUserInvitedData({ userId: id });
  };

  useEffect(() => {
    if (isOpen) {
      submitHandler();
    }
  }, [isOpen]);

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
          <DrawerHeader color="brand.orange.normal">جزئیات کاربر</DrawerHeader>

          <DrawerBody>
            {getUserInvitedDataIsLoading ? (
              <Box className="flex w-full items-center justify-center">
                <Spinner color="brand.orange.normal" />
              </Box>
            ) : (
              <Box className="flex flex-col gap-3 text-brand-blue-normal">
                <Title level={1} bold>
                  اطلاعات کاربر
                </Title>
                <CustomBody>
                  <strong>نام:</strong> {user.buyerInfo.firstName}
                </CustomBody>
                <CustomBody>
                  <strong>نام خانوادگی:</strong> {user.buyerInfo.lastName}
                </CustomBody>
                <CustomBody>
                  <strong>نام فروشگاه:</strong> {user.buyerInfo.shopName}
                </CustomBody>
                <CustomBody>
                  <strong>شماره تلفن:</strong> {user.phoneNumber}
                </CustomBody>
                <CustomBody>
                  <strong>شماره تلفن کاری:</strong>{" "}
                  {user.buyerInfo.workPhoneNumber}
                </CustomBody>
                <CustomBody>
                  <strong>وضعیت دعوت:</strong>{" "}
                  {user.isAccepted ? "پذیرفته‌شده" : "پذیرفته‌نشده"}
                </CustomBody>
                <CustomBody>
                  <strong>تاریخ ثبت‌نام:</strong>{" "}
                  {convertToJalaliDate(user.buyerInfo.registrationDate)}
                </CustomBody>
                <CustomBody>
                  <strong>تاریخ دعوت:</strong>{" "}
                  {convertToJalaliDate(user.createdAt)}
                </CustomBody>
                <Title level={2} bold>
                  آمار خرید
                </Title>
                {responseData ? (
                  <>
                    <CustomBody>
                      <strong>تعداد کل خریدها:</strong>{" "}
                      {responseData.totalPurchases}
                    </CustomBody>
                    <CustomBody>
                      <strong>مجموع کمیسیون:</strong>{" "}
                      {responseData.totalCommission} تومان
                    </CustomBody>
                  </>
                ) : (
                  <CustomBody>اطلاعات خرید در دسترس نیست</CustomBody>
                )}
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserInvitedDetail;
