import { useForm } from "react-hook-form";
import {
  bikeInputSchema,
  type Bike,
  type BikeInput,
} from "../types/bike.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export type RateEvent = {
  _id: string;
  rating: number;
};

interface Props {
  bike: Bike;
  onDelete: (_id: string) => void;
  onUpdate: (bike: Bike) => void;
  onRate: (event: RateEvent) => void;
}

const BikeCard = ({ bike, onDelete, onUpdate, onRate }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BikeInput>({
    resolver: zodResolver(bikeInputSchema),
    defaultValues: {
      name: bike.name,
      manufacturer: bike.manufacturer,
      motor: bike.motor,
      battery: bike.battery,
      weightKg: bike.weightKg,
      priceUsd: bike.priceUsd,
      priceCad: bike.priceCad,
    },
  });

  // Ensure form always reflects latest bike data
  const startEdit = () => {
    reset({
      name: bike.name,
      manufacturer: bike.manufacturer,
      motor: bike.motor,
      battery: bike.battery,
      weightKg: bike.weightKg,
      priceUsd: bike.priceUsd,
      priceCad: bike.priceCad,
    });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    reset();
    setIsEditing(false);
  };

  const submitEdit = (data: BikeInput) => {
    onUpdate({ ...bike, ...data });
    setIsEditing(false);
  };

  // -------------------------
  // VIEW MODE
  // -------------------------
  if (!isEditing) {
    return (
      <div className="card h-100 shadow-sm bike-card">
        <Link
          to={`/bikes/${bike._id}`}
          className="text-decoration-none text-reset"
        >
          <img
            src={`/bikes/${bike.imageKey}.jpeg`}
            alt={bike.name}
            className="card-img-top"
            style={{ height: 240, objectFit: "cover" }}
            loading="lazy"
            onError={(e) => (e.currentTarget.src = "/bikes/fallback-bike.jpeg")}
          />{" "}
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-1">{bike.name}</h5>
          <p className="text-muted mb-2">{bike.manufacturer}</p>
          <p className="mb-1">
            <strong>Motor:</strong> {bike.motor}
          </p>
          <p className="mb-3">
            <strong>Battery:</strong> {bike.battery}
          </p>
          <div className="mt-auto mb-2">
            <span className="badge bg-secondary me-2">{bike.weightKg} kg</span>
            <span className="badge bg-primary me-2">US${bike.priceUsd}</span>
            <span className="badge bg-success">CA${bike.priceCad}</span>
          </div>

          <div className="mt-auto d-flex justify-content-between align-items-center">
            <StarRating
              rating={bike.rating}
              totalRating={5}
              onRate={(rating) => onRate({ rating, _id: bike._id })}
            />
            <span className="badge text-bg-light border">{bike.rating}/5</span>
            {/* </div> */}
            {/* buttons pinned to the bottom */}
            <div>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mx-2"
                onClick={(e) => {
                  e.preventDefault(); // stops Link navigation, now it's out of Link it's no need but in case
                  startEdit();
                }}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={(e) => {
                  e.preventDefault(); // stops Link navigation, now it's out of Link it's no need but in case
                  onDelete(bike._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // -------------------------
  // EDIT MODE
  // -------------------------
  return (
    <form className="h-100" onSubmit={handleSubmit(submitEdit)}>
      <div className="card h-100 shadow-sm bike-card">
        <div className="card-body d-flex flex-column">
          <div className="mb-2 d-flex">
            <h5 className="card-title mb-1" style={{ width: "40%" }}>
              Name:{" "}
            </h5>
            <input
              {...register("name")}
              id="name"
              type="text"
              className="form-control form-control-sm"
            />
          </div>{" "}
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
          <div className="mb-2 d-flex">
            <p
              className="text-muted mb-2 justify-content-between"
              style={{ width: "40%" }}
            >
              <strong>Brand:</strong>{" "}
            </p>
            <input
              {...register("manufacturer")}
              id="manufacturer"
              type="text"
              className="form-control form-control-sm"
            />
          </div>
          {errors.manufacturer && (
            <p className="text-danger">{errors.manufacturer.message}</p>
          )}
          <div className="mb-2 d-flex">
            <p
              className="mb-1 justify-content-between"
              style={{ width: "40%" }}
            >
              <strong>Motor:</strong>{" "}
            </p>
            <input
              {...register("motor")}
              id="motor"
              type="text"
              className="form-control form-control-sm"
            />
          </div>
          {errors.motor && (
            <p className="text-danger">{errors.motor.message}</p>
          )}
          <div className="mb-2 d-flex">
            <p
              className="mb-1 justify-content-between"
              style={{ width: "40%" }}
            >
              <strong>Battery:</strong>{" "}
            </p>
            <input
              {...register("battery")}
              id="battery"
              type="text"
              className="form-control form-control-sm"
            />
          </div>
          {errors.battery && (
            <p className="text-danger">{errors.battery.message}</p>
          )}
          <div className="mt-auto d-flex">
            <span className="badge bg-secondary me-2">
              kg{" "}
              <input
                {...register("weightKg", { valueAsNumber: true })}
                id="weightKg"
                type="number"
                step="0.1"
                className="form-control form-control-sm"
              />
            </span>
            <span className="badge bg-primary me-2">
              US${" "}
              <input
                {...register("priceUsd", { valueAsNumber: true })}
                id="priceUsd"
                type="number"
                className="form-control form-control-sm"
              />
            </span>
            <span className="badge bg-success">
              CA${" "}
              <input
                {...register("priceCad", { valueAsNumber: true })}
                id="priceCad"
                type="number"
                className="form-control form-control-sm"
              />
            </span>
          </div>{" "}
          {errors.weightKg && (
            <p className="text-danger">{errors.weightKg.message}</p>
          )}
          {errors.priceUsd && (
            <p className="text-danger">{errors.priceUsd.message}</p>
          )}
          {errors.priceCad && (
            <p className="text-danger">{errors.priceCad.message}</p>
          )}
          <div className="mt-auto d-flex justify-content-between align-items-center">
            <StarRating
              rating={bike.rating}
              totalRating={5}
              onRate={(rating) => onRate({ rating, _id: bike._id })}
            />
            <span className="badge text-bg-light border">{bike.rating}/5</span>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={cancelEdit}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={isSubmitting}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BikeCard;
