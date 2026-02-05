import React, { FC } from "react";

import { Box, useRadio, UseRadioProps } from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";

interface SelectTicketSectionRadioCardProps extends UseRadioProps {
  children: React.ReactElement | string;
}

const SelectTicketSectionRadioCard: FC<SelectTicketSectionRadioCardProps> = (
  props
) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" width="100%">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        height="60px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderWidth="1px"
        textAlign="center"
        borderRadius="12px"
        borderColor="brand.white.normalHover"
        color="brand.blue.normalActive"
        _checked={{
          bg: "brand.orange.normal",
          color: "white"
        }}
        _focus={{
          boxShadow: "none"
        }}
      >
        <Title level={1}>{props.children}</Title>
      </Box>
    </Box>
  );
};

export default SelectTicketSectionRadioCard;
