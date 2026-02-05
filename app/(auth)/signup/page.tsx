import SignUpContainer from "@/containers/auth-page/signup-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ثبت نام"
};

export default async function SignUpPage() {
  return <SignUpContainer />;
}
