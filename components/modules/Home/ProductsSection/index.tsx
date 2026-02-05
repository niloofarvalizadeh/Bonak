"use client";
import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import HomeProducts from "../Products";
import SpecialDiscountedProducts from "../Products/SpecialDiscounts";
import { useGetStaticCategories } from "@/services/queries";

interface ProductsSectionProps {
  isAuthenticated: boolean;
}

const ProductsSection: FC<ProductsSectionProps> = ({ isAuthenticated }) => {
  const { data: categories, isLoading: categoriesIsLoading } =
    useGetStaticCategories();

  if (categoriesIsLoading || !categories) {
    return <Box></Box>;
  }

  const renderSections = () => {
    const sections: JSX.Element[] = [];

    if (categories.length >= 10) {
      // If categories >= 10, render as per original structure
      sections.push(
        <Box key="section-1" className="flex flex-col gap-10 px-4 lg:px-[70px]">
          <HomeProducts
            categoryId={categories[0].id}
            title={categories[0].name}
            isAuthenticated={isAuthenticated}
          />
          <HomeProducts
            categoryId={categories[1].id}
            title={categories[1].name}
            isAuthenticated={isAuthenticated}
          />
        </Box>,
        <SpecialDiscountedProducts
          key="discount-1"
          isAuthenticated={isAuthenticated}
        />,
        <Box key="section-2" className="flex flex-col gap-10 px-4 lg:px-[70px]">
          <HomeProducts
            categoryId={categories[2].id}
            title={categories[2].name}
            isAuthenticated={isAuthenticated}
          />
          <HomeProducts
            categoryId={categories[3].id}
            title={categories[3].name}
            isAuthenticated={isAuthenticated}
          />
          <HomeProducts
            categoryId={categories[4].id}
            title={categories[4].name}
            isAuthenticated={isAuthenticated}
          />
          <HomeProducts
            categoryId={categories[5].id}
            title={categories[5].name}
            isAuthenticated={isAuthenticated}
          />
        </Box>,
        <SpecialDiscountedProducts
          key="discount-2"
          isAuthenticated={isAuthenticated}
        />,
        <Box key="section-3" className="flex flex-col gap-10 px-4 lg:px-[70px]">
          <HomeProducts
            categoryId={categories[6].id}
            title={categories[6].name}
            isAuthenticated={isAuthenticated}
          />
          <HomeProducts
            categoryId={categories[7].id}
            title={categories[7].name}
            isAuthenticated={isAuthenticated}
          />
          <HomeProducts
            categoryId={categories[8].id}
            title={categories[8].name}
            isAuthenticated={isAuthenticated}
          />
          <HomeProducts
            categoryId={categories[9].id}
            title={categories[9].name}
            isAuthenticated={isAuthenticated}
          />
        </Box>
      );
    } else {
      // If categories < 10, render up to 2 HomeProducts followed by 1 SpecialDiscountedProducts in a loop
      let categoryIndex = 0;

      while (categoryIndex < categories.length) {
        // Collect up to 2 HomeProducts
        const homeProducts = [];
        for (let i = 0; i < 2 && categoryIndex < categories.length; i++) {
          homeProducts.push(
            <HomeProducts
              key={`product-${categoryIndex}`}
              categoryId={categories[categoryIndex].id}
              title={categories[categoryIndex].name}
              isAuthenticated={isAuthenticated}
            />
          );
          categoryIndex++;
        }

        // Add the HomeProducts section
        sections.push(
          <Box
            key={`section-${sections.length}`}
            className="flex flex-col gap-10 px-4 lg:px-[70px]"
          >
            {homeProducts}
          </Box>
        );

        // Add SpecialDiscountedProducts after the HomeProducts section
        sections.push(
          <SpecialDiscountedProducts
            key={`discount-${sections.length}`}
            isAuthenticated={isAuthenticated}
          />
        );
      }
    }

    return sections;
  };

  return (
    <Box className="mt-10 flex w-full flex-col gap-10">{renderSections()}</Box>
  );
};

export default ProductsSection;
