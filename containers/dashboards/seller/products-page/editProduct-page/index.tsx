"use client";
import React, { FC, useEffect, useState } from "react";
import { getMediaUrl } from "@/utils/media";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  Box,
  Spinner,
  useRadioGroup,
  Checkbox,
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import Image from "next/image";
import Input from "@/components/ui/elements/Input";
import Textarea from "@/components/ui/elements/Textarea";
import Title from "@/components/ui/typography/Title";
import { NewProductFormType, SellerProductType } from "@/types";
import Button from "@/components/ui/elements/Button";
import RadioCard from "@/components/ui/elements/RadioCard";
import { priceOptions, haveShippingCostOptions } from "@/constants/staticData";
import PriceInput from "@/components/ui/elements/PriceInput";
import { CloseCircle } from "iconsax-react";
import { Controller, SubmitErrorHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewProductFromSchema } from "@/schema";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useGetProductDetailForEdit } from "@/services/queries";
import useSWRMutation from "swr/mutation";
import {
  sellerUpdateProductAction,
  sellerUpdateProductPriceAction,
  updateProductPricingAction,
  getCommissionAction
} from "@/services/api";

interface SellerDashboardEditProductContainerProps {
  productId: string;
}

export interface PricingInfo {
  id: number;
  minQuantity: number;
  maxQuantity: number | null;
  price: number;
  discountedPrice: number | null;
  shippingCost?: number;
}

const SellerDashboardEditProductContainer: FC<
    SellerDashboardEditProductContainerProps
> = ({ productId }) => {
  const { data: productDetail, isLoading: productDetailIsLoading } =
      useGetProductDetailForEdit(productId);
  const { push } = useRouter();
  const [selectedProduct, setSelectedProduct] =
      useState<SellerProductType | null>(null);
  const [selectedPriceOption, setSelectedPriceOption] = useState<
      "simple" | "variable"
  >("simple");
  const [haveShippingCost, setHaveShippingCost] = useState<boolean>(false);
  const [isUnlimited, setIsUnlimited] = useState<boolean[]>([]);
  const [commission, setCommission] = useState<number | null>(null);

  const { getRadioProps: priceOptionGetRadioProps } = useRadioGroup({
    name: "priceOption",
    value: selectedPriceOption === "simple" ? "ساده" : "متغیر",
    onChange: (value) => {
      setSelectedPriceOption(value === "ساده" ? "simple" : "variable");
    },
  });

  const { getRadioProps: haveShippingCostGetRadioProps } = useRadioGroup({
    name: "haveShippingCost",
    value: haveShippingCost ? "دارد" : "ندارد",
    onChange: (value) => {
      setHaveShippingCost(value === "دارد");
      if (value === "ندارد") {
        setValue("shippingCost", "");
      }
    },
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
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
    mode: "onChange", // ✅ این خط رو اضافه کن
  });
  
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "features",
  });

  useEffect(() => {
    if (selectedPriceOption === "variable" && fields.length === 0) {
      replace([{ from: 0, to: null, normalPrice: "", discountPrice: "" }]);
      setIsUnlimited([true]);
    } else if (selectedPriceOption === "simple" && fields.length !== 1) {
      replace([
        { from: undefined, to: undefined, normalPrice: "", discountPrice: "" },
      ]);
      setIsUnlimited([]);
    }
  }, [selectedPriceOption, replace, fields.length]);

  useEffect(() => {
    if (selectedPriceOption === "variable") {
      setIsUnlimited(fields.map((_, index) => index === fields.length - 1));
      if (fields.length > 0) {
        setValue(`features.${fields.length - 1}.to`, null);
      }
    }
  }, [fields.length, selectedPriceOption, setValue]);

  useEffect(() => {
    if (productDetail) {
      const { productInfo, sellerProductInfo, pricingInfo } = productDetail;
      setSelectedProduct({
        barcode: productInfo.barcode,
        brandName: productInfo.name,
        compressedImage: productInfo.image,
        name: productInfo.name,
      });
  
      const isFixedPricing = sellerProductInfo.isFixedPricing;
      setSelectedPriceOption(isFixedPricing ? "simple" : "variable");
  
      const hasShippingCost = pricingInfo.some(
        (item: any) => item.shippingCost && item.shippingCost > 0
      );
      setHaveShippingCost(hasShippingCost);
  
      const formData: NewProductFormType = {
        productName: productInfo.name,
        barcode: productInfo.barcode,
        productDescription: sellerProductInfo.description || "",
        availableQuantity: sellerProductInfo.availableCount || 0,
        packageQuantity: sellerProductInfo.itemsPerPackage || 0,
        expirationDate: sellerProductInfo.expirationDate || "",
        minPurchaseQuantity: sellerProductInfo.minCountAmount || 0,
        maxDeliveryTime: sellerProductInfo.maxDeliveryTime || 0,
        shippingCost: hasShippingCost ? String(pricingInfo[0].shippingCost) : "",
        consumerPrice: String(sellerProductInfo.consumerPrice || ""), 
        selectedPriceOption: isFixedPricing ? "simple" : "variable",
        features: isFixedPricing
          ? [
              {
                from: undefined,  // ✅ اینجا باید undefined باشه
                to: undefined,    // ✅ اینجا باید undefined باشه
                normalPrice: String(sellerProductInfo.consumerPrice),
                discountPrice: pricingInfo[0]?.discountedPrice
                  ? String(pricingInfo[0].discountedPrice)
                  : "",
              },
            ]
          : pricingInfo?.map((item: any) => ({
              from: item.minQuantity,
              to: item.maxQuantity ?? null,
              normalPrice: String(item.price),
              discountPrice: item.discountedPrice
                ? String(item.discountedPrice)
                : "",
            })),
      };
  
      setIsUnlimited(pricingInfo?.map((item: any) => item.maxQuantity === null));
      reset(formData);
    }
  }, [productDetail, reset]);

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
    trigger: sellerUpdateProduct,
    isMutating: sellerUpdateProductIsLoading,
  } = useSWRMutation(
      `/product/api/v1/update_seller_product/${productId}/`,
      sellerUpdateProductAction
  );

  const {
    trigger: updateProductPricing,
    isMutating: updateProductPricingIsLoading,
  } = useSWRMutation(
    `/product/api/v1/seller-products-update-pricing/`,
    updateProductPricingAction
  );

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
      // ✅ Yup validation with all errors
      await NewProductFromSchema.validate(data, {
        abortEarly: false,
        context: { featuresLength: data.features.length },
      });
    } catch (validationErrors: any) {
      // ✅ Show all validation errors as toast
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
      expirationDate,
      features,
      maxDeliveryTime,
      minPurchaseQuantity,
      packageQuantity,
      productDescription,
      shippingCost,
      consumerPrice, // ✅ این خط رو اضافه کن
    } = data;
  
    const updatedFeatures = features.map((item) => ({
      ...item,
      normalPrice: String(item.normalPrice.replace(/,/g, "")),
      discountPrice: item.discountPrice
        ? String(item.discountPrice.replace(/,/g, ""))
        : "0",
    }));
  
    const cleanShippingCost = shippingCost?.replace(/,/g, "");
  
    try {
      const res = await sellerUpdateProduct({
        productId: Number(productId),
        availableCount: availableQuantity,
        consumerPrice: Number(consumerPrice.replace(/,/g, "")), // ✅ به Number تبدیل کن
        description: productDescription,
        maxDeliveryTime,
        itemsPerPackage: packageQuantity,
        isFixedPricing: selectedPriceOption === "simple",
        expirationDate,
        minCountAmount: minPurchaseQuantity,
      });
  
      if (res.status === 200 || res.status === 201) {
        // ✅ استفاده از API جدید برای قیمت‌گذاری
        await updateProductPricing({
          seller_product_id: Number(productId),
          is_fixed_price: selectedPriceOption === "simple",
          pricings: updatedFeatures.map(item => ({
            min_quantity: Number(item.from) || 0,
            max_quantity: item.to ? Number(item.to) : null,
            price: Number(item.normalPrice) || 0,
            discounted_price: item.discountPrice ? Number(item.discountPrice) : null,
            shipping_cost: haveShippingCost ? Number(cleanShippingCost) : 0
          }))
        });
        
        toast.success("محصول با موفقیت ویرایش شد");
        push("/account/seller/products");
      }
    } catch (err) {
      console.error(err);
      toast.error("خطا در ویرایش محصول");
    }
  };

  return (
      <Box
          as="form"
           onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="relative flex w-full flex-col gap-11"
      >
        {productDetailIsLoading && (
            <Box className="absolute left-0 top-0 z-[110] flex h-full w-full items-start justify-center bg-white">
              <Spinner color="brand.orange.normal" size="xl" />
            </Box>
        )}
        <Box className="flex w-full flex-col gap-6">
          <DashboardPageTitle>اطلاعات پایه</DashboardPageTitle>
          <Box className="relative flex w-full flex-col items-start gap-10 lg:flex-row">
            <Box className="flex flex-col gap-2">
              <Image
                src={getMediaUrl(selectedProduct?.compressedImage)} // ✅ این خط
                alt="product image"
                width={1000}
                height={0}
                className="size-[180px] bg-gray-100"
              />
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
                  {...register("productDescription")}
                  error={errors.productDescription?.message}
              />
            </Box>
          </Box>
        </Box>
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
                const isSelected = selectedPriceOption === (value === "ساده" ? "simple" : "variable");
                return (
                  <RadioCard 
                    key={value}
                    isChecked={isSelected}
                    onChange={() => setSelectedPriceOption(value === "ساده" ? "simple" : "variable")}
                  >
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
                      {...register("features.0.normalPrice", {
                        required: "قیمت عادی اجباری است",
                      })}
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
                        const lastTo = fields[fields.length - 1]?.to;
                        append({
                          from: lastTo ? Number(lastTo) + 1 : 0,
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
                  {/* نمایش ارور کلی آرایه features */}
                  {errors.features?.message && (
                      <Box color="red.500" fontSize="sm" mb={4}>
                        {errors.features.message}
                      </Box>
                  )}
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
                            {fields.length > 1 && (
                                <Button
                                    bg="none"
                                    padding="0px"
                                    onClick={() => remove(index)}
                                >
                                  <CloseCircle className="text-brand-blue-normalActive" />
                                </Button>
                            )}
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
                                  error={errors.features?.[index]?.from?.message}
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
                                        error={errors.features?.[index]?.to?.message}
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
                                  {...register(`features.${index}.normalPrice`, {
                                    required: "قیمت عادی اجباری است",
                                  })}
                                  value={watch(`features.${index}.normalPrice`)}
                                  error={errors.features?.[index]?.normalPrice?.message}
                                  onValueChange={(values) => {
                                    const { value } = values;
                                    setValue(`features.${index}.normalPrice`, value);
                                  }}
                              />
                              <PriceInput
                                  label="قیمت با تخفیف"
                                  className="!w-full"
                                  value={watch(`features.${index}.discountPrice`)}
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
              const isSelected = haveShippingCost === (value === "دارد");
              return (
                <RadioCard 
                  key={value}
                  isChecked={isSelected}
                  onChange={() => {
                    setHaveShippingCost(value === "دارد");
                    if (value === "ندارد") {
                      setValue("shippingCost", "");
                    }
                  }}
                >
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
                    {...register("shippingCost", {
                      required: haveShippingCost ? "هزینه ارسال اجباری است" : false,
                    })}
                    error={errors.shippingCost?.message}
                    onValueChange={(values) => {
                      const { value } = values;
                      setValue("shippingCost", value);
                    }}
                    value={watch("shippingCost")}
                />
            )}
          </Box>
        </Box>
        <Box className="flex w-full flex-col gap-6">
          <DashboardPageTitle>وضعیت موجودی</DashboardPageTitle>
          <Box className="grid grid-cols-2 gap-x-20">
            <Input
                label="تعداد موجود"
                type="number"
                {...register("availableQuantity", {
                  required: "تعداد موجود اجباری است",
                  valueAsNumber: true,
                })}
                error={errors.availableQuantity?.message}
            />
          </Box>
        </Box>
        <Box className="flex w-full flex-col gap-6">
          <DashboardPageTitle>مشخصات</DashboardPageTitle>
          <Box className="grid grid-cols-1 gap-x-20 gap-y-9 lg:grid-cols-2">
            <Input
                label="تعداد در هر بسته/کارتن"
                type="number"
                {...register("packageQuantity", {
                  required: "تعداد در بسته اجباری است",
                  valueAsNumber: true,
                })}
                error={errors.packageQuantity?.message}
            />
            {/* ✅ این فیلد جدید رو اینجا اضافه کن: */}
            <PriceInput
              label="قیمت مصرف کننده (تومان)"
              {...register("consumerPrice", {
                required: "قیمت مصرف کننده اجباری است",
              })}
              error={errors.consumerPrice?.message}
              onValueChange={(values) => {
                const { value } = values;
                setValue("consumerPrice", value);
              }}
              value={watch("consumerPrice")}
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
                type="number"
                {...register("minPurchaseQuantity", {
                  required: "حداقل تعداد خرید اجباری است",
                  valueAsNumber: true,
                })}
                error={errors.minPurchaseQuantity?.message}
            />
            <Input
                label="حداکثر زمان ارسال"
                type="number"
                {...register("maxDeliveryTime", {
                  required: "حداکثر زمان ارسال اجباری است",
                  valueAsNumber: true,
                })}
                error={errors.maxDeliveryTime?.message}
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
              isLoading={
                updateProductPricingIsLoading || sellerUpdateProductIsLoading
              }
          >
            <Title level={2} bold className="text-brand-white-normal">
              ویرایش
            </Title>
          </Button>
        </Box>
      </Box>
  );
};
export default SellerDashboardEditProductContainer;
