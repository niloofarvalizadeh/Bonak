"use client";
import React, { FC } from "react";
import { getMediaUrl } from "@/utils/media";
import { Avatar, Box } from "@chakra-ui/react";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import Title from "@/components/ui/typography/Title";
import Input from "@/components/ui/elements/Input";
import {
  useGetSellerBrands,
  useGetSellerInfo,
  useGetSellerRating
} from "@/services/queries";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import Textarea from "@/components/ui/elements/Textarea";
import Caption from "@/components/ui/typography/Caption";
import SellerSelectBrandModal from "@/components/modules/Seller/SellerSelectBrandModal";
import BrandCard from "@/components/modules/Seller/BrandCard";
import ChangeProfileImage from "@/components/modules/Seller/ChangeProfileImage";
import Image from "next/image";
import EditProfileModal from "@/components/modules/Seller/EditProfileModal";
import SellerRating from "@/components/modules/Seller/SellerRating";

const SellerDashboardAccountDetailsContainer: FC = () => {
  const { data: sellerAccount, isLoading: sellerAccountIsLoading } =
    useGetSellerInfo();

  const { data: sellerRating, isLoading: sellerRatingIsLoading } =
    useGetSellerRating();
  const { data: brands, isLoading: brandsIsLoading } = useGetSellerBrands();


  console.log({ brands });
  console.log({ sellerAccount, sellerRating });
  return (
    <Box className="flex flex-col">
      <Box className="flex w-full items-center justify-between">
        <DashboardPageTitle>اطلاعات پایه</DashboardPageTitle>
        {/* <Box className="rounded-2xl bg-brand-orange-light px-6 py-2 text-brand-orange-normal">
          <Title level={1} bold>
            مغازه دار
          </Title>
        </Box> */}
      </Box>
      {sellerAccountIsLoading ? (
        <Box className="flex w-full items-center justify-center text-brand-blue-normal">
          <Title level={2}>لطفا منتظر بمانید</Title>
        </Box>
      ) : (
        <>
          <Box className="mt-3 grid grid-cols-1 gap-x-[24px] gap-y-[21px] lg:grid-cols-2">
            <Input
              label="نام و نام خانوادگی"
              isReadOnly
              defaultValue={sellerAccount?.fullName}
            />

            <Input
              label="شماره تماس"
              isReadOnly
              defaultValue={sellerAccount?.phoneNumber}
              textAlign="left"
              dir="ltr"
            />
            <Input
              label="تلفن ارتباطی کاری"
              isReadOnly
              defaultValue={sellerAccount?.workPhoneNumber}
              textAlign="left"
            />
          </Box>
          <Box className="mt-10 flex w-full items-center justify-between">
            <Box className="flex items-center gap-4">
              <Title level={1} className="text-brand-blue-normal">
                وضعیت حساب کاربری
              </Title>
              <Box className="rounded-2xl bg-brand-orange-light px-6 py-2 text-brand-orange-normal">
                <Title level={1} bold>
                  {sellerAccount?.isVerified == "inactive"
                    ? "غیرفعال"
                    : sellerAccount?.isVerified == "verified"
                      ? "تایید شده"
                      : "در انتظار تأیید"}
                </Title>
              </Box>
            </Box>
            <EditProfileModal />
          </Box>
          <Box className="relative mt-11 flex w-full flex-col gap-3 text-brand-blue-normal">
            <CustomHeading level={3} bold>
              اطلاعات فروشگاه
            </CustomHeading>
            <Input
              label="نام فروشگاه"
              isReadOnly
              defaultValue={sellerAccount?.companyName}
            />

            <Textarea
              label="درباره این فروشگاه"
              isReadOnly
              defaultValue={sellerAccount?.description}
            />
            <Box className="flex w-full flex-col gap-2">
              <Title level={1} bold>
                نماینده برندهای
              </Title>
              <Box className="flex flex-wrap items-center gap-2">
                {brandsIsLoading ? "" : 
                  <>
                    {brands?.brands.map( (brand : any) => (
                      <>
                        {console.log("brands:")}
                          <BrandCard
                            key={brand.id}
                            id={brand.id}
                            name={brand.name}
                          />
                      </>
                      )
                    )}
                  </>
                }
                <SellerSelectBrandModal />
              </Box>
            </Box>
            <ChangeProfileImage />
            <Box className="mt-[117px] flex flex-col items-center lg:flex-row lg:gap-20">
              <Box className="relative flex h-[108px] w-[70%] justify-center rounded-xl border border-dashed border-brand-pink text-brand-pink">
                <Box dir="ltr">
                  <Caption className="absolute left-2 top-2">
                    1300 * 180 px
                  </Caption>
                  <Box className="relative flex h-full w-full flex-col items-center justify-center gap-6 bg-brand-bgPink p-2 lg:w-[325px]">
                    <Box dir="ltr">
                      <Caption>540 px</Caption>
                    </Box>
                    <Box dir="ltr" className="absolute left-2">
                      <Caption>180 px</Caption>
                    </Box>
                    <Caption>سایز در کارد نمایش</Caption>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="absolute bottom-0 left-0 !w-[240px] rounded-xl border border-brand-white-normalHover">
              <Box className="h-20 w-full rounded-t-xl">
                <Image
                  src={getMediaUrl(sellerAccount?.bannerImage) || "/fkBanner.png"}
                  alt="banner"
                  className="!h-full !w-full !rounded-t-xl !bg-cover"
                  width={1000}
                  height={0}
                />
              </Box>
              <Box className="relative w-full">
                <Avatar
                  width="64px"
                  height="64px"
                  className="absolute -top-8 right-1/2 z-10 !h-16 !w-16 translate-x-1/2 transform rounded-full border-4 border-white"
                  name="sas"
                  src={getMediaUrl(sellerAccount?.logoImage) || "/fkBanner.png"}
                />
              </Box>
              <Box className="flex flex-col gap-2 rounded-b-xl bg-brand-white-normal px-2 pb-2">
                <Title level={2} bold className="text-brand-blue-normal">
                  فروشگاه {sellerAccount?.companyName}
                </Title>
                <Caption className="text-justify text-brand-blue-lightActive">
                  {sellerAccount?.description}
                </Caption>
                <Box className="flex flex-wrap items-center gap-2">
                  {brandsIsLoading ? null : (
                    <>
                      {brands?.brands?.map(
                        (brand: { id: number; name: string }) => (
                          <Box
                            key={brand.id}
                            className="rounded-full bg-brand-orange-light px-[10px] py-1 text-brand-orange-normalActive"
                          >
                            <Caption>{brand.name}</Caption>
                          </Box>
                        )
                      )}
                    </>
                  )}
                </Box>
                <SellerRating
                  sellerRating={sellerRating}
                  sellerRatingIsLoading={sellerRatingIsLoading}
                />
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SellerDashboardAccountDetailsContainer;
