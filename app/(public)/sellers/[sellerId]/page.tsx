import type { Metadata } from "next";
import { checkAuth } from "@/libs/session";
import SellerDetailContainer from "@/containers/home/sellers/sellersDetail-page";

export const metadata: Metadata = {
  title: "فروشنده"
};

type PageProps = {
  params: { sellerId: string };
};

export default async function ProductsPage({ params }: PageProps) {
  const isAuthenticated = await checkAuth();

  return (
    <SellerDetailContainer
      id={params.sellerId}
      isAuthenticated={isAuthenticated}
    />
  );
}
