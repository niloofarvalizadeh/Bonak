import React, { FC } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { DocumentText } from "iconsax-react";

interface EmptyStateProps {
  message: string;
  actionText?: string;
  onAction?: () => void;
}

/**
 * Displays an empty state with an optional action button.
 * @param message - The message to display
 * @param actionText - Text for the action button (default: "ثبت محصول جدید")
 * @param onAction - Callback function for the action button (optional)
 */
const EmptyState: FC<EmptyStateProps> = ({
  message,
  actionText = "ثبت محصول جدید",
  onAction
}) => {
  return (
    <Box textAlign="center" p={8}>
      <DocumentText
        size="64"
        className="mx-auto mb-4 text-gray-400"
        aria-hidden="true"
      />
      <Text fontSize="lg" color="gray.600" mb={4}>
        {message}
      </Text>
      {onAction && (
        <Button colorScheme="orange" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
