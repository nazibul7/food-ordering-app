import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  resturant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resturant",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  deliveryDetails: {
    email: { type: String, required: true },
    name: { type: String, required: true },
    addressLine1: { type: String, requires: true },
    city: { type: String, required: true },
  },
  cartItems: [
    {
      menuItemId: { type: String, requires: true },
      quantity: { type: String, required: true, min: 1 },
      name: { type: String, required: true },
    },
  ],
  totalAmount: { type: Number },
  status: {
    type: String,
    enum: ["placed", "paid", "inProgress", "outForDelivery", "delivered"],
    default: "placed",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.model("Order", OrderSchema);
