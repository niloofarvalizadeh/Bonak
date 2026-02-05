import React, { FC } from "react";

import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import { Box } from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";
import WalletCard from "@/components/modules/WalletCard";
import Link from "next/link";
import Breadcrumb from "@/components/ui/elements/Breadcrumb";
import { generateRandomId } from "@/utils";
import LatestTransactions from "@/components/modules/LatestTransactions";

interface LinkItem {
  href: string;
  title: string;
}

interface Props {
  userRole: "seller" | "buyer";
}

const SellerDashboardWalletContainer: FC<Props> = ({ userRole }) => {
  const links: LinkItem[] = [
    {
      href: `/account/${userRole}/wallet/increase-balance`,
      title: "افزایش موجودی"
    },
    {
      href: `/account/${userRole}/w/withdrawal-request`,
      title: "درخواست برداشت"
    },
    {
      href: `/account/${userRole}/wallet/transaction-list`,
      title: "لیست درخواست ها"
    }
  ];
  return (
    <Box>
      <Breadcrumb hidden userRole="seller" tags={["dashboard", "wallet"]} />
      <DashboardPageTitle>کیف پول</DashboardPageTitle>

      {/* WALLET BOX */}
      <Box className="mt-6 flex w-full flex-col gap-y-6 lg:flex-row lg:gap-x-3">
        <WalletCard userRole="seller" />
        <Box className="flex w-full flex-col gap-4 lg:gap-[55px]">
          {links?.map((item) => (
            <Link
              href={item.href}
              key={generateRandomId()}
              className="flex h-20 w-full items-center justify-center rounded-lg bg-brand-yellow-light px-4 py-2 text-center hover:bg-brand-yellow-lightHover"
            >
              <Title level={1} className="text-brand-yellow-normalActive">
                {item.title}
              </Title>
            </Link>
          ))}
        </Box>
      </Box>

      {/* LAST TRANSACTIONS */}
      <LatestTransactions />

      <Box className="mt-10 lg:hidden">
        <DashboardPageTitle>اطلاعات بانکی</DashboardPageTitle>
      </Box>
    </Box>
  );
};

export default SellerDashboardWalletContainer;
