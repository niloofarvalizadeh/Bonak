"use client";
import React, { FC } from "react";
import { useGetRoot } from "@/services/queries";
import { Spinner, Text, Box, Divider } from "@chakra-ui/react";
import Link from "next/link";
import Title from "@/components/ui/typography/Title";
import CustomHeading from "@/components/ui/typography/CustomHeading";

interface Category {
  id: number;
  name: string;
}

const CategoriesContainer: FC = () => {
  const {
    data: rootCategories,
    error: rootError,
    isLoading: rootLoading
  } = useGetRoot(true);

  if (rootLoading)
    return (
      <Box className="flex h-[400px] w-full items-center justify-center">
        <Spinner size="xl" />
      </Box>
    );
  if (rootError)
    return (
      <Box className="flex h-[400px] w-full items-center justify-center">
        <Text color="red.500">خطا در بارگذاری داده‌ها</Text>
      </Box>
    );

  return (
    <Box p={6}>
      <CustomHeading level={5} bold className="mb-4 text-brand-blue-normal">
        دسته‌بندی‌ها{" "}
      </CustomHeading>

      <Box className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {rootCategories?.map((category: Category) => (
          <Box key={category.id} className="flex flex-col gap-4">
            <Link href={`/categories/${category.id}`} passHref>
              <Title level={1} bold className="text-brand-blue-normalActive">
                {category.name}
              </Title>
            </Link>
            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoriesContainer;
