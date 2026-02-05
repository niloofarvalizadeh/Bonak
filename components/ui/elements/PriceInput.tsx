import React, { forwardRef } from "react";
import { NumericFormat, NumberFormatValues } from "react-number-format";
import { Input as ChakraInput, InputProps } from "@chakra-ui/react";
import CustomBody from "../typography/CustomBody";

interface PriceInputProps extends Omit<InputProps, "type"> {
  label?: string;
  className?: string;
  error?: string | undefined;
  onValueChange?: (values: NumberFormatValues) => void;
  value?: string;
}

const PriceInput = forwardRef<HTMLInputElement, PriceInputProps>(
  ({ label, className, error, onValueChange, value, ...props }, ref) => {
    return (
      <div className={`relative ${className}`}>
        <CustomBody className="absolute -top-2 right-2 z-10 bg-white px-[10px] text-brand-blue-lightActive">
          {label}
        </CustomBody>
        {/* @ts-ignore */}
        <NumericFormat
          thousandSeparator={true}
          allowNegative={false}
          value={value}
          onValueChange={onValueChange}
          customInput={ChakraInput}
          inputMode="numeric"
          type="text"
          getInputRef={ref}
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
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

PriceInput.displayName = "PriceInput";

export default PriceInput;
