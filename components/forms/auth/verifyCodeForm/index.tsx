"use client";
import React, { FC, useEffect, useState } from "react";
import Title from "@/components/ui/typography/Title";
import Logo from "@/components/ui/typography/Logo";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import CustomBody from "@/components/ui/typography/CustomBody";
import OtpInput from "react-otp-input";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button } from "@chakra-ui/react";
import useSWRMutation from "swr/mutation";
import { verifyOtpCodeAction, sendOtpCodeAction } from "@/services/api";
import toast from "react-hot-toast";
import { createSession } from "@/libs/session";
import { useGetstatus } from "@/services/queries";

const VerifyCodeForm: FC = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const role = searchParams.get("role");
  const phoneNumberFromSlug = searchParams.get("phoneNumber") ?? "";
  const refCode = searchParams.get("referral-code");
  const organizational = searchParams.get("organizational");
  const [otp, setOtp] = useState("");
  const [phonerNumber, setPhoneNumber] = useState("");
  const [limit, setlimit] = useState(0);

  useEffect(() => {
    setPhoneNumber(phoneNumberFromSlug);
  }, [phoneNumberFromSlug]);

  const { data: userstatus, isLoading: getstatusloading } = useGetstatus();

  const { trigger: sendOtpCode, isMutating: sendOtpCodeIsLoading } =
    useSWRMutation("/account/api/v1/send-otp/", sendOtpCodeAction, {
      onSuccess: (res) => {
        const removeExtraSpaceNumber = phonerNumber.split(" ").join("");
        if (res.status == 200) {
          push(
            `/verify-code?phoneNumber=${removeExtraSpaceNumber}&code=${res.data.data.otpCode}&status=si&role=${role}`
          );
          toast.success("کد تایید جدید به شماره تلفن شما ارسال گردید");
        } else {
          toast.error(res.data.message);
        }
      },
      onError: () => {}
    });

  // resend
  const retakesubmitHandler = () => {
    setlimit(() => limit + 1);
    if (limit >= 3) {
      toast.error("امکان ارسال مجدد کد وجود ندارد");
    } else {
      const removeExtraSpaceNumber = phonerNumber.split(" ").join("");
      sendOtpCode({ phoneNumber: removeExtraSpaceNumber });
    }
  };

  const { trigger: verifyOtpCode, isMutating: verifyOtpCodeIsLoading } =
    useSWRMutation("/account/api/v1/verify-otp/", verifyOtpCodeAction, {
      onSuccess: async (res) => {
        if (res.status === 200 || res.status === 201) {
          const data = res?.data?.data ?? {};
          const apiRole = res?.data?.role; // "old_user" | "new_user" (فرض)

          const {
            isActive,
            isVerified,      // "verified" | "pending" | "inactive"
            userType,        // "buyer" | "seller" | "mk"
            phoneNumber,
            accessToken,
            refreshToken
          } = data;

          if (apiRole === "old_user") {
            // فقط وقتی اکتیو + وریفاید باشه → سشن بساز
            if (isActive === true && isVerified === "verified") {
              await createSession({
                isActive,
                phoneNumber,
                userType,
                token: { accessToken, refreshToken }
              });

              toast.success("حساب کاربری شما تایید شده و فعال میباشد");
              if (userType === "buyer") {
                push("/account/buyer/dashboard");
              } else if (userType === "seller") {
                push("/account/seller/dashboard");
              } else if (userType === "mk") {
                push("/mk/dashboard");
              }
            } else if (isActive === true && isVerified === "pending") {
              // ❌ سشن نساز
              toast.error(
                "حساب کاربری شما هنوز فعال نشده است. لطفاً منتظر بمانید تا مدیران حساب شما را فعال کنند."
              );
            } else if (isActive === true && isVerified === "inactive") {
              // ❌ سشن نساز
              toast.error(
                "حساب کاربری شما غیر فعال گردیده . برای اطلاعات بیشتر با پشتیبانی تماس بگیرید"
              );
            } else {
              // ❌ سشن نساز
              toast.error("خطایی رخ داده لطفا بعدا تلاش کنید");
            }
          } else {
            // new_user یا هر چیزی غیر از old_user
            // ✅ طبق خواسته‌ی تو: سشن رو می‌سازیم تا ادامه‌ی ثبت‌نام کار کنه
            await createSession({
              isActive,
              phoneNumber,
              userType,
              token: { accessToken, refreshToken }
            });

            if (organizational === "active") {
              const baseUrl = `/signup/organizational?phoneNumber=${phoneNumberFromSlug}`;
              const refCodeParam = refCode ? `&referral-code=${refCode}` : "";
              push(`${baseUrl}${refCodeParam}`);
            } else if (role === "buyer") {
              const baseUrl = `/signup/buyer?phoneNumber=${phoneNumberFromSlug}`;
              const refCodeParam = refCode ? `&referral-code=${refCode}` : "";
              push(`${baseUrl}${refCodeParam}`);
            } else if (role === "seller") {
              const baseUrl = `/signup/seller?phoneNumber=${phoneNumberFromSlug}`;
              const refCodeParam = refCode ? `&referral-code=${refCode}` : "";
              push(`${baseUrl}${refCodeParam}`);
            } else {
              // فول‌بک امن
              push("/");
            }
          }
        } else {
          toast.error(res.data.message || "خطا در تأیید کد OTP");
        }
      },
      onError: () => {
        toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
      }
    });

  const submitHandler = () => {
    if (!otp || otp.length !== 6) {
      toast.error("لطفاً کد تأیید ۶ رقمی را وارد کنید");
      return;
    }
    verifyOtpCode({
      phoneNumber: phoneNumberFromSlug as string,
      otpCode: otp
    });
  };

  return (
    <>
      <Box className="flex flex-col items-center gap-3">
        <span className="h-[104px] w-[69px]">
          <Logo />
        </span>
        <CustomHeading level={5} className="text-brand-blue-normal" bold>
          {status === "si" ? "ورود" : "ثبت نام"} در بنک سنتر
        </CustomHeading>
      </Box>

      <Box className="w-full">
        <Box className="flex w-full items-center">
          <Box className="w-full px-6 py-2 text-center">
            <Title
              level={1}
              className={` ${role === "buyer" ? "text-brand-blue-normal" : "text-brand-blue-lightActive"}`}
              bold={role === "buyer"}
            >
              خریدار
            </Title>
          </Box>
          <Box className="w-full px-6 py-2 text-center">
            <Title
              level={1}
              className={` ${role === "seller" ? "text-brand-blue-normal" : "text-brand-blue-lightActive"}`}
              bold={role === "seller"}
            >
              پخش کننده
            </Title>
          </Box>
        </Box>
        <Box className="flex w-full items-center">
          <Box
            as="div"
            className={`h-1 w-full rounded ${role === "buyer" ? "bg-brand-orange-normal" : "bg-brand-white-normalHover"}`}
          ></Box>
          <Box
            as="div"
            className={`h-1 w-full rounded ${role === "seller" ? "bg-brand-orange-normal" : "bg-brand-white-normalHover"}`}
          ></Box>
        </Box>
      </Box>

      <Box className="mt-6 flex w-full flex-col gap-3">
        <CustomBody className="text-brand-blue-lightActive">
          کد تأیید را وارد کنید
        </CustomBody>
        <Box as="div" dir="ltr" className="flex w-full items-center justify-between">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            shouldAutoFocus
            containerStyle={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
            inputStyle={{ width: "48px", height: "48px" }}
            renderInput={(props) => (
              <input
                {...props}
                className="rounded-xl border border-brand-blue-lightActive focus:outline-none"
              />
            )}
          />
        </Box>
      </Box>

      {status === "si" ? (
        <Button
          className="!mt-[44px] !h-12 !w-full"
          borderRadius="12px"
          bg="brand.orange.normal"
          _hover={{ bg: "brand.orange.normalHover" }}
          onClick={submitHandler}
          isLoading={verifyOtpCodeIsLoading}
        >
          <Title level={1} bold className="text-brand-white-normal">
            ورود
          </Title>
        </Button>
      ) : (
        <Button
          className="!mt-[44px] !h-12 !w-full"
          borderRadius="12px"
          bg="brand.orange.light"
          _hover={{ bg: "brand.orange.lightHover" }}
          onClick={submitHandler}
          isLoading={verifyOtpCodeIsLoading}
        >
          <Title level={1} bold className="text-brand-orange-normal">
            مرحله بعد
          </Title>
        </Button>
      )}

      <Box as="div" className="absolute bottom-10 flex flex-col items-center gap-6">
        <Title level={2} className="flex flex-row text-brand-orange-normal items-center font-bold">
          کد تایید دریافت نکردید ؟
          <Button
            className="mx-4"
            borderRadius="12px"
            bg="brand.orange.light"
            _hover={{ bg: "brand.orange.lightHover" }}
            onClick={retakesubmitHandler}
            isLoading={sendOtpCodeIsLoading}
          >
            <Title level={2} bold className="text-brand-orange-normal">
              ارسال مجدد
            </Title>
          </Button>
        </Title>
      </Box>
    </>
  );
};

export default VerifyCodeForm;
