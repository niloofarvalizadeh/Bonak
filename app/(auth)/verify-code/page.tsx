import VerifyCodeContainer from "@/containers/auth-page/verifyCode-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "احراز هویت"
};

export default async function VerifyCodePage() {
  return <VerifyCodeContainer />;
}
