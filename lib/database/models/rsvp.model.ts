import { Schema, model, models } from "mongoose";

// TODO: add interface for what fields Rsvp has.

const RsvpSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  rsvpId: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true},
  isAttending: { type: Boolean, required: true },
  numOfGuests: { type: Number, required: true },
  dinnerChoice: { type: Schema.Types.ObjectId, ref: 'DinnerChoice', required: true },
});

const Rvsp = models.Rsvp || model('Rsvp', RsvpSchema);

export default Rvsp;