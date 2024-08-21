import { Schema, model, models } from "mongoose";

export interface IRsvp extends Document {
  _id: string;
  isAttending: string;
  nameOfAttendees: string;
  dinnerChoice: string;
  dinnerChoicePlusOne: string;
  commentsOrQuestions: string;
  commentsOrQuestionsPlusOne: string;
  guest: { _id: string, firstName: string, lastName: string }
}

const RsvpSchema = new Schema({
  isAttending: { type: Boolean, required: true },
  nameOfAttendees: { type: String },
  dinnerChoice: { type: String },
  dinnerChoicePlusOne: { type: String },
  commentsOrQuestions: { type: String },
  commentsOrQuestionsPlusOne: { type: String },
  guest: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Rvsp = models.Rsvp || model('Rsvp', RsvpSchema);

export default Rvsp;