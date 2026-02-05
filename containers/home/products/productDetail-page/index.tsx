import React, {FC} from "react";
import { Box, Text, Heading} from "@chakra-ui/react";
import ProductInfo from "@/components/modules/ProductDetail/ProductInfo";
import ProductSpecifications from "@/components/modules/ProductDetail/ProductSpecifications";
import OtherDistributors from "@/components/modules/ProductDetail/OtherDistributors";
import ProductReviews from "@/components/modules/ProductDetail/Reviews";
import {checkAuth, getSession} from "@/libs/session";
import { ProductData } from "@/types";

interface ProductDetailContainerProps {
    product: ProductData;
    productId: string;
}

const ProductDetailContainer: FC<ProductDetailContainerProps> = async ({
                                                                           product,
                                                                           productId
                                                                       }) => {
    const isAuth = await checkAuth();
    const session = await getSession();
    const isBuyer = session && session?.userType == "buyer" ? true : false;

    return (
        <Box as="section" className="px-4 lg:px-[70px]">

            <ProductInfo product={product} id={productId} isAuth={isAuth}/>

            <ProductSpecifications product={product} isAuth={isAuth}/>

            <OtherDistributors productId={productId} isAuth={isAuth}/>

            <ProductReviews
                product={product}
                productId={productId}
                isBuyer={isBuyer}
            />
        </Box>
    );
};

export default ProductDetailContainer;
