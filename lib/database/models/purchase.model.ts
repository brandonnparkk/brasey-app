import { Schema, model, models } from "mongoose";

const PurchaseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  item: { type: Schema.Types.ObjectId, ref: 'RegistryItem', required: true },
  quantity: { type: Number, required: true },
  purchaseDate: { type: Date, required: true, default: Date.now },
});

const Purchase = models.Purchase || model('Purchase', PurchaseSchema)

export default Purchase;