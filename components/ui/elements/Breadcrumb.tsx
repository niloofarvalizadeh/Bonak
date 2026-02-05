import React, { FC } from "react";

import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import Link from "next/link";
import CustomBody from "../typography/CustomBody";
import { SellerRoutesTagsType } from "@/types";
import { filterRoutesByTags, generateRandomId } from "@/utils";

interface SellerBreadcrumbProps {
  userRole: "seller";
  hidden?: boolean;
  tags: SellerRoutesTagsType[];
}

interface BuyerBreadcrumbProps {
  userRole: "buyer";
  hidden?: boolean;
  tags: SellerRoutesTagsType[];
}

type BreadcrumbProps = SellerBreadcrumbProps | BuyerBreadcrumbProps;

const Breadcrumb: FC<BreadcrumbProps> = ({ userRole, tags, hidden }) => {
  const filterProps = { userRole, tags };
  return (
    <ChakraBreadcrumb className={`${hidden ? "!hidden lg:!block" : ""}`}>
      {filterRoutesByTags(filterProps)?.map((item) => (
        <BreadcrumbItem key={generateRandomId()} separator="separator">
          <BreadcrumbLink as={Link} href={item.path}>
            <CustomBody className="text-brand-blue-lightHover">
              {item.title}
            </CustomBody>
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
};

export default Breadcrumb;
