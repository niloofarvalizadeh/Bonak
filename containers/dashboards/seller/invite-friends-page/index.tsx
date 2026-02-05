"use client";
import React, { FC } from "react";

import { Box, Skeleton } from "@chakra-ui/react";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import Title from "@/components/ui/typography/Title";
import CustomBody from "@/components/ui/typography/CustomBody";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import toast from "react-hot-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from "iconsax-react";
import {
  useGetUserReferralCode,
  useGetUserReferralCodeStatus
} from "@/services/queries";
import InviteForm from "@/components/forms/InviteForm";
import QRCode from "react-qr-code";

const SellerDashboardInviteFriendsContainer: FC = () => {
  const { data: refCode, isLoading: refCodeIsLoading } =
    useGetUserReferralCode();

  const { data: refCodeStatus, isLoading: refCodeStatusIsLoading } =
    useGetUserReferralCodeStatus();

  const inviteFriendsText = refCodeIsLoading
    ? "https://www.bonakcenter.com/signup?referral-code="
    : `https://www.bonakcenter.com/signup?referral-code=${refCode?.inviteLink}`;

  return (
    <Box>
      <DashboardPageTitle>دعوت از دوستان</DashboardPageTitle>
      {/* SHOW INVITE REF BOX */}
      <Box className="mt-[50px] flex flex-col items-center gap-4 lg:mt-8 lg:gap-[14px]">
        <Box className="flex w-[80%] items-center justify-center">
          <QRCode value="hey" />
        </Box>
        <Title level={1} className="text-brand-blue-normal lg:hidden">
          لینک دعوت شما
        </Title>
        <CustomHeading
          level={5}
          className="hidden text-brand-blue-normal lg:block"
        >
          لینک دعوت شما
        </CustomHeading>
        <Box className="flex items-center justify-center gap-6 rounded-lg border-2 border-brand-orange-normal p-3">
          <CustomBody className="text-brand-blue-normal lg:hidden">
            {inviteFriendsText}
          </CustomBody>

          <CustomHeading
            level={5}
            className="hidden text-brand-blue-normal lg:block"
          >
            {inviteFriendsText}
          </CustomHeading>
          <CopyToClipboard
            text={inviteFriendsText}
            onCopy={() => toast.success("کپی شد")}
          >
            <Box as="span" aria-label="Copy Button" className="cursor-pointer">
              <Copy
                size="24"
                className="text-brand-blue-normalActive"
                variant="Bold"
              />
            </Box>
          </CopyToClipboard>
        </Box>
      </Box>

      <InviteForm isMarketer={false} />

      <Box className="mt-10 flex w-full flex-col gap-4 lg:mt-[74px]">
        {/* INVITE COUNT */}
        <Box className="flex flex-col items-center gap-3 text-brand-blue-normal">
          <Title level={2} className="lg:hidden">
            تعداد پیامک های دعوت ارسالی در این هفته
          </Title>

          <CustomHeading level={5} className="hidden lg:block">
            تعداد پیامک های دعوت ارسالی در این هفته
          </CustomHeading>

          {refCodeStatusIsLoading ? (
            <>
              <Skeleton width="20px" height="20px" />
            </>
          ) : (
            <>
              <CustomHeading level={5} bold className="lg:hidden">
                {refCodeStatus?.smsSentThisWeek}
              </CustomHeading>
              <CustomHeading level={3} bold className="hidden lg:block">
                {refCodeStatus?.smsSentThisWeek}
              </CustomHeading>
            </>
          )}
        </Box>
        <Box className="flex flex-col items-center gap-3 text-brand-blue-normal">
          <Title level={2} className="lg:hidden">
            مجموع پیامک های دعوت ارسالی
          </Title>

          <CustomHeading level={5} className="hidden lg:block">
            مجموع پیامک های دعوت ارسالی
          </CustomHeading>

          {refCodeStatusIsLoading ? (
            <>
              <Skeleton width="20px" height="20px" />
            </>
          ) : (
            <>
              <CustomHeading level={5} bold className="lg:hidden">
                {refCodeStatus?.totalSmsSent}
              </CustomHeading>
              <CustomHeading level={3} bold className="hidden lg:block">
                {refCodeStatus?.totalSmsSent}
              </CustomHeading>
            </>
          )}
        </Box>
        <Box className="flex flex-col items-center gap-3 text-brand-blue-normal">
          <Title level={2} className="lg:hidden">
            درصد پذیرش دعوت ها توسط کاربران دعوت شده
          </Title>

          <CustomHeading level={5} className="hidden lg:block">
            درصد پذیرش دعوت ها توسط کاربران دعوت شده
          </CustomHeading>

          {refCodeStatusIsLoading ? (
            <>
              <Skeleton width="20px" height="20px" />
            </>
          ) : (
            <>
              <CustomHeading level={5} bold className="lg:hidden">
                {refCodeStatus?.acceptancePercentage}%
              </CustomHeading>
              <CustomHeading level={3} bold className="hidden lg:block">
                {refCodeStatus?.acceptancePercentage}%
              </CustomHeading>
            </>
          )}
        </Box>
        <Box className="flex flex-col items-center gap-3 text-brand-blue-normal">
          <Title level={2} className="lg:hidden">
            تعداد روز های باقی مانده تا امکان ارسال دوباره پیام با تعداد پیش فرض
          </Title>

          <CustomHeading level={5} className="hidden lg:block">
            تعداد روز های باقی مانده تا امکان ارسال دوباره پیام با تعداد پیش فرض
          </CustomHeading>

          {refCodeStatusIsLoading ? (
            <>
              <Skeleton width="20px" height="20px" />
            </>
          ) : (
            <>
              <CustomHeading level={5} bold className="lg:hidden">
                {refCodeStatus?.daysUntilReset} روز
              </CustomHeading>
              <CustomHeading level={3} bold className="hidden lg:block">
                {refCodeStatus?.daysUntilReset} روز
              </CustomHeading>
            </>
          )}
        </Box>
        <Box className="flex flex-col items-center gap-3 text-brand-blue-normal">
          <Title level={2} className="lg:hidden">
            تعداد کاربرانی که دعوت را پذیرفته اند
          </Title>

          <CustomHeading level={5} className="hidden lg:block">
            تعداد کاربرانی که دعوت را پذیرفته اند
          </CustomHeading>

          {refCodeStatusIsLoading ? (
            <>
              <Skeleton width="20px" height="20px" />
            </>
          ) : (
            <>
              <CustomHeading level={5} bold className="lg:hidden">
                {refCodeStatus?.acceptedUsersCount} نفر
              </CustomHeading>
              <CustomHeading level={3} bold className="hidden lg:block">
                {refCodeStatus?.acceptedUsersCount} نفر
              </CustomHeading>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SellerDashboardInviteFriendsContainer;
