import React, { FC, useState } from "react";
import clsx from "clsx";

import Caption from "@/components/ui/typography/Caption";
import Title from "@/components/ui/typography/Title";
import { Box, Button, Checkbox, Tag, Tooltip } from "@chakra-ui/react";
import { AddSquare, Heart } from "iconsax-react";
import Image from "next/image";
import { addCommas } from "@persian-tools/persian-tools";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { toggleFavoriteProductAction } from "@/services/api";

interface ProductCardProps {
  imageSrc: string | null;
  productName: string;
  price: number | any;
  inventoryCount: number | null;
  sellerCount: number | null;
  discountPercentage: any;
  haveRounded: boolean;
  sellerProductId: number;
  whiteBg?: boolean;
  haveBorderY?: boolean;
  haveBorderLeft?: boolean;
  isAuthenticated: boolean;
  sellerrating?: number;
  isfavorite: boolean;
  discountedPrice: number | any;
  companyName?: string;
  sellerId?: number;
}

const ProductCard: FC<ProductCardProps> = ({
  imageSrc,
  productName,
  price,
  inventoryCount,
  sellerCount,
  discountPercentage,
  discountedPrice,
  sellerProductId,
  haveRounded,
  whiteBg,
  haveBorderY,
  haveBorderLeft,
  isfavorite,
  sellerrating,
  isAuthenticated,
  companyName,
  sellerId
}) => {
  const [bookmarked, setbookmarked] = useState<boolean>(isfavorite);

  const {
    trigger: toggleFavoriteProduct,
    isMutating: toggleFavoriteProductIsLoading
  } = useSWRMutation(
    `/product/api/v1/seller-products/${sellerProductId}/toggle-favorite/`,
    toggleFavoriteProductAction,
    {
      onSuccess: (res) => {
        if (res.status == 201) {
          toast.success(res.data.message);
          setbookmarked(true)
        } else {
          if(res.data.message)
          {
            toast.error(res.data.message);
            setbookmarked(false)
          }
          else
          {

            toast.error("برای ثبت علاقه مندی ها وارد حساب کاربری خود شوید")
            setbookmarked(false)
          }
        }
      },
      onError: () => {}
    }
  );

  
  return (
    <Box
      className={`flex flex-col gap-2 p-2 ${haveRounded ? "rounded-xl border border-brand-white-normalHover" : ""} ${haveBorderY ? "border-y border-brand-white-normalHover" : ""} ${whiteBg ? "bg-brand-white-normal" : ""} ${haveBorderLeft ? "border-l border-brand-white-normalHover" : ""}`}
    >

      <Box className="relative h-60 w-full">
        <Box className="absolute right-0 top-0 flex w-full items-center justify-between">
          <Button
            bg="none"
            isLoading={toggleFavoriteProductIsLoading}
            _hover={"none"}
            onClick={() => {
              toggleFavoriteProduct();
            }}
            className="flex items-center justify-center text-2xl focus:outline-none transition-transform duration-200"
          >
            {bookmarked ? (
              <FaHeart className="text-red-500 scale-75 transition-transform" />
            ) : (
              <FaRegHeart className="text-gray-400 scale-75 transition-transform" />
            )}
          </Button>
          {discountPercentage && (
            <Box className="rounded-[30px] bg-brand-orange-normal px-[10px] py-1 text-center text-brand-white-normal">
              <Caption bold className="text-center">
                {discountPercentage}%
              </Caption>
            </Box>
          )}
        </Box>
        <Link href={`/products/${sellerProductId}`}>
          <Box className="h-full w-full">
            <Image
              src={imageSrc ? imageSrc : "/1x.png"}
              alt={productName}
              width={1000}
              height={600}
            />
          </Box>
          <Box className="absolute bottom-2 right-0 flex w-full items-center justify-between">
            <Link href={`/products/${sellerProductId}`}>
              <AddSquare size={44} className="text-brand-orange-normal" />
            </Link>
          </Box>
        </Link>
      </Box>
       

      <Link href={`/products/${sellerProductId}`}>
        <Box className="flex w-full flex-col gap-[6px] bg-brand-white-normal">
          <Title
            level={2}
            className="h-11 w-full truncate text-brand-blue-normalActive"
          >
            {productName}
          </Title>

          <Box>
            <Tag
              bg="brand.white.normalHover"
              rounded="30px"
              paddingX="10px"
              paddingY="4px"
            >
              <Caption bold className="text-brand-blue-normal">
                {inventoryCount} عدد
              </Caption>
            </Tag>
          </Box>

          {isAuthenticated ? (
            <>
              {discountPercentage > 0 ? (
                <>
                  <Title level={1} className="text-brand-orange-normal">
                    {addCommas(discountedPrice)}تومان 
                  </Title>
                  <Title level={2} className="text-brand-blue-lightActive line-through">
                    {addCommas(price)} تومان
                  </Title>
                </>
              ) : (
                <Title level={1} className="text-brand-blue-lightActive">
                  {addCommas(price)} تومان
                </Title>
              )}
            </>
          ) : <>
            {discountPercentage == 0 ? <Title level={1} className="text-brand-orange-normal  blur-sm  mt-2">
                <button onMouseOver={() => toast.error("برای مشاهده قیمت ها وارد حساب کاربری خود شوید")}>
                  {addCommas(999999)} تومان
                </button>
              </Title>: ""}
              <Title level={2} className="text-black  blur-sm  mt-2">
                <button onMouseOver={() => toast.error("برای مشاهده قیمت ها وارد حساب کاربری خود شوید")}>
                  {addCommas(999999)} تومان
                </button>
              </Title>
          </>}

          <Box className="flex w-full items-center justify-between">
            {companyName && sellerId ? (
              <Tooltip 
                label="مشاهده اطلاعات پخش کننده" 
                hasArrow 
                bg="brand.blue.normal" 
                color="white"
                fontSize="sm"
                placement="top"
              >
                <Link href={`/sellers/${sellerId}`}>
                  <Caption 
                    bold 
                    className="text-brand-blue-lightActive hover:text-brand-blue-normal hover:underline cursor-pointer transition-colors duration-200"
                  >
                    {companyName}
                  </Caption>
                </Link>
              </Tooltip>
            ) : (
              <Caption bold className="text-brand-blue-lightActive">
                {sellerCount} پخش کننده
              </Caption>
            )}
            <Box className="flex items-center justify-center gap-[2px] text-brand-yellow-normal">
              <Caption>{sellerrating}</Caption>
              <Heart variant="Bold" size={12} />
            </Box>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default ProductCard;