import React, { FC } from "react";
import Link from "next/link";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import Title from "@/components/ui/typography/Title";
import { Box, Divider, Tooltip } from "@chakra-ui/react";
import { ProductData } from "@/types";
import { addCommas } from "@persian-tools/persian-tools";
import PersianDate from 'persian-date';

interface ProductSpecificationsProps {
  product: ProductData;
  isAuth: boolean;
}

const convertToPersianDate = (gregorianDate: string) => {
  try {
    const date = new PersianDate(new Date(gregorianDate));
    return date.format('YYYY/MM/DD');
  } catch (error) {
    return gregorianDate;
  }
};

const ProductSpecifications: FC<ProductSpecificationsProps> = ({
  product,
  isAuth
}) => {
  const {
    availableCount,
    consumerPrice,
    expirationDate,
    maxDeliveryTime,
    minCountAmount
  } = product.sellerProduct;

  const { barcode, brandName, categoryName } = product.product;

  // لیست مشخصات برای نمایش منظم
  const specifications = [
    {
      label: "بارکد",
      value: barcode,
      mobile: true,
      desktop: true
    },
    {
      label: "پخش کننده",
      value: product.sellerInformation.companyName,
      mobile: true,
      desktop: true,
      isLink: true,
      href: `/sellers/${product.sellerProduct.seller}`
    },
    {
      label: "برند",
      value: brandName,
      mobile: true,
      desktop: true
    },
    {
      label: "دسته بندی",
      value: categoryName,
      mobile: true,
      desktop: true
    },
    {
      label: "تاریخ انقضا",
      value: convertToPersianDate(expirationDate || ''),
      mobile: true,
      desktop: true
    },
    {
      label: "حداقل تعداد",
      value: minCountAmount,
      mobile: true,
      desktop: true
    },
    {
      label: "حداکثر زمان تحویل",
      value: `${maxDeliveryTime} روز`,
      mobile: true,
      desktop: true
    },
    {
      label: "تعداد موجود",
      value: availableCount,
      mobile: true,
      desktop: true
    },
    {
      label: "قیمت مصرف‌کننده",
      value: `${addCommas(consumerPrice)} تومان`,
      mobile: true,
      desktop: true,
      requiresAuth: true
    }
  ];

  const renderValue = (spec: typeof specifications[0]) => {
    if (spec.requiresAuth && !isAuth) {
      return (
        <Box className="relative">
          <Box className="blrPrice absolute left-0 top-0 z-20 h-full w-full"></Box>
          {spec.isLink ? (
            <Tooltip 
              label="نمایش اطلاعات فروشگاه" 
              hasArrow 
              bg="brand.blue.normal" 
              color="white"
              fontSize="sm"
              placement="top"
              borderRadius="md"
              px={3}
              py={2}
            >
              <Link href={spec.href || '#'}>
                <span className="text-brand-blue-normal hover:text-brand-blue-dark transition-colors duration-200 cursor-pointer">
                  {spec.value}
                </span>
              </Link>
            </Tooltip>
          ) : (
            <span>{spec.value}</span>
          )}
        </Box>
      );
    }

    if (spec.isLink) {
      return (
        <Tooltip 
          label="نمایش اطلاعات فروشگاه" 
          hasArrow 
          bg="brand.blue.normal" 
          color="white"
          fontSize="sm"
          placement="top"
          borderRadius="md"
          px={3}
          py={2}
        >
          <Link href={spec.href!}>
            <span className="text-brand-blue-normal hover:text-brand-blue-dark transition-colors duration-200 cursor-pointer">
              {spec.value}
            </span>
          </Link>
        </Tooltip>
      );
    }

    return <span>{spec.value}</span>;
  };

  return (
    <Box className="mt-10 flex w-full flex-col gap-6">
      <CustomHeading level={5} bold className="text-brand-blue-normal">
        مشخصات
      </CustomHeading>
      
      <Box className="flex w-full flex-col gap-4 bg-white rounded-2xl border border-brand-blue-lightHover p-6">
        {/* موبایل */}
        <Box className="flex flex-col gap-4 lg:hidden">
          {specifications.map((spec, index) => (
            spec.mobile && (
              <Box key={index}>
                <Box className="flex items-center justify-between py-2">
                  <Title level={2} className="text-brand-blue-lightHover min-w-[120px]">
                    {spec.label}
                  </Title>
                  <Box className="flex-1 text-left">
                    <Title level={2} className="text-right">
                      {renderValue(spec)}
                    </Title>
                  </Box>
                </Box>
                {index < specifications.length - 1 && <Divider />}
              </Box>
            )
          ))}
        </Box>

        {/* دسکتاپ */}
        <Box className="hidden lg:flex lg:flex-col lg:gap-4">
          {specifications.map((spec, index) => (
            spec.desktop && (
              <Box key={index}>
                <Box className="flex items-center justify-between py-3">
                  <CustomHeading 
                    level={5} 
                    className="text-brand-blue-lightHover min-w-[180px]"
                  >
                    {spec.label}
                  </CustomHeading>
                  <Box className="flex-1 text-left">
                    <CustomHeading level={5} className="text-right">
                      {renderValue(spec)}
                    </CustomHeading>
                  </Box>
                </Box>
                {index < specifications.length - 1 && <Divider />}
              </Box>
            )
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductSpecifications;