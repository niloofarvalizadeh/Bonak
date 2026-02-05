import React, { FC } from "react";

import { Box } from "@chakra-ui/react";
import TypographyLogo from "@/components/ui/typography/TypographyLogo";
import Title from "@/components/ui/typography/Title";
import Link from "next/link";
import { HeaderPublicLinks } from "@/constants/routes";
import { generateRandomId } from "@/utils";
import ProfileMenu from "./ProfileMenu";
import { getSession } from "@/libs/session";
import SearchBoxInput from "./SearchBox";
import FavoritesDrawer from "./Favorites";
import { HambergerMenu, Notification, ShoppingCart } from "iconsax-react";

const DashboardHeader: FC = async () => {
  const session = await getSession();

  return (
    <>
      <Box as="header" className="hidden flex-col gap-5 lg:flex">
        <Box className="flex items-center justify-between gap-[58px]">
          <Box className="flex w-[80%] items-center xl:gap-[72px]">
            {/* LOGO */}
            <Box as="span" width="107px" height="50px">
              <Link href="/">
                <TypographyLogo />
              </Link>
            </Box>
            <SearchBoxInput />
          </Box>
          {session == null ? (
            <>
              <Box className="flex h-[50px] w-[20%] items-center gap-2 text-brand-blue-normal">
                <Link
                  href="/signin"
                  className="flex h-full w-full items-center justify-center rounded-lg border border-brand-orange-normal bg-brand-orange-light"
                >
                  <Title level={1} bold>
                    ورود
                  </Title>
                </Link>
                <Link
                  href="/signup"
                  className="flex h-full w-full items-center justify-center rounded-lg border border-brand-orange-normal bg-brand-orange-light"
                >
                  <Title level={1} bold>
                    ثبت نام
                  </Title>
                </Link>
              </Box>
            </>
          ) : (
            <ProfileMenu userRole={session.userType} />
          )}
        </Box>
        <Box className="flex w-full items-center justify-between">
          {/* RIGHT SIDE */}
          <Box className="flex items-center gap-6">
            <Box
              as={Link}
              href="/categories"
              className="flex items-center gap-2"
            >
              <HambergerMenu size="24" />
              <Title
                level={1}
                className="text-brand-blue-dark lg:text-xs xl:text-[19px]"
              >
                دسته بندی محصولات
              </Title>
            </Box>

            <Box as="hr" className="h-8 w-[1px] bg-brand-blue-normal"></Box>

            <Box className="flex items-center gap-12 lg:gap-7">
              {HeaderPublicLinks?.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={generateRandomId()}
                    href={item.href}
                    className="flex items-center justify-center gap-2 text-center text-brand-blue-normal"
                  >
                    {IconComponent && <IconComponent size="24px" />}
                    <Title level={1} className="lg:text-sm xl:text-[19px]">
                      {item.title}
                    </Title>
                  </Link>
                );
              })}
            </Box>
          </Box>

          {/* LEFT SIDE */}
          {session == null ? null : (
            <Box className="flex items-center gap-4">
              <FavoritesDrawer />
              
              {/* اضافه کردن سبد خرید برای buyer */}
              {session.userType === "buyer" && (
                <Link
                  href="/account/buyer/checkout"
                  className="flex items-center gap-1 rounded-lg border border-brand-blue-normal px-4 py-[14px] text-brand-blue-normal"
                >
                  <ShoppingCart size="20" />
                  <Title level={2} className="lg:text-xs xl:text-base">
                    سبد خرید
                  </Title>
                </Link>
              )}
              
              <Link
                href={`/account/${session.userType}/notifications`}
                className="flex items-center gap-1 rounded-lg border border-brand-blue-normal px-4 py-[14px] text-brand-blue-normal"
              >
                <Notification size="20" />
                <Title level={2} className="lg:text-xs xl:text-base">
                  اعلانات
                </Title>
              </Link>
            </Box>
          )}


        </Box>
      </Box>

      {/* MOBILE NAV */}
      <Box
        as="header"
        className="fixed right-0 top-0 z-[1000] w-full bg-white px-4 lg:hidden"
      >
        <Box className="relative flex w-full items-center justify-between">
          {/* LOGO */}
          <Box as="span" width="107px" height="50px">
            <Link href="/">
              <TypographyLogo />
            </Link>
          </Box>

          {session == null ? (
          <Box className="w-[60%] py-2">
            <Box className="flex h-[50px] items-center gap-2 text-brand-blue-normal">
              <Link
                href="/signin"
                className="flex h-full w-full items-center justify-center rounded-lg border border-brand-orange-normal bg-brand-orange-light"
              >
                <Title level={1} bold>
                  ورود
                </Title>
              </Link>
              <Link
                href="/signup"
                className="flex h-full w-full items-center justify-center rounded-lg border border-brand-orange-normal bg-brand-orange-light"
              >
                <Title level={1} bold>
                  ثبت نام
                </Title>
              </Link>
            </Box>
          </Box>
        ) : (
          <Box className="flex items-center gap-2">
            {/* اضافه کردن سبد خرید برای buyer در موبایل */}
            {session.userType === "buyer" && (
              <Link
                href="/account/buyer/checkout"
                className="flex items-center gap-1 rounded-lg border border-brand-blue-normal px-3 py-2 text-brand-blue-normal"
              >
                <ShoppingCart size="18" />
              </Link>
            )}
            <ProfileMenu userRole={session.userType} />
          </Box>
        )}


        </Box>
      </Box>
    </>
  );
};

export default DashboardHeader;
