import OrderDetailContainer from "@/containers/dashboards/buyer/orders-page/orderDetail-page";
import { Metadata } from "next";

type PageProps = {
  params: { orderId: string };
};

export const metadata: Metadata = {
  title: "سفارش"
};

export default async function OrderDetailPage({ params }: PageProps) {
  return <OrderDetailContainer orderId={params.orderId} />;
}
