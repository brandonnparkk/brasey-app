"use server"

import { CreateRsvpParams } from "@/types"
import { Types } from "mongoose";
import { connect } from "../database";
import User from "../database/models/user.model";
import Rvsp from "../database/models/rsvp.model";

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

    const newRsvp = await Rvsp.create({ ...rsvpData, guest: userId});
    const data = JSON.parse(JSON.stringify(newRsvp));
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const getRsvpByUser = async(userId: string) => {
  try {
    await connect();
    const rsvpData = await populateRsvp(Rvsp.findOne({ guest: userId }));

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
    const rsvpData = await populateRsvp(Rvsp.findById(rsvpId));

    if (!rsvpData) {
      throw new Error("Rsvp not found!");
    }

    return JSON.parse(JSON.stringify(rsvpData));
  } catch (err) {
    console.log(err);
  }
}