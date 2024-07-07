"use server"

import { CreateRsvpParams } from "@/types"
import { connect } from "../database";
import User from "../database/models/user.model";
import Rvsp from "../database/models/rsvp.model";

export const createRsvp = async ({ rsvpData, userId, path } : CreateRsvpParams) => {
  try {
    console.log("THIS IS FROM CREATERSVP: ", userId);
    console.log("RSVP DATA: ", rsvpData);
    await connect();
    const guest = await User.findById(userId);

    if (!guest) {
      throw new Error("Guest not found!");
    }

    const newRsvp = await Rvsp.create({ ...rsvpData, guest: userId});
    const data = JSON.parse(JSON.stringify(newRsvp));
    console.log('rsvpData: ', data);
    return data;
  } catch (err) {
    console.log("IS THIS THE ERORR OCCURING???")
    console.log(err);
  }
}