import CompleteSignUpBuyerContainer from "@/containers/auth-page/completeInformation-page/buyer-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ثبت نام خریدار"
};

export default async function BuyerSignUpPage() {
  return <CompleteSignUpBuyerContainer />;
}
