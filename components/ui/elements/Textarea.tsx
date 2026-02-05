import React, { forwardRef } from "react";

import { Textarea as ChakraTextarea, TextareaProps } from "@chakra-ui/react";
import CustomBody from "../typography/CustomBody";

interface CustomTextareaProps extends TextareaProps {
  label?: string;
  className?: string;
  textAreaClassName?: string;
  error?: string | undefined;
}

const Textarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ label, className, textAreaClassName, error, ...props }, ref) => {
    return (
      <div className={`relative ${className}`}>
        <CustomBody className="absolute -top-2 right-2 z-10 bg-white px-[10px] text-brand-blue-lightActive">
          {label}
        </CustomBody>
        <ChakraTextarea
          ref={ref}
          borderRadius="12px"
          borderWidth="1px"
          borderColor="brand.blue.lightActive"
          fontSize="19px"
          fontWeight="bold"
          className={`${textAreaClassName}`}
          _placeholder={{
            fontSize: "16px",
            fontWeight: "400",
            color: "brand.blue.normal"
          }}
          lineHeight="26.6px"
          color="brand.blue.normal"
          paddingRight="22px"
          resize="none"
          {...props}
        />
        <span className="text-xs text-red-500">{error}</span>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
