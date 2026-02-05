"use client";
import React, { FC, useState } from "react";
import { Box, Spinner, Button, useRadioGroup } from "@chakra-ui/react";
import SelectTicketSectionRadioCard from "@/components/tickets/SelectTicketSectionRadioCard";
import Title from "@/components/ui/typography/Title";
import Select from "@/components/ui/elements/Select";
import { UserRoleType } from "@/types";
import { useGetSellersListForTicket } from "@/services/queries";
import { useRouter } from "next/navigation";

const SelectTicketSectionForm: FC<UserRoleType> = ({ userRole }) => {
  const options = ["پشتیبانی سایت", "پخش کننده"];
  const [ticketSectionValue, setTicketSectionValue] = useState<{
    label: string;
    type: "support" | "seller";
  }>({
    label: "پشتیبانی سایت",
    type: "support"
  });
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const router = useRouter();
  const { getRadioProps } = useRadioGroup({
    name: "ticketSection",
    defaultValue: "پشتیبانی سایت",
    onChange: (section) =>
      setTicketSectionValue({
        label: section,
        type: section === "پشتیبانی سایت" ? "support" : "seller"
      })
  });

  const { data: sellersList, isLoading: sellersListIsLoading } =
    useGetSellersListForTicket(userRole === "buyer" ? true : false);

  const handleSubmit = () => {
    if (ticketSectionValue.type === "seller" && !selectedSellerId) {
      return;
    }
    const url =
      ticketSectionValue.type === "seller"
        ? `/account/${userRole}/tickets/new/${ticketSectionValue.type}?type=bu&id=${selectedSellerId}`
        : `/account/${userRole}/tickets/new/${ticketSectionValue.type}`;
    router.push(url);
  };

  return (
    <Box className="w-full">
      <Box className="mt-4 flex w-full items-center gap-[19px]">
        {options?.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <SelectTicketSectionRadioCard key={value} {...radio}>
              {value}
            </SelectTicketSectionRadioCard>
          );
        })}
      </Box>
      {ticketSectionValue.type === "seller" && (
        <Box className="mt-10 flex w-full flex-col gap-2">
          <Title level={2}>انتخاب پخش کننده</Title>
          {sellersListIsLoading ? (
            <Box className="flex w-full items-center justify-center py-4">
              <Spinner size="lg" color="brand.orange.normal" />
            </Box>
          ) : !sellersList || sellersList.length === 0 ? (
            <Box className="flex w-full items-center justify-center py-4">
              <Title level={2} className="text-brand-blue-normal">
                هیچ پخش‌کننده‌ای یافت نشد
              </Title>
            </Box>
          ) : (
            <Select
              placeholder="پخش کننده"
              onChange={(e) => setSelectedSellerId(e.target.value)}
              value={selectedSellerId || ""}
            >
              {sellersList.map(
                (seller: { companyName: string; id: number }) => (
                  <option key={seller.id} value={seller.id}>
                    {seller.companyName}
                  </option>
                )
              )}
            </Select>
          )}
        </Box>
      )}
      <Box className="mt-40 flex w-full items-center justify-center">
        <Button
          onClick={handleSubmit}
          isDisabled={ticketSectionValue.type === "seller" && !selectedSellerId}
          className="!rounded-xl !bg-brand-orange-normal !px-6 !py-2 !text-white hover:!bg-brand-orange-normalHover"
        >
          <Title level={2}>ارسال تیکت</Title>
        </Button>
      </Box>
    </Box>
  );
};

export default SelectTicketSectionForm;
