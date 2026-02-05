import CategoryContainer from "@/containers/home/categories-page/category-page";

export default function CategoryPage({
  params
}: {
  params: { categoryId: string };
}) {
  return <CategoryContainer categoryId={params.categoryId} />;
}
