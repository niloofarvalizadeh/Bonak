import ProductDetailContainer from "@/containers/home/products/productDetail-page";
import { ProductData } from "@/types";
import type { Metadata, ResolvingMetadata } from "next";
import camelcaseKeys from "camelcase-keys";
import { getMediaUrl } from "@/utils/media";

type PageProps = {
  params: { productId: string };
};

async function getProductDetail(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DEV_API_URL}/product/api/v1/show_detail_seller_product/${id}`,
    {
      cache: "no-store"
    }
  );

  const productDetail = await res.json();

  const camelCasedProductDetail: ProductData = camelcaseKeys(productDetail, {
    deep: true
  });

  return camelCasedProductDetail;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.productId;

  // fetch data
  const product = await getProductDetail(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: product.product.metaTitle,
    description: product.product.metaDescription,
    openGraph: {
      title: product.product.metaTitle,
      description: product.product.metaDescription,
      images: [
        getMediaUrl(product.product.image),,
        ...previousImages
      ]
    }
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const productId = params.productId;
  const product = await getProductDetail(productId);

  return <ProductDetailContainer product={product} productId={productId} />;
}
