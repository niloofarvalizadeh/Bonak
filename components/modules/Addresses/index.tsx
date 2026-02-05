"use client";
import React, { FC } from "react";

import { AddressDetailType, UserRoleType } from "@/types";
import { Box } from "@chakra-ui/react";
import { useGetAddresses } from "@/services/queries";
import AddNewAddressModal from "./AddNewAddressModal";
import EditOrDeleteAddressModal from "./EditOrDeleteAddressModal";

const AddressesBox: FC<UserRoleType> = () => {
  const { data: addresses, isLoading: addressesIsLoading } = useGetAddresses();

  console.log({ addresses });
  return (
    <Box className="mt-[15px]">
      <Box className="flex w-full flex-col gap-6">
        {addressesIsLoading
          ? null
          : addresses?.map((item: AddressDetailType) => (
              <EditOrDeleteAddressModal
                key={item.id}
                address={item.address}
                city={item.city}
                id={item.id}
                region={item.region}
              />
            ))}
      </Box>
      <AddNewAddressModal />
    </Box>
  );
};

export default AddressesBox;
