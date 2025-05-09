"use server";

import { revalidatePath } from "next/cache";

export const customRevalidation = async (path: string) => {
  revalidatePath(path);
};

export const revalidateAll = async () => {
  revalidatePath("/", "layout");
};
