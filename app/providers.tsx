"use client";
import { ChakraProvider } from "@chakra-ui/react";
import chakraTheme from "@/themes/chkaraTheme";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig>
      <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>
      <Toaster />
    </SWRConfig>
  );
}
