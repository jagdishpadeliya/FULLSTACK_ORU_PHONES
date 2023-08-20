import { type ClassValue, clsx } from "clsx";
import { getProviders } from "next-auth/react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSupportedProviders = async () => {
  const providers = await getProviders();
  return providers;
};

export const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
};
