"use client";
import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";
import { convertToJalaliDate } from "@/utils";
import { DocumentDownload } from "iconsax-react";
import { getFileUrl } from "@/utils/media"; // ✅ import اضافه شد

interface UserMessageCardProps {
  content: string;
  createdAt: Date;
  file?: string | null;
}

const UserMessageCard: FC<UserMessageCardProps> = ({
  content,
  createdAt,
  file
}) => {
  return (
    <Box className="flex w-full items-center justify-start">
      <Box className="flex w-[90%] flex-col gap-[10px] rounded-3xl border border-brand-white-normalHover p-6 text-brand-blue-normal lg:w-[60%]">
        <Title level={2} className="text-right">
          {content}
        </Title>
        {file && (
          <a
            href={getFileUrl(file)} // ✅ استفاده از تابع helper
            download
            className="flex items-center gap-2 text-brand-orange-normal"
          >
            <DocumentDownload size={20} />
            <Title level={2}>فایل پیوست</Title>
          </a>
        )}
        <Title level={2} className="text-sm opacity-70">
          {convertToJalaliDate(createdAt)}
        </Title>
      </Box>
    </Box>
  );
};

export default UserMessageCard;