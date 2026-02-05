/* eslint-disable no-nonoctal-decimal-escape */
"use client";
import React, { FC } from "react";

import { Input as ChakraInput, InputProps } from "@chakra-ui/react";
import InputMask from "react-input-mask";

import CustomBody from "../typography/CustomBody";

interface CustomInputProps extends InputProps {
  label?: string;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneNumberInput: FC<CustomInputProps> = ({
  label,
  className,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={`relative ${className}`}>
      <CustomBody className="absolute -top-2 right-2 z-10 bg-white px-[10px] text-brand-blue-lightActive">
        {label}
      </CustomBody>
      <InputMask
        mask="0\999 999 9999"
        alwaysShowMask
        maskChar=" "
        type="tel"
        inputMode="tel"
        value={value}
        onChange={onChange}
      >
        {(
          inputProps: React.JSX.IntrinsicAttributes &
            Omit<
              React.DetailedHTMLProps<
                React.InputHTMLAttributes<HTMLInputElement>,
                HTMLInputElement
              >,
              keyof InputProps
            > & { htmlTranslate?: "yes" | "no" | undefined } & InputProps & {
              as?: "input" | undefined;
            }
        ) => (
          <ChakraInput
            dir="ltr"
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
            {...inputProps}
            {...props}
          />
        )}
      </InputMask>
    </div>
  );
};

export default PhoneNumberInput;
