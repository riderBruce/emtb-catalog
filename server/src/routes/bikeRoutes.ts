import { Router } from "express";
import {
  createBike,
  deleteBike,
  getBikeById,
  getAllBikes,
  updateBike,
} from "../controllers/bike.controller.js";

const router = Router();

// get all
router.get("/", getAllBikes);

// get details
router.get("/:id", getBikeById);

// add
router.post("/", createBike);

// update
router.put("/:id", updateBike);

// delete
router.delete("/:id", deleteBike);

export default router;
