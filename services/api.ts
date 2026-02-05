import { AxiosError, AxiosResponse, isAxiosError } from "axios";

import { axiosInstanceWithoutToken, axiosInstanceWithToken } from "./fetcher";

import snakecaseKeys from "snakecase-keys";

//* Authenticator Actions
export const sendOtpCodeAction = async (
  url: string,
  { arg }: { arg: { phoneNumber: string } }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithoutToken.post(url, {
      phone_number: arg.phoneNumber
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const verifyOtpCodeAction = async (
  url: string,
  { arg }: { arg: { phoneNumber: string; otpCode: string } }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithoutToken.post(url, {
      phone_number: arg.phoneNumber,
      otp_code: arg.otpCode
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const completeInformationSignUpBuyerAction = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      firstName: string;
      lastName: string;
      shopName: string;
      tradeID: string;
      nationalCode: string;
      workPhoneNumber: string;
      wordTime: string;
      user: string | undefined;
      neighborhoodId: string;
      address: string;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const payload = {
      first_name: arg.firstName,
      last_name: arg.lastName,
      shop_name: arg.shopName,
      Trade_ID: arg.tradeID,
      national_code: arg.nationalCode,
      work_phone_number: arg.workPhoneNumber,
      word_time: arg.wordTime,
      user: arg.user,
      neighborhood: arg.neighborhoodId,
      address: arg.address,
    };

    const response: AxiosResponse = await axiosInstanceWithToken.post(
      url,
      payload
    );

    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      return (err as AxiosError).response as AxiosResponse;
    }
    throw err;
  }
};

export const completeInformationSignUpSellerAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      fullName: string;
      companyName: string;
      address: string;
      workPhoneNumber: string;
      user: string | undefined;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
      full_name: arg.fullName,
      company_name: arg.companyName,
      work_phone_number: arg.workPhoneNumber,
      address: arg.address,
      user: arg.user
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const createNewTicketAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      subject: string;
      content: string;
      file?: File;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(
      url,
      {
        ...arg
      },
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};
export const createNewSellerTicketAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      subject: string;
      content: string;
      seller: string;
      file?: File;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(
      url,
      {
        ...arg
      },
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const snedNewMesseageInTicketAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      content: string;
      file?: File;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(
      url,
      {
        ...arg
      },
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const deleteDataWithTokenAction = async (
  url: string
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.delete(url);
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const manageAddressAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      firstName: string;
      lastName: string;
      cityId: string;
      neighborhoodId: string;
      address: string;
      type: "edit" | "add";
    };
  }
): Promise<AxiosResponse> => {
  try {
    if (arg.type === "add") {
      const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
        recipient_first_name: arg.firstName,
        recipient_last_name: arg.lastName,
        region: arg.neighborhoodId,
        city: arg.cityId,
        address: arg.address
      });
      return response;
    } else if (arg.type === "edit") {
      const response: AxiosResponse = await axiosInstanceWithToken.put(url, {
        recipient_first_name: arg.firstName,
        recipient_last_name: arg.lastName,
        region: arg.neighborhoodId,
        city: arg.cityId,
        address: arg.address
      });
      return response;
    } else {
      throw new Error("Invalid action type");
    }
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const manageWalletCardAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      cardNumber: string;
      cardHolderName: string;
      ibanNumber: string;
      type: "edit" | "add";
    };
  }
): Promise<AxiosResponse> => {
  try {
    if (arg.type === "add") {
      const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
        card_number: arg.cardNumber,
        cardholder_name: arg.cardHolderName,
        iban_number: arg.ibanNumber
      });
      return response;
    } else if (arg.type === "edit") {
      const response: AxiosResponse = await axiosInstanceWithToken.put(url, {
        card_number: arg.cardNumber,
        cardholder_name: arg.cardHolderName,
        iban_number: arg.ibanNumber
      });
      return response;
    } else {
      throw new Error("Invalid action type");
    }
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const sellerCreateProductAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      desiredProduct: string;
      minCountAmount: number;
      paymentMethods: string;
      itemsPerPackage: number;
      maxDeliveryTime: number;
      description: string;
      availableCount: number;
      expirationDate: string;
      isFixedPricing: boolean;
      consumerPrice: string;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
      desired_product: arg.desiredProduct,
      min_count_amount: arg.minCountAmount,
      payment_methods: arg.paymentMethods,
      items_per_package: arg.itemsPerPackage,
      max_delivery_time: arg.maxDeliveryTime,
      description: arg.description,
      available_count: arg.availableCount,
      expiration_date: arg.expirationDate,
      is_fixed_pricing: arg.isFixedPricing,
      consumer_price: arg.consumerPrice
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const sellerCreateProductPriceAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      sellerProductId?: number;
      minQuantity?: number;
      maxQuantity?: number | null;
      price?: number;
      discountedPrice?: number;
      shippingCost?: number;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const snakeCaseArg = snakecaseKeys(arg);
    const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
      ...snakeCaseArg
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const sellerUpdateProductAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      productId: number;
      minCountAmount?: number;
      itemsPerPackage?: number;
      maxDeliveryTime?: number;
      description?: string;
      availableCount?: number;
      expirationDate?: string;
      isFixedPricing?: boolean;
      consumerPrice?: number;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const snakeCaseArg = snakecaseKeys(arg);
    const response: AxiosResponse = await axiosInstanceWithToken.put(url, {
      ...snakeCaseArg
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const sellerUpdateProductPriceAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      productId?: number;
      minQuantity?: number;
      maxQuantity?: number | null;
      price?: number;
      discountedPrice?: number;
      shippingCost?: number;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const snakeCaseArg = snakecaseKeys(arg);
    const response: AxiosResponse = await axiosInstanceWithToken.patch(
      `${url}/${arg.productId}/`,
      {
        ...snakeCaseArg
      }
    );
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const createNewCommentAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      sellerProductId: string;
      rating: number;
      comment: string;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
      seller_product_id: arg.sellerProductId,
      rating: arg.rating,
      comment: arg.comment
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const returnOrderAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      trackingCode: string;
      reason: string;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
      reason: arg.reason,
      tracking_code: arg.trackingCode
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const addProductToCartAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      sellerProductId: string;
      quantity: number;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
      seller_product_id: arg.sellerProductId,
      quantity: arg.quantity
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const toggleFavoriteProductAction = async (
  url: string
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(url);
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const sendInviteCodeAction = async (
  url: string,
  { arg }: { arg: { phoneNumber: string } }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
      phone_number: arg.phoneNumber
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const contactFormAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      message: string;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithoutToken.post(url, {
      first_name: arg.firstName,
      last_name: arg.lastName,
      phone_number: arg.phoneNumber,
      message: arg.message
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const increaseWalletBalanceAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      amount: string;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
      amount: arg.amount
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const withdrawalRequestAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      amount: string;
      note: string;
      cardId: number;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
      amount: arg.amount,
      notes: arg.note,
      bank_card: arg.cardId
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const getUserInvitedDataAction = async (
  url: string,
  { arg }: { arg: { userId: string | number } }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
      user_id: arg.userId
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const addNewBrandAction = async (
  url: string,
  { arg }: { arg: { brandId: number } }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
      brand_id: arg.brandId
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const organizationSignUpAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      name: string;
      numberContact: string;
      typeEntity: "company" | "individual";
      categoryBusiness: string;
      address: string;
      fieldCollaboration: string;
      descriptionRequest: string;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithoutToken.post(url, {
      name: arg.name,
      contact_number: arg.numberContact,
      entity_type: arg.typeEntity,
      business_category: arg.categoryBusiness,
      address: arg.address,
      collaboration_field: arg.fieldCollaboration,
      request_description: arg.descriptionRequest
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const deleteBrandAction = async (
  url: string,
  { arg }: { arg: { brandId: number } }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.delete(url, {
      data: { brand_id: arg.brandId }
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const changeProfileImageAction = async (
  url: string,
  { arg }: { arg: { logo?: File; banner?: File } }
): Promise<AxiosResponse> => {
  try {
    const formData = new FormData();

    if (arg.logo && arg.banner) {
      formData.append("logo_image", arg.logo);
      formData.append("banner_image", arg.banner);
    } else if (arg.logo && !arg.banner) {
      formData.append("logo_image", arg.logo);
    } else if (!arg.logo && arg.banner) {
      formData.append("banner_image", arg.banner);
    }

    const response: AxiosResponse = await axiosInstanceWithToken.put(
      url,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const editSellerProfileAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      fullName?: string;
      companyName?: string;
      address?: string;
      workPhoneNumber?: string;
      description?: string;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const payload: Record<string, string> = {};
    if (arg.fullName) payload.full_name = arg.fullName;
    if (arg.companyName) payload.company_name = arg.companyName;
    if (arg.address) payload.address = arg.address;
    if (arg.workPhoneNumber) payload.work_phone_number = arg.workPhoneNumber;
    if (arg.description) payload.description = arg.description;

    const response: AxiosResponse = await axiosInstanceWithToken.put(
      url,
      payload
    );
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const deleteCartItemAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      id: number | string;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
      id: arg.id
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const cartProductCountAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      id: number | string;
    };
  }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
      id: arg.id
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const sellerOrderChangeStatusAction = async (
  url: string,
  { arg }: { arg: { status: "accept" | "reject" } }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
      product_status: arg.status
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};

export const getPaymentLinkAction = async (
    url: string,
    { arg }: { arg: { shippingAddressId: number | string } }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
      shipping_address_id: arg.shippingAddressId
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};


// در api.ts اینطوری تغییر بدید:
export const createCODOrderAction = async (
  data: { shipping_address_id: number | string }
): Promise<AxiosResponse> => {
try {
  const response: AxiosResponse = await axiosInstanceWithToken.post("/product/api/v1/order-cod/", data);
  return response;
} catch (err: unknown) {
  if (isAxiosError(err)) {
    const axiosError = err as AxiosError;
    return axiosError.response as AxiosResponse;
  }
  throw err;
}
};



// amir
export const updateProductPricingAction = async (
  url: string,
  {
    arg
  }: {
    arg: {
      seller_product_id: number;
      is_fixed_price: boolean;
      pricings: {
        min_quantity: number;
        max_quantity: number | null;
        price: number;
        discounted_price: number | null;
        shipping_cost: number;
      }[];
    };
  }
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.post(url, {
      seller_product_id: arg.seller_product_id,
      is_fixed_price: arg.is_fixed_price,
      pricings: arg.pricings
    });
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};




export const calculateProductPriceAction = async (url: string, { arg }: { arg: { seller_product_id: number; quantity: number } }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DEV_API_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    throw new Error("Failed to calculate price");
  }

  return res.json();
};


export const getCommissionAction = async (): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axiosInstanceWithToken.get(
      `${process.env.NEXT_PUBLIC_BACKEND_DEV_API_URL}/product/api/v1/get_commission/`
    );
    return response;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const axiosError = err as AxiosError;
      return axiosError.response as AxiosResponse;
    }
    throw err;
  }
};