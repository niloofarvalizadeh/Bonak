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
import { useGetFaqs } from "@/services/queries";
import { Faqs } from "@/types";
import Title from "@/components/ui/typography/Title";
import { generateRandomId } from "@/utils";

const FaqContainer: FC = () => {
  const { data: faqs, isLoading: faqsIsLoading } = useGetFaqs();

  return (
    <Box className="flex flex-col items-center gap-4">
      <CustomHeading level={3} className="text-brand-blue-normal" bold>
        سوالات متداول
      </CustomHeading>
      <Box className="w-[80%]">
        <Accordion allowMultiple className="!flex !w-full !flex-col !gap-6">
          {faqsIsLoading
            ? null
            : faqs?.map((item: Faqs) => (
                <AccordionItem
                  key={generateRandomId()}
                  borderWidth="1px"
                  borderColor="brand.white.normalHover"
                  className="!rounded-2xl lg:!rounded-3xl"
                >
                  <h2>
                    <AccordionButton className="!flex !w-full !items-center !justify-between !rounded-2xl !text-brand-blue-normal lg:!rounded-3xl">
                      <Title level={1} bold>
                        {item.question}
                      </Title>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>{item.answer}</AccordionPanel>
                </AccordionItem>
              ))}
        </Accordion>
      </Box>
    </Box>
  );
};

export default FaqContainer;
