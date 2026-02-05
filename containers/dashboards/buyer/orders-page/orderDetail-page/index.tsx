"use client";
import React, { FC } from "react";
import { Box, Image, Spinner, Button } from "@chakra-ui/react";
import { ArrowLeft } from "iconsax-react";
import Link from "next/link";
import Title from "@/components/ui/typography/Title";
import { addCommas } from "@persian-tools/persian-tools";
import { useGetUserOrderDetail } from "@/services/queries";
import { getMediaUrl } from "@/utils/media"; // ✅ import اضافه شد

interface OrderDetailContainerProps {
  orderId: string;
}

const OrderDetailContainer: FC<OrderDetailContainerProps> = ({ orderId }) => {
  const { data: orderDetail, isLoading: orderDetailIsLoading } =
    useGetUserOrderDetail(orderId);

  console.log({ orderDetail });
  if (orderDetailIsLoading) {
    return (
      <Box className="flex h-full items-center justify-center">
        <Spinner size="xl" color="brand.blue.normal" />
      </Box>
    );
  }

  if (!orderDetail || orderDetail.length === 0) {
    return (
      <Box className="flex h-full items-center justify-center">
        <Title level={2} className="text-center">
          اطلاعاتی برای این سفارش یافت نشد
        </Title>
      </Box>
    );
  }

  return (
    <Box className="relative p-6">
      <Box className="mb-6 flex items-center justify-between">
        <Title level={1} bold>
          جزئیات سفارش‌ها
        </Title>
        <Link href="/account/buyer/orders">
          <Button
            variant="ghost"
            color="brand.orange.normal"
            rightIcon={<ArrowLeft />}
          >
            بازگشت به لیست سفارشات
          </Button>
        </Link>
      </Box>

      {orderDetail.map((order: any) => {
        const {
          id,
          quantity,
          priceAtOrder,
          trackingCode,
          productStatus,
          sellerProductDetails,
          productDetails,
          sellerCompanyName
        } = order;

        return (
          <Box
            key={id}
            className="mb-6 grid grid-cols-1 gap-6 rounded-2xl border border-brand-white-normalHover bg-brand-white-normal p-6 md:grid-cols-2"
          >
            <Box className="flex flex-col items-center gap-4">
              <Image
                src={getMediaUrl(productDetails?.image)} // ✅ استفاده از تابع helper
                alt={productDetails?.name}
                boxSize="200px"
                objectFit="cover"
                borderRadius="lg"
                fallbackSrc="/media/products/placeholder.jpg"
              />
              <Box className="text-center">
                <Title level={2} bold>
                  {productDetails?.name}
                </Title>
                <Title level={1} className="text-brand-blue-normal">
                  برند: {productDetails?.brand}
                </Title>
                <Title level={1} className="text-brand-blue-normal">
                  دسته‌بندی: {productDetails?.category}
                </Title>
                <Title level={1} className="text-brand-blue-normal">
                  نام فروشنده: {sellerCompanyName}
                </Title>
              </Box>
            </Box>

            <Box className="flex flex-col gap-4">
              <Box className="grid grid-cols-2 gap-4">
                <Title level={1} className="text-brand-blue-normal">
                  شناسه سفارش:
                </Title>
                <Title level={1} bold>
                  {id}
                </Title>

                <Title level={1} className="text-brand-blue-normal">
                  تعداد:
                </Title>
                <Title level={1} bold>
                  {quantity}
                </Title>

                <Title level={1} className="text-brand-blue-normal">
                  قیمت واحد:
                </Title>
                <Title level={1} bold>
                  {addCommas(priceAtOrder)} تومان
                </Title>

                <Title level={1} className="text-brand-blue-normal">
                  مجموع قیمت:
                </Title>
                <Title level={1} bold>
                  {addCommas(priceAtOrder * quantity)} تومان
                </Title>

                <Title level={1} className="text-brand-blue-normal">
                  کد رهگیری:
                </Title>
                <Title level={1} bold>
                  {trackingCode}
                </Title>

                <Title level={1} className="text-brand-blue-normal">
                  وضعیت سفارش:
                </Title>
                <Title
                  level={1}
                  bold
                  className={
                    productStatus === "confirmed"
                      ? "text-green-500"
                      : productStatus === "delivered"
                        ? "text-blue-500"
                        : productStatus.includes("cancelled")
                          ? "text-red-500"
                          : "text-yellow-500"
                  }
                >
                  {productStatus === "confirmed"
                    ? "تأیید شده"
                    : productStatus === "delivered"
                      ? "تحویل شده"
                      : productStatus === "cancelled_by_buyer"
                        ? "لغو شده توسط خریدار"
                        : productStatus === "cancelled_by_seller"
                          ? "لغو شده توسط فروشنده"
                          : "در انتظار تأیید"}
                </Title>

                <Title level={1} className="text-brand-blue-normal">
                  حداکثر زمان تحویل:
                </Title>
                <Title level={1} bold>
                  {sellerProductDetails?.maxDeliveryTime === 0
                    ? "فوری"
                    : `${sellerProductDetails?.maxDeliveryTime} روز`}
                </Title>

                <Title level={1} className="text-brand-blue-normal">
                  بارکد محصول:
                </Title>
                <Title level={1} bold>
                  {productDetails?.barcode}
                </Title>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default OrderDetailContainer;