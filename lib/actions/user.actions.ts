'use server'

import { revalidatePath } from 'next/cache'

import { connect } from '@/lib/database'
import User from '@/lib/database/models/user.model'

export async function createUser(user: any) {
  try {
    await connect();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}