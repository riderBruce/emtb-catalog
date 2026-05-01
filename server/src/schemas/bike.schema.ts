import { z } from "zod";

export const bikeInputSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Name should be at least 2 characters." })
    .max(50),
  manufacturer: z
    .string()
    .min(2, { error: "manufacturer should be at least 2 characters." })
    .max(50),
  motor: z
    .string()
    .min(2, { error: "motor should be at least 2 characters." })
    .max(50),
  battery: z
    .string()
    .min(2, { error: "battery should be at least 2 characters." })
    .max(50),
  weightKg: z.number({ error: "Weight is required." }).nonnegative(),
  priceUsd: z.number({ error: "Price is required." }).nonnegative(),
  priceCad: z.number({ error: "Price is required." }).nonnegative(),
});

// update
export const bikeUpdateSchema = bikeInputSchema
  .extend({
    rating: z.number().nonnegative(),
  })
  .partial();

//
export const bikeResponseSchema = bikeInputSchema.extend({
  _id: z.string(),
  modelYear: z
    .number()
    .int()
    .min(1990)
    .max(new Date().getFullYear() + 1),
  rating: z.number().nonnegative(),
  imageKey: z.string().optional(),
  description: z.string(),
});

// types
export type BikeInput = z.infer<typeof bikeInputSchema>;

export type BikeUpdate = z.infer<typeof bikeUpdateSchema>;

export type Bike = z.infer<typeof bikeResponseSchema>;
