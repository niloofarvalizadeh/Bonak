"use client";
import React, { FC } from "react";

import { Box } from "@chakra-ui/react";
import CategoryCard from "../CategoryCard";
import { useGetStaticCategories } from "@/services/queries";

const DynamicCategories: FC = () => {
  const { data: categories, isLoading: categoriesIsLoading } =
    useGetStaticCategories();
  console.log({ categories });
  return (
    <Box className="mt-6 grid grid-cols-3 gap-x-[7px] gap-y-8 lg:grid-cols-5 lg:gap-x-[55px] lg:gap-y-6">
      {categoriesIsLoading
        ? null
        : categories?.map(
            (item: {
              id: number;
              name: string;
              parent: null | number;
              image: undefined | string;
            }) => (
              <CategoryCard
                key={item.id}
                name={item.name}
                image={item.image}
                categoryId={item.id}
              />
            )
          )}
    </Box>
  );
};

export default DynamicCategories;
