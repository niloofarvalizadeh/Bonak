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
import Image from "next/image";
import CustomBody from "@/components/ui/typography/CustomBody";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import { Rating as ReactRating } from "@smastrom/react-rating";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { createNewCommentAction } from "@/services/api";

interface CommentModalProps {
  isFullWidth: boolean;
  hideOnLgSize: boolean;
  id: string;
  name: string;
  image: string | null;
  imgAlt: string;
  itemsPerPackage: string | number;
  isAuthenticated: boolean;
}

const CommentModalSm: FC<CommentModalProps> = ({
  id,
  isFullWidth,
  hideOnLgSize,
  name,
  image,
  imgAlt,
  isAuthenticated
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = useState<1 | 2>(1);
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState(4);

  const { trigger: createNewComment, isMutating: createNewCommentIsLoading } =
    useSWRMutation("/product/api/v1/create_rating/", createNewCommentAction, {
      onSuccess: (res) => {
        console.log({ res });

        if (res.status == 201) {
          setStatus(2);
        } else if (res.status === 403) {
          // خطای 403 - کاربر مجاز نیست
          toast.error(res.data.error || "شما مجاز به ثبت نظر برای این محصول نیستید");
        } else {
          toast.error(res.data.message || "خطایی رخ داده است");
        }
      },
      onError: (error) => {
        toast.error("خطا در ارسال نظر");
      }
    });

  const submitHandler = async () => {
    await createNewComment({
      sellerProductId: id,
      comment,
      rating
    });
  };
  return (
    <>
      <Button
        color="brand.orange.normal"
        bg="brand.orange.light"
        height="47px"
        rounded="8px"
        width={isFullWidth ? "100%" : "152px"}
        className={`${hideOnLgSize ? "lg:!hidden" : ""}`}
        onClick={() => {
          if (isAuthenticated) {
            onOpen();
          } else {
            toast.error("لطفا ابتدا وارد شوید");
          }
        }}
      >
        <Title level={1}> ثبت نظر</Title>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          className="!rounded-2xl !p-6 lg:rounded-[36px] lg:!px-11 lg:!pb-9 lg:!pt-11"
          width="700px"
        >
          <ModalBody padding="0px">
            <Box className="flex w-full items-center justify-end">
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
                <Box className="mt-4 flex w-full items-start gap-3 text-brand-blue-normal">
                  <Box className="size-[112px] p-2">
                    <Image
                      alt={imgAlt}
                      src={image !== null ? image : ""}
                      className=""
                      width={1000}
                      height={0}
                    />
                  </Box>
                  <Title level={2} bold>
                    {name}
                  </Title>
                </Box>
                <Box className="mt-6 flex w-full items-center justify-between">
                  <CustomBody className="text-brand-blue-normal">
                    امتیاز شما به این محصول
                  </CustomBody>
                  <ReactRating
                    style={{ maxWidth: 80 }}
                    value={rating}
                    onChange={setRating}
                    // itemStyles={customStyles}
                  />
                </Box>
                <Box className="mt-6 flex w-full flex-col gap-3 text-brand-blue-normal">
                  <Title level={2}>متن دیدگاه</Title>
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
                    height="161px"
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Box>
                <Button
                  color="white"
                  bg="brand.orange.normal"
                  height="42px"
                  width="100%"
                  marginTop="24px"
                  rounded="8px"
                  isLoading={createNewCommentIsLoading}
                  onClick={submitHandler}
                >
                  <Title level={2} bold>
                    ثبت دیدگاه
                  </Title>
                </Button>
              </>
            ) : (
              <Box className="mt-[90px] flex w-full flex-col">
                <Box className="flex w-full flex-col items-center gap-6 text-brand-checkIn">
                  <TickCircle size={80} />
                  <CustomHeading level={5} bold>
                    دیدگاه شما ثبت شد
                  </CustomHeading>
                </Box>
                <Title
                  level={1}
                  className="mb-[139px] mt-[60px] text-center text-brand-blue-normal"
                >
                  پس از بررسی های لازم دیدگاه شما منتشر خواهد شد!
                </Title>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const CommentModalLg: FC<CommentModalProps> = ({
  isFullWidth,
  hideOnLgSize,
  name,
  image,
  imgAlt,
  itemsPerPackage,
  isAuthenticated,
  id
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = useState<1 | 2>(1);
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState(4);

  const { trigger: createNewComment, isMutating: createNewCommentIsLoading } =
    useSWRMutation("/product/api/v1/create_rating/", createNewCommentAction, {
      onSuccess: (res) => {
        console.log({ res });

        if (res.status == 201) {
          setStatus(2);
          toast.success("نظر شما با موفقیت ثبت شد");
        } else if (res.status === 403) {
          // خطای 403 - کاربر مجاز نیست
          toast.error(res.data?.error || "شما مجاز به ثبت نظر برای این محصول نیستید. باید این محصول را خریداری کرده باشید.");
        } else {
          toast.error(res.data?.message || "خطایی در ثبت نظر رخ داده است");
        }
      },
      onError: (error) => {
        console.error('Error submitting comment:', error);
        toast.error("خطا در ارسال نظر");
      }
    });

  const submitHandler = async () => {
    await createNewComment({
      sellerProductId: id,
      comment,
      rating
    });
  };
  return (
    <>
      <Button
        color="brand.orange.normal"
        bg="brand.orange.light"
        height="47px"
        rounded="8px"
        width={isFullWidth ? "100%" : "152px"}
        className={`${hideOnLgSize ? "lg:!hidden" : ""}`}
        onClick={() => {
          if (isAuthenticated) {
            onOpen();
          } else {
            toast.error("لطفا ابتدا وارد شوید");
          }
        }}
      >
        <Title level={1}> ثبت نظر</Title>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent
          className="!rounded-2xl !p-6 lg:rounded-[36px] lg:!px-11 lg:!pb-9 lg:!pt-11"
          width="700px"
        >
          <ModalBody padding="0px">
            <Box className="flex w-full items-center justify-end">
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
                <Box className="mt-4 flex w-full items-start gap-6 text-brand-blue-normal">
                  <Box className="size-[112px] p-2">
                    <Image
                      src={image !== null ? image : ""}
                      alt={imgAlt}
                      className=""
                      width={1000}
                      height={0}
                    />
                  </Box>
                  <Box className="flex flex-col gap-3">
                    <Title level={1} bold>
                      {name}
                    </Title>
                    <Title level={2}>بسته {itemsPerPackage} عددی</Title>
                  </Box>
                </Box>
                <Box className="mt-6 flex w-full items-center justify-between">
                  <Title level={1} bold className="text-brand-blue-normal">
                    امتیاز شما به این محصول
                  </Title>
                  <ReactRating
                    style={{ maxWidth: 104 }}
                    value={rating}
                    onChange={setRating}
                    // itemStyles={customStyles}
                  />
                </Box>
                <Box className="mt-6 flex w-full flex-col gap-3 text-brand-blue-normal">
                  <Title level={1} bold>
                    متن دیدگاه
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
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Box>
                <Button
                  color="white"
                  bg="brand.orange.normal"
                  height="42px"
                  width="100%"
                  marginTop="24px"
                  rounded="8px"
                  isLoading={createNewCommentIsLoading}
                  onClick={submitHandler}
                >
                  <Title level={1} bold>
                    ثبت دیدگاه
                  </Title>
                </Button>
              </>
            ) : (
              <Box className="mt-[158px] flex w-full flex-col">
                <Box className="flex w-full flex-col items-center gap-6 text-brand-checkIn">
                  <TickCircle size={120} />
                  <CustomHeading level={5} bold>
                    دیدگاه شما ثبت شد
                  </CustomHeading>
                </Box>
                <CustomHeading
                  level={5}
                  className="mb-[139px] mt-[60px] text-center text-brand-blue-normal"
                >
                  پس از بررسی های لازم دیدگاه شما منتشر خواهد شد!
                </CustomHeading>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export { CommentModalSm, CommentModalLg };
