import { FC } from "react";

import { Box, useRadio, UseRadioProps } from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";

interface FilterProductsRadioCard extends UseRadioProps {
  children: React.ReactElement | string;
}
const FilterProductsRadioCard: FC<FilterProductsRadioCard> = (props) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="md"
        color="brand.blue.lightActive"
        _checked={{
          bg: "brand.orange.light",
          color: "brand.orange.normal",
          borderColor: "teal.600"
        }}
        px="10px"
      >
        <Title level={2}>{props.children}</Title>
      </Box>
    </Box>
  );
};

export default FilterProductsRadioCard;
