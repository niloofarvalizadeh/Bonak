"use client";
import React, { FC } from "react";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box
} from "@chakra-ui/react";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import { useGetRules } from "@/services/queries";
import { Rules } from "@/types";
import Title from "@/components/ui/typography/Title";
import { generateRandomId } from "@/utils";

interface RulesContainerProps {
  pageRole: "seller" | "buyer";
}

const RulesContainer: FC<RulesContainerProps> = ({ pageRole }) => {
  const { data: rules, isLoading: rulesIsLoading } = useGetRules();

  return (
    <Box className="flex flex-col items-center gap-4">
      <CustomHeading level={3} className="text-brand-blue-normal" bold>
        قوانین و مقررات {pageRole == "buyer" ? "خریدار" : "فروشنده"}
      </CustomHeading>
      <Box className="w-[80%]">
        <Accordion allowMultiple className="!flex !w-full !flex-col !gap-6">
          {rulesIsLoading
            ? null
            : pageRole == "buyer"
              ? rules?.buyer?.map((item: Rules) => (
                  <AccordionItem
                    key={generateRandomId()}
                    borderWidth="1px"
                    borderColor="brand.white.normalHover"
                    className="!rounded-2xl lg:!rounded-3xl"
                  >
                    <h2>
                      <AccordionButton className="!flex !w-full !items-center !justify-between !rounded-2xl !text-brand-blue-normal lg:!rounded-3xl">
                        <Title level={1} bold>
                          {item.title}
                        </Title>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>{item.description}</AccordionPanel>
                  </AccordionItem>
                ))
              : rules?.seller?.map((item: Rules) => (
                  <AccordionItem
                    key={generateRandomId()}
                    borderWidth="1px"
                    borderColor="brand.white.normalHover"
                    className="!rounded-2xl lg:!rounded-3xl"
                  >
                    <h2>
                      <AccordionButton className="!flex !w-full !items-center !justify-between !rounded-2xl !text-brand-blue-normal lg:!rounded-3xl">
                        <Title level={1} bold>
                          {item.title}
                        </Title>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>{item.description}</AccordionPanel>
                  </AccordionItem>
                ))}
        </Accordion>
      </Box>
    </Box>
  );
};

export default RulesContainer;
