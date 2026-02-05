import React, { forwardRef, useState } from "react";
import { Input as ChakraInput, InputProps, Button } from "@chakra-ui/react";
import CustomBody from "../typography/CustomBody";

interface CustomFileInputProps extends InputProps {
  label?: string;
  className?: string;
  error?: string | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = forwardRef<HTMLInputElement, CustomFileInputProps>(
  ({ label, className, error, onChange, ...props }, ref) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const handleClick = () => {
      if (ref && typeof ref !== "function") {
        ref.current?.click();
      }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
      if (event.target.files && event.target.files.length > 0) {
        setFileName(event.target.files[0].name);
      } else {
        setFileName(null);
      }
    };

    return (
      <div className={`relative ${className}`}>
        <div className="flex h-12 w-full items-center justify-between rounded-xl border border-brand-blue-lightActive pl-[7px] pr-6">
          <CustomBody className="text-brand-blue-normal">
            {fileName == null ? label : fileName}
          </CustomBody>
          <ChakraInput
            ref={ref}
            type="file"
            display="none"
            onChange={handleFileChange}
            {...props}
          />
          <Button
            onClick={handleClick}
            borderRadius="8px"
            bg="brand.orange.light"
            _hover={{
              bg: "brand.orange.lightHover"
            }}
            color="brand.orange.normal"
            fontSize="13px"
            fontWeight="bold"
            lineHeight="18.2px"
            height="38px"
            paddingX="24px"
            paddingY="8px"
          >
            آپلود تصویر
          </Button>
        </div>
        <span className="text-xs text-red-500">{error}</span>
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export default FileInput;
