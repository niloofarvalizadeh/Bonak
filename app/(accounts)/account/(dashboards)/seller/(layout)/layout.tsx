import { ReactNode } from "react";

import DashboardBottomNavigation from "@/components/navigations/DashboardBottomNavigation";
import DashboardAsideNavigations from "@/components/navigations/DashboardAsideNavigations";
import DashboardHeader from "@/components/layouts/DashboardHeader";
import { Box } from "@chakra-ui/react";
import { NavTags } from "@/constants/routes";

export default function SellerDashboardLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <Box as="main" className="px-4 pb-16 pt-[60px] lg:px-[70px] lg:py-[40px]">
      <DashboardHeader />
      <Box as="section" className="flex w-full gap-x-[44px] lg:mt-[44px]">
        <DashboardAsideNavigations userRole="seller" tags={NavTags.seller} />
        <Box className="w-full">{children}</Box>
      </Box>
      <DashboardBottomNavigation
        userRole="seller"
        tags={["dashboard", "allPublicProducts", "products", "profile"]}
      />
    </Box>
  );
}
