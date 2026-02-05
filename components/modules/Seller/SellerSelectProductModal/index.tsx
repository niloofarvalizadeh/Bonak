"use client";
import React, { FC, useState, useEffect } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Spinner
} from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";
import Button from "@/components/ui/elements/Button";
import { useGetSellerProductList } from "@/services/queries";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import { SearchNormal1 } from "iconsax-react";
import ProductCard from "./ProductCard";
import { generateRandomId } from "@/utils";
import { NewProductFormType, SellerProductType } from "@/types";
import { UseFormSetValue } from "react-hook-form";

interface SellerSelectProductModalProps {
  setSelectedProduct: (product: SellerProductType) => void;
  setValue: UseFormSetValue<NewProductFormType>;
}

const SellerSelectProductModal: FC<SellerSelectProductModalProps> = ({
  setSelectedProduct,
  setValue
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<SellerProductType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const { data: productsData, isLoading: productsIsLoading } = useGetSellerProductList(page);

  const [searchTerm, setSearchTerm] = useState("");

  // وقتی داده جدید میاد، به لیست اضافه کن
  useEffect(() => {
    if (productsData?.results) {
      setAllProducts(prev => [...prev, ...productsData.results]);
      setHasMore(!!productsData.next);
    }
  }, [productsData]);

  // وقتی Modal بسته میشه، لیست رو ریست کن
  useEffect(() => {
    if (!isOpen) {
      setAllProducts([]);
      setPage(1);
      setHasMore(true);
    }
  }, [isOpen]);

  const filteredProducts = allProducts.filter((item: SellerProductType) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      setIsLoadingMore(true);
      setPage(prev => prev + 1);
      // بعد از لود شدن داده، isLoadingMore رو false کن
      setTimeout(() => setIsLoadingMore(false), 1000);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    // اگر کاربر به انتهای لیست رسید
    if (scrollHeight - scrollTop <= clientHeight + 100 && hasMore && !isLoadingMore) {
      handleLoadMore();
    }
  };

  const handleProductSelect = (product: SellerProductType) => {
    setSelectedProduct(product);
    setValue("productName", product.name);
    setValue("barcode", product.barcode);
    setValue("productDescription", " ");
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        className="!flex !items-center !rounded-xl !p-3"
        bg="brand.orange.normal"
        color="white"
      >
        <Title level={1}>انتخاب محصول</Title>
      </Button>

      <Modal isOpen={isOpen} size="3xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent rounded="48px">
          <ModalBody>
            <Box className="flex w-full flex-col items-center gap-4 py-2">
              <DashboardPageTitle>لیست محصولات</DashboardPageTitle>
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              
              {/* لیست محصولات با قابلیت اسکرول */}
              <Box 
                className="w-full max-h-[400px] overflow-y-auto"
                onScroll={handleScroll}
              >
                {productsIsLoading && page === 1 ? (
                  <Box className="flex justify-center py-4">
                    <Spinner color="brand.orange.normal" size="xl" />
                  </Box>
                ) : (
                  <>
                    {filteredProducts?.map((item: SellerProductType) => (
                      <ProductCard
                        key={`${item.barcode}-${generateRandomId()}`}
                        barcode={item.barcode}
                        brandImage={item.compressedImage}
                        brandName={item.brandName}
                        name={item.name}
                        onClick={() => handleProductSelect(item)}
                      />
                    ))}
                    
                    {/* دکمه لود بیشتر */}
                    {hasMore && (
                      <Box className="flex justify-center py-4">
                        <Button
                          onClick={handleLoadMore}
                          isLoading={isLoadingMore}
                          bg="brand.orange.normal"
                          color="white"
                          rounded="12px"
                          px="24px"
                          py="12px"
                        >
                          {isLoadingMore ? "در حال بارگذاری..." : "بارگذاری بیشتر"}
                        </Button>
                      </Box>
                    )}
                    
                    {/* اگر داده‌ای نیست */}
                    {filteredProducts.length === 0 && !productsIsLoading && (
                      <Box className="text-center py-8">
                        <Title level={2}>محصولی یافت نشد</Title>
                      </Box>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SellerSelectProductModal;