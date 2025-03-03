"use server";

import { revalidatePath } from "next/cache";

export const customRevalidation = async (path: string) => {
  revalidatePath(path);
};
