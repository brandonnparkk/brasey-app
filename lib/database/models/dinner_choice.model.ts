import { Schema, model, models } from "mongoose";

const DinnerChoiceSchema = new Schema({
  choiceName: { type: String, required: true },
});

const DinnerChoice = models.DinnerChoice || model('DinnerChoice', DinnerChoiceSchema);

export default DinnerChoice;