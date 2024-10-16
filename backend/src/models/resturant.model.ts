import mongoose from "mongoose";

const munuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
})
const resturantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    resturantName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    deliveryPrice: {
        type: Number,
        required: true
    },
    estimatedDeliveryTime: {
        type: Number,
        required: true
    },
    cuisines: [{
        type: String,
        required: true
    }],
    munuItems: [munuItemSchema],
    imageUrl: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: Date,
        required: true
    }
}, { timestamps: true })


export const Resturant=mongoose.model("Resturant",resturantSchema)