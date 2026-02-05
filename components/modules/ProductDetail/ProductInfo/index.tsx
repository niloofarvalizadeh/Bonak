"use client";
import React, { FC, useState } from "react";
import { getMediaUrl } from "@/utils/media";
import { Box, Divider, IconButton } from "@chakra-ui/react";
import Image from "next/image";
import Caption from "@/components/ui/typography/Caption";
import Title from "@/components/ui/typography/Title";
import { Add, Heart, Minus } from "iconsax-react";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import Button from "@/components/ui/elements/Button";
import { ProductData } from "@/types";
import useSWRMutation from "swr/mutation";
import {
  addProductToCartAction,
  toggleFavoriteProductAction,
  calculateProductPriceAction
} from "@/services/api";
import toast from "react-hot-toast";
import { addCommas } from "@persian-tools/persian-tools";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface ProductInfoProps {
  product: ProductData;
  id: string;
  isAuth: boolean;
}
import { Tooltip } from "@chakra-ui/react";

// تابع کمکی برای بررسی تخفیف معتبر
const hasValidDiscount = (discountedPrice: number | null) => {
  return discountedPrice && discountedPrice > 0;
};

// تابع برای فرمت‌بندی بازه تعداد
const formatQuantityRange = (minQuantity: number, maxQuantity: number | null) => {
  if (maxQuantity === null) {
    return `از ${minQuantity} عدد به بالا`;
  }
  return `از ${minQuantity} تا ${maxQuantity} عدد`;
};

const ProductInfo: FC<ProductInfoProps> = ({ product, id, isAuth }) => {
  const { name, image, altText } = product.product;
  const { minCountAmount } = product.sellerProduct;
  const { numRatings } = product.sellerInformation;
  const pricing = product.pricing;
  const {
    description,
    itemsPerPackage,
    isFixedPricing,
    seller
  } = product.sellerProduct;
  const [showAction, setShowAction] = useState<boolean>(false);
  const [quNumber, setQuNumber] = useState<number>(minCountAmount); // ✅ این درسته
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [calculatedPrice, setCalculatedPrice] = useState<{
    price: number;
    price_per_item: number;
  } | null>(null);

  const {
    trigger: calculatePrice,
    isMutating: calculatePriceIsLoading
  } = useSWRMutation(
    "/product/api/v1/calculate-price/",
    calculateProductPriceAction,
    {
      onSuccess: (data) => {
        setCalculatedPrice({
          price: data.price,
          price_per_item: data.price_per_item
        });
      },
      onError: () => {
        setCalculatedPrice(null);
      }
    }
  );

  console.log({ pricing });
  const router = useRouter();
  
  const handleAction = () => {
    if (isAuth == true) {
      setShowAction(true);
    } else {
      toast.error("لطفا ابتدا وارد شوید");
    }
  };

  const { trigger: addProduct, isMutating: addProductIsLoading } =
    useSWRMutation("/product/api/v1/add-to-cart/", addProductToCartAction, {
      onSuccess: (res) => {
        if (res.status == 200) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      },
      onError: () => {}
    });

  const {
    trigger: toggleFavoriteProduct,
    isMutating: toggleFavoriteProductIsLoading
  } = useSWRMutation(
    `/product/api/v1/seller-products/${id}/toggle-favorite/`,
    toggleFavoriteProductAction,
    {
      onSuccess: (res) => {
        if (res.status == 201) {
          toast.success(res.data.message);
          setIsFavorite(true);
        } else {
          if(res.data.message) {
            toast.error(res.data.message);
            setIsFavorite(false);
          } else {
            toast.error("برای ثبت علاقه مندی ها وارد حساب کاربری خود شوید");
            setIsFavorite(false);
          }
        }
      },
      onError: () => {}
    }
  );  

  const handleAddProduct = () => {
    if (quNumber < minCountAmount) {
      toast.error(`حداقل تعداد خرید برای این محصول ${minCountAmount} عدد می‌باشد.`);
    } else {
      addProduct({
        quantity: quNumber,
        sellerProductId: id
      });
    }
  };


  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(newQuantity, minCountAmount);
    setQuNumber(validQuantity);
    
    console.log("📦 Quantity changed:", {
      seller_product_id: Number(id),
      quantity: validQuantity,
      minCountAmount
    });
    
    if (validQuantity >= minCountAmount) {
      calculatePrice({
        seller_product_id: Number(id),
        quantity: validQuantity
      });
    } else {
      setCalculatedPrice(null);
    }
  };


  const handleToggleFavoriteAction = () => {
    if (isAuth == true) {
      toggleFavoriteProduct();
    } else {
      toast.error("لطفا ابتدا وارد شوید");
    }
  };

  const handleViewSellerProducts = () => {
    if (isAuth == true) {
      router.push(`/sellers/${seller}`);
    } else {
      toast.error("لطفا ابتدا وارد شوید");
    }
  };

  return (
    <>
      {/* SM */}
      <Box className="flex items-center lg:hidden">
        {/* IMAGE */}
        <Box className="size-[186px] p-2">
        <Image
          src={getMediaUrl(image)}
          alt={altText}
          className="!h-full !w-full"
          width={1000}
          height={0}
        />
        </Box>
        <Box className="flex flex-col gap-[5px]">
          <Box className="flex flex-col items-end gap-2">
            <Box className="flex items-center justify-center gap-[2px] text-brand-yellow-normal">
              <Button
                padding="0px"
                bg="none"
                size="12px"
                isLoading={toggleFavoriteProductIsLoading}
                onClick={handleToggleFavoriteAction}
              >
                {isFavorite ? (
                  <FaHeart className="text-red-500 scale-75 transition-transform" />
                ) : (
                  <FaRegHeart className="text-gray-400 scale-75 transition-transform" />
                )}
              </Button>
            </Box>
            <Title level={2} bold className="text-brand-blue-normal">
              {name}
            </Title>
          </Box>
          <Title level={2} className="text-brand-blue-lightActive">
            {description}
          </Title>
        </Box>
      </Box>
      <Box className="w-full lg:hidden">
        <Button
          bg="brand.orange.normal"
          color="brand.white.normal"
          rounded="8px"
          className="!mt-3 lg:!mt-6"
          onClick={handleViewSellerProducts}
        >
          <Title level={2} bold>
            مشاهده سایر محصولات فروشنده
          </Title>
        </Button>
      </Box>
      <Box className="w-full lg:hidden">
        <Box className="mt-10 flex w-full flex-col gap-4">
          {/* تعداد در هر بسته */}
          <Box className="flex w-full items-center justify-between text-brand-blue-normal">
            <Title level={1} className="lg:hidden">
              تعداد در هر بسته (کارتن)
            </Title>
            <Title bold level={1} className="lg:hidden">
              {itemsPerPackage} عدد
            </Title>
          </Box>

          <Divider />

          {/* نمایش قیمت‌ها بر اساس isFixedPricing */}
          {isFixedPricing ? (
            // حالت قیمت ثابت - فقط اولین آیتم pricing
            pricing?.length > 0 && (
              <>
              <Box className="flex w-full items-center justify-between text-brand-blue-normal">
                <Title bold level={2} className="lg:hidden">  {/* level={1} → level={2} */}
                  قیمت
                </Title>
                <Box className="relative">
                  {!isAuth && (
                    <Box className="blrPrice absolute left-0 top-0 z-20 h-full w-full"></Box>
                  )}
                  {hasValidDiscount(pricing[0].discountedPrice) ? (
                    <Box className="flex flex-col items-end gap-1">
                      <Caption className="line-through text-gray-500">  {/* Title → Caption */}
                        {addCommas(pricing[0].price)} تومان
                      </Caption>
                      <Title level={1} bold className="text-brand-orange-normal">  {/* level={1} → level={2} */}
                        {addCommas(pricing[0].discountedPrice)} تومان
                      </Title>
                    </Box>
                  ) : (
                    <Title level={2} bold>  {/* level={1} → level={2} */}
                      {addCommas(pricing[0].price)} تومان
                    </Title>
                  )}
                </Box>
              </Box>

                {/* هزینه ارسال */}
                <Box className="flex w-full items-center justify-between text-brand-blue-normal">
                  <Title level={1} className="text-brand-yellow-normalActive lg:hidden">
                    هزینه ارسال {">"}
                  </Title>
                  <Caption bold className="lg:hidden">
                    {pricing[0].shippingCost == null || pricing[0].shippingCost == 0
                      ? "رایگان"
                      : `${addCommas(pricing[0].shippingCost)} تومان`}
                  </Caption>
                </Box>
              </>
            )
          ) : (
            // حالت قیمت‌گذاری پلکانی - همه آیتم‌های pricing
            pricing?.map((item, index) => (
              <Box 
                key={item.id || index} 
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3 last:mb-0"
              >
                <Box className="flex w-full items-center justify-between text-brand-blue-normal mb-2">
                <Title level={2} bold className="text-brand-blue-dark">
                  {formatQuantityRange(item.minQuantity, item.maxQuantity)}
                </Title>
                  <Box className="relative">
                    {!isAuth && (
                      <Box className="blrPrice absolute left-0 top-0 z-20 h-full w-full"></Box>
                    )}
                    {hasValidDiscount(item.discountedPrice) ? (
                      <Box className="flex flex-col items-end gap-1">
                      <Title level={2} className="line-through text-gray-500">
                        {addCommas(item.price)} تومان
                      </Title>
                          <Title level={1} bold className="text-brand-orange-normal">
                            {addCommas(item.discountedPrice)} تومان
                          </Title>
                      </Box>
                    ) : (
                    <Title level={1} bold className="text-brand-orange-normal">
                      {addCommas(item.price)} تومان
                    </Title>
                    )}
                  </Box>
                </Box>
                
                {/* هزینه ارسال */}
                <Box className="flex w-full items-center justify-between text-brand-blue-normal pt-2 border-t border-gray-200">
                <Title level={1} className="text-brand-yellow-normalActive">
                  هزینه ارسال {">"}
                </Title>
                  <Title level={2} bold>
                    {item.shippingCost == null || item.shippingCost == 0
                      ? "رایگان"
                      : `${addCommas(item.shippingCost)} تومان`}
                  </Title>
                </Box>
              </Box>
            ))
          )}

          <Divider />
        </Box>

        {/* دکمه افزودن به سبد خرید */}
        {!showAction ? (
          <Button
            bg="brand.orange.normal"
            color="brand.white.normal"
            height="52px"
            width="100%"
            rounded="8px"
            className="!mt-3 lg:!mt-6"
            onClick={handleAction}
          >
            <CustomHeading level={5} bold>
              افزودن به سبد خرید
            </CustomHeading>
          </Button>
        ) : (
          <Box className="!mt-3 lg:!mt-6">
            <Box
              bg="brand.orange.light"
              color="brand.white.normal"
              height="52px"
              width="100%"
              rounded="8px"
              className="flex items-center justify-between px-6"
            >
              <IconButton
                icon={<Add />}
                onClick={() => handleQuantityChange(quNumber + 1)}
                aria-label="add button"
                bg="none"
                _hover={{ bg: "none" }}
                className="!text-brand-orange-normalActive"
              />
              <CustomHeading level={5} bold className="text-brand-blue-normal">
                {quNumber}
              </CustomHeading>
              <Tooltip
                label={`حداقل تعداد خرید ${minCountAmount} عدد می‌باشد`}
                hasArrow
                placement="top"
                bg="brand.blue.normal"
                color="brand.white.normal"
                fontSize="sm"
                isDisabled={!isAuth || quNumber > minCountAmount}
              >
                <IconButton
                  icon={<Minus />}
                  onClick={() => {
                    if (quNumber > minCountAmount) {
                      handleQuantityChange(quNumber - 1);
                    }
                  }}
                  isDisabled={quNumber <= minCountAmount}
                  aria-label="کم کردن تعداد"
                  bg="none"
                  _hover={{ bg: "none" }}
                  className="!text-brand-orange-normalActive disabled:opacity-50"
                />
              </Tooltip>
            </Box>
            {calculatedPrice && (
              <Box className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <Box className="flex items-center justify-between mb-3">
                  <Title level={2} className="text-brand-blue-normal font-medium">
                    قیمت نهایی:
                  </Title>
                  <Title level={1} bold className="text-brand-orange-normal">
                    {addCommas(calculatedPrice.price)} تومان
                  </Title>
                </Box>
                <Box className="flex items-center justify-between">
                  <Title level={2} className="text-brand-blue-lightActive">
                    قیمت هر عدد:
                  </Title>
                  <Title level={2} bold className="text-brand-blue-normal">
                    {addCommas(calculatedPrice.price_per_item)} تومان
                  </Title>
                </Box>
              </Box>
            )}
            <Button
              bg="brand.orange.normal"
              color="brand.white.normal"
              height="52px"
              width="100%"
              rounded="8px"
              className="!mt-3 lg:!mt-6"
              isLoading={addProductIsLoading}
              onClick={handleAddProduct}
            >
              <CustomHeading level={5} bold>
                تایید
              </CustomHeading>
            </Button>
          </Box>
        )}
      </Box>

      {/* LG */}
      <Box className="hidden items-center gap-10 lg:flex">
        {/* IMAGE */}
        <Box className="size-[440px] p-[29px]">
        <Image
          src={getMediaUrl(image)}
          alt={altText}
          className=""
          width={1000}
          height={0}
        />
        </Box>
        <Box className="w-full">
          <Box className="flex w-full flex-col gap-[5px]">
            <Box className="flex items-center justify-between">
              <CustomHeading level={4} bold className="text-brand-blue-normal">
                {name}
              </CustomHeading>
              <Box className="flex items-center justify-center gap-[2px] text-brand-yellow-normal">
                <Button
                  padding="0px"
                  bg="none"
                  size="24px"
                  isLoading={toggleFavoriteProductIsLoading}
                  onClick={handleToggleFavoriteAction}
                >
                  {isFavorite ? (
                    <FaHeart className="text-red-500 scale-75 transition-transform" size={24} />
                  ) : (
                    <FaRegHeart className="text-gray-400 scale-75 transition-transform" size={24} />
                  )}
                </Button>
              </Box>
            </Box>
            <Title level={2} className="text-brand-blue-lightActive">
              {description}
            </Title>
          </Box>
          <Box className="hidden w-full lg:block">
            <Box className="mt-10 flex w-full flex-col gap-4">
              {/* تعداد در هر بسته */}
              <Box className="flex w-full items-center justify-between text-brand-blue-normal">
                <CustomHeading level={5}>
                  تعداد در هر بسته (کارتن)
                </CustomHeading>
                <CustomHeading bold level={5}>
                  {itemsPerPackage} عدد
                </CustomHeading>
              </Box>

              <Divider />

              {/* نمایش قیمت‌ها بر اساس isFixedPricing */}
              {isFixedPricing ? (
                // حالت قیمت ثابت - فقط اولین آیتم pricing
                pricing?.length > 0 && (
                  <>
                    <Box className="flex w-full items-center justify-between text-brand-blue-normal">
                      <CustomHeading bold level={5}>
                        قیمت
                      </CustomHeading>
                      <Box className="relative">
                        {!isAuth && (
                          <Box className="blrPrice absolute left-0 top-0 z-20 h-full w-full"></Box>
                        )}
                        {hasValidDiscount(pricing[0].discountedPrice) ? (
                          <Box className="flex flex-col items-end gap-1">
                            <CustomHeading level={5} className="line-through text-gray-500">
                              {addCommas(pricing[0].price)} تومان
                            </CustomHeading>
                            <CustomHeading bold level={4} className="text-brand-orange-normal">
                              {addCommas(pricing[0].discountedPrice)} تومان
                            </CustomHeading>
                          </Box>
                        ) : (
                          <Title level={1} bold className="text-brand-orange-normal">
                            {addCommas(pricing[0].price)} تومان
                          </Title>
                        )}
                      </Box>
                    </Box>

                    {/* هزینه ارسال */}
                    <Box className="flex w-full items-center justify-between text-brand-blue-normal">
                      <Title level={2} className="text-brand-yellow-normalActive">
                        هزینه ارسال {">"}
                      </Title>
                      <Title level={2} bold>
                        {pricing[0].shippingCost == null || pricing[0].shippingCost == 0
                          ? "رایگان"
                          : `${addCommas(pricing[0].shippingCost)} تومان`}
                      </Title>
                    </Box>
                  </>
                )
              ) : (
                // حالت قیمت‌گذاری پلکانی - همه آیتم‌های pricing
                pricing?.map((item, index) => (
                  <Box 
                    key={item.id || index} 
                    className="bg-white border border-gray-200 rounded-lg p-3 mb-3 shadow-sm last:mb-0"
                  >
                    <Box className="flex w-full items-center justify-between text-brand-blue-normal mb-2">
                      <Title bold level={1} className="text-brand-blue-dark">
                        {formatQuantityRange(item.minQuantity, item.maxQuantity)}
                      </Title>
                      <Box className="relative">
                        {!isAuth && (
                          <Box className="blrPrice absolute left-0 top-0 z-20 h-full w-full"></Box>
                        )}
                        {hasValidDiscount(item.discountedPrice) ? (
                          <Box className="flex flex-col items-end gap-1">
                              <Title level={1} className="line-through text-gray-500">
                                {addCommas(item.price)} تومان
                              </Title>
                            <Title level={1} className="text-brand-orange-normal">
                              {addCommas(item.discountedPrice)} تومان
                            </Title>
                          </Box>
                        ) : (
                          <Title level={1} className="text-brand-orange-normal">
                            {addCommas(item.price)} تومان
                          </Title>
                        )}
                      </Box>
                    </Box>
                    
                    {/* هزینه ارسال */}
                    <Box className="flex w-full items-center justify-between text-brand-blue-normal pt-2 border-t border-gray-100">
                      <Title level={1} className="text-brand-yellow-normalActive">
                        هزینه ارسال {">"}
                      </Title>
                        <Title level={2} bold>
                          {item.shippingCost == null || item.shippingCost == 0
                            ? "رایگان"
                            : `${addCommas(item.shippingCost)} تومان`}
                        </Title>
                    </Box>
                  </Box>
                ))
              )}

              <Divider />
            </Box>

            {/* دکمه افزودن به سبد خرید */}
            {!showAction ? (
              <Button
                bg="brand.orange.normal"
                color="brand.white.normal"
                height="52px"
                width="100%"
                rounded="8px"
                className="!mt-3 lg:!mt-6"
                onClick={handleAction}
              >
                <CustomHeading level={5} bold>
                  افزودن به سبد خرید
                </CustomHeading>
              </Button>
            ) : (
              <Box className="!mt-3 lg:!mt-6">
                <Box
                  bg="brand.orange.light"
                  color="brand.white.normal"
                  height="52px"
                  width="100%"
                  rounded="8px"
                  className="flex items-center justify-between px-6"
                >
                  <IconButton
                    icon={<Add />}
                    onClick={() => handleQuantityChange(quNumber + 1)} // ✅ تغییر به handleQuantityChange
                    aria-label="add button"
                    bg="none"
                    _hover={{ bg: "none" }}
                    className="!text-brand-orange-normalActive"
                  />
                  <CustomHeading level={5} bold className="text-brand-blue-normal">
                    {quNumber}
                  </CustomHeading>
                  <Tooltip
                    label={`حداقل تعداد خرید ${minCountAmount} عدد می‌باشد`}
                    hasArrow
                    placement="top"
                    bg="brand.blue.normal"
                    color="brand.white.normal"
                    fontSize="sm"
                    isDisabled={!isAuth || quNumber > minCountAmount}
                  >
                    <IconButton
                      icon={<Minus />}
                      onClick={() => {
                        if (quNumber > minCountAmount) {
                          handleQuantityChange(quNumber - 1);
                        }
                      }}
                      isDisabled={quNumber <= minCountAmount}
                      aria-label="کم کردن تعداد"
                      bg="none"
                      _hover={{ bg: "none" }}
                      className="!text-brand-orange-normalActive disabled:opacity-50"
                    />
                  </Tooltip>
                </Box>
                {calculatedPrice && (
                  <Box className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-xl w-fit mx-auto">
                    <Box className="flex flex-col gap-1">
                      <Box className="flex items-center justify-between gap-4">
                        <Title level={2} className="text-brand-blue-normal whitespace-nowrap">
                          قیمت نهایی:
                        </Title>
                        <Title level={1} bold className="text-brand-orange-normal whitespace-nowrap">
                          {addCommas(calculatedPrice.price)} تومان
                        </Title>
                      </Box>
                      <Box className="flex items-center justify-between gap-4">
                        <Title level={2} className="text-brand-blue-lightActive whitespace-nowrap">
                          قیمت هر عدد:
                        </Title>
                        <Title level={2} bold className="text-brand-blue-normal whitespace-nowrap">
                          {addCommas(calculatedPrice.price_per_item)} تومان
                        </Title>
                      </Box>
                    </Box>
                  </Box>
                )}
                <Button
                  bg="brand.orange.normal"
                  color="brand.white.normal"
                  height="52px"
                  width="100%"
                  rounded="8px"
                  className="!mt-3 lg:!mt-6"
                  isLoading={addProductIsLoading}
                  onClick={handleAddProduct}
                >
                  <CustomHeading level={5} bold>
                    تایید
                  </CustomHeading>
                </Button>
              </Box>
            )}
            <Box className="hidden w-full lg:block">
              <Button
                bg="brand.orange.normal"
                color="brand.white.normal"
                rounded="8px"
                className="!mt-3 lg:!mt-6"
                onClick={handleViewSellerProducts}
              >
                <Title level={2} bold>
                  مشاهده سایر محصولات فروشنده
                </Title>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductInfo;