import { ElementType } from "react";
import { IconProps } from "iconsax-react";

export type Session = {
  phoneNumber: string;
  userType: "buyer" | "seller" | "marketer";
  isActive: boolean;
  token: {
    accessToken: string;
    refreshToken: string;
  };
};

export interface UserRoleType {
  userRole: "seller" | "buyer";
}

//* NAVIGATIONS

type ExtraLinkItem = {
  href: string;
  title: string;
  icon?: ElementType<IconProps>;
};

export type ExtraLinkArray = ExtraLinkItem[];

//* SELLER DASHBOARD ROUTES
export type SellerRoutesTagsType =
  | "dashboard"
  | "secDashboard"
  | "products"
  | "sellers"
  | "checkout"
  | "profile"
  | "wallet"
  | "accountDetails"
  | "addresses"
  | "tickets"
  | "inviteFriends"
  | "orders"
  | "walletIncreaseBalance"
  | "walletTransactionList"
  | "walletWithdrawalRequest"
  | "userInvitedList"
  | "publicProducts"
  | "allPublicProducts";

interface SellerFilterRoutesByTagsProps {
  userRole: "seller";
  tags: SellerRoutesTagsType[];
}

interface BuyerFilterRoutesByTagsProps {
  userRole: "buyer";
  tags: SellerRoutesTagsType[];
}

interface MrketerFilterRoutesByTagsProps {
  userRole: "marketer";
  tags: SellerRoutesTagsType[];
}

export type FilterRoutesByTagsProps =
  | SellerFilterRoutesByTagsProps
  | BuyerFilterRoutesByTagsProps
  | MrketerFilterRoutesByTagsProps;

export type SellerDashboardRoutesType = {
  icon: ElementType<IconProps>;
  title: string;
  path: string;
  tag: SellerRoutesTagsType;
}[];

export interface TicketType {
  id: number;
  user: number;
  subject: string;
  status: "open" | "in_progress" | "answered" | "closed";
  createdAt: Date;
}

export interface TicketMessageType {
  content: string;
  createdAt: Date;
  file: string;
  id: number;
  senderType: "buyer" | "seller" | "user" | "admin";
  ticket: number;
}

export interface AddressDetailType {
  id: number;
  address: string;
  city: {
    id: number;
    name: string;
  };
  region: {
    id: number;
    name: string;
  };
}

export interface SellerProductType {
  compressedImage: string | null;
  brandName: string;
  name: string;
  barcode: string;
}

interface Feature {
  from?: number;
  to?: number | null;
  normalPrice: string;
  discountPrice?: string;
}

export interface NewProductFormType {
  features: Feature[];
  availableQuantity: number;
  packageQuantity: number;
  expirationDate: string;
  minPurchaseQuantity: number;
  maxDeliveryTime: number;
  productName: string;
  barcode: string;
  productDescription: string;
  shippingCost?: string | undefined;
  selectedPriceOption: "simple" | "variable";
  consumerPrice: string;
}

interface PricingFeature {
  price: string;
  discountedPrice: string | null;
}

export interface NewProductFormTypeForEdit {
  features: PricingFeature[];
  availableQuantity: number;
  packageQuantity: number;
  expirationDate: string;
  minPurchaseQuantity: number;
  maxDeliveryTime: number;
  productName: string;
  barcode: string;
  productDescription: string;
  shippingCost?: string | undefined;
  selectedPriceOption: "simple" | "variable";
}

export interface SellerProductsType {
  id: number;
  barcode: string;
  name: string;
  image: string;
  compressedImage: string;
  itemsPerPackage: number;
  availableCount: number;
}

export type ProductStatusFilter = "all" | "available" | "outOfStock";

//* PRODUCT DETAIL
type Product = {
  shippingCost: number;
  quantity: number;
  barcode: string;
  name: string;
  image: string | null;
  brand: number;
  brandName: string;
  category: number;
  categoryName: string;
  altText: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string | null;
};

type SellerProduct = {
  seller: number;
  minCountAmount: number;
  itemsPerPackage: number;
  maxDeliveryTime: number;
  description: string;
  availableCount: number;
  expirationDate: string | null;
  isFixedPricing: boolean;
  consumerPrice: string;
};

type Pricing = {
  id: number;
  minQuantity: number;
  maxQuantity: number | null;
  price: number;
  discountedPrice: number;
  shippingCost: number;
};

type SellerInformation = {
  companyName: string;
  numRatings: string;
};

export type ProductData = {
  product: Product;
  sellerProduct: SellerProduct;
  pricing: Pricing[];
  sellerInformation: SellerInformation;
};

export type ProductComment = {
  averageRating: number;
  totalRatings: 0;
  ratings: {
    companyName: string;
    comment: string;
    rating: number;
  }[];
};

export interface ProductInCart {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  discountedPrice: boolean;
  originalPrice: number;
  shippingCost: number | null;
  totalPrice: number;
  totalOriginalPrice: number;
}

export interface SellerCart {
  seller: string;
  products: Product[];
  totalSellerPrice: number;
  totalOriginalPrice: number;
}

export interface UserCart {
  cartStores: { id: number; companyName: string }[];
  cartProducts: { [key: string]: SellerCart };
}

export interface Rules {
  title: string;
  description: string;
}
export interface Faqs {
  answer: string;
  question: string;
}

export interface ProductT {
  sellerRating: number | undefined;
  itemsPerPackage: number;
  barcode: string;
  name: string;
  productName: string;
  compressedImage: string | null;
  minPrice: {
    price: number | null;
    discountedPrice: number | null;
    discountPercentage: number | null;
    inventory: number | null;
  } | null;
  sellerCount: number;
  productPricingId: number;
  category: number;
  isFavorite: boolean;
  sellerProductId: number;
  sellerproductId: number;
  price: number;
  discountedPrice: number | null;
  discountPercentage: number | null;
  inventory: number;
  id: number;
  companyName: string;  // اضافه کردن این خط
}

export interface ProductFilters {
  category?: number;
  brand?: string;
  in_stock?: 0 | 1;
  is_sort?: boolean;
  free_shipping?: boolean;
}

export interface UserInvited {
  userId: number;
  phoneNumber: string;
  isAccepted: boolean;
  createdAt: Date;
  buyerInfo: {
    firstName: string;
    lastName: string;
    shopName: string;
    workPhoneNumber: string;
    registrationDate: Date;
  };
}

interface BankCard {
  id: number;
  cardNumber: string;
  ibanNumber: string;
}

export interface Transaction {
  requestDate: Date;
  amount: string;
  bankCard: BankCard;
  status: "pending_approval" | "rejected" | "paid" | "approved";
  reasonForRejection: string | null;
  transactionId: string | null;
}