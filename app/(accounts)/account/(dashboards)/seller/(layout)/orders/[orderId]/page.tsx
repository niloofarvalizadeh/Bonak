import SellerOrderDetailContainer from "@/containers/dashboards/seller/orders-page/orderDetail-page";
import { Metadata } from "next";

type PageProps = {
  params: { orderId: string };
};

export const metadata: Metadata = {
  title: "سفارش"
};

export default async function SellerOrderDetailPage({ params }: PageProps) {
  return <SellerOrderDetailContainer orderId={params.orderId} />;
}
