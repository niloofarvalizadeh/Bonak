import { ReactNode } from "react";

import DashboardHeader from "@/components/layouts/DashboardHeader";
import DashboardBottomNavigation from "@/components/navigations/DashboardBottomNavigation";
import Footer from "@/components/layouts/Footer";
import { Box } from "@chakra-ui/react";
import { getSession } from "@/libs/session";

export default async function DashboardLayout({
  children
}: {
  children: ReactNode;
}) {
  const session = await getSession();
  // console.log({ session });
  return (
    <Box as="main" className="pb-16 lg:pb-0">
      <Box
        as="section"
        className="mb-[70px] px-4 lg:mb-0 lg:px-[70px] lg:py-[40px]"
      >
        <DashboardHeader />
      </Box>
      <Box as="section" className="w-full">
        {children}
      </Box>
      <Footer />
      {session && (
        <DashboardBottomNavigation
          userRole={session?.userType}
          tags={
            session?.userType == "seller"
              ? ["dashboard", "allPublicProducts", "products", "profile"]
              : session?.userType == "buyer"
                ? ["dashboard", "publicProducts", "checkout", "profile"]
                : [
                    "dashboard",
                    "publicProducts",
                    "userInvitedList",
                    "inviteFriends"
                  ]
          }
        />
      )}
    </Box>
  );
}
