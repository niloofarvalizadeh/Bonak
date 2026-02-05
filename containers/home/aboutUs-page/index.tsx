"use client";
import React, { FC } from "react";

import { Box } from "@chakra-ui/react";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import { useGetAboutUs, useGetContactInfo } from "@/services/queries";

import Title from "@/components/ui/typography/Title";
import Link from "next/link";
import ContactUsForm from "@/components/forms/contactUs";

type ContactKeys =
  | "phone"
  | "phone2"
  | "email"
  | "address"
  | "postalCode"
  | "telegram"
  | "whatsapp";

const labels: Record<ContactKeys, string> = {
  phone: "شماره تلفن",
  phone2: "شماره تلفن دوم",
  email: "ایمیل",
  address: "آدرس",
  postalCode: "کد پستی",
  telegram: "تلگرام",
  whatsapp: "واتس‌اپ"
};

const AboutUsContainer: FC = () => {
  const { data: aboutUs, isLoading: aboutUsIsLoading } = useGetAboutUs();
  const { data: contactInfo, isLoading: contactInfoIsLoading } =
    useGetContactInfo();

  console.log({ contactInfo });
  return (
    <Box className="flex flex-col items-center gap-4">
      <CustomHeading level={3} className="text-brand-blue-normal" bold>
        درباره ما
      </CustomHeading>
      <CustomHeading level={5}>
        {aboutUsIsLoading ? null : aboutUs.description}
      </CustomHeading>
      <Box className="grid w-[80%] grid-cols-1 gap-4 lg:grid-cols-2">
        {contactInfo &&
          !contactInfoIsLoading &&
          Object.entries(contactInfo)?.map(([key, value]) => {
            if (!value) return null;
            if (key === "whatsapp") {
              return (
                <Title key={key} level={1} bold className="text-center">
                  <Link
                    href={`https://wa.me/${value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-brand-blue-normal">{`${labels[key as ContactKeys]}: `}</span>
                    <span className="text-brand-orange-dark">{`${value}`}</span>
                  </Link>
                </Title>
              );
            }

            if (key === "telegram") {
              return (
                <Title key={key} level={1} bold className="text-center">
                  <Link
                    href={`https://t.me/${value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-brand-blue-normal">{`${labels[key as ContactKeys]}: `}</span>
                    <span className="text-brand-orange-dark">{`${value}`}</span>
                  </Link>
                </Title>
              );
            }

            return (
              <Title key={key} level={1} bold className="text-center">
                <span className="text-brand-blue-normal">{`${labels[key as ContactKeys]}: `}</span>
                <span className="text-brand-orange-dark">{`${value}`}</span>
              </Title>
            );
          })}
      </Box>
      <CustomHeading level={3} className="text-brand-blue-normal" bold>
        تماس با ما
      </CustomHeading>
      <Box className="w-[80%]">
        <ContactUsForm />
      </Box>
    </Box>
  );
};

export default AboutUsContainer;
