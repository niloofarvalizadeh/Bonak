import CategoriesContainer from "@/containers/home/categories-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "دسته بندی ها"
};

export default async function CategoriesPage() {
  return <CategoriesContainer />;
}
