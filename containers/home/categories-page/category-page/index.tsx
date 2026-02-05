"use client";
import React from "react";
import { useGetChildren } from "@/services/queries";
import { Spinner, Text, Box, Divider } from "@chakra-ui/react";
import Link from "next/link";
import Title from "@/components/ui/typography/Title";
import CustomHeading from "@/components/ui/typography/CustomHeading";

interface CategoryProps {
  categoryId: string;
}

interface Category {
  id: number;
  name: string;
  children?: Category[];
  parent?: number;
}

const CategoryContainer: React.FC<CategoryProps> = ({ categoryId }) => {
  const id = typeof categoryId === "string" ? parseInt(categoryId) : null;
  const {
    data: children,
    error: childrenError,
    isLoading: childrenLoading
  } = useGetChildren(id !== null, id !== null ? id : undefined);

  console.log({ children });

  // تابع بازگشتی برای رندر دسته‌بندی‌ها و زیرمجموعه‌ها
  const renderCategories = (
    categories: Category[] | undefined,
    level: number = 0
  ) => {
    if (!categories || categories.length === 0) return null;

    return categories.map((category) => (
      <Box key={category.id} className="flex flex-col gap-4">
        <Link href={`/products?category=${category.id}`} passHref>
          <Title
            level={1}
            bold
            className={`text-brand-blue-normalActive ${level > 0 ? "ml-4" : ""}`}
            style={{ paddingLeft: `${level * 20}px` }}
          >
            {category.name}
          </Title>
        </Link>
        {category.children && category.children.length > 0 && (
          <Box>{renderCategories(category.children, level + 1)}</Box>
        )}
        <Divider />
      </Box>
    ));
  };

  if (!id)
    return (
      <Box className="flex h-[400px] w-full items-center justify-center">
        <Text color="red.500">شناسه دسته نامعتبر است</Text>
      </Box>
    );
  if (childrenLoading)
    return (
      <Box className="flex h-[400px] w-full items-center justify-center">
        <Spinner size="xl" />
      </Box>
    );
  if (childrenError)
    return (
      <Box className="flex h-[400px] w-full items-center justify-center">
        <Text color="red.500">خطا در بارگذاری زیرمجموعه‌ها</Text>
      </Box>
    );

  return (
    <Box p={6}>
      <CustomHeading level={5} bold className="mb-4 text-brand-blue-normal">
        زیرمجموعه‌های دسته
      </CustomHeading>

      <Box className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {renderCategories(children)}
      </Box>
    </Box>
  );
};

export default CategoryContainer;
