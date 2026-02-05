"use client";

import React, { FC, useState } from "react";

import {
  Box,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";
import BuyerForm from "./Buyer";
import SellerForm from "./Seller";

const SignInForm: FC = () => {
  const [index, setIndex] = useState(0);

  return (
    <Box className="w-full">
      <Box>
        <Tabs
          position="relative"
          variant="unstyled"
          index={index}
          onChange={(index) => setIndex(index)}
        >
          <TabList>
            <Tab className="!w-full">
              <Title
                level={1}
                className={` ${index == 0 ? "text-brand-blue-normal" : "text-brand-blue-lightActive"}`}
                bold={index == 0}
              >
                خریدار
              </Title>
            </Tab>
            <Tab className="!w-full">
              <Title
                level={1}
                className={` ${index == 1 ? "text-brand-blue-normal" : "text-brand-blue-lightActive"}`}
                bold={index == 1}
              >
                پخش کننده
              </Title>
            </Tab>
          </TabList>
          <Box
            as="div"
            className="relative h-1 w-full bg-brand-white-normalHover"
          >
            <TabIndicator
              height="4px"
              bg="brand.orange.normal"
              position="absolute"
              borderRadius="4px"
            />
          </Box>
          <TabPanels>
            <TabPanel>
              <BuyerForm />
            </TabPanel>
            <TabPanel>
              <SellerForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default SignInForm;
