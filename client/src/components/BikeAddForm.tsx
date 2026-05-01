import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bikeInputSchema, type BikeInput } from "../types/bike.types";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  onSubmit: (data: BikeInput) => void;
}

const BikeAddForm = ({ onSubmit }: Props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BikeInput>({
    resolver: zodResolver(bikeInputSchema),
  });

  const submitHandler = (data: BikeInput) => {
    onSubmit(data);
    reset();
    navigate("/");
  };

  return (
    <div className="container my-4" style={{ maxWidth: "900px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Add Bike</h2>
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          Back
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-secondary">
          <h3 className="h5 mb-0">Bike Information</h3>
        </div>
        <div className="card-body">
          <form className="h-100" onSubmit={handleSubmit(submitHandler)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  className={`form-control form-control-sm ${
                    errors.name ? "is-invalid" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-danger">{errors.name.message}</p>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="manufacturer" className="form-label">
                  Brand
                </label>
                <input
                  {...register("manufacturer")}
                  id="manufacturer"
                  type="text"
                  className={`form-control form-control-sm ${
                    errors.manufacturer ? "is-invalid" : ""
                  }`}
                />
                {errors.manufacturer && (
                  <p className="text-danger">{errors.manufacturer.message}</p>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="motor" className="form-label">
                  Motor
                </label>

                <input
                  {...register("motor")}
                  id="motor"
                  type="text"
                  className={`form-control form-control-sm ${
                    errors.motor ? "is-invalid" : ""
                  }`}
                />
                {errors.motor && (
                  <p className="text-danger">{errors.motor.message}</p>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="battery" className="form-label">
                  Battery
                </label>

                <input
                  {...register("battery")}
                  id="battery"
                  type="text"
                  className={`form-control form-control-sm ${
                    errors.battery ? "is-invalid" : ""
                  }`}
                />
                {errors.battery && (
                  <p className="text-danger">{errors.battery.message}</p>
                )}
              </div>

              <div className="col-md-4">
                <label htmlFor="weightKg" className="form-label">
                  Weight (kg)
                </label>

                <input
                  {...register("weightKg", { valueAsNumber: true })}
                  id="weightKg"
                  type="number"
                  step="0.1"
                  className={`form-control form-control-sm ${
                    errors.weightKg ? "is-invalid" : ""
                  }`}
                />
                {errors.weightKg && (
                  <p className="text-danger">{errors.weightKg.message}</p>
                )}
              </div>
              <div className="col-md-4">
                <label htmlFor="priceUsd" className="form-label">
                  Price (US$)
                </label>

                <input
                  {...register("priceUsd", { valueAsNumber: true })}
                  id="priceUsd"
                  type="number"
                  className={`form-control form-control-sm ${
                    errors.priceUsd ? "is-invalid" : ""
                  }`}
                />
                {errors.priceUsd && (
                  <p className="text-danger">{errors.priceUsd.message}</p>
                )}
              </div>

              <div className="col-md-4">
                <label htmlFor="priceCad" className="form-label">
                  Price (CA$)
                </label>

                <input
                  {...register("priceCad", { valueAsNumber: true })}
                  id="priceCad"
                  type="number"
                  className={`form-control form-control-sm ${
                    errors.priceCad ? "is-invalid" : ""
                  }`}
                />
                {errors.priceCad && (
                  <p className="text-danger">{errors.priceCad.message}</p>
                )}
              </div>
            </div>
            <div className="mt-4  d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => reset()}
              >
                Reset
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BikeAddForm;
