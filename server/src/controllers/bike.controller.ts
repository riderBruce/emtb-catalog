import { type Request, type Response } from "express";
import { bikeInputSchema, bikeUpdateSchema } from "../schemas/bike.schema.js";
import * as bikeService from "../services/bike.service.js";
import mongoose from "mongoose";

type IdParams = {
  id: string;
};

export const getAllBikes = async (_req: Request<IdParams>, res: Response) => {
  try {
    const bikes = await bikeService.findAllBikes();
    return res.json(bikes);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Unknown server error" });
  }
};

export const getBikeById = async (req: Request<IdParams>, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({ message: "Invalid bike id" });
    }

    const bike = await bikeService.findBikeById(id);
    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }

    return res.json(bike);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Unknown server error" });
  }
};

export const createBike = async (req: Request<IdParams>, res: Response) => {
  try {
    const parsed = bikeInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid bike data",
        errors: parsed.error.flatten(),
      });
    }

    const newBike = await bikeService.createBike(parsed.data);

    return res.status(201).json(newBike);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Unknown server error" });
  }
};

export const updateBike = async (req: Request<IdParams>, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({ message: "Invalid bike id" });
    }

    const parsed = bikeUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid update data",
        errors: parsed.error.flatten(),
      });
    }

    const updatedBike = await bikeService.updateBike(id, parsed.data);

    if (!updatedBike) {
      return res.status(404).json({ message: "Bike not found" });
    }
    return res.json(updatedBike);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Unknown server error" });
  }
};

export const deleteBike = async (req: Request<IdParams>, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({ message: "Invalid bike id" });
    }

    const deletedBike = await bikeService.deleteBike(id);

    if (!deletedBike) {
      return res.status(404).json({ message: "Bike not found" });
    }

    return res.json({ message: "Deleted successfully", bike: deletedBike });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Unknown server error" });
  }
};
