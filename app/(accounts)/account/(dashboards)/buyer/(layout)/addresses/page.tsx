import SellerDashboardAddressesContainer from "@/containers/dashboards/seller/addresses-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "آدرس ها"
};

export default async function SellerDashboardAddressesPage() {
  return <SellerDashboardAddressesContainer userRole="buyer" />;
}
