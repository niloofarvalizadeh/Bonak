"use client";
import { useState, useEffect } from 'react';
import useSWR from "swr";
import {fetcherWithoutToken, fetcherWithToken} from "./fetcher";
import {ProductFilters, ProductStatusFilter} from "@/types";
import snakecaseKeys from "snakecase-keys";
import { getSession } from '@/libs/session';
export function useGetCities(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/account/api/v1/cities/` : null,
        fetcherWithoutToken
    );
}

export function useGetNeighborhoods(
    cityId: string,
    shouldFetch: boolean = true
) {
    return useSWR(
        shouldFetch ? `/account/api/v1/neighborhoods/${cityId}` : null,
        fetcherWithoutToken
    );
}

//* DASHBOARD

export function useGetSupportTickets(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/account/api/v1/support_ticket_list/` : null,
        fetcherWithToken
    );
}

export function useGetTickets(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/account/api/v1/ticket_list/` : null,
        fetcherWithToken
    );
}

export function useGetTicketDetail(
    userType: "seller" | "support",
    ticketId: string,
    shouldFetch: boolean = true
) {
    return useSWR(
        shouldFetch
            ? userType == "seller"
                ? `/account/api/v1/seller_buyer_ticket/${ticketId}`
                : `/account/api/v1/support_ticket/${ticketId}`
            : null,
        fetcherWithToken
    );
}

export function useGetInviteLink(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/account/api/v1/get-invite-link/` : null,
        fetcherWithToken
    );
}

export function useGetInvitedUser(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/account/api/v1/invited_users/` : null,
        fetcherWithToken
    );
}

export function useGetAddresses(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/account/api/v1/addresses/` : null,
        fetcherWithToken
    );
}

export function usePayLink(shouldFetch: boolean = true)
{
    return useSWR(
        shouldFetch ? `/product/api/v1/checkout-payment/` : null,
        fetcherWithToken
    );
}

export function useGetAddressDetail(
    addressId: number,
    shouldFetch: boolean = true
) {
    return useSWR(
        shouldFetch ? `/account/api/v1/addresses/${addressId}` : null,
        fetcherWithToken
    );
}

export function useGetBankCardDetail(
    bankCardId: number,
    shouldFetch: boolean = true
) {
    return useSWR(
        shouldFetch ? `/account/api/v1/bank-card/${bankCardId}` : null,
        fetcherWithToken
    );
}

export function useGetProductDetailForEdit(
    productId: string,
    shouldFetch: boolean = true
) {
    return useSWR(
        shouldFetch
            ? `/product/api/v1/show_proect_seller_detail_for_update/${productId}/`
            : null,
        fetcherWithToken
    );
}

export function useGetSellerProductList(page = 1, shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/product/api/v1/product_list_for_seller/?page=${page}` : null,
        fetcherWithToken
    );
}

export function useGetSellerProducts(
    shouldFetch: boolean = true,
    filter: ProductStatusFilter = "all",
    searchQuery: string = ""
) {
    let url = "/product/api/v1/show_seller_product/";

    if (filter === "available") {
        url += "?availability=available";
    } else if (filter === "outOfStock") {
        url += "?availability=unavailable";
    }

    if (searchQuery) {
        const separator = url.includes("?") ? "&" : "?";
        url += `${separator}search=${encodeURIComponent(searchQuery)}`;
    }

    return useSWR(shouldFetch ? url : null, fetcherWithToken);
}

export function useGetNotifications(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/account/api/v1/notification_list/` : null,
        fetcherWithToken
    );
}

export function useGetNotificationDetail(
    shouldFetch: boolean = true,
    notificationId: number
) {
    return useSWR(
        shouldFetch
            ? `/account/api/v1/notification_detail/${notificationId}/`
            : null,
        fetcherWithToken
    );
}

export function useGetUser(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/account/api/v1/get_full_user_information/" : null,
        fetcherWithToken
    );
}

export function useGetFullUserName(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/account/api/v1/show-user-name" : null,
        fetcherWithToken
    );
}

export function useGetUserMessages(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/product/api/v1/buyer-messages-list/" : null,
        fetcherWithToken
    );
}

export function useGetUserCartDetail(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/product/api/v1/user_cart_detail/" : null,
        fetcherWithToken
    );
}

export function useGetUserReferralCode(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/account/api/v1/show_user_invited_link/" : null,
        fetcherWithToken
    );
}

export function useGetUserReferralCodeStatus(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/account/api/v1/invited_details/" : null,
        fetcherWithToken
    );
}

export function useGetUserOrderList(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/product/api/v1/order_list" : null,
        fetcherWithToken
    );
}

export function useGetUserOrderDetail(
    orderId: string,
    shouldFetch: boolean = true
) {
    return useSWR(
        shouldFetch ? `/product/api/v1/order_list_items/${orderId}/` : null,
        fetcherWithToken
    );
}

export function useGetSellerOrderDetail(
    orderId: string,
    shouldFetch: boolean = true
) {
    return useSWR(
        shouldFetch ? `/product/api/v1/seller-order/${orderId}/` : null,
        fetcherWithToken
    );
}

export function useGetSearchQuery(shouldFetch: boolean = true, query: string) {
    return useSWR(
        shouldFetch ? `/product/api/v1/home-search-box/?q=${query}` : null,
        fetcherWithoutToken
    );
}

export function useGetRules(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/home/api/v1/terms-and-conditions" : null,
        fetcherWithoutToken
    );
}

export function useGetFaqs(shouldFetch: boolean = true) {
    return useSWR(shouldFetch ? "/home/api/v1/faqs" : null, fetcherWithoutToken);
}

export function useGetAboutUs(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/home/api/v1/about-us-view" : null,
        fetcherWithoutToken
    );
}

export function useGetContactInfo(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/home/api/v1/contact-info/" : null,
        fetcherWithoutToken
    );
}

export function useGetSocialLinks(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/home/api/v1/social-links/" : null,
        fetcherWithoutToken
    );
}

export function useGetFavorites(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/product/api/v1/favorites/` : null,
        fetcherWithToken
    );
}

export function useGetWalletBalance(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/account/api/v1/show-wallet-balance` : null,
        fetcherWithToken
    );
}

export function useGetWithdrawalRequestList(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/account/api/v1/withdrawal-request-list/` : null,
        fetcherWithToken
    );
}

export function useGetStaticCategories(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/product/api/v1/categories/static/` : null,
        fetcherWithoutToken
    );
}

export function useGetFeaturedSellers(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/account/api/v1/featured-sellers/` : null,
        fetcherWithoutToken
    );
}

export function useGetstatus(shouldFetch: boolean = true,) {
    return useSWR(
        shouldFetch ? `/account/api/v1/check-verification/` : null,
    );
}

export function useGetSpecialDiscounts(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/product/api/v1/special-discounts/` : null,
        fetcherWithoutToken
    );
}

export function useGetProductsByCategory(
    shouldFetch: boolean = true,
    categoryId: number | string,
    isAuthenticated?: boolean // اضافه کردن این پارامتر
) {
    return useSWR(
        shouldFetch ? `/product/api/v1/products/by-category/${categoryId}/` : null,
        isAuthenticated ? fetcherWithToken : fetcherWithoutToken
    );
}


export function useGetBanners(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/home/api/v1/banners/` : null,
        fetcherWithoutToken
    );
}

export function useGetBannerById(
    shouldFetch: boolean = true,
    bannerId: number | string
) {
    return useSWR(
        shouldFetch ? `/home/api/v1/banners/${bannerId}/` : null,
        fetcherWithoutToken
    );
}


export function useGetAllProducts(filters: ProductFilters = {}, page: number = 1, shouldFetch: boolean = true) {
    const cleanedFilters = snakecaseKeys(
        Object.fromEntries(
            Object.entries(filters).filter(
                ([, value]) => value !== undefined && value !== 0 && value !== false
            )
        )
    ) as Record<string, string | number | boolean>;

    if (filters.in_stock === 1) {
        cleanedFilters.in_stock = 1;
    }

    const queryString = Object.entries(cleanedFilters)
        .map(([key, value]) => {
            if (value === true) return key;
            return `${key}=${encodeURIComponent(value)}`;
        })
        .join("&");

    const url = queryString
        ? `/product/api/v1/products-list-filter/?${queryString}&page=${page}&size=10`
        : `/product/api/v1/products-list-filter/?page=${page}&size=10`;

    // ✅ راه حل ساده و مطمئن - چک مستقیم localStorage
    const hasToken = typeof window !== 'undefined' && 
                    (localStorage.getItem('access_token') || localStorage.getItem('token'));

    console.log("=== FINAL SOLUTION ===");
    console.log("hasToken:", hasToken);
    console.log("URL:", url);

    // همیشه از fetcherWithToken استفاده کن - بذار interceptor خودش توکن رو مدیریت کنه
    return useSWR(
        shouldFetch ? url : null,
        fetcherWithToken, // ← بذار interceptor کارش رو انجام بده
        {
            revalidateOnFocus: false,
            keepPreviousData: false,
            onError: (error) => {
                console.log("❌ API Error - Let interceptor handle it");
                // interceptor خودش redirect می‌کنه اگر توکن مشکل داشته باشه
            }
        }
    );
}



export function useGetSellerInfo(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/account/api/v1/seller_my_info/` : null,
        fetcherWithToken
    );
}

export function useGetMarketerInvitedUsersList(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/marketer/api/v1/invited-users-list/" : null,
        fetcherWithToken
    );
}

export function useGetBuyerAccountDetail(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/account/api/v1/buyer/" : null,
        fetcherWithToken
    );
}

export function useGetMarketerDashboard(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/marketer/api/v1/marketer-dashboard/" : null,
        fetcherWithToken
    );
}

export function useGetSellerOrders(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/product/api/v1/seller-orders/` : null,
        fetcherWithToken
    );
}

export function useGet(shouldFetch: boolean = true) {
    return useSWR(shouldFetch ? `` : null, fetcherWithoutToken);
}

export function useGetRoot(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/product/api/v1/categories/root/" : null,
        fetcherWithoutToken
    );
}

export function useGetTree(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/product/api/v1/categories/tree/" : null,
        fetcherWithoutToken
    );
}

export function useGetAllBrands(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/account/api/v1/all_brands" : null,
        fetcherWithoutToken
    );
}

export function useGetSellerBrands(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/account/api/v1/seller_manage_brands/" : null,
        fetcherWithToken
    );
}

export function useGetSellersListForTicket(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/account/api/v1/sellers-list-for-ticket/" : null,
        fetcherWithToken
    );
}

export function useGetBankCards(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/account/api/v1/bank-cards" : null,
        fetcherWithToken
    );
}

export function useGetSellerRating(shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? "/account/api/v1/show_rating_for_seller/" : null,
        fetcherWithToken
    );
}

export function useGetChildren(
    shouldFetch: boolean = true,
    categoryId?: number | string
) {
    const url = categoryId
        ? `/product/api/v1/categories/${categoryId}/children/`
        : null;
    return useSWR(shouldFetch && categoryId ? url : null, fetcherWithoutToken);
}

export function useGetParent(shouldFetch: boolean = true, categoryId?: number) {
    const url = categoryId
        ? `/product/api/v1/categories/parent/${categoryId}`
        : null;
    return useSWR(shouldFetch && categoryId ? url : null, fetcherWithoutToken);
}

export function useGetSellerDetail(id: string, shouldFetch: boolean = true) {
    return useSWR(
        shouldFetch ? `/account/api/v1/seller/detail/${id}/` : null,
        fetcherWithToken
    );
}

export function useGetSellerPageProducts(
    filters: ProductFilters = {},
    id: string,
    shouldFetch: boolean = true
) {
    const cleanedFilters = snakecaseKeys(
        Object.fromEntries(
            Object.entries(filters).filter(
                ([, value]) => value !== undefined && value !== 0 && value !== false
            )
        )
    ) as Record<string, string | number | boolean>;

    if (filters.in_stock === 1) {
        cleanedFilters.in_stock = 1;
    }

    const queryString = Object.entries(cleanedFilters)
        .map(([key, value]) => {
            if (value === true) return key;
            return `${key}=${encodeURIComponent(value)}`;
        })
        .join("&");

    const url = queryString
        ? `/product/api/v1/seller-products/details/${id}/filter/?${queryString}`
        : `/product/api/v1/seller-products/details/${id}/filter/`;

    return useSWR(shouldFetch ? url : null, fetcherWithToken);
}









