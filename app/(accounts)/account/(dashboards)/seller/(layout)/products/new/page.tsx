import SellerDashboardNewProductContainer from "@/containers/dashboards/seller/products-page/newProduct-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "محصول جدید"
};

export default async function SellerDashboardNewProductPage() {
  return <SellerDashboardNewProductContainer />;
}
