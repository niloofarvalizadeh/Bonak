"use client";
import React, { FC, useState } from "react";

import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  VStack
} from "@chakra-ui/react";
import { Location, SearchNormal1 } from "iconsax-react";
import Title from "@/components/ui/typography/Title";
import { useDebounce } from "use-debounce";
import { useGetSearchQuery } from "@/services/queries";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getMediaUrl } from "@/utils/media";

const SearchBoxInput: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const router = useRouter();

  const { data: result } = useGetSearchQuery(true, debouncedSearchTerm);

  const handleProductClick = (productId: number) => {
    setSearchTerm(""); // ✅ متن سرچ رو پاک کن
    router.push(`/products/${productId}`); // ✅ با router برو
  };

  return (
    <Box className="relative h-[50px] w-[90%]">
      <Box
        zIndex={100}
        className="flex h-full w-full items-center justify-between rounded-lg bg-brand-white-normalHover"
      >
        <InputGroup width="80%">
          <InputLeftElement pointerEvents="none" paddingRight="13px">
            <SearchNormal1 size="24" className="text-brand-blue-lightActive" />
          </InputLeftElement>
          <Input
            placeholder="جستجوی محصولات ..."
            paddingRight="47px"
            outline="none"
            border="none"
            boxShadow="none"
            value={searchTerm} // ✅ مقدار input رو کنترل کن
            _focus={{ outline: "none", border: "none", boxShadow: "none" }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <Box className="flex items-center gap-3">
          <Box as="hr" className="h-8 w-[1px] bg-brand-blue-normal"></Box>
          <Box className="flex items-center gap-1 pl-[13px] text-brand-blue-normal">
            <Title level={2}>مشهد</Title>
            <Location size="24" variant="Bold" />
          </Box>
        </Box>
      </Box>

      {result && searchTerm.length > 0 && result.length == 0 ? (
        <VStack
          spacing={5}
          align="start"
          zIndex={50}
          className="absolute w-full rounded-lg bg-white p-4 shadow-lg"
        >
          <Box className="p-4">
            <CustomHeading level={5} bold className="text-brand-blue-normal">
              محصول مورد نظر پیدا نشد
            </CustomHeading>
          </Box>
        </VStack>
      ) : null}

      {result && result.length > 0 && searchTerm.length > 0 && (
        <VStack
          spacing={5}
          align="start"
          zIndex={50}
          className="absolute w-full rounded-lg bg-white p-4 shadow-lg"
        >
          {result?.map(
            (
              result: {
                name: string;
                sellerProductId: number;
                compressedImage: string | null;
              },
              index: number
            ) => (
              <Box
                key={index}
                padding="10px"
                width="100%"
                as="button"
                onClick={() => handleProductClick(result.sellerProductId)}
                className="flex items-center gap-2 rounded-2xl border border-brand-orange-lightActive cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <Image
                  src={getMediaUrl(result.compressedImage)}
                  alt={result.name}
                  width={1000}
                  height={0}
                  className="size-[100px] rounded-xl"
                />
                <Title level={1} bold className="text-brand-blue-normal">
                  {result.name}
                </Title>
              </Box>
            )
          )}
        </VStack>
      )}
    </Box>
  );
};

export default SearchBoxInput;