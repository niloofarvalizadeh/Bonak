import * as yup from "yup";


export const CompleteSignUpBuyerFormSchema = yup.object({
  firstName: yup.string().required("این فیلد ضروری است"),
  lastName: yup.string().required("این فیلد ضروری است"),
  storeName: yup.string().required("این فیلد ضروری است"),
  businessId: yup.string().required("این فیلد ضروری است"),

  // دقیقاً 10 رقم
  nationalCode: yup
    .string()
    .transform(v => (v || "").replace(/\D/g, ""))
    .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد")
    .required("این فیلد ضروری است"),

  // دقیقاً 11 رقم (بدون اجبار به 09)
  workPhone: yup
    .string()
    .transform(v => (v || "").replace(/\D/g, ""))
    .matches(/^\d{11}$/, "شماره تلفن باید ۱۱ رقم باشد")
    .required("این فیلد ضروری است"),

  wordTime: yup.string().required("این فیلد ضروری است"),

  // اینا Select هستن؛ مقدارشون رشته است
  cityId: yup.string().required("شهر را انتخاب کنید"),
  neighborhoodId: yup.string().required("منطقه را انتخاب کنید"),

  address: yup.string().required("این فیلد ضروری است"),

  // مهم: هیچ rule‌ای برای phoneNumber (نمایشی/disabled) نذار
});


export const CompleteSignUpSellerFormSchema = yup.object().shape({
  fullName: yup.string().required("این فیلد ضروری است"),
  companyName: yup.string().required("این فیلد ضروری است"),
  workPhoneNumber: yup.string().required("این فیلد ضروری است"),
  cityId: yup.string().required("این فیلد ضروری است"),
  address: yup.string().required("این فیلد ضروری است")
});

export const AddNewAddressFormSchema = yup.object().shape({
  firstName: yup.string().required("این فیلد ضروری است"),
  lastName: yup.string().required("این فیلد ضروری است"),
  cityId: yup.string().required("این فیلد ضروری است"),
  neighborhoodId: yup.string().required("این فیلد ضروری است"),
  address: yup.string().required("این فیلد ضروری است")
});

export const AddNewWalletCardFormSchema = yup.object().shape({
  cardNumber: yup.string().required("این فیلد ضروری است"),
  cardHolderName: yup.string().required("این فیلد ضروری است"),
  ibanNumber: yup.string().required("این فیلد ضروری است")
});

export const NewTicketFromSchema = yup.object().shape({
  subject: yup.string().required("موضوع تیکت الزامی است"),
  content: yup.string().required("پیام تیکت الزامی است"),
  file: yup.mixed<File>().optional()
});
export const NewProductFromSchema = yup.object().shape({
  productName: yup.string().required("نام محصول الزامی است"),
  barcode: yup.string().required("بارکد الزامی است"),
  productDescription: yup
      .string()
      .required("توضیحات محصول الزامی است")
      .min(10, "توضیحات محصول باید حداقل 10 کاراکتر باشد"),
  features: yup
      .array()
      .of(
          yup.object().shape({
              from: yup.number().when("selectedPriceOption", {
                  is: (selectedPriceOption: string) =>
                      selectedPriceOption === "variable",
                  then: (schema) =>
                      schema.required("از تعداد الزامی است").min(1, "حداقل 1 الزامی است"),
                  otherwise: (schema) => schema.notRequired(),
              }),
              to: yup
                  .number()
                  .nullable()
                  .when(["selectedPriceOption", "$index", "$featuresLength"], {
                      is: (
                          selectedPriceOption: string,
                          index: number,
                          featuresLength: number
                      ) =>
                          selectedPriceOption === "variable" && index < featuresLength - 1,
                      then: (schema) =>
                          schema
                              .required("تا تعداد الزامی است")
                              .min(1, "حداقل 1 الزامی است")
                              .test(
                                  "greater-than-from",
                                  "تا تعداد باید بیشتر از از تعداد باشد",
                                  function (value) {
                                      const from = this.parent.from;
                                      return value > from;
                                  }
                              ),
                      otherwise: (schema) => schema.nullable(),
                  }),
              normalPrice: yup.string().required("قیمت عادی الزامی است"),
              discountPrice: yup
                  .string()
                  .optional()
                  .test(
                      "discount-less-than-normal",
                      "قیمت با تخفیف نباید بیشتر از قیمت عادی باشد",
                      function (value) {
                          const normal = this.parent.normalPrice.replace(/,/g, "");
                          const discount = value ? value.replace(/,/g, "") : "0";
                          return parseFloat(discount) <= parseFloat(normal);
                      }
                  ),
          })
      )
      .required("ویژگی‌ها الزامی است")
      .min(1, "حداقل یک ویژگی الزامی است")
      .when("selectedPriceOption", {
          is: (selectedPriceOption: string) => selectedPriceOption === "variable",
          then: (schema) =>
              schema
                  .test(
                      "last-to-is-null",
                      "آخرین بازه باید به بی‌نهایت ختم شود",
                      (value) => {
                          if (!value || value.length === 0) return false;
                          return (
                              value[value.length - 1].to === null ||
                              value[value.length - 1].to === undefined
                          );
                      }
                  )
                  .test(
                      "no-overlap",
                      "بازه‌ها نباید تداخل داشته باشند و باید به ترتیب باشند",
                      function (value) {
                          if (!value || value.length <= 1) return true;
                          for (let i = 1; i < value.length; i++) {
                              const prevTo = value[i - 1].to;
                              const currentFrom = value[i].from;

                              if (
                                  prevTo !== null &&
                                  ((currentFrom ?? 0) <= (prevTo ?? 0) ||
                                      (currentFrom ?? 0) !== (prevTo ?? 0) + 1)
                              ) {
                                  return this.createError({
                                      path: `features[${i}].from`,
                                      message: `بازه ${i + 1} با بازه قبلی تداخل دارد یا به ترتیب نیست`,
                                  });
                              }
                          }
                          return true;
                      }
                  )
                  .test(
                      "no-gap",
                      "بین بازه‌ها فاصله وجود دارد",
                      function (value) {
                          if (!value || value.length <= 1) return true;
                          for (let i = 1; i < value.length; i++) {
                              const prevTo = value[i - 1].to;
                              const currentFrom = value[i].from;

                              if (prevTo !== null && prevTo !== undefined && currentFrom !== undefined && currentFrom > prevTo + 1) {

                                  return this.createError({
                                      path: `features[${i}].from`,
                                      message: `بین بازه ${i} و ${i + 1} فاصله وجود دارد`,
                                  });
                              }
                          }
                          return true;
                      }
                  )
                  .test(
                      "min-purchase-gap",
                      "حداقل تعداد خرید باید در اولین بازه قرار گیرد",
                      function (value) {
                          if (!value || value.length === 0) return true;
                          const minPurchaseQuantity = this.parent.minPurchaseQuantity;
                          const firstFrom = value[0]?.from;

                          if (firstFrom !== undefined && minPurchaseQuantity < firstFrom) {
                              return this.createError({
                                  path: "minPurchaseQuantity",
                                  message: "حداقل تعداد خرید باید در اولین بازه قرار گیرد",
                              });
                          }
                          return true;
                      }
                  )
                  // این تست بررسی می‌کند که آیا مقدار `minPurchaseQuantity` از اولین `from` بیشتر است یا خیر
                  .test(
                      "min-purchase-validity",
                      "حداقل تعداد خرید باید کمتر یا مساوی با اولین بازه باشد",
                      function (value) {
                          if (!value || value.length === 0) return true;
                          const minPurchaseQuantity = this.parent.minPurchaseQuantity;
                          const firstFrom = value[0]?.from;

                          if (firstFrom !== undefined && minPurchaseQuantity > firstFrom) {
                              return this.createError({
                                  path: "minPurchaseQuantity",
                                  message: `حداقل تعداد خرید (${minPurchaseQuantity}) باید کمتر از اولین بازه (${firstFrom}) باشد.`,
                              });
                          }
                          return true;
                      }
                  ),
          otherwise: (schema) => schema,
      }),
  availableQuantity: yup.number().required("تعداد موجود الزامی است"),
  packageQuantity: yup.number().required("تعداد در هر بسته/کارتن الزامی است"),
  expirationDate: yup.string().required("تاریخ انقضا الزامی است"),
  minPurchaseQuantity: yup.number().required("حداقل تعداد خرید الزامی است"),
  maxDeliveryTime: yup.number().required("حداکثر زمان ارسال الزامی است"),
  shippingCost: yup.string().optional(),
  consumerPrice: yup.string().required("قیمت مصرف کننده الزامی است"), // ✅ این خط رو اضافه کن
  selectedPriceOption: yup
      .string()
      .oneOf(["simple", "variable"], "نوع قیمت‌گذاری نامعتبر است")
      .required("نوع قیمت‌گذاری الزامی است")
});
export const EditProductFromSchema = yup.object().shape({
  productName: yup.string().required("نام محصول الزامی است"),
  barcode: yup.string().required("بارکد الزامی است"),
  productDescription: yup.string().required("توضیحات محصول الزامی است"),
  features: yup
    .array()
    .of(
      yup.object().shape({
        price: yup.number().when("selectedPriceOption", {
          is: (selectedPriceOption: string) =>
            selectedPriceOption === "variable",
          then: (schema) =>
            schema.required("از تعداد الزامی است").min(1, "حداقل 1 الزامی است"),
          otherwise: (schema) => schema.notRequired()
        }),
        discountedPrice: yup
          .number()
          .nullable()
          .when(["selectedPriceOption", "$index", "$featuresLength"], {
            is: (
              selectedPriceOption: string,
              index: number,
              featuresLength: number
            ) =>
              selectedPriceOption === "variable" && index < featuresLength - 1,
            then: (schema) =>
              schema
                .required("تا تعداد الزامی است")
                .min(1, "حداقل 1 الزامی است"),
            otherwise: (schema) => schema.nullable()
          }),
        normalPrice: yup.string().required("قیمت عادی الزامی است"),
        discountPrice: yup.string().optional()
      })
    )
    .required("ویژگی‌ها الزامی است")
    .min(1, "حداقل یک ویژگی الزامی است")
    .when("selectedPriceOption", {
      is: (selectedPriceOption: string) => selectedPriceOption === "variable",
      then: (schema) =>
        schema.test(
          "last-to-is-null",
          "آخرین بازه باید به بی‌نهایت ختم شود",
          (value) => {
            if (!value || value.length === 0) return false;
            return (
              value[value.length - 1].discountPrice === null ||
              value[value.length - 1].discountPrice === undefined
            );
          }
        ),
      otherwise: (schema) => schema
    }),
  availableQuantity: yup.number().required("تعداد موجود الزامی است"),
  packageQuantity: yup.number().required("تعداد در هر بسته/کارتن الزامی است"),
  expirationDate: yup.string().required("تاریخ انقضا الزامی است"),
  minPurchaseQuantity: yup.number().required("حداقل تعداد خرید الزامی است"),
  maxDeliveryTime: yup.number().required("حداکثر زمان ارسال الزامی است"),
  shippingCost: yup.string().optional(),
  selectedPriceOption: yup
    .string()
    .oneOf(["simple", "variable"], "نوع قیمت‌گذاری نامعتبر است")
    .required("نوع قیمت‌گذاری الزامی است")
});

export const ContactUsFormSchema = yup.object().shape({
  firstName: yup.string().required("این فیلد ضروری است"),
  lastName: yup.string().required("این فیلد ضروری است"),
  phoneNumber: yup.string().required("این فیلد ضروری است"),
  message: yup.string().required("این فیلد ضروری است")
});

export const OrganizationSignUpSchema = yup.object().shape({
  name: yup.string().required("نام شرکت/شخص درخواست‌کننده الزامی است"),
  numberContact: yup
    .string()
    .matches(/^\d{11}$/, "شماره تماس باید 11 رقم باشد")
    .required("شماره تماس الزامی است"),
  typeEntity: yup
    .string()
    .oneOf(["company", "individual"], "نوع شخصیت باید انتخاب شود")
    .required("نوع شخصیت الزامی است"),
  categoryBusiness: yup.string().required("رسته کاری الزامی است"),
  address: yup.string().required("آدرس الزامی است"),
  fieldCollaboration: yup.string().required("زمینه همکاری الزامی است"),
  descriptionRequest: yup.string().nullable().optional()
});
