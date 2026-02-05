import React from "react";
import { Box } from "@chakra-ui/react";
import HomeHeader from "@/components/modules/Home/Header";
import Banner from "@/components/modules/Home/Banners/Banner";
import HomeCategories from "@/components/modules/Home/Categories";
// import TopSellers from "@/components/modules/Home/TopSellers";
import ProductsSection from "@/components/modules/Home/ProductsSection";
import { checkAuth } from "@/libs/session";

const HomeContainer = async () => {
  const isAuthenticated = await checkAuth();
  return (
    <Box>
      <Box className="px-4 lg:px-[70px]">
        <HomeHeader />
        <Banner />
        <HomeCategories />
        {/* <TopSellers /> */}
      </Box>
      <ProductsSection isAuthenticated={isAuthenticated} />
    </Box>
  );
};

export default HomeContainer;