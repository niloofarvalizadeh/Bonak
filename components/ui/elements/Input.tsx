import React, { forwardRef } from "react";

import { Input as ChakraInput, InputProps } from "@chakra-ui/react";
import CustomBody from "../typography/CustomBody";

interface CustomInputProps extends InputProps {
  label?: string;
  className?: string;
  error?: string | undefined;
}

const Input = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, className, error, ...props }, ref) => {
    return (
      <div className={`relative ${className}`}>
        <CustomBody className="absolute -top-2 right-2 z-10 bg-white px-[10px] text-brand-blue-lightActive">
          {label}
        </CustomBody>
        <ChakraInput
          ref={ref}
          borderRadius="12px"
          borderWidth="1px"
          borderColor="brand.blue.lightActive"
          fontSize="19px"
          fontWeight="bold"
          _placeholder={{
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "22.4"
          }}
          lineHeight="26.6px"
          color="brand.blue.normal"
          height="48px"
          paddingRight="22px"
          {...props}
        />
        <span className="text-xs text-red-500">{error}</span>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
