import React, { FC } from "react";

import { Box } from "@chakra-ui/react";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import Title from "@/components/ui/typography/Title";
import Rating from "@/components/ui/elements/Rating";
import {
  CommentModalLg,
  CommentModalSm
} from "../../Home/Products/CommentModal";
import camelcaseKeys from "camelcase-keys";
import { ProductComment, ProductData } from "@/types";
import CommentCard from "./CommentCard";
import { checkAuth } from "@/libs/session";

async function getProductComments(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DEV_API_URL}/product/api/v1/comment_list/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ seller_product_id: id })
    }
  );

  const productDetail: ProductComment = await res.json();

  const camelCasedProductDetail: ProductComment = camelcaseKeys(productDetail, {
    deep: true
  });

  return camelCasedProductDetail;
}

interface ProductReviewsProps {
  product: ProductData;
  productId: string;
  isBuyer: boolean;
}

const ProductReviews: FC<ProductReviewsProps> = async ({
  product,
  productId,
  isBuyer
}) => {
  const comments = await getProductComments(productId);
  const {
    product: { image, altText, name },
    sellerProduct: { itemsPerPackage }
  } = product;

  const imagePath = image
    ? `${process.env.NEXT_PUBLIC_BACKEND_DEV_API_URL}${image}`
    : null;
  const isAuthenticated = await checkAuth();

  return (
    <Box className="mt-10 flex w-full flex-col gap-6 lg:flex-row lg:gap-10">
      <Box className="flex w-full flex-col items-end justify-center gap-2 lg:hidden">
        <Box className="flex items-center gap-[5px] text-brand-blue-normal">
          <CustomHeading level={3} bold>
          {parseFloat(product.sellerInformation.numRatings).toFixed(1)}
          </CustomHeading>
          <Title level={1} bold>
            از 5
          </Title>
        </Box>
        <Box className="flex items-center gap-2">
          <Rating rating={comments?.averageRating || 0} size={24} />
        </Box>
      </Box>

      <Box className="hidden w-64 flex-col gap-4 lg:flex">
        <Box className="flex w-full flex-col gap-2">
          <Box className="flex items-center gap-[5px] text-brand-blue-normal">
            <CustomHeading level={3} bold>
            {parseFloat(product.sellerInformation.numRatings).toFixed(1)}
            </CustomHeading>
            <Title level={1} bold>
              از 5
            </Title>
          </Box>
          <Box className="flex items-center gap-2">
          <Rating rating={parseFloat(product.sellerInformation.numRatings)} size={24} />

          </Box>
        </Box>
        {isBuyer && (
          <CommentModalLg
            id={productId}
            image={imagePath}
            imgAlt={altText}
            name={name}
            itemsPerPackage={itemsPerPackage}
            hideOnLgSize={false}
            isFullWidth={true}
            isAuthenticated={isAuthenticated}
          />
        )}
      </Box>
      <Box className="flex w-full flex-col gap-6">
        <Box className="flex w-full items-center justify-between">
          <CustomHeading level={4} bold className="text-brand-blue-normal">
            نظرات
          </CustomHeading>
          {isBuyer && (
            <CommentModalSm
              id={productId}
              image={imagePath}
              imgAlt={altText}
              name={name}
              itemsPerPackage={itemsPerPackage}
              hideOnLgSize={true}
              isFullWidth={false}
              isAuthenticated={isAuthenticated}
            />
          )}
        </Box>
        <Box className="flex w-full flex-col gap-4">
          {comments?.ratings?.length === 0
            ? null
            : comments?.ratings?.map((item, index) => (
                <CommentCard
                  key={index}
                  comment={item.comment}
                  companyName={item.companyName}
                  rating={item.rating}
                />
              ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductReviews;