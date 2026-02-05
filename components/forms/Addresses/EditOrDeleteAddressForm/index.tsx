import React, { FC, useEffect, useState } from "react";

import Title from "@/components/ui/typography/Title";
import { Box, Button, Spinner } from "@chakra-ui/react";
import Input from "@/components/ui/elements/Input";
import Select from "@/components/ui/elements/Select";
import {
  useGetAddressDetail,
  useGetAddresses,
  useGetCities,
  useGetNeighborhoods
} from "@/services/queries";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddNewAddressFormSchema } from "@/schema";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { deleteDataWithTokenAction, manageAddressAction } from "@/services/api";
import Textarea from "@/components/ui/elements/Textarea";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";

interface IFormInput {
  firstName: string;
  lastName: string;
  cityId: string;
  neighborhoodId: string;
  address: string;
}
interface EditOrDeleteAddressFormProps {
  onClose: () => void;
  addressId: number;
}

const EditOrDeleteAddressForm: FC<EditOrDeleteAddressFormProps> = ({
  onClose,
  addressId
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(AddNewAddressFormSchema)
  });

  const [cityId, setCityId] = useState<null | string>(null);

  const { mutate: addressesMutate } = useGetAddresses();
  const { data: addressDetail, isLoading: addressDetailIsLoading } =
    useGetAddressDetail(addressId);
  const { data: cities, isLoading: citiesIsLoading } = useGetCities();
  const { data: neighborhoods, isLoading: neighborhoodsIsLoading } =
    useGetNeighborhoods(cityId!, cityId !== null);

  console.log({ addressDetail });
  useEffect(() => {
    if (addressDetail) {
      const { recipientFirstName, recipientLastName, region, city, address } =
        addressDetail;
      setValue("firstName", recipientFirstName);
      setValue("lastName", recipientLastName);
      setValue("neighborhoodId", region);
      setValue("address", address);
      setValue("cityId", city);
      setCityId(city);
    }
  }, [addressDetail, setValue]);
  const { trigger: editAddress, isMutating: editAddressIsLoading } =
    useSWRMutation(
      `/account/api/v1/addresses/${addressId}/`,
      manageAddressAction,
      {
        onSuccess: (res) => {
          if (res.status == 200) {
            addressesMutate();
            toast.success("آدرس شما با موفقیت ویرایش شد");
            onClose();
          } else {
            toast.error(res.data.message);
          }
        },
        onError: () => {}
      }
    );
  const { trigger: deleteAddress, isMutating: deleteAddressIsLoading } =
    useSWRMutation(
      `/account/api/v1/addresses/${addressId}/`,
      deleteDataWithTokenAction,
      {
        onSuccess: (res) => {
          if (res.status == 200) {
            addressesMutate();
            toast.success("آدرس شما با موفقیت حذف شد");
            onClose();
          } else {
            toast.error(res.data.message);
          }
        },
        onError: () => {}
      }
    );

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { firstName, lastName, neighborhoodId, address, cityId } = data;
    editAddress({
      firstName,
      lastName,
      neighborhoodId,
      address,
      cityId,
      type: "edit"
    });
  };

  return (
    <Box className="mb-20 mt-[33px] w-full lg:mt-[87px]">
      <DashboardPageTitle>ویرایش آدرس</DashboardPageTitle>
      {addressDetailIsLoading && (
        <Box className="absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center rounded-xl bg-white">
          <Spinner size="xl" color="brand.orange.normal" />
        </Box>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <Box
          as="div"
          className="grid grid-cols-1 gap-x-[24px] gap-y-[21px] lg:grid-cols-2"
        >
          <Input
            label="نام"
            {...register("firstName")}
            error={errors.firstName?.message}
            isDisabled={addressDetailIsLoading}
          />
          <Input
            label="نام خانوادگی"
            {...register("lastName")}
            error={errors.lastName?.message}
            isDisabled={addressDetailIsLoading}
          />

          <Select
            label="شهر"
            isDisabled={citiesIsLoading || addressDetailIsLoading}
            placeholder={
              citiesIsLoading ? "لطفا منتظر بمانید" : "شهر خود را انتخاب کنید"
            }
            {...register("cityId")}
            value={cityId as string}
            onChange={(e) => setCityId(e.target.value)}
          >
            {citiesIsLoading
              ? null
              : cities?.map((item: { id: number; name: string }) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
          </Select>
          <Select
            label="منطقه"
            placeholder={
              cityId == null
                ? "لطفا ابتدا شهر خود را انتخاب کنید"
                : neighborhoodsIsLoading
                  ? "لطفا منتظر بمانید"
                  : neighborhoods?.length == 0
                    ? "هیچ منقطه ای وجود ندارد"
                    : ""
            }
            isDisabled={
              neighborhoodsIsLoading ||
              neighborhoods?.length == 0 ||
              cityId == null ||
              addressDetailIsLoading
            }
            {...register("neighborhoodId")}
          >
            {cityId == null
              ? null
              : neighborhoodsIsLoading
                ? null
                : neighborhoods?.map((item: { id: number; name: string }) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
          </Select>
        </Box>
        <Box className="mt-[21px] flex w-full flex-col gap-[21px]">
          <Textarea
            label="آدرس"
            textAreaClassName="!h-36 lg:!h-24"
            placeholder="آدرس خود را وارد کنید"
            {...register("address")}
            error={errors.address?.message}
            isDisabled={addressDetailIsLoading}
          />
        </Box>

        <Box className="flex w-full items-center justify-center gap-2">
          <Button
            className="!mt-[44px] !h-11 !w-[134px] lg:!mt-[68px]"
            borderRadius="12px"
            bg="brand.orange.normal"
            _hover={{
              bg: "brand.orange.normalHover"
            }}
            type="submit"
            isLoading={editAddressIsLoading}
          >
            <Title level={2} bold className="text-brand-white-normal">
              ویرایش اطلاعات
            </Title>
          </Button>
          <Button
            className="!mt-[44px] !h-11 !w-[134px] lg:!mt-[68px]"
            borderRadius="12px"
            bg="red.500"
            _hover={{
              bg: "red.600"
            }}
            onClick={() => deleteAddress()}
            isLoading={deleteAddressIsLoading}
          >
            <Title level={2} bold className="text-brand-white-normal">
              حذف آدرس
            </Title>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditOrDeleteAddressForm;
