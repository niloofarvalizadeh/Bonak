"use client";
import React, { FC, useState } from "react";

import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Textarea
} from "@chakra-ui/react";
import Button from "@/components/ui/elements/Button";
import Title from "@/components/ui/typography/Title";
import { CloseCircle, TickCircle } from "iconsax-react";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { returnOrderAction } from "@/services/api";
import Input from "@/components/ui/elements/Input";
import Caption from "@/components/ui/typography/Caption";

const ReturnOrder: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = useState<1 | 2>(1);
  const [reason, setReason] = useState<string>("");
  const [trackingCode, setTrackingCode] = useState<string>("");

  const { trigger: returnOrder, isMutating: returnOrderIsLoading } =
    useSWRMutation("/product/api/v1/creaet-order-return/", returnOrderAction, {
      onSuccess: (res) => {
        console.log({ res });

        if (res.status == 201) {
          setStatus(2);
        } else if (res.status == 409) {
          toast.error("شما قبلاً برای این محصول درخواست مرجوعی ثبت کرده‌اید.");
        } else {
          toast.error(res.data.detail);
        }
      },
      onError: () => {}
    });

  const submitHandler = async () => {
    await returnOrder({
      reason,
      trackingCode
    });
  };
  return (
    <>
      <Button
        color="brand.orange.normal"
        bg="brand.orange.light"
        height="47px"
        width="163px"
        rounded="8px"
        position="absolute"
        left="0px"
        bottom="-70px"
        onClick={() => {
          onOpen();
        }}
      >
        <Title level={1}>مرجوع کردن سفارش</Title>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent
          className="!rounded-2xl !p-6 lg:rounded-[36px] lg:!px-11 lg:!pb-9 lg:!pt-11"
          width="700px"
        >
          <ModalBody padding="0px">
            <Box className="flex w-full items-center justify-between">
              <CustomHeading level={4} className="text-brand-blue-normal" bold>
                مرجوع کردن سفارش
              </CustomHeading>
              <Button
                aria-label="close modal button"
                padding="0px"
                bg="none"
                height="24px"
                color="brand.blue.normal"
                _hover={{ bg: "none" }}
                onClick={onClose}
              >
                <CloseCircle />
              </Button>
            </Box>
            {status == 1 ? (
              <>
                <Box className="mt-6 flex w-full flex-col gap-3 text-brand-blue-normal">
                  <Title level={1} bold>
                    کد رهگیری سفارش
                  </Title>
                  <Caption>
                    برای دریافت کد رهگیری سفارش وارد جزئیات سفارش بشید
                  </Caption>
                  <Input
                    inputMode="numeric"
                    type="number"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                  />
                </Box>
                <Box className="mt-6 flex w-full flex-col gap-3 text-brand-blue-normal">
                  <Title level={1} bold>
                    علت مرجوعی
                  </Title>
                  <Textarea
                    rounded="24px"
                    borderColor="brand.white.normalHover"
                    borderWidth="1px"
                    fontSize="19px"
                    fontWeight="bold"
                    _placeholder={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "brand.blue.normal"
                    }}
                    lineHeight="26.6px"
                    color="brand.blue.normal"
                    paddingRight="22px"
                    resize="none"
                    height="411px"
                    onChange={(e) => setReason(e.target.value)}
                  />
                </Box>
                <Button
                  color="white"
                  bg="brand.orange.normal"
                  height="42px"
                  width="100%"
                  marginTop="24px"
                  rounded="8px"
                  isLoading={returnOrderIsLoading}
                  onClick={submitHandler}
                >
                  <Title level={1} bold>
                    ثبت
                  </Title>
                </Button>
              </>
            ) : (
              <Box className="mt-[158px] flex w-full flex-col">
                <Box className="flex w-full flex-col items-center gap-6 text-brand-checkIn">
                  <TickCircle size={120} />
                  <CustomHeading level={5} bold>
                    مرجوعی شما ثبت شد
                  </CustomHeading>
                </Box>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReturnOrder;
