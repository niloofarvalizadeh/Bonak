"use client";
import React, { FC } from "react";

import Link from "next/link";
import CustomBody from "@/components/ui/typography/CustomBody";
import { usePathname } from "next/navigation";
import { FilterRoutesByTagsProps } from "@/types";
import { filterRoutesByTags, generateRandomId } from "@/utils";
import { Box } from "@chakra-ui/react";

const DashboardBottomNavigation: FC<FilterRoutesByTagsProps> = ({
  userRole,
  tags
}) => {
  const pathname = usePathname();
  const filterProps: FilterRoutesByTagsProps = { userRole, tags };
  console.log({ userRole });
  return (
    <Box className="fixed bottom-0 right-0 z-[100] flex h-16 w-full shrink-0 items-start justify-center border-t border-brand-white-normalHover bg-brand-white-normal px-[6px] py-[11px] lg:hidden">
      {filterRoutesByTags(filterProps)?.map((item) => {
        const IconComponent = item.icon;
        return (
          <Link
            key={generateRandomId()}
            href={item.path}
            className={`flex w-20 flex-col items-center ${pathname == item.path ? "text-brand-orange-normal" : "text-brand-blue-normal"}`}
          >
            <IconComponent
              size="24"
              variant={pathname == item.path ? "Bold" : "Outline"}
            />
            <CustomBody bold={pathname == item.path}>{item.title}</CustomBody>
          </Link>
        );
      })}
    </Box>
  );
};

export default DashboardBottomNavigation;
