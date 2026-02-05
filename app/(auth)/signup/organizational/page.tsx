import OrganizationContainer from "@/containers/auth-page/completeInformation-page/organizational-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ثبت نام سازمانی"
};

export default async function OrganizationalSignUpPage() {
  return <OrganizationContainer />;
}
