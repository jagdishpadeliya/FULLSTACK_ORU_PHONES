"use server";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

type UpdateUserParams = {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  bio: string;
  onboarded: boolean;
  image: string;
};

export async function updateUser({
  userId,
  name,
  email,
  phoneNumber,
  bio,
  onboarded,
  image,
}: UpdateUserParams) {
  try {
    connectToDB();
    return await User.findOneAndUpdate(
      {
        id: userId,
      },
      {
        name,
        email,
        phoneNumber,
        bio,
        onboarded,
        image
      },
      {
        upsert: true,
      }
    );
  } catch (error: any) {
    throw new Error(`Failed to create/update user :${error.message}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();
    return await User.findOne({ id: userId });
  } catch (error: any) {
    throw new Error(`Failed to fetch user :${error.message}`);
  }
}
