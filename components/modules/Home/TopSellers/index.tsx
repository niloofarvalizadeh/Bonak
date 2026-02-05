"use client";
import React, { FC, useState } from "react";

import { Box } from "@chakra-ui/react";
import SellerCard from "../../SellerCard";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import { useGetFeaturedSellers } from "@/services/queries";
import axios from "axios";

const TopSellers: FC = () => {
  const { data: featuredSellers, isLoading: featuredSellersIsLoading } =
    useGetFeaturedSellers();
  // const [featuredSellers,setfeaturedsellers] = useState([]);

  // axios.get("https://api.bonakcenter.com/account/api/v1/featured-sellers/").then(
  //   (res) =>
  //   {
  //     setfeaturedsellers(res.data.sellers);
  //   }

  // )
  // console.log("test this scope")
  // console.log(featuredSellers)


  return (
    <Box className="mt-[22px] flex w-full flex-col items-center gap-12 lg:mt-[41px]">
      <CustomHeading level={5} bold className="text-brand-blue-normal">
        پخش کننده‌های برتر
      </CustomHeading>

      <Box className="grid grid-cols-2 gap-x-2 gap-y-10 lg:grid-cols-5 lg:gap-x-[55px] lg:gap-y-[88px]">
        {featuredSellers && featuredSellers.sellers?.length > 0
            ? featuredSellers.sellers?.map(
                (item: {
                  id: number;
                  logoImage: string | null;
                  companyName: string;
                  description: string | null;
                }) => (
                  <SellerCard
                    key={item.id}
                    companyName={item.companyName}
                    logoImage={item.logoImage}
                    description={item.description}
                  />
                )
              )
            : "Loading..."}
      </Box>
    </Box>
  );
};

export default TopSellers;
