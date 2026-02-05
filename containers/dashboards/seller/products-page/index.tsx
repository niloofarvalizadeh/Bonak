"use client";
import React, { FC, useState } from "react";

import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import Title from "@/components/ui/typography/Title";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  useRadioGroup
} from "@chakra-ui/react";
import { SearchNormal1 } from "iconsax-react";
import Link from "next/link";
import { useGetSellerProducts } from "@/services/queries";
import { ProductStatusFilter, SellerProductsType } from "@/types";
import SellerProductCard from "@/components/modules/Seller/SellerProductCard";
import { sellerFilterProductsOptions } from "@/constants/staticData";
import FilterProductsRadioCard from "@/components/modules/Seller/FilterProductsRadioCard";
import { useDebounce } from "use-debounce";
import ErrorBox from "@/components/modules/ErrorBox";
import EmptyState from "@/components/modules/EmptyState";
import { useRouter } from "next/navigation";

const SellerDashboardProductsContainer: FC = () => {
  const [status, setStatus] = useState<ProductStatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const { push } = useRouter();

  const {
    data: products,
    error,
    isLoading: productIsLoading,
    mutate: refetchProducts
  } = useGetSellerProducts(true, status, debouncedSearchQuery);

  const { getRadioProps } = useRadioGroup({
    name: "filterProducts",
    defaultValue: "همه محصولات",
    onChange: (value) => {
      if (value == "همه محصولات") {
        setStatus("all");
      } else if (value == "محصولات موجود") {
        setStatus("available");
      } else if (value == "اتمام موجودی") {
        setStatus("outOfStock");
      }
    }
  });

  return (
    <Box>
      <Box className="flex w-full items-center gap-6">
        <DashboardPageTitle>محصولات</DashboardPageTitle>
        <Box className="hidden w-full items-center gap-6 lg:flex">
          <InputGroup bg="brand.white.normalHover" rounded="8px">
            <InputLeftElement pointerEvents="none" paddingRight="13px">
              <SearchNormal1
                size="24"
                className="text-brand-blue-lightActive"
              />
            </InputLeftElement>
            <Input
              placeholder="جستجوی محصولات ..."
              paddingRight="47px"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          <Link
            href="/account/seller/products/new"
            className="flex h-11 w-52 items-center justify-center rounded-xl bg-brand-orange-normal px-6 text-white"
          >
            <Title level={2} bold>
              ثبت محصول جدید
            </Title>
          </Link>
        </Box>
      </Box>
      <Box className="flex w-full flex-col items-center gap-6 lg:hidden">
        <InputGroup bg="brand.white.normalHover" rounded="8px">
          <InputLeftElement pointerEvents="none" paddingRight="13px">
            <SearchNormal1 size="24" className="text-brand-blue-lightActive" />
          </InputLeftElement>
          <Input
            placeholder="جستجوی محصولات و پخش کننده ها ..."
            paddingRight="47px"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <Link
          href="/account/seller/products/new"
          className="flex h-11 w-52 items-center justify-center rounded-xl bg-brand-orange-normal px-6 text-white"
        >
          <Title level={2} bold>
            ثبت محصول جدید
          </Title>
        </Link>
      </Box>
      <Box className="mt-[17px] flex items-center gap-4">
        {sellerFilterProductsOptions?.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <FilterProductsRadioCard key={value} {...radio}>
              {value}
            </FilterProductsRadioCard>
          );
        })}
      </Box>
      <Box className="mt-11 flex w-full flex-col gap-2">
        {error ? (
          <ErrorBox
            message="خطا در دریافت لیست محصولات"
            onRetry={() => refetchProducts()}
            isLoading={productIsLoading}
          />
        ) : productIsLoading ? (
          <Spinner color="brand.orange.normal" />
        ) : products.length === 0 ? (
          status === "outOfStock" ? (
            <Box className="text-center py-8">
              <Title level={2} className="text-gray-500">
                محصولی با اتمام موجودی وجود ندارد
              </Title>
            </Box>
          ) : (
            <EmptyState
              message="محصولی یافت نشد"
              actionText="ثبت اولین محصول"
              onAction={() => push("/account/seller/products/new")}
            />
          )
        ) : (
          products?.map((item: SellerProductsType) => (
            <SellerProductCard key={item.id} {...item} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default SellerDashboardProductsContainer;
