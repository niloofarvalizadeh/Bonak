"use client";
import React, {FC, useState} from "react";
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Tag,
    useRadioGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    VStack,
    RadioGroup,
    Radio,
    Text,
    useToast
} from "@chakra-ui/react";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";
import Title from "@/components/ui/typography/Title";
import Image from "next/image";
import CustomHeading from "@/components/ui/typography/CustomHeading";
import {ArrowDown2, ArrowUp2, Shop, Location} from "iconsax-react";
import Button from "@/components/ui/elements/Button";
import {buyerCheckoutMethodOptions} from "@/constants/staticData";
import SelectCheckoutMethodRadioCard from "@/components/modules/Buyer/SelectCheckoutMethodRadioCard";
import {useGetUserCartDetail, useGetAddresses} from "@/services/queries";
import {addCommas} from "@persian-tools/persian-tools";
import {UserCart, AddressDetailType} from "@/types";
import DeleteCartItem from "@/components/modules/DeleteCartItem";
import CountCartItem from "@/components/modules/CountCartItem";
import {getPaymentLinkAction, createCODOrderAction} from "@/services/api";

const BuyerDashboardCheckoutContainer: FC = () => {
    console.log("=== COMPONENT STARTED ===");

    const {data: userCart, isLoading} = useGetUserCartDetail();
    const {data: addresses, isLoading: addressesIsLoading} = useGetAddresses();
    console.log("addresses:", addresses);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("CASH");
    const [isProcessing, setIsProcessing] = useState(false);
    const toast = useToast();

    // دیباگ کامل برای buyerCheckoutMethodOptions
    console.log("=== buyerCheckoutMethodOptions DEBUG ===");
    console.log("buyerCheckoutMethodOptions:", buyerCheckoutMethodOptions);
    console.log("type:", typeof buyerCheckoutMethodOptions);
    console.log("isArray:", Array.isArray(buyerCheckoutMethodOptions));

    if (buyerCheckoutMethodOptions && Array.isArray(buyerCheckoutMethodOptions)) {
        buyerCheckoutMethodOptions.forEach((option, index) => {
            console.log(`Option ${index}:`, option);
            console.log(`Option ${index} type:`, typeof option);
            console.log(`Option ${index} keys:`, Object.keys(option));
        });
    }

    const {getRootProps, getRadioProps} = useRadioGroup({
        name: "checkoutMethod",
        defaultValue: "CASH",
        onChange: (value) => {
            console.log("Payment method changed to:", value);
            setSelectedPaymentMethod(value);
        }
    });

    console.log("=== RADIO GROUP DEBUG ===");
    console.log("getRootProps:", getRootProps());
    console.log("selectedPaymentMethod:", selectedPaymentMethod);

    const calculateTotals = (cart: UserCart) => {
        console.log("=== CALCULATE TOTALS ===");
        if (!cart?.cartProducts) {
            console.log("No cart products found");
            return {totalSellerPrice: 0, totalOriginalPrice: 0, totalItems: 0, totalShippingCost: 0};
        }

        const totalSellerPrice = Object.values(cart.cartProducts).reduce(
            (acc, sellerCart) => acc + (sellerCart.totalSellerPrice || 0),
            0
        );
        const totalOriginalPrice = Object.values(cart.cartProducts).reduce(
            (acc, sellerCart) => acc + (sellerCart.totalOriginalPrice || 0),
            0
        );
        const totalItems = Object.values(cart.cartProducts).reduce(
            (acc, sellerCart) => acc + (sellerCart.products?.length || 0),
            0
        );
        const totalShippingCost = Object.values(cart.cartProducts).reduce(
            (acc, sellerCart) => {
                return (
                    acc +
                    (sellerCart.products?.reduce(
                        (shippingAcc, product) => shippingAcc + (product.shippingCost || 0),
                        0
                    ) || 0)
                );
            },
            0
        );

        console.log("Calculated totals:", {totalSellerPrice, totalOriginalPrice, totalItems, totalShippingCost});
        return {totalSellerPrice, totalOriginalPrice, totalItems, totalShippingCost};
    };

    // به‌روزرسانی: وقتی روش پرداخت POD انتخاب شده باشه، این تابع یک درخواست GET به
    // /product/api/v1/checkout-payment/?shipping_address_id=... می‌زنه، اگر موفق باشه کاربر
    // به payment_url ریدایرکت میشه، در غیر این صورت پیام خطا با toast نمایش داده میشه.
    const handleCheckout = () => {
        console.log("=== HANDLE CHECKOUT ===");
        console.log("Current selectedPaymentMethod:", selectedPaymentMethod);
        
        // برای همه روش‌های پرداخت مودال باز شود
        onOpen();
    };

    const handleAddressSelect = async () => {
        if (!selectedAddress) return;
        
        console.log("Starting checkout process...");
        console.log("Selected payment method:", selectedPaymentMethod);
        console.log("Selected address:", selectedAddress);
        
        setIsProcessing(true);
        try {
            let res;
    
            if (selectedPaymentMethod === "CASH") {
                // پرداخت در محل - استفاده از تابع جدید
                console.log("Creating COD order...");
                res = await createCODOrderAction({
                    shipping_address_id: selectedAddress  // ✅ بدون arg
                });
            } else {
                // پرداخت آنلاین - استفاده از تابع قبلی
                console.log("Creating online payment order...");
                res = await getPaymentLinkAction("/product/api/v1/checkout-payment/", {
                    arg: { shippingAddressId: selectedAddress }
                });
            }
    
            console.log("API Response:", res);
    
            if (res.status === 200 || res.status === 201) {
                if (selectedPaymentMethod === "CASH") {
                    // برای پرداخت در محل
                    toast({ 
                        title: "سفارش ثبت شد", 
                        description: "سفارش شما با موفقیت ثبت شد و به زودی ارسال خواهد شد.", 
                        status: "success", 
                        isClosable: true,
                        duration: 3000
                    });
                    
                    // ریدایرکت به صفحه سفارشات بعد از 2 ثانیه
                    setTimeout(() => {
                        window.location.href = "/account/buyer/orders";
                    }, 2000);
                    
                } else {
                    // برای پرداخت آنلاین
                    const paymentUrl = res.data?.payment_url || res.data?.paymentUrl || res.data?.url || res.data?.redirect_url;
                    if (paymentUrl) {
                        console.log("Redirecting to payment URL:", paymentUrl);
                        window.location.assign(paymentUrl);
                    } else {
                        toast({ 
                            title: "خطا", 
                            description: "آدرس پرداخت دریافت نشد.", 
                            status: "error", 
                            isClosable: true 
                        });
                    }
                }
            } else if (res.status === 400) {
                toast({ 
                    title: "خطا", 
                    description: res.data?.message || "خطا در اطلاعات ارسالی", 
                    status: "error", 
                    isClosable: true 
                });
            } else {
                toast({ 
                    title: "خطا", 
                    description: `خطایی رخ داده کد خطا: ${res.status}`, 
                    status: "error", 
                    isClosable: true 
                });
            }
        } catch (err: any) {
            console.error("Checkout error:", err);
            toast({ 
                title: "خطا", 
                description: err?.response?.data?.message || err?.message || "خطای نامشخص در ارتباط با سرور", 
                status: "error", 
                isClosable: true 
            });
        } finally {
            setIsProcessing(false);
            onClose();
        }
    };

    let totals = {totalSellerPrice: 0, totalOriginalPrice: 0, totalItems: 0, totalShippingCost: 0};
    if (userCart) {
        console.log("=== USER CART FOUND ===");
        console.log("userCart:", userCart);
        totals = calculateTotals(userCart);
    } else {
        console.log("=== NO USER CART ===");
    }

    // تابع برای پردازش صحیح گزینه‌های پرداخت
    const renderPaymentOptions = () => {
        console.log("=== RENDER PAYMENT OPTIONS ===");

        if (!buyerCheckoutMethodOptions || !Array.isArray(buyerCheckoutMethodOptions)) {
            console.log("No payment options available");
            return null;
        }

        console.log("Rendering payment options...");

        return buyerCheckoutMethodOptions.map((option, index) => {
            console.log(`Rendering option ${index}:`, option);

            let value: string;
            let label: string;

            // اگر option یک رشته ساده است
            if (typeof option === 'string') {
                console.log(`Option ${index} is string:`, option);
                value = option;
                label = option;
            } else if (typeof option === 'object' && option !== null) {
                // اگر option یک آبجکت است
                console.log(`Option ${index} is object:`, option);
                value = (option as any).id || (option as any).value || (option as any).name || String(option);
                label = (option as any).name || (option as any).label || (option as any).title || String(value);
            
                console.log(`Option ${index} processed - value: ${value}, label: ${label}`);
            } else {
                console.warn(`Invalid option type at index ${index}:`, typeof option);
                return null;
            }
            try {
                const radioProps = getRadioProps({value});
                console.log(`Radio props for option ${index}:`, radioProps);

                return (
                    <SelectCheckoutMethodRadioCard key={value} {...radioProps}>
                        {label}
                    </SelectCheckoutMethodRadioCard>
                );
            } catch (error) {
                console.error(`Error rendering option ${index}:`, error);
                return null;
            }
        });
    };

    console.log("=== RENDER COMPONENT ===");

    // بررسی اینکه سبد خرید خالی است یا مبلغ صفر
    const isCartEmpty = !userCart?.cartStores || userCart.cartStores.length === 0;
    const isTotalZero = totals.totalSellerPrice === 0;

    return (
        <Box>
            <DashboardPageTitle>سبد خرید</DashboardPageTitle>

            <Accordion marginTop="12px" allowMultiple className="!flex !w-full !flex-col !gap-6">
                {isLoading ? (
                    <div>Loading...</div>
                ) : isCartEmpty ? (
                    <Box className="flex flex-col items-center justify-center py-12 text-center">
                        <CustomHeading level={5} className="text-brand-blue-normal mb-4">
                            سبد خرید شما خالی است
                        </CustomHeading>
                        <Text className="text-brand-blue-lightActive mb-6">
                            می‌توانید از فروشگاه محصولات مورد نظر خود را انتخاب کنید.
                        </Text>
                        <Button
                            bg="brand.orange.normal"
                            color="white"
                            onClick={() => {
                                window.location.href = "/products";
                            }}
                        >
                            لیست محصولات
                        </Button>
                    </Box>
                ) : (
                    userCart.cartStores.map((item: { id: number; companyName: string }, index: number) => {
                        console.log("Rendering store:", item);
                        return (
                            <AccordionItem
                                borderWidth="1px"
                                borderColor="brand.white.normalHover"
                                className="!rounded-2xl lg:!rounded-3xl"
                                key={index}
                            >
                                {({isExpanded}) => (
                                    <>
                                        <h2>
                                            <AccordionButton
                                                className="!rounded-2xl !px-2 !py-4 !text-brand-blue-normalActive lg:!rounded-3xl lg:!px-6">
                                                <Box className="flex w-full items-center justify-between lg:hidden">
                                                    <Title level={2} bold>
                                                        فروشگاه {item.companyName}
                                                    </Title>
                                                    <Box className="flex items-center gap-2">
                                                        <Title level={2} bold>
                                                            {addCommas(userCart.cartProducts[item.id]?.totalOriginalPrice || 0)}
                                                        </Title>
                                                        {isExpanded ? <ArrowUp2 variant="Bold"/> :
                                                            <ArrowDown2 variant="Bold"/>}
                                                    </Box>
                                                </Box>
                                                <Box className="hidden w-full items-center justify-between lg:flex">
                                                    <CustomHeading level={5} bold>
                                                        فروشگاه {item.companyName}
                                                    </CustomHeading>
                                                    <Box className="flex items-center gap-2">
                                                        <CustomHeading level={5} bold>
                                                            {addCommas(userCart.cartProducts[item.id]?.totalOriginalPrice || 0)} تومان
                                                        </CustomHeading>
                                                        {isExpanded ? <ArrowUp2 variant="Bold"/> :
                                                            <ArrowDown2 variant="Bold"/>}
                                                    </Box>
                                                </Box>
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel padding="0px" pb="24px">
                                            {userCart.cartProducts[item.id]?.products?.map((product: any) => {
                                                console.log("Rendering product:", product);
                                                return (
                                                    <Box
                                                        key={product.productId}
                                                        className="relative flex w-full items-center justify-between border-b border-brand-white-normalHover px-6 py-2"
                                                    >
                                                        <DeleteCartItem id={product.id}/>
                                                        <Box className="flex items-start gap-2">
                                                            <Box className="size-[80px] p-2">
                                                                <Image
                                                                    src={`${product?.image}`}
                                                                    alt="product image"
                                                                    width={1000}
                                                                    height={0}
                                                                />
                                                            </Box>
                                                            <Box className="flex flex-col">
                                                                <Title level={1}>{product.name}</Title>
                                                                <Box className="mt-8">
                                                                    <Tag bg="brand.white.normalHover" rounded="30px"
                                                                         paddingX="12px" paddingY="4px">
                                                                        <Title level={2} bold
                                                                               className="text-brand-blue-normal">
                                                                            {product.quantity} بسته
                                                                        </Title>
                                                                    </Tag>
                                                                </Box>
                                                                <Box
                                                                    className="mt-3 flex items-center gap-1 text-brand-blue-lightActive">
                                                                    <Shop/>
                                                                    <Title level={2}>{item.companyName}</Title>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                        <Box className="flex flex-col gap-8">
                                                            <CustomHeading level={5} bold
                                                                           className="text-brand-blue-normalActive">
                                                                {addCommas(product.price)} تومان
                                                            </CustomHeading>
                                                            <CountCartItem id={product.id} quantity={product.quantity}/>
                                                        </Box>
                                                    </Box>
                                                );
                                            })}
                                        </AccordionPanel>
                                    </>
                                )}
                            </AccordionItem>
                        );
                    })
                )}
            </Accordion>

            {/* بخش جمع‌بندی و پرداخت - فقط زمانی نمایش داده شود که سبد خرید خالی نباشد */}
            {!isCartEmpty && (
                <Box className="mt-6 flex w-full flex-col gap-6 text-brand-blue-normal">
                    <Box className="flex w-full items-center justify-between">
                        <Title level={1}>قیمت کل ({totals.totalItems})</Title>
                        <CustomHeading 
                            level={5} 
                            className="text-gray-400 line-through"
                        >
                            {addCommas(totals.totalOriginalPrice)} تومان
                        </CustomHeading>
                    </Box>
                    <Box className="flex w-full items-center justify-between">
                        <Title level={1} className="text-brand-orange-normal border-b-2 border-brand-orange-normal pb-1">
                            قیمت نهایی ({totals.totalItems})
                        </Title>
                        <CustomHeading level={5} className="text-brand-orange-normal border-b-2 border-brand-orange-normal pb-1">
                            {addCommas(totals.totalSellerPrice)} تومان
                        </CustomHeading>
                    </Box>

                    <Box className="flex w-full items-center justify-between">
                        <Title level={1}>هزینه ارسال</Title>
                        <CustomHeading level={5}>
                            {totals.totalShippingCost == 0 ? "رایگان" : `${addCommas(totals.totalShippingCost)} تومان`}
                        </CustomHeading>
                    </Box>
                    <Box className="flex w-full items-center justify-between">
                        <Title level={1} bold>جمع هزینه‌ها</Title>
                        <CustomHeading level={5} bold>{addCommas(totals.totalSellerPrice)} تومان</CustomHeading>
                    </Box>
                    <Box className="flex w-full items-center justify-between">
                        <Title level={1}>سود شما از این خرید</Title>
                        <CustomHeading level={5}>
                            {addCommas(totals.totalOriginalPrice - totals.totalSellerPrice)} تومان
                        </CustomHeading>
                        </Box>
                    
                    <CustomHeading level={5} bold>روش پرداخت</CustomHeading>
                    <Box className="flex w-full items-center justify-between">
                        {renderPaymentOptions()}
                    </Box>

                    <Button
                        height="52px"
                        width="100%"
                        bg={isTotalZero ? "brand.gray.normal" : "brand.orange.normal"}
                        color="white"
                        rounded="8px"
                        onClick={() => {
                            console.log("Selected address:", selectedAddress);
                            void handleCheckout();
                        }}
                        isDisabled={isTotalZero}
                        _hover={isTotalZero ? { bg: "brand.gray.normal" } : { bg: "brand.orange.normalHover" }}
                    >
                        <CustomHeading level={5} bold>
                            {isTotalZero ? "مبلغ سبد خرید صفر است" : "تایید و تکمیل پرداخت"}
                        </CustomHeading>
                    </Button>
                </Box>
            )}

            {/* مودال انتخاب آدرس - فقط برای پرداخت CASH نمایش داده می‌شود */}
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Box className="flex items-center gap-2">
                            <Location variant="Bold"/>
                            <Title level={1}>
                                انتخاب آدرس تحویل 
                                ({selectedPaymentMethod === "CASH" ? "پرداخت در محل" : "پرداخت آنلاین"})
                            </Title>
                        </Box>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        {addressesIsLoading ? (
                            <Text>در حال بارگذاری آدرس‌ها...</Text>
                        ) : !addresses || addresses.length === 0 ? (
                            <Box className="text-center py-8">
                                <CustomHeading level={5} className="text-brand-blue-normal mb-4">
                                    هیچ آدرسی ثبت نشده است
                                </CustomHeading>
                                <Text className="text-brand-blue-lightActive mb-4">
                                    برای پرداخت در محل، لطفاً ابتدا از بخش آدرس‌ها، آدرس جدید اضافه کنید.
                                </Text>
                                <Button
                                    bg="brand.orange.normal"
                                    color="white"
                                    onClick={() => {
                                        window.location.href = "/account/buyer/addresses";
                                    }}
                                >
                                    رفتن به بخش آدرس‌ها
                                </Button>
                            </Box>
                        ) : (
                            <VStack spacing={4} align="stretch">
                                <CustomHeading level={5}>لطفاً آدرس تحویل سفارش را انتخاب کنید:</CustomHeading>
                                <RadioGroup 
                                onChange={(value) => setSelectedAddress(Number(value))} 
                                value={selectedAddress ? String(selectedAddress) : ""}
                                >
                                <VStack spacing={3} align="stretch">
                                    {addresses.map((address: AddressDetailType) => (
                                    <Box
                                        key={address.id}
                                        borderWidth="1px"
                                        borderColor={selectedAddress === address.id ? "brand.orange.normal" : "brand.white.normalHover"}
                                        borderRadius="lg"
                                        p={4}
                                        cursor="pointer"
                                        onClick={() => setSelectedAddress(address.id)}
                                        _hover={{borderColor: "brand.orange.normal"}}
                                    >
                                        <Radio value={String(address.id)} width="100%">
                                        <Box>
                                            <Title level={2} bold>{address.address}</Title>
                                            <Text className="text-brand-blue-lightActive mt-1">
                                            {address.city.name} - {address.region.name}
                                            </Text>
                                        </Box>
                                        </Radio>
                                    </Box>
                                    ))}
                                </VStack>
                                </RadioGroup>

                                <Button
                                    mt={4}
                                    width="100%"
                                    bg="brand.orange.normal"
                                    color="white"
                                    onClick={handleAddressSelect}
                                    isDisabled={!selectedAddress}
                                    isLoading={isProcessing}
                                >
                                    {selectedPaymentMethod === "CASH" ? "تایید آدرس و ثبت سفارش" : "تایید آدرس و انتقال به درگاه پرداخت"}
                                </Button>
                            </VStack>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default BuyerDashboardCheckoutContainer;