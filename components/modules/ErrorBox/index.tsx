import React, { FC } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Flex
} from "@chakra-ui/react";
import { Refresh } from "iconsax-react";

interface ErrorBoxProps {
  message: string;
  description?: string;
  onRetry?: () => void;
  isLoading?: boolean;
}

/**
 * Displays an error message with an optional retry button.
 * @param message - The main error message
 * @param description - Additional details about the error (optional)
 * @param onRetry - Callback function for retry action (optional)
 * @param isLoading - Indicates if the retry action is in progress (default: false)
 */
const ErrorBox: FC<ErrorBoxProps> = ({
  message,
  description,
  onRetry,
  isLoading = false
}) => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      py={8}
      borderRadius="md"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {message}
      </AlertTitle>
      {description && (
        <AlertDescription maxWidth="sm">{description}</AlertDescription>
      )}
      {onRetry && (
        <Flex mt={4}>
          <Button
            leftIcon={<Refresh size="20px" />}
            colorScheme="red"
            variant="outline"
            onClick={onRetry}
            isLoading={isLoading}
            aria-label="تلاش مجدد برای بارگذاری"
          >
            تلاش مجدد
          </Button>
        </Flex>
      )}
    </Alert>
  );
};

export default ErrorBox;
