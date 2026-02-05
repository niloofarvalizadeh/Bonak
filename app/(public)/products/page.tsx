import ProductsContainer from "@/containers/home/products";
import { checkAuth } from "@/libs/session";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "محصولات"
};

export default async function ProductsPage() {
  const isAuthenticated = await checkAuth();

  // اگر کاربر لاگین نبود، ریدایرکت به صفحه ورود
  if (!isAuthenticated) {
    redirect('/signin');
  }

  return <ProductsContainer isAuthenticated={isAuthenticated} />;
}