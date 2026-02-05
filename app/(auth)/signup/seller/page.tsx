import CompleteSignUpSellerContainer from "@/containers/auth-page/completeInformation-page/seller-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ثبت نام فروشنده"
};

export default async function SellerSignUpPage() {
  return <CompleteSignUpSellerContainer />;
}
