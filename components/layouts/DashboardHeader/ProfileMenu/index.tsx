"use client";
import React, { FC } from "react";

import CustomBody from "@/components/ui/typography/CustomBody";
import {
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  SkeletonCircle
} from "@chakra-ui/react";
import { ArrowDown2, Logout, Category } from "iconsax-react";
import { useGetFullUserName, useGetNotifications } from "@/services/queries";
import { deleteSession } from "@/libs/session";
import Link from "next/link";
import ProfileDrawerNavigation from "@/components/navigations/ProfileDrawerNavigation";
import { NavTags } from "@/constants/routes";

interface ProfileMenuProps {
  userRole: "buyer" | "seller" | "marketer";
}

const ProfileMenu: FC<ProfileMenuProps> = ({ userRole }) => {
  const { data: notifications } = useGetNotifications(false);

  const { data: userInformation, isLoading: userInformationIsLoading } =
    useGetFullUserName();

  const handleLogout = async () => {
    await deleteSession();
  };
  return (
    <Box className="flex h-[50px] items-center justify-between gap-4 rounded-lg bg-brand-orange-light px-2 lg:w-[20%]">
      <Box className="flex items-center gap-2">
        {userInformationIsLoading ? (
          <>
            <SkeletonCircle height="36px" width="36px" />
            <Skeleton
              height="18px"
              width="61px"
              className="!hidden lg:!block"
            />
          </>
        ) : (
          <>
            <Avatar className="!size-9" name={userInformation?.name} />
            <CustomBody className="hidden lg:block">
              {userInformation?.name}
            </CustomBody>
          </>
        )}
      </Box>

      {/* MOBILE MENU */}
      <ProfileDrawerNavigation
        tags={
          userRole == "seller"
            ? NavTags.seller
            : userRole == "buyer"
              ? NavTags.buyer
              : userRole == "marketer"
                ? ["secDashboard", "userInvitedList", "inviteFriends"]
                : []
        }
        userRole={userRole}
      />

      {/* MENU */}
      <Menu>
        <MenuButton
          as={Box}
          bg="none"
          padding="0px"
          textAlign="end"
          display="flex"
          justifyContent="end"
          alignItems="center"
          aria-label="Menu Button"
          position="relative"
          cursor="pointer"
          _hover={{ bg: "none" }}
          className="!hidden lg:!block"
        >
          <ArrowDown2 size="16" />
          <div className="absolute -right-1 -top-2 flex size-3 items-center justify-center rounded-full bg-brand-orange-normal">
            <span className="mt-1 text-[11px] font-bold text-white">
              {notifications?.data.length}
            </span>
          </div>
        </MenuButton>
        <MenuList>
          <MenuItem
            as={Link}
            className="!flex !w-full !items-center !justify-between"
            href={
              userRole == "buyer" || userRole == "seller"
                ? `/account/${userRole}/dashboard`
                : "/mk/dashboard"
            }
          >
            <span>داشبورد</span>
            <Category />
          </MenuItem>
          <MenuItem
            color="red"
            onClick={handleLogout}
            className="!flex !w-full !items-center !justify-between"
          >
            <span>خروج</span>
            <Logout />
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
