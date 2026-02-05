import { FC } from "react";

import { Box, useRadio, UseRadioProps } from "@chakra-ui/react";
import Title from "../typography/Title";

interface RadioCardProps extends UseRadioProps {
  children: React.ReactElement | string;
}

const RadioCard: FC<RadioCardProps> = (props) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" className="flex items-center gap-2">
      <input {...input} />
      <Box
        cursor="pointer"
        borderWidth="1px"
        borderColor="brand.blue.normal"
        width="24px"
        height="24px"
        borderRadius="8px"
        padding="1px"
        position="relative"
      >
        <Box
          {...checkbox}
          width="100%"
          height="100%"
          position="relative"
          borderRadius="6px"
          _checked={{ bg: "brand.orange.normal" }}
        ></Box>
      </Box>
      <Title
        level={1}
        className="text-brand-blue-normal"
        bold={props.isChecked}
      >
        {props.children}
      </Title>
    </Box>
  );
};

export default RadioCard;
