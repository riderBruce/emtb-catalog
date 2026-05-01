import { BikeModel } from "../models/Bike.js";
import type { BikeInput, BikeUpdate } from "../schemas/bike.schema.js";

export const findAllBikes = async () => {
  return BikeModel.find();
};

export const findBikeById = async (id: string) => {
  return BikeModel.findById(id);
};

export const createBike = (data: BikeInput) => {
  return BikeModel.create(data);
};

export const updateBike = async (id: string, data: BikeUpdate) => {
  return BikeModel.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
};

export const deleteBike = async (id: string) => {
  return BikeModel.findByIdAndDelete(id);
};
