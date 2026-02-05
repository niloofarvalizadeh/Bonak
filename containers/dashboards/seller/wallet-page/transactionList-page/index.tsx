"use client";
import React, { FC } from "react";
import { Box, Divider, Spinner } from "@chakra-ui/react";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import Breadcrumb from "@/components/ui/elements/Breadcrumb";
import Title from "@/components/ui/typography/Title";
import { useGetWithdrawalRequestList } from "@/services/queries";
import { addCommas } from "@persian-tools/persian-tools";
import {
    convertToJalaliDate,
    getStatusWalletColor,
    getWalletStatusLabelText,
    getWalletStatusText
} from "@/utils";
import { Transaction } from "@/types";

const SellerDashboardTransactionListContainer: FC = () => {
    const {
        data: withdrawalRequestList,
        isLoading: withdrawalRequestListIsLoading
    } = useGetWithdrawalRequestList();

    console.log({ withdrawalRequestList });

    return (
        <Box>
            <Breadcrumb
                hidden
                userRole="seller"
                tags={["dashboard", "wallet", "walletTransactionList"]}
            />
            <DashboardPageTitle>لیست تراکنش‌ها</DashboardPageTitle>

            {/* LAST TRANSACTIONS */}
            <Box className="mt-4 flex w-full flex-col lg:mt-6">
                {withdrawalRequestListIsLoading ? (
                    <Box className="flex w-full items-center justify-center">
                        <Spinner color="brand.orange.normal" />
                    </Box>
                ) : !withdrawalRequestList || withdrawalRequestList.length === 0 ? (
                    <Box className="flex w-full items-center justify-center">
                        <Title level={2} className="text-center">
                            هیچ تراکنشی یافت نشد
                        </Title>
                    </Box>
                ) : (
                    <>
                        {withdrawalRequestList.map(
                            (transaction: Transaction, index: number) => (
                                <Box key={index}>
                                    <Divider
                                        width="100%"
                                        height="1px"
                                        color="brand.white.normalHover"
                                    />
                                    <Box className="flex items-start justify-between py-6">
                                        <Box className="flex flex-col gap-2">
                                            <Title
                                                level={1}
                                                className={getStatusWalletColor(transaction.status)}
                                            >
                                                {getWalletStatusLabelText(transaction.status)}
                                            </Title>
                                            <Title level={2} className="text-brand-blue-lightActive">
                                                {convertToJalaliDate(transaction.requestDate as Date)}
                                            </Title>
                                            <Title level={2} className="text-brand-blue-lightActive">
                                                شماره کارت: {transaction.bankCard.cardNumber}
                                            </Title>
                                            <Title level={2} className="text-brand-blue-lightActive">
                                                شماره شبا: {transaction.bankCard.ibanNumber}
                                            </Title>
                                            <Title level={2} className="text-brand-blue-lightActive">
                                                وضعیت: {getWalletStatusText(transaction.status)}
                                            </Title>
                                            {transaction.reasonForRejection && (
                                                <Title level={2} className="text-red-500">
                                                    دلیل رد: {transaction.reasonForRejection}
                                                </Title>
                                            )}
                                            {transaction.transactionId && (
                                                <Title
                                                    level={2}
                                                    className="text-brand-blue-lightActive"
                                                >
                                                    شناسه تراکنش: {transaction.transactionId}
                                                </Title>
                                            )}
                                        </Box>
                                        <Title
                                            level={1}
                                            className={getStatusWalletColor(transaction.status)}
                                        >
                                            {addCommas(transaction.amount)} تومان
                                        </Title>
                                    </Box>
                                </Box>
                            )
                        )}
                        <Divider
                            width="100%"
                            height="1px"
                            color="brand.white.normalHover"
                        />
                    </>
                )}
            </Box>
        </Box>
    );
};

export default SellerDashboardTransactionListContainer;
