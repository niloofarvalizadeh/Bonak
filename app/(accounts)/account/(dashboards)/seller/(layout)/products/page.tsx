import SellerDashboardProductsContainer from "@/containers/dashboards/seller/products-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "محصولات"
};

export default async function SellerDashboardProductsPage() {
  return <SellerDashboardProductsContainer />;
}
