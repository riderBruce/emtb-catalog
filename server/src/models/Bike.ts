import mongoose, { Schema, type InferSchemaType } from "mongoose";

const bikeMongoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    manufacturer: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    modelYear: {
      type: Number,
      required: true,
      min: 1990,
      max: new Date().getFullYear() + 1,
      default: () => new Date().getFullYear() + 1,
    },
    motor: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    battery: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    weightKg: {
      type: Number,
      required: true,
      min: 0,
    },
    priceUsd: {
      type: Number,
      required: true,
      min: 0,
    },
    priceCad: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    imageKey: {
      type: String,
      default: "fallback-bike.jpeg",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type BikeDocument = InferSchemaType<typeof bikeMongoSchema>;

export const BikeModel = mongoose.model("Bike", bikeMongoSchema);
