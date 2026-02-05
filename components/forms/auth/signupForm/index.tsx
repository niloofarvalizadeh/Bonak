"use client";

import React, { FC, useState } from "react";

import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";
import BuyerForm from "./Buyer";
import SellerForm from "./Seller";
import { useSearchParams } from "next/navigation";

const SignUpForm: FC = () => {
  const [index, setIndex] = useState(0);

  const searchParams = useSearchParams();

  const organizational = searchParams.get("organizational");

  return (
    <Box className="w-full">
      <Box>
        <Tabs
          position="relative"
          variant="unstyled"
          index={index}
          onChange={(index) => setIndex(index)}
        >
          {organizational == "active" ? null : (
            <>
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
              <div className="flex w-full items-center">
                <div
                  className={`h-1 w-full rounded ${index == 0 ? "bg-brand-orange-normal" : "bg-brand-white-normalHover"}`}
                ></div>
                <div
                  className={`h-1 w-full rounded ${index == 1 ? "bg-brand-orange-normal" : "bg-brand-white-normalHover"}`}
                ></div>
              </div>
            </>
          )}

          <TabPanels>
            <TabPanel>
              <BuyerForm organizational={organizational} />
            </TabPanel>
            <TabPanel>
              <SellerForm organizational={organizational} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default SignUpForm;
