"use client";
import { FC, useEffect, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
  Spinner,
  Switch,
  useBreakpointValue,
  useDisclosure
} from "@chakra-ui/react";
import { Filter } from "iconsax-react";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import ProductCard from "@/components/modules/ProductCard";
import Title from "@/components/ui/typography/Title";
import CustomBody from "@/components/ui/typography/CustomBody";
import Caption from "@/components/ui/typography/Caption";

import { useGetAllBrands, useGetAllProducts, useGetFavorites, useGetFullUserName, useGetstatus, useGetTree } from "@/services/queries";
import { ProductFilters, ProductT } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorBox from "@/components/modules/ErrorBox";
import EmptyState from "@/components/modules/EmptyState";
import CButton from "@/components/ui/elements/Cbutton";
import { Nexticon, Previcon } from "@/utils/Icons";
import axios from "axios";

interface ProductsContainerProps {
  isAuthenticated: boolean;
}

const ProductsContainer: FC<ProductsContainerProps> = ({ isAuthenticated }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [page,setpage] = useState(1);
  const [verified,setverified] = useState(false);

 useEffect(() =>{
    axios.post("https://api.bonakcenter.com/account/api/v1/check-verification/", {
    phone_number: "09915706175"
    })
    .then(res => {
      if(res.data.is_verified == "verified")
      {
        setverified(true);
      }
    })
    .catch(err => {
      console.error("Error:", err);
    });
 },[])


  const initialCategory = searchParams.get("category") ? Number(searchParams.get("category")) : undefined;
  const initialInStock = searchParams.get("in_stock") === "0" ? 0 : 1;

  const [filters, setFilters] = useState<ProductFilters>({
    category: initialCategory,
    brand: undefined,
    in_stock: initialInStock,
    is_sort: false,
    free_shipping: searchParams.get("free_shipping") === "true"
  });

  //get catergory
  const {
    data: categories,
    isLoading: categoriesIsLoading,
    error: categoriesIsError
  } = useGetTree();

  //get products
  const {
    data: results,
    isLoading,
    error,
    mutate
  } = useGetAllProducts(filters,page);

  let totalcount = results?.count;
  let totalPages;
  if(isLoading || error)
  {
    totalPages = 0;
  }
  else
  {
    const pageSize = 10;
    totalPages = Math.ceil(totalcount / pageSize);
  }

  // console.log(totalcount);
  // console.log(totalPages)

  //get brands
  const { data: brands, isLoading: brandsIsLoading, error: brandIsError } = useGetAllBrands();

  useEffect(() => {
    const query = new URLSearchParams();
    if (filters.category) query.set("category", filters.category.toString());
    if (filters.in_stock === 1) query.set("in_stock", "1"); // فقط وقتی 1 باشد
    if (filters.free_shipping) query.set("free_shipping", "true");
    router.push(`?${query.toString()}`, { scroll: false });
  }, [filters, router]);

  const handleCategoryChange = (categoryId: number) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === categoryId ? undefined : categoryId
    }));
  };
  const handlebrandsChange = (brandsId: number) => {
    setFilters((prev) => ({
      ...prev,
      brand: prev.brand === brandsId.toString() ? undefined : brandsId.toString()
    }));
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, in_stock: e.target.checked ? 1 : 0 }));
  };

  const handleFreeShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, free_shipping: e.target.checked }));
  };

  console.log({ results });
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
              categories?.map((parent: { id: number; name: string; children?: any}) => (
                <Box key={parent.id} className="flex items-center gap-[6px]">
                  <Box className="flex items-center self-start">
                    <Checkbox
                                  isChecked={filters.category === parent.id}
                                  onChange={() => handleCategoryChange(parent.id)}
                                  aria-label={`انتخاب دسته‌بندی ${parent.name}`}
                              />
                  </Box>

              
                  <Accordion allowToggle>
                    <AccordionItem>
                      <AccordionButton
                        border="none"
                        padding="0px"
                        className="!flex !items-center !justify-between"
                      >
                        <Box as="span">
                          <CustomBody>{parent.name}</CustomBody>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>

                      <AccordionPanel>
                        {
                          parent?.children.map((item: { id: number; name: string }) =>
                          (
                             <Box key={item.id} className="flex items-center gap-[6px]">
                                <Checkbox
                                  isChecked={filters.category === item.id}
                                  onChange={() => handleCategoryChange(item.id)}
                                  aria-label={`انتخاب دسته‌بندی ${item.name}`}
                              />
                              <Caption>{item.name}</Caption>
                             </Box>
                          ))
                        }
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
              ))
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Divider />

      <Accordion allowToggle>
        <AccordionItem border="none" padding="0px">
          <h2>
            <AccordionButton
              border="none"
              padding="0px"
              className="!flex !items-center !justify-between"
            >
              <Box as="span">
                <CustomBody>برند ها </CustomBody>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel py="12px" className="!flex !flex-col !gap-3">
            {brandsIsLoading ? (
              <Spinner />
            ) : brandIsError ? (
              <ErrorBox message="خطا در بارگذاری برند ها " />
            ) : (
              brands.brands?.map((item: { id: number; name: string }) => (
                <Box key={item.id} className="flex items-center gap-[6px]">
                  <Checkbox
                    isChecked={filters.brand === item.id.toString()}
                    onChange={() => handlebrandsChange(item.id)}
                    aria-label={`انتخاب برند ${item.name}`}
                  />
                  <Caption bold>{item.name}</Caption>
                </Box>
              ))
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Divider/>
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
      <DashboardPageTitle>همه محصولات</DashboardPageTitle>
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
          ) : results?.results?.length ? (
            results.results?.map((product: ProductT) => (
              <Box
                key={product.id}
                className="border-y border-brand-white-normalHover py-6 lg:border-l"
              >
                <ProductCard
                  isfavorite={product.isFavorite}
                  imageSrc={product.compressedImage}
                  productName={product.name}
                  price={typeof product.minPrice?.price === "string" && product.minPrice?.price === "unauthorized" ? 9999 : product.minPrice?.price}
                  inventoryCount={product?.itemsPerPackage ?? 0}
                  sellerCount={product.sellerCount}
                  discountPercentage={product.minPrice?.discountPercentage != 0 ? product.minPrice?.discountPercentage : null}
                  haveRounded={false}
                  sellerProductId={product.sellerProductId}
                  isAuthenticated={isAuthenticated}
                  sellerrating={product?.sellerRating ?? 0}
                  discountedPrice={product.minPrice?.discountedPrice}
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

      {/* pagination setup */}
      <div className="flex flex-row-reverse gap-8 content-center items-center justify-center mt-5 text-white">
          <CButton className="cursor-pointer  text-xl p-1 px-3  font-bold rounded-md" onClick={() => page != 1 ? setpage(page - 1) : setpage(1) }>{<Previcon />}</CButton>
          
          <div className="flex flex-row-reverse gap-8 ">
            <CButton className="cursor-pointer bg-brand-orange-normal text-xl w-8 h-8 rounded-md">{page == 1 ? 1: page}</CButton>
            {totalPages >= page ? "" :<CButton className="cursor-pointer text-brand-orange-normal text-xl w-8 h-8 rounded-md" onClick={() => setpage(page + 1)}>{page + 1}</CButton>}
            {totalPages == page ? "" :  <CButton className="cursor-pointer text-brand-orange-normal text-xl w-8 h-8 rounded-md" onClick={() => setpage(totalPages >= page ? totalPages : page + 2)}>{totalPages >= page ? totalPages : page + 2}</CButton>}
            
            <p className="cursor-default text-brand-orange-normal text-xl w-8 h-8 rounded-md">...</p>
            <CButton className=" text-brand-orange-normal text-xl w-8 h-8 rounded-md" onClick={() => setpage(totalPages)}>{totalPages}</CButton>
          </div>
          
          <CButton className="cursor-pointer  text-xl p-1 px-3 font-bold rounded-md"  onClick={() => setpage(totalPages >= page ? totalPages : page + 1)}>{<Nexticon />}</CButton>
      </div>
    </Box>
  );
};

export default ProductsContainer;
