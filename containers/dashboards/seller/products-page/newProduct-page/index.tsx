"use client";
import React, { FC, useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Caption from "@/components/ui/typography/Caption";
import {
  Box,
  useRadioGroup,
  Checkbox,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import Image from "next/image";
import Input from "@/components/ui/elements/Input";
import Textarea from "@/components/ui/elements/Textarea";
import Title from "@/components/ui/typography/Title";
import SellerSelectProductModal from "@/components/modules/Seller/SellerSelectProductModal";
import { NewProductFormType, SellerProductType } from "@/types";
import Button from "@/components/ui/elements/Button";
import RadioCard from "@/components/ui/elements/RadioCard";
import { priceOptions, haveShippingCostOptions } from "@/constants/staticData";
import PriceInput from "@/components/ui/elements/PriceInput";
import { CloseCircle } from "iconsax-react";
import { Controller, SubmitErrorHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewProductFromSchema } from "@/schema";
import useSWRMutation from "swr/mutation";
import {
  sellerCreateProductAction,
  sellerCreateProductPriceAction,
  getCommissionAction,
} from "@/services/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getMediaUrl } from "@/utils/media";


const SellerDashboardNewProductContainer: FC = () => {
    const { push } = useRouter();
    const [selectedProduct, setSelectedProduct] = useState<SellerProductType | null>(null);
    const [selectedPriceOption, setSelectedPriceOption] = useState<"simple" | "variable">("simple");
    const [haveShippingCost, setHaveShippingCost] = useState<boolean>(false);
    const [isUnlimited, setIsUnlimited] = useState<boolean[]>([]);
    const [commission, setCommission] = useState<number | null>(null);

    const { getRadioProps: priceOptionGetRadioProps } = useRadioGroup({
        name: "priceOption",
        defaultValue: "ساده",
        onChange: (value) => {
            setSelectedPriceOption(value === "ساده" ? "simple" : "variable");
        },
    });

    const { getRadioProps: haveShippingCostGetRadioProps } = useRadioGroup({
        name: "haveShippingCost",
        defaultValue: "ندارد",
        onChange: (value) => {
            setHaveShippingCost(value === "دارد");
        },
    });

    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors, isValid }, // دسترسی به isValid
    } = useForm<NewProductFormType>({
        resolver: yupResolver(NewProductFromSchema),
        defaultValues: {
            features: [
                { from: undefined, to: undefined, normalPrice: "", discountPrice: "" },
            ],
            availableQuantity: 0,
            packageQuantity: 0,
            expirationDate: "",
            minPurchaseQuantity: 0,
            maxDeliveryTime: 0,
            productName: "",
            barcode: "",
            productDescription: "",
            shippingCost: "",
            consumerPrice: "",
            selectedPriceOption: "simple",
        },
        mode: "onChange", // فعال‌سازی اعتبارسنجی در زمان تغییر
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "features",
    });

    useEffect(() => {
        setValue("selectedPriceOption", selectedPriceOption);
    }, [selectedPriceOption, setValue]);

    useEffect(() => {
        if (selectedPriceOption === "variable") {
            setValue("features", [
                { from: 0, to: null, normalPrice: "", discountPrice: "" },
            ]);
            setIsUnlimited([true]);
        } else {
            setValue("features", [
                { from: undefined, to: undefined, normalPrice: "", discountPrice: "" },
            ]);
            setIsUnlimited([]);
        }
    }, [selectedPriceOption, setValue]);

    // تنظیم خودکار isUnlimited برای اطمینان از اینکه آخرین ویژگی همیشه "تا بی‌نهایت" است
    useEffect(() => {
        if (selectedPriceOption === "variable") {
            setIsUnlimited(fields.map((_, index) => index === fields.length - 1));
            // تنظیم to به null برای آخرین ویژگی
            if (fields.length > 0) {
                setValue(`features.${fields.length - 1}.to`, null);
            }
        }
    }, [fields.length, selectedPriceOption, setValue]);
    
    useEffect(() => {
        const fetchCommission = async () => {
            try {
                const res = await getCommissionAction();
                if (res.status === 200) {
                    setCommission(res.data.commission);
                } else {
                    console.error("Failed to fetch commission:", res.data);
                }
            } catch (error) {
                console.error("Error fetching commission:", error);
            }
        };

        fetchCommission();
    }, []);    

    const {
        trigger: sellerCreateProduct,
        isMutating: sellerCreateProductIsLoading,
    } = useSWRMutation("/product/api/v1/create_seller_product/", sellerCreateProductAction);

    const {
        trigger: sellerCreateProductPrice,
        isMutating: sellerCreateProductPriceIsLoading,
    } = useSWRMutation("/product/api/v1/create_seller_product_price/", sellerCreateProductPriceAction);

   const onInvalid: SubmitErrorHandler<NewProductFormType> = (formErrors) => {
  const messages: string[] = [];

  const walk = (errObj: any) => {
    if (!errObj || typeof errObj !== "object") return;

    for (const v of Object.values(errObj) as any[]) {
      if (!v) continue;

      // ✅ leaf error with message
      if (typeof v.message === "string") {
        messages.push(v.message);
      }

      // skip react-hook-form internals
      if (v.types || v.ref) {
        continue;
      }

      if (typeof v === "object") {
        walk(v);
      }
    }
  };

  walk(formErrors);

  if (messages.length === 0) {
    toast.error("لطفاً خطاهای فرم را برطرف کنید.");
    return;
  }

  // show all messages
  messages.forEach((m) => toast.error(m));
};

   const onSubmit = async (data: NewProductFormType) => {
  try {
    // 🟢 Yup validation with all errors
    await NewProductFromSchema.validate(data, {
      abortEarly: false,
      context: { featuresLength: data.features.length },
    });
  } catch (validationErrors: any) {
  if (validationErrors.inner && validationErrors.inner.length > 0) {
    validationErrors.inner.forEach((error: any) => {
      toast.error(error.message ?? " ");
    });
  } else {
    toast.error(validationErrors.message ?? " ");
  }
  return;
  }

  const {
    availableQuantity,
    barcode,
    expirationDate,
    features,
    maxDeliveryTime,
    minPurchaseQuantity,
    packageQuantity,
    productDescription,
    shippingCost,
  } = data;

  const cleanExpirationDate = expirationDate
    ? new Date(expirationDate).toISOString().split("T")[0] // → "YYYY-MM-DD"
    : null;

  if (
    selectedPriceOption === "variable" &&
    features[features.length - 1].to !== null &&
    features[features.length - 1].to !== undefined
  ) {
    toast.error("آخرین بازه قیمت‌گذاری باید به بی‌نهایت ختم شود.");
    return;
  }

  const updatedFeatures = features.map((item) => ({
    ...item,
    normalPrice: String(item.normalPrice.replace(/,/g, "")),
    discountPrice: item.discountPrice
      ? String(item.discountPrice.replace(/,/g, ""))
      : "0",
  }));

  const cleanShippingCost = shippingCost?.replace(/,/g, "");

  try {
    const res = await sellerCreateProduct({
      availableCount: availableQuantity,
      consumerPrice: updatedFeatures[0].normalPrice,
      description: productDescription,
      maxDeliveryTime,
      itemsPerPackage: packageQuantity,
      isFixedPricing: selectedPriceOption === "simple",
      expirationDate: cleanExpirationDate || "",
      minCountAmount: minPurchaseQuantity,
      desiredProduct: barcode,
      paymentMethods: "cash",
    });

    if (res.status === 200 || res.status === 201) {
      const productId = res.data.id;
      if (selectedPriceOption === "simple") {
        await sellerCreateProductPrice({
          sellerProductId: productId,
          price: Number(updatedFeatures[0].normalPrice),
          discountedPrice: updatedFeatures[0].discountPrice
            ? Number(updatedFeatures[0].discountPrice)
            : 0,
          shippingCost: haveShippingCost ? Number(cleanShippingCost) : 0,
        });
        toast.success("محصول شما با موفقیت اضافه شد");
        push("/account/seller/products");
      } else {
        await Promise.all(
          updatedFeatures?.map((item, index) =>
            sellerCreateProductPrice({
              sellerProductId: productId,
              minQuantity: Number(item.from),
              maxQuantity: isUnlimited[index] ? null : Number(item.to),
              price: Number(item.normalPrice),
              discountedPrice: item.discountPrice
                ? Number(item.discountPrice)
                : 0,
              shippingCost: haveShippingCost ? Number(cleanShippingCost) : 0,
            })
          )
        );
        toast.success("محصول شما با موفقیت اضافه شد");
        push("/account/seller/products");
      }
    }
  } catch (err) {
    console.error(err);
    toast.error("خطا در ایجاد محصول");
  }
};

    return (
        <Box
            as="form"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className="flex w-full flex-col gap-11"
        >            
            <Box className="flex w-full flex-col gap-6">
                <DashboardPageTitle>اطلاعات پایه</DashboardPageTitle>
                <Box className="relative flex w-full flex-col items-start gap-10 lg:flex-row">
                    {selectedProduct ? null : (
                        <Box
                            className="newProductBaseInfoBlr absolute -top-4 left-0 z-[100] flex h-[110%] w-full flex-col items-center justify-center gap-2"
                        >
                            <Title level={1} bold>
                                لطفا محصول خود را انتخاب کنید
                            </Title>
                            <SellerSelectProductModal
                                setSelectedProduct={setSelectedProduct}
                                setValue={setValue}
                            />
                        </Box>
                    )}
                    <Box className="flex flex-col gap-2">
                    <Image
                    src={getMediaUrl(selectedProduct?.compressedImage)} // ✅ این خط
                    alt="product image"
                    width={1000}
                    height={0}
                    className="size-[180px] bg-gray-100"
                    />
                        <Button
                            onClick={() => setSelectedProduct(null)}
                            rounded="12px"
                            height="44px"
                            bg="brand.white.normalHover"
                        >
                            <Title level={1}>تغییر محصول</Title>
                        </Button>
                    </Box>
                    <Box className="flex w-full flex-col gap-6">
                        <Input
                            isReadOnly
                            label="نام محصول"
                            cursor="not-allowed"
                            {...register("productName", { required: true })}
                        />
                        <Input
                            isReadOnly
                            label="بارکد"
                            cursor="not-allowed"
                            {...register("barcode", { required: true })}
                        />
                        <Textarea
                            label="توضیحات محصول"
                            textAreaClassName="!h-36"
                            {...register("productDescription", { required: "توضیحات محصول اجباری است" })}
                            error={errors.productDescription?.message}
                        />
                    </Box>
                </Box>
            </Box>
            {/* ✅ این بخش رو اضافه کن برای نمایش کمیسیون */}
            {commission !== null && (
                <Box className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <Title level={2} className="text-orange-700 text-center">
                        کارمزد فروش این محصول در بنک سنتر {commission} درصد مبلغ فاکتور می‌باشد
                    </Title>
                </Box>
            )}

            <Box className="flex w-full flex-col gap-6">
                <Box className="flex items-center gap-10">
                    <DashboardPageTitle>قیمت</DashboardPageTitle>
                    <Box className="flex items-center gap-10">
                        {priceOptions?.map((value) => {
                            const radio = priceOptionGetRadioProps({ value });
                            return (
                                <RadioCard key={value} {...radio}>
                                    {value}
                                </RadioCard>
                            );
                        })}
                    </Box>
                </Box>
                <Box>
                    {selectedPriceOption === "simple" ? (
                        <Box className="flex w-full items-center justify-between gap-2 lg:gap-20">
                            <PriceInput
                                label="قیمت عادی (تومان)"
                                className="!w-full"
                                {...register("features.0.normalPrice")}
                                error={errors.features?.[0]?.normalPrice?.message}
                                onValueChange={(values) => {
                                    const { value } = values;
                                    setValue("features.0.normalPrice", value);
                                }}
                            />
                            <PriceInput
                                label="قیمت با تخفیف"
                                className="!w-full"
                                {...register("features.0.discountPrice")}
                                error={errors.features?.[0]?.discountPrice?.message}
                                onValueChange={(values) => {
                                    const { value } = values;
                                    setValue("features.0.discountPrice", value);
                                }}
                            />
                        </Box>
                    ) : (
                        <Box className="flex w-full flex-col gap-6">
                            <Button
                                px="24px"
                                py="8px"
                                height="50px"
                                width="167px"
                                rounded="12px"
                                bg="brand.white.normalHover"
                                onClick={(e) => {
                                    e.preventDefault();
                                    append({
                                        from: 0,
                                        to: null,
                                        normalPrice: "",
                                        discountPrice: "",
                                    });
                                }}
                            >
                                <Title className="text-brand-blue-normal" level={2} bold>
                                    افزودن ویژگی
                                </Title>
                            </Button>
                            <Box className="flex w-full flex-col">
                                {fields?.map((field, index) => (
                                    <Box
                                        key={field.id}
                                        className="flex w-full flex-col gap-6 border-b py-6"
                                    >
                                        <Box className="flex w-full items-center justify-between">
                                            <Title level={1} bold className="text-brand-blue-normal">
                                                ویژگی {index + 1}
                                            </Title>
                                            <Button bg="none" padding="0px" onClick={() => remove(index)}>
                                                <CloseCircle className="text-brand-blue-normalActive" />
                                            </Button>
                                        </Box>
                                        <Box className="flex flex-col items-center gap-y-9 text-brand-blue-normal lg:flex-row lg:gap-y-0">
                                            <Box className="flex w-full items-center gap-4 lg:w-[40%]">
                                                <Title level={1}>از تعداد</Title>
                                                <Input
                                                    width="96px"
                                                    height="48px"
                                                    {...register(`features.${index}.from`, {
                                                        required: "مقدار اجباری است",
                                                        valueAsNumber: true,
                                                    })}
                                                    error={errors.features?.[index]?.from?.message?.includes( "must" ) ? "عدد وارد نمایید": errors.features?.[index]?.to?.message}
                                                    type="number"
                                                    inputMode="numeric"
                                                />
                                                {index !== fields.length - 1 && (
                                                    <>
                                                        <Title level={1}>تا تعداد</Title>
                                                        <Input
                                                            width="96px"
                                                            height="48px"
                                                            {...register(`features.${index}.to`, {
                                                                required: "مقدار اجباری است",
                                                                valueAsNumber: true,
                                                            })}
                                                            error={errors.features?.[index]?.to?.message?.includes( "must" ) ? "عدد وارد نمایید": errors.features?.[index]?.to?.message}
                                                            type="number"
                                                            inputMode="numeric"
                                                        />
                                                    </>
                                                )}
                                                {index === fields.length - 1 && (
                                                    <Title level={1}>تا بی‌نهایت</Title>
                                                )}
                                            </Box>
                                            <Box className="flex w-full items-center gap-2 lg:w-[60%] lg:gap-10">
                                                <PriceInput
                                                    label="قیمت عادی (تومان)"
                                                    className="!w-full"
                                                    {...register(`features.${index}.normalPrice`)}
                                                    error={errors.features?.[index]?.normalPrice?.message}
                                                    onValueChange={(values) => {
                                                        const { value } = values;
                                                        setValue(`features.${index}.normalPrice`, value);
                                                    }}
                                                />
                                                <PriceInput
                                                    label="قیمت با تخفیف"
                                                    className="!w-full"
                                                    {...register(`features.${index}.discountPrice`)}
                                                    error={errors.features?.[index]?.discountPrice?.message}
                                                    onValueChange={(values) => {
                                                        const { value } = values;
                                                        setValue(`features.${index}.discountPrice`, value);
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box className="flex w-full flex-col gap-6">
                <Box className="flex items-center gap-10">
                    <DashboardPageTitle>هزینه ارسال</DashboardPageTitle>
                    <Box className="flex items-center gap-10">
                        {haveShippingCostOptions?.map((value) => {
                            const radio = haveShippingCostGetRadioProps({ value });
                            return (
                                <RadioCard key={value} {...radio}>
                                    {value}
                                </RadioCard>
                            );
                        })}
                    </Box>
                </Box>
                <Box className="lg:grid lg:grid-cols-2 lg:gap-x-20">
                    {haveShippingCost && (
                        <PriceInput
                            label="هزینه ارسال"
                            className="!w-full"
                            {...register("shippingCost")}
                            error={errors.shippingCost?.message}
                            onValueChange={(values) => {
                                const { floatValue } = values;
                                setValue("shippingCost", String(floatValue));
                            }}
                        />
                    )}
                </Box>
            </Box>
            <Box className="flex w-full flex-col gap-6">
                <DashboardPageTitle>وضعیت موجودی</DashboardPageTitle>
                <Box className="grid grid-cols-2 gap-x-20">
                    <Input
                        label="تعداد موجود( بسته / کارتن)"
                        {...register("availableQuantity", { required: true })}
                        error={errors.availableQuantity?.message?.includes( "must" ) ? "عدد وارد نمایید": errors.availableQuantity?.message}
                    />
                </Box>
            </Box>
            <Box className="flex w-full flex-col gap-6">
                <DashboardPageTitle>مشخصات</DashboardPageTitle>
                <Box className="grid grid-cols-1 gap-x-20 gap-y-9 lg:grid-cols-2">
                    <Input
                        label="تعداد در هر بسته/کارتن"
                        {...register("packageQuantity", { required: true })}
                        error={errors.packageQuantity?.message?.includes( "must" ) ? "عدد وارد نمایید": errors.packageQuantity?.message}
                    />
                    {/* ✅ این فیلد جدید رو اینجا اضافه کن: */}
                    <PriceInput
                        label="قیمت مصرف کننده (تومان)"
                        {...register("consumerPrice", { required: true })}
                        error={errors.consumerPrice?.message}
                        onValueChange={(values) => {
                        const { value } = values;
                        setValue("consumerPrice", value);
                        }}
                    />
                    
                    <Controller
                        control={control}
                        name="expirationDate"
                        render={({ field }) => (
                        <Box className=" relative flex flex-col gap-2 ">
                            <FormLabel fontSize="14px" fontWeight="500" className="bg-white px-2 absolute right-4 top-[-8px] text-xs text-brand-blue-lightHover pointer-events-none z-10">
                                تاریخ انقضا
                            </FormLabel>
                            <DatePicker
                                {...field}
                                calendar={persian}
                                locale={persian_fa}
                                style={{
                                height: "48px",
                                width: "100%",
                                borderRadius: "12px",
                                border: "1px solid",
                                padding: "0 12px",
                                fontSize: "14px",
                                borderColor:" #909dad"
                                }}
                                containerStyle={{ width: "100%" }}
                                value={field.value || ""}
                                onChange={(date: any) => {
                                field.onChange(date?.toDate?.()?.toISOString?.() || "");
                                }}
                                ref={undefined}
                            />
                            {errors.expirationDate && (
                                <span className="text-red-500 text-sm">
                                {errors.expirationDate.message}
                                </span>
                            )}
                            </Box>
                        )}
                        />
                    <Input
                        label="حداقل تعداد خرید"
                        {...register("minPurchaseQuantity", { required: true })}
                        error={errors.minPurchaseQuantity?.message?.includes( "must" ) ? "عدد وارد نمایید":errors.minPurchaseQuantity?.message}
                    />
                    <Input
                        label="حداکثر زمان ارسال (روز)"
                        {...register("maxDeliveryTime", { required: true })}
                        error={errors.maxDeliveryTime?.message?.includes( "must" ) ? "عدد وارد نمایید":errors.maxDeliveryTime?.message}
                    />
                </Box>
            </Box>
     
            <Box className="flex w-full items-center justify-end">
                <Button
                    className="!mt-[44px] !h-11 !w-[134px] lg:!mt-[68px]"
                    borderRadius="12px"
                    bg="brand.orange.normal"
                    _hover={{ bg: "brand.orange.normalHover" }}
                    type="submit"
                    isLoading={sellerCreateProductPriceIsLoading || sellerCreateProductIsLoading}
                >
                    <Title level={2} bold className="text-brand-white-normal">
                        ایجاد
                    </Title>
                </Button>
            </Box>
        </Box>
    );
};

export default SellerDashboardNewProductContainer;