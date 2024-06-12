import { Schema, model, models } from "mongoose";

const RegistryItemSchema = new Schema({
  itemName: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  purchasedQuantity: { type: Number, default: 0 },
});

const RegistryItem = models.RegistryItem || model('Registry Item', RegistryItemSchema);

export default RegistryItem;