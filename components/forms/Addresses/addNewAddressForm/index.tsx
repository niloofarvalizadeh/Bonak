import React, { FC, useState } from "react";

import Title from "@/components/ui/typography/Title";
import { Box, Button } from "@chakra-ui/react";
import Input from "@/components/ui/elements/Input";
import Select from "@/components/ui/elements/Select";
import {
  useGetAddresses,
  useGetCities,
  useGetNeighborhoods
} from "@/services/queries";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddNewAddressFormSchema } from "@/schema";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { manageAddressAction } from "@/services/api";
import Textarea from "@/components/ui/elements/Textarea";
import DashboardPageTitle from "@/components/layouts/DashboardPageTitle";

interface IFormInput {
  firstName: string;
  lastName: string;
  cityId: string;
  neighborhoodId: string;
  address: string;
}
interface AddNewAddressFormProps {
  onClose: () => void;
}

const AddNewAddressForm: FC<AddNewAddressFormProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(AddNewAddressFormSchema)
  });

  const [cityId, setCityId] = useState<null | string>(null);

  const { mutate: addressesMutate } = useGetAddresses();
  const { data: cities, isLoading: citiesIsLoading } = useGetCities();
  const { data: neighborhoods, isLoading: neighborhoodsIsLoading } =
    useGetNeighborhoods(cityId!, cityId !== null);

  const { trigger: addNewAddress, isMutating: addNewAddressIsLoading } =
    useSWRMutation("/account/api/v1/addresses/", manageAddressAction, {
      onSuccess: (res) => {
        if (res.status == 201) {
          addressesMutate();
          toast.success("آدرس شما با موفقیت اضافه شد");
          onClose();
        } else {
          toast.error(res.data.message);
        }
      },
      onError: () => {}
    });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { firstName, lastName, neighborhoodId, address, cityId } = data;
    addNewAddress({
      firstName,
      lastName,
      neighborhoodId,
      address,
      cityId,
      type: "add"
    });
  };

  return (
    <Box className="mb-20 mt-[33px] w-full lg:mt-[87px]">
      <DashboardPageTitle>افزودن آدرس</DashboardPageTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <Box
          as="div"
          className="grid grid-cols-1 gap-x-[24px] gap-y-[21px] lg:grid-cols-2"
        >
          <Input
            label="نام"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <Input
            label="نام خانوادگی"
            {...register("lastName")}
            error={errors.lastName?.message}
          />

          <Select
            label="شهر"
            isDisabled={citiesIsLoading}
            placeholder={
              citiesIsLoading ? "لطفا منتظر بمانید" : "شهر خود را انتخاب کنید"
            }
            {...register("cityId")}
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
              cityId == null
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
          />
        </Box>

        <Box className="flex w-full items-center justify-center">
          <Button
            className="!mt-[44px] !h-11 !w-[134px] lg:!mt-[68px]"
            borderRadius="12px"
            bg="brand.orange.normal"
            _hover={{
              bg: "brand.orange.normalHover"
            }}
            type="submit"
            isLoading={addNewAddressIsLoading}
          >
            <Title level={2} bold className="text-brand-white-normal">
              تایید اطلاعات
            </Title>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddNewAddressForm;
