"use server"
import { revalidatePath } from 'next/cache'
import { handleError } from '@/lib/utils'
import { CreateRsvpParams } from "@/types"
import { Types } from "mongoose";
import { connect } from "../database";
import User from "../database/models/user.model";
import Rsvp from "../database/models/rsvp.model";

const populateRsvp = async (query: any) => {
  return query.populate({ path: 'guest', model: User, select: '_id username' });
}

export const createRsvp = async ({ rsvpData, userId, path } : CreateRsvpParams) => {
  try {
    await connect();
    const guest = await User.findById(userId);

    if (!guest) {
      throw new Error("Guest not found!");
    }

    const newRsvp = await Rsvp.create({ ...rsvpData, guest: userId});
    const data = JSON.parse(JSON.stringify(newRsvp));
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const getRsvpByUser = async(userId: string) => {
  try {
    await connect();
    const rsvpData = await populateRsvp(Rsvp.findOne({ guest: userId }));

    if (!rsvpData) {
      throw new Error("Rsvp not found!");
    }

    return JSON.parse(JSON.stringify(rsvpData));
  } catch (err) {
    console.log(err);
  }
}

export const getRsvpById = async(rsvpId: string) => {
  try {
    await connect();
    const rsvpData = await populateRsvp(Rsvp.findById(rsvpId));

    if (!rsvpData) {
      throw new Error("Rsvp not found!");
    }

    return JSON.parse(JSON.stringify(rsvpData));
  } catch (err) {
    console.log(err);
  }
}

export async function updateRsvp({ userId, rsvpContent, rsvpId, path }: any) {
  console.log("this is rsvp id: ", rsvpId);
  try {
    await connect();

    const rsvpToUpdate = await Rsvp.findById(rsvpId)
    console.log("this is rsvp: ", rsvpToUpdate);
    if (!rsvpToUpdate && rsvpToUpdate?.guest.toHexString() !== userId) {
      throw new Error('Unauthorized or rsvp not found')
    }

    const updatedRsvp = await Rsvp.findByIdAndUpdate(
      rsvpId,
      // insert all options here...
      { ...rsvpContent },
      { new: true }
    );
    console.log("updatedRSVP: ", updatedRsvp);
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedRsvp))
  } catch (error) {
    handleError(error)
  }
}