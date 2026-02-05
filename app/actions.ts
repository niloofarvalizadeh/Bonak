"use server";
import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function revalidateTagHelper(tagName: string) {
  revalidateTag(tagName);
}

export async function navigate(url: string) {
  redirect(url);
}

export async function revalidatePathHelper(
  path: string,
  type: "page" | "layout"
) {
  revalidatePath(path, type);
}
