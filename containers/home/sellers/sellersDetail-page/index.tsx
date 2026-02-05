"use client";
import { FC, useEffect, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Skeleton,
  Spinner,
  Switch,
  useBreakpointValue,
  useDisclosure
} from "@chakra-ui/react";
import { Filter, Heart } from "iconsax-react";
import ProductCard from "@/components/modules/ProductCard";
import Title from "@/components/ui/typography/Title";
import CustomBody from "@/components/ui/typography/CustomBody";
import Caption from "@/components/ui/typography/Caption";

import {
  useGetSellerDetail,
  useGetSellerPageProducts,
  useGetStaticCategories
} from "@/services/queries";
import { ProductFilters, ProductT } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorBox from "@/components/modules/ErrorBox";
import EmptyState from "@/components/modules/EmptyState";
import Image from "next/image";
import CustomHeading from "@/components/ui/typography/CustomHeading";

interface SellerDetailContainerProps {
  isAuthenticated: boolean;
  id: string;
}

const SellerDetailContainer: FC<SellerDetailContainerProps> = ({
  isAuthenticated,
  id
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const { data: sellerDetail, isLoading: sellerDetailIsLoading } =
    useGetSellerDetail(id);

  console.log({ sellerDetail });
  const initialCategory = searchParams.get("category")
    ? Number(searchParams.get("category"))
    : undefined;
  const initialInStock = searchParams.get("in_stock") === "1" ? 1 : 0;

  const [filters, setFilters] = useState<ProductFilters>({
    category: initialCategory,
    brand: undefined,
    in_stock: initialInStock,
    is_sort: false,
    free_shipping: searchParams.get("free_shipping") === "true"
  });

  const {
    data: categories,
    isLoading: categoriesIsLoading,
    error: categoriesIsError
  } = useGetStaticCategories();
  const {
    data: products,
    isLoading,
    error,
    mutate
  } = useGetSellerPageProducts(filters, id);

  useEffect(() => {
    const query = new URLSearchParams();
    if (filters.category) query.set("category", filters.category.toString());
    if (filters.in_stock === 1) query.set("in_stock", "1");
    if (filters.free_shipping) query.set("free_shipping", "true");
    router.push(`?${query.toString()}`, { scroll: false });
  }, [filters, router]);

  const handleCategoryChange = (categoryId: number) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === categoryId ? undefined : categoryId
    }));
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, in_stock: e.target.checked ? 1 : 0 }));
  };

  const handleFreeShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, free_shipping: e.target.checked }));
  };

  console.log({ products });
  const renderFilters = () => (
    <Box className="flex flex-col gap-3 rounded-xl border border-brand-white-normalHover p-6 text-brand-blue-normalActive">
      <Title level={1} bold className="hidden lg:block">
        فیلترها
      </Title>
      <Divider className="!hidden lg:!block" />
      <Accordion allowToggle>
        <AccordionItem border="none" padding="0px">
          <h2>
            <AccordionButton
              border="none"
              padding="0px"
              className="!flex !items-center !justify-between"
            >
              <Box as="span">
                <CustomBody>دسته‌بندی</CustomBody>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel py="12px" className="!flex !flex-col !gap-3">
            {categoriesIsLoading ? (
              <Spinner />
            ) : categoriesIsError ? (
              <ErrorBox message="خطا در بارگذاری دسته‌بندی‌ها" />
            ) : (
              categories?.map((item: { id: number; name: string }) => (
                <Box key={item.id} className="flex items-center gap-[6px]">
                  <Checkbox
                    isChecked={filters.category === item.id}
                    onChange={() => handleCategoryChange(item.id)}
                    aria-label={`انتخاب دسته‌بندی ${item.name}`}
                  />
                  <Caption bold>{item.name}</Caption>
                </Box>
              ))
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Divider />
      <Box className="flex w-full items-center justify-between">
        <CustomBody bold>ارسال رایگان</CustomBody>
        <Switch
          isChecked={filters.free_shipping}
          onChange={handleFreeShippingChange}
          sx={{
            ".chakra-switch__track[data-checked]:not([data-theme])": {
              background: "#ff7b00"
            }
          }}
          aria-label="فعال‌سازی ارسال رایگان"
        />
      </Box>
      <Divider />
      <Box className="flex w-full items-center justify-between">
        <CustomBody bold>فقط کالاهای موجود</CustomBody>
        <Switch
          isChecked={filters.in_stock === 1}
          onChange={handleStockChange}
          sx={{
            ".chakra-switch__track[data-checked]:not([data-theme])": {
              background: "#ff7b00"
            }
          }}
          aria-label="نمایش فقط کالاهای موجود"
        />
      </Box>
    </Box>
  );

  return (
    <Box className="flex w-full flex-col lg:px-[70px]">
    {sellerDetailIsLoading ? (
      <Skeleton width="100%" height="240px" />
    ) : (
      <Box className="w-full rounded-xl border border-brand-white-normalHover">
        <Box className="h-[140px] w-full rounded-t-xl border border-b border-brand-white-normalHover">
          <Image
            src={sellerDetail?.bannerImage == null ? "/fkBanner.png" : `${sellerDetail?.bannerImage}`}
            alt="banner"
            className="!h-full !w-full !rounded-t-xl !bg-cover"
            width={1000}
            height={0}
          />
        </Box>
        <Box className="relative w-full">
          <Avatar
            width="64px"
            height="64px"
            className="absolute -top-8 right-1/2 z-10 !h-16 !w-16 translate-x-1/2 transform rounded-full border-4 border-white"
            name="sas"
            src={sellerDetail?.logoImage == null ? "/fkBanner.png" : `${sellerDetail?.logoImage}`}
          />
        </Box>
          <Box className="flex flex-col gap-2 rounded-b-xl bg-brand-white-normal px-6 pb-6">
            <CustomHeading
              level={5}
              bold
              className="text-brand-blue-normalActive"
            >
              پخش {sellerDetail?.companyName}
            </CustomHeading>
            <Title
              level={2}
              className="text-justify text-brand-blue-lightActive"
            >
              {sellerDetail?.description}
            </Title>
            <Box className="flex w-full flex-col gap-2">
              <Title level={1} bold className="text-brand-blue-normalActive">
                نماینده برندهای
              </Title>
              <Box className="flex flex-wrap items-center gap-2">
                {sellerDetail?.brands?.map((brand: string, index: number) => (
                  <Box
                    key={index}
                    className="rounded-full bg-brand-orange-light px-[10px] py-1 text-brand-orange-normalActive"
                  >
                    <Caption>{brand}</Caption>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box className="flex w-full items-center justify-center">
              <Box className="flex flex-col items-center gap-2">
                <Title level={2} className="text-brand-blue-lightActive">
                  امتیاز
                </Title>
                <Box className="flex items-center justify-center gap-2 text-brand-blue-normal">
                  <CustomHeading level={4} bold className="text-center">
                    {sellerDetail?.numRatings}
                  </CustomHeading>
                  <Heart
                    variant="Bold"
                    className="text-brand-blue-normal"
                    size={24}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      <Box className="mt-3 flex items-center gap-4 pr-2">
        {isMobile && (
          <Button
            leftIcon={<Filter size="20" />}
            colorScheme="orange"
            variant="outline"
            onClick={onOpen}
            aria-label="باز کردن فیلترها"
          >
            فیلترها
          </Button>
        )}
      </Box>

      <Box className="grid grid-cols-12 lg:gap-x-10">
        {!isMobile && <Box className="col-span-3">{renderFilters()}</Box>}

        <Box className="col-span-12 grid grid-cols-2 gap-4 lg:col-span-9 lg:grid-cols-4">
          {isLoading ? (
            <Box className="col-span-full flex justify-center py-10">
              <Spinner size="xl" />
            </Box>
          ) : error ? (
            <Box className="col-span-full flex justify-center py-10">
              <ErrorBox
                message="خطا در بارگذاری محصولات"
                description={error?.message || "لطفاً دوباره تلاش کنید."}
                onRetry={() => mutate()}
                isLoading={isLoading}
              />
            </Box>
          ) : products?.products?.length ? (
            products.products?.map((product: ProductT) => (
              <Box
                key={product.sellerProductId}
                className="border-y border-brand-white-normalHover py-6 lg:border-l"
              >
                <ProductCard
                  imageSrc={product.compressedImage}
                  productName={product.name}
                  price={product.minPrice?.price ?? 0}
                  inventoryCount={product.minPrice?.inventory ?? 0}
                  sellerCount={product.sellerCount}
                  discountPercentage={product.minPrice?.discountPercentage ?? 0}
                  discountedPrice={product.minPrice?.discountedPrice ?? 0}
                  haveRounded={false}
                  sellerProductId={product.sellerProductId}
                  isAuthenticated={isAuthenticated}
                  isfavorite={false}
                  sellerrating={0}
                />
              </Box>
            ))
          ) : (
            <Box className="col-span-full flex justify-center py-10">
              <EmptyState
                message="هیچ محصولی با فیلترهای انتخاب‌شده یافت نشد."
                actionText="حذف فیلترها"
                onAction={() =>
                  setFilters({
                    category: undefined,
                    brand: undefined,
                    in_stock: 0,
                    is_sort: false,
                    free_shipping: false
                  })
                }
              />
            </Box>
          )}
        </Box>
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>فیلترها</DrawerHeader>
          <DrawerBody>{renderFilters()}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default SellerDetailContainer;
