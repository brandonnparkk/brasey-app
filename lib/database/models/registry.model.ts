import { Schema, model, models } from "mongoose";

const RegistryItemSchema = new Schema({
  itemName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  purchasedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
});

const RegistryItem = models.RegistryItem || model('Registry Item', RegistryItemSchema);

export default RegistryItem;