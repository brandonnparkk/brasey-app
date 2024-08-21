'use server'

import { revalidatePath } from 'next/cache'

import { connect } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import { CreateUserParams } from '@/types'

export async function createUser(user: CreateUserParams) {
  try {
    await connect();
    const newUser = await User.create(user);
    console.log("THIS IS NEW USER:", newUser);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

export const getUserById = async(userId: string) => {
  try {
    await connect();
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found!");
    }

    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    console.log(err);
  }
}