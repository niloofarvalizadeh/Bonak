import React, { forwardRef } from "react";
import { Select as ChakraSelect, SelectProps } from "@chakra-ui/react";
import { ArrowDown2 } from "iconsax-react";
import CustomBody from "../typography/CustomBody";

interface CustomSelectProps extends SelectProps {
  label?: string;
  className?: string;
}

const Select = forwardRef<HTMLSelectElement, CustomSelectProps>(
  ({ label, className, children, ...props }, ref) => {
    return (
      <div className={`relative ${className}`}>
        <CustomBody className="absolute -top-2 right-2 z-10 bg-white px-[10px] text-brand-blue-lightActive">
          {label}
        </CustomBody>
        <ChakraSelect
          ref={ref}
          borderRadius="12px"
          borderWidth="1px"
          borderColor="brand.blue.lightActive"
          // fontSize="19px"
          fontWeight="bold"
          placeholder="انتخاب کنید"
          _placeholder={{ color: "red.500" }}
          lineHeight="26.6px"
          color="brand.blue.normal"
          height="48px"
          icon={
            <ArrowDown2
              size="24"
              className="text-brand-blue-normalActive"
              variant="Bold"
            />
          }
          {...props}
        >
          {children}
        </ChakraSelect>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
