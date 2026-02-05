import SellerDashboardEditProductContainer from "@/containers/dashboards/seller/products-page/editProduct-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ویرایش محصول"
};

export default async function SellerDashboardEditProductPage({
  params
}: {
  params: { productId: string };
}) {
  return <SellerDashboardEditProductContainer productId={params.productId} />;
}
