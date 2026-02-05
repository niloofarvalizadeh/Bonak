import SignInContainer from "@/containers/auth-page/signin-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ورود"
};

export default async function SigninPage() {
  return <SignInContainer />;
}
