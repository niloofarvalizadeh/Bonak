import {
  ExtraLinkArray,
  SellerDashboardRoutesType,
  SellerRoutesTagsType
} from "@/types";

import {
  BagHappy,
  Call,
  EmptyWallet,
  HeartAdd,
  Home,
  InfoCircle,
  Location,
  ProfileCircle,
  Shop,
  ShoppingBag,
  ShoppingCart,
  Ticket,
  User
} from "iconsax-react";

//* SELLER DASHBOARD
export const SellerDashboardRoutes: SellerDashboardRoutesType = [
  {
    icon: Home,
    title: "خانه",
    path: "/account/seller/dashboard",
    tag: "dashboard"
  },
  {
    icon: User,
    title: "پیشخوان",
    path: "/account/seller/dashboard",
    tag: "secDashboard"
  },
  {
    icon: ShoppingBag,
    title: "محصولات",
    path: "/account/seller/products",
    tag: "products"
  },
  {
    icon: ShoppingBag,
    title: "محصولات",
    path: "/products",
    tag: "publicProducts"
  },
  {
    icon: Shop,
    title: "فروشندگان",
    path: "/account/seller/sellers",
    tag: "sellers"
  },
  {
    icon: ShoppingCart,
    title: "سبد خرید",
    path: "/account/seller/checkout",
    tag: "checkout"
  },
  {
    icon: ProfileCircle,
    title: "پروفایل",
    path: "/account/seller/account-details",
    tag: "profile"
  },
  {
    icon: EmptyWallet,
    title: "کیف پول",
    path: "/account/seller/wallet",
    tag: "wallet"
  },
  {
    icon: EmptyWallet,
    title: "افزایش موجودی",
    path: "/account/seller/wallet/increase-balance",
    tag: "walletIncreaseBalance"
  },
  {
    icon: EmptyWallet,
    title: "لیست تراکنش‌ها",
    path: "/account/seller/wallet/transaction-list",
    tag: "walletTransactionList"
  },
  {
    icon: EmptyWallet,
    title: "انتقال موجودی به کارت",
    path: "/account/seller/wallet/withdrawal-request",
    tag: "walletWithdrawalRequest"
  },
  {
    icon: ShoppingBag,
    title: "محصولات‌کل",
    path: "/products",
    tag: "allPublicProducts"
  },
  {
    icon: InfoCircle,
    title: "جزئیات حساب کاربری",
    path: "/account/seller/account-details",
    tag: "accountDetails"
  },
  {
    icon: Location,
    title: "آدرس ها",
    path: "/account/seller/addresses",
    tag: "addresses"
  },
  {
    icon: Ticket,
    title: "تیکت",
    path: "/account/seller/tickets",
    tag: "tickets"
  },
  {
    icon: HeartAdd,
    title: "دعوت از دوستان",
    path: "/account/seller/invite-friends",
    tag: "inviteFriends"
  },
  {
    icon: BagHappy,
    title: "سفارشات",
    path: "/account/seller/orders",
    tag: "orders"
  }
];

export const BuyerDashboardRoutes: SellerDashboardRoutesType = [
  {
    icon: Home,
    title: "خانه",
    path: "/account/buyer/dashboard",
    tag: "dashboard"
  },
  {
    icon: User,
    title: "پیشخوان",
    path: "/account/buyer/dashboard",
    tag: "secDashboard"
  },
  {
    icon: ShoppingBag,
    title: "محصولات",
    path: "/account/buyer/products",
    tag: "products"
  },
  {
    icon: ShoppingBag,
    title: "محصولات",
    path: "/products",
    tag: "publicProducts"
  },
  {
    icon: ShoppingBag,
    title: "محصولات‌کل",
    path: "/products",
    tag: "allPublicProducts"
  },
  {
    icon: Shop,
    title: "فروشندگان",
    path: "/account/buyer/sellers",
    tag: "sellers"
  },
  {
    icon: ShoppingCart,
    title: "سبد خرید",
    path: "/account/buyer/checkout",
    tag: "checkout"
  },
  {
    icon: ProfileCircle,
    title: "پروفایل",
    path: "/account/buyer/account-details",
    tag: "profile"
  },
  {
    icon: EmptyWallet,
    title: "کیف پول",
    path: "/account/buyer/wallet",
    tag: "wallet"
  },
  {
    icon: EmptyWallet,
    title: "افزایش موجودی",
    path: "/account/buyer/wallet/increase-balance",
    tag: "walletIncreaseBalance"
  },
  {
    icon: InfoCircle,
    title: "جزئیات حساب کاربری",
    path: "/account/buyer/account-details",
    tag: "accountDetails"
  },
  {
    icon: Location,
    title: "آدرس ها",
    path: "/account/buyer/addresses",
    tag: "addresses"
  },
  {
    icon: Ticket,
    title: "تیکت",
    path: "/account/buyer/tickets",
    tag: "tickets"
  },
  {
    icon: HeartAdd,
    title: "دعوت از دوستان",
    path: "/account/buyer/invite-friends",
    tag: "inviteFriends"
  },
  {
    icon: BagHappy,
    title: "سفارشات",
    path: "/account/buyer/orders",
    tag: "orders"
  }
];

export const MarketerDashboardRoutes: SellerDashboardRoutesType = [
  {
    icon: Home,
    title: "خانه",
    path: "/mk/dashboard",
    tag: "dashboard"
  },
  {
    icon: User,
    title: "پیشخوان",
    path: "/mk/dashboard",
    tag: "secDashboard"
  },
  {
    icon: ShoppingBag,
    title: "لیست دعوت",
    path: "/mk/invited-users-list",
    tag: "userInvitedList"
  },
  {
    icon: Shop,
    title: "فروشندگان",
    path: "/mk/sellers",
    tag: "sellers"
  },
  {
    icon: ShoppingCart,
    title: "سبد خرید",
    path: "/mk/checkout",
    tag: "checkout"
  },
  {
    icon: ProfileCircle,
    title: "پروفایل",
    path: "/mk/profile",
    tag: "profile"
  },
  {
    icon: EmptyWallet,
    title: "کیف پول",
    path: "/mk/wallet",
    tag: "wallet"
  },
  {
    icon: EmptyWallet,
    title: "افزایش موجودی",
    path: "/mk/wallet/increase-balance",
    tag: "walletIncreaseBalance"
  },
  {
    icon: EmptyWallet,
    title: "لیست تراکنش‌ها",
    path: "/mk/wallet/transaction-list",
    tag: "walletTransactionList"
  },
  {
    icon: EmptyWallet,
    title: "انتقال موجودی به کارت",
    path: "/mk/wallet/withdrawal-request",
    tag: "walletWithdrawalRequest"
  },
  {
    icon: InfoCircle,
    title: "جزئیات حساب کاربری",
    path: "/mk/account-details",
    tag: "accountDetails"
  },
  {
    icon: Location,
    title: "آدرس ها",
    path: "/mk/addresses",
    tag: "addresses"
  },
  {
    icon: Ticket,
    title: "تیکت",
    path: "/mk/tickets",
    tag: "tickets"
  },
  {
    icon: HeartAdd,
    title: "دعوت از دوستان",
    path: "/mk/invite-friends",
    tag: "inviteFriends"
  },
  {
    icon: BagHappy,
    title: "مشتریان",
    path: "/mk/customers",
    tag: "orders"
  },
  {
    icon: ShoppingBag,
    title: "محصولات",
    path: "/products",
    tag: "publicProducts"
  }
];

//* HEADER LINKS
export const HeaderPublicLinks: ExtraLinkArray = [
  {
    href: "/products",
    title: "محصولات",
    icon: ShoppingBag
  },

  {
    href: "/about-us",
    title: "ارتباط با ما",
    icon: Call
  },
  {
    href: "/about-us",
    title: "درباره ما",
    icon: InfoCircle
  }
];

export const NavTags: Record<
  "buyer" | "seller" | "marketer",
  SellerRoutesTagsType[]
> = {
  buyer: [
    "secDashboard",
    "orders",
    "checkout",
    "wallet",
    "accountDetails",
    "addresses",
    "tickets",
    "inviteFriends"
  ],
  seller: [
    "secDashboard",
    "orders",
    "products",
    "wallet",
    "accountDetails",
    // "addresses",
    "tickets",
    "inviteFriends"
  ],
  marketer: ["dashboard", "publicProducts", "userInvitedList", "inviteFriends"]
};
