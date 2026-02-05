import { FC } from "react";

import { Box, useRadio, UseRadioProps } from "@chakra-ui/react";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import CustomBody from "@/components/ui/typography/CustomBody";

interface SelectCheckoutMethodRadioCardProps extends UseRadioProps {
  children: React.ReactElement | string;
}

const handleDisplayText = (value: string) => {
  if (value == "CASH") {
    return (
      <CustomHeading
        level={5}
        bold
        className="text-center text-brand-blue-normal"
      >
        پرداخت در <br />
        محل
      </CustomHeading>
    );
  } else if (value == "POD") {
    return (
      <Box className="flex flex-col gap-2 text-center text-brand-blue-normal">
        <CustomHeading level={5} bold>
          نقدی
        </CustomHeading>
        <CustomBody>(درگاه شتاب)</CustomBody>
      </Box>
    );
  } else if (value == "PFW") {
    return (
      <CustomHeading
        level={5}
        bold
        className="text-center text-brand-blue-normal"
      >
        پرداخت از <br /> کیف پول
      </CustomHeading>
    );
  }
};

const SelectCheckoutMethodRadioCard: FC<SelectCheckoutMethodRadioCardProps> = (
  props
) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderColor="brand.orange.light"
        bg="brand.orange.light"
        className="!flex !items-center !justify-center !rounded-lg !p-2 lg:!size-[164px] lg:!rounded-3xl lg:!p-0"
        color="brand.blue.normal"
        _checked={{
          borderColor: "brand.orange.normal"
        }}
        _focus={{
          boxShadow: "none"
        }}
      >
        {handleDisplayText(props.children as string)}
      </Box>
    </Box>
  );
};

export default SelectCheckoutMethodRadioCard;