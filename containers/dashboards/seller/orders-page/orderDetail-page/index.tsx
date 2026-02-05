"use client";
import React, { FC } from "react";
import { Box, Image, Spinner, Button } from "@chakra-ui/react";
import { ArrowLeft } from "iconsax-react";
import Link from "next/link";
import Title from "@/components/ui/typography/Title";
import { addCommas } from "@persian-tools/persian-tools";
import { useGetSellerOrderDetail } from "@/services/queries";
import { productStatusColorMap, productStatusMap } from "@/utils";
import SellerOrderChangeStatus from "@/components/modules/SellerOrderChangeStatus";
import { getMediaUrl } from "@/utils/media"; // ✅ import اضافه شد

interface SellerOrderDetailContainerProps {
  orderId: string;
}

const SellerOrderDetailContainer: FC<SellerOrderDetailContainerProps> = ({
  orderId
}) => {
  const { data: orderDetail, isLoading: orderDetailIsLoading } =
    useGetSellerOrderDetail(orderId);

  console.log({ orderDetail });
  if (orderDetailIsLoading) {
    return (
      <Box className="flex h-full items-center justify-center">
        <Spinner size="xl" color="brand.blue.normal" />
      </Box>
    );
  }

  if (!orderDetail) {
    return (
      <Box className="flex h-full items-center justify-center">
        <Title level={2} className="text-center">
          اطلاعاتی برای این سفارش یافت نشد
        </Title>
      </Box>
    );
  }

  const getProductStatusText = (status: string): string => {
    return productStatusMap[status] || "نامشخص";
  };

  const getProductStatusColor = (status: string): string => {
    return productStatusColorMap[status] || "text-gray-500";
  };

  const {
    id,
    trackingCode,
    quantity,
    totalPrice,
    productStatus,
    product,
    shippingAddress,
    buyer,
    maxDeliveryTime,
    orderProduct,
    is_paid // اضافه شده
  } = orderDetail;
  
  return (
    <Box className="relative p-6">
      <Box className="mb-6 flex items-center justify-between">
        <Title level={1} bold>
          جزئیات سفارش #{trackingCode}
        </Title>
        <Link href="/account/seller/orders">
          <Button
            variant="ghost"
            color="brand.orange.normal"
            rightIcon={<ArrowLeft />}
          >
            بازگشت به لیست سفارشات
          </Button>
        </Link>
      </Box>

      <Box className="grid grid-cols-1 gap-6 rounded-2xl border border-brand-white-normalHover bg-brand-white-normal p-6 md:grid-cols-2">
        <Box className="flex flex-col items-center gap-4">
          <Image
            src={getMediaUrl(product.image)} // ✅ استفاده از تابع helper
            alt={product.name}
            boxSize="200px"
            objectFit="cover"
            borderRadius="lg"
            fallbackSrc="/media/products/placeholder.jpg"
          />
          <Box className="text-center">
            <Title level={2} bold>
              {product.name}
            </Title>
            <Title level={1} className="text-brand-blue-normal">
              برند: {product.brand}
            </Title>
          </Box>
        </Box>

        <Box className="flex flex-col gap-4">
          <Box className="grid grid-cols-2 gap-4">
            <Title level={1} className="text-brand-blue-normal">
              کد رهگیری:
            </Title>
            <Title level={1} bold>
              {trackingCode}
            </Title>

            <Title level={1} className="text-brand-blue-normal">
              حداکثر زمان تحویل:
            </Title>
            <Title level={1} bold>
              {maxDeliveryTime} روز
            </Title>

            <Title level={1} className="text-brand-blue-normal">
              قیمت واحد:
            </Title>
            <Title level={1} bold>
              {addCommas(orderProduct)} تومان
            </Title>

            <Title level={1} className="text-brand-blue-normal">
              تعداد:
            </Title>
            <Title level={1} bold>
              {quantity}
            </Title>

            <Title level={1} className="text-brand-blue-normal">
              مجموع قیمت:
            </Title>
            <Title level={1} bold>
              {addCommas(totalPrice)} تومان
            </Title>

            <Title level={1} className="text-brand-blue-normal">
              وضعیت سفارش:
            </Title>
            <Title
              level={1}
              bold
              className={getProductStatusColor(productStatus)}
            >
              {getProductStatusText(productStatus)}
            </Title>

            <Title level={1} className="text-brand-blue-normal">
              وضعیت پرداخت:
            </Title>
            <Title level={1} bold className={is_paid ? "text-green-600" : "text-red-600"}>
              {is_paid ? "پرداخت شده" : "پرداخت نشده"}
            </Title>

            <Title level={1} className="text-brand-blue-normal">
              نام خریدار:
            </Title>
            <Title level={1} bold>
              {`${buyer.firstName} ${buyer.lastName}`}
            </Title>

            <Title level={1} className="text-brand-blue-normal">
              شماره تماس:
            </Title>
            <Title level={1} bold>
              {buyer.phoneNumber}
            </Title>

            <Title level={1} className="text-brand-blue-normal">
              ساعات کاری:
            </Title>
            <Title level={1} bold>
              {buyer.workHours}
            </Title>

            <Title level={1} className="text-brand-blue-normal">
              آدرس حمل‌ونقل:
            </Title>
            <Title level={1} bold>
              {shippingAddress}
            </Title>
          </Box>
          {productStatus === "pending" && <SellerOrderChangeStatus orderProductId={id} />}
        </Box>
      </Box>
    </Box>
  );
};

export default SellerOrderDetailContainer;