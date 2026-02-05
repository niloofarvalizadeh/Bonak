import React, { FC, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import Title from "@/components/ui/typography/Title";
import Button from "@/components/ui/elements/Button";
import CustomBody from "@/components/ui/typography/CustomBody";
import Caption from "@/components/ui/typography/Caption";
import { changeProfileImageAction } from "@/services/api";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";

const ChangeProfileImage: FC = () => {
  const profileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);

  const {
    trigger: changeProfileImage,
    isMutating: changeProfileImageIsLoading
  } = useSWRMutation(
    "/account/api/v1/seller_update_logo_banner/",
    changeProfileImageAction,
    {
      onSuccess: (res) => {
        console.log({ res });
        if (res.status === 200) {
          toast.success("تصویر با موفقیت آپلود شد");
          setProfileImage(null);
          setBannerImage(null);
          if (profileInputRef.current) profileInputRef.current.value = "";
          if (bannerInputRef.current) bannerInputRef.current.value = "";
        } else {
          toast.error(res.data.message || "خطا در آپلود تصویر");
        }
      },
      onError: () => {
        toast.error("خطا در ارتباط با سرور");
      }
    }
  );

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBannerImage(e.target.files[0]);
    }
  };

  const onSubmit = () => {
    if (!profileImage && !bannerImage) {
      toast.error("لطفا حداقل یک تصویر انتخاب کنید");
      return;
    }
    changeProfileImage({
      logo: profileImage ?? undefined,
      banner: bannerImage ?? undefined
    });
  };

  return (
    <Box className="mt-[28px] flex w-full flex-col gap-5">
      <Box className="flex flex-col gap-2 text-brand-blue-normalActive">
        <Title level={1} bold>
          تصویر پروفایل
        </Title>
        <input
          type="file"
          accept="image/*"
          ref={profileInputRef}
          onChange={handleProfileImageChange}
          style={{ display: "none" }}
        />
        <Button
          width="261px"
          height="50px"
          className="!flex !items-center !justify-center"
          rounded="30px"
          bg="brand.white.normalHover"
          onClick={() => profileInputRef.current?.click()}
          isLoading={changeProfileImageIsLoading}
        >
          <CustomBody>
            {profileImage ? "تغییر تصویر" : "آپلود تصویر"}
          </CustomBody>
        </Button>
        <Caption className="text-brand-blue-lightActive">512*512 px</Caption>
      </Box>

      <Box className="flex flex-col gap-2 text-brand-blue-normalActive">
        <Title level={1} bold>
          تصویر بنر
        </Title>
        <input
          type="file"
          accept="image/*"
          ref={bannerInputRef}
          onChange={handleBannerImageChange}
          style={{ display: "none" }}
        />
        <Button
          width="261px"
          height="50px"
          className="!flex !items-center !justify-center"
          rounded="30px"
          bg="brand.white.normalHover"
          onClick={() => bannerInputRef.current?.click()}
          isLoading={changeProfileImageIsLoading}
        >
          <CustomBody>{bannerImage ? "تغییر تصویر" : "آپلود تصویر"}</CustomBody>
        </Button>
        <Caption className="text-brand-blue-lightActive">1300*180 px</Caption>
      </Box>

      <Button
        width="261px"
        height="50px"
        className="!flex !items-center !justify-center"
        rounded="30px"
        bg="brand.orange.normal"
        color="white"
        onClick={onSubmit}
        isLoading={changeProfileImageIsLoading}
      >
        <CustomBody>ذخیره تغییرات</CustomBody>
      </Button>
    </Box>
  );
};

export default ChangeProfileImage;
