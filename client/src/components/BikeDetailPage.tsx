import type { Bike } from "../types/bike.types";
import { Link, useParams } from "react-router-dom";

interface Props {
  bikes: Bike[];
}
const BikeDetailPage = ({ bikes }: Props) => {
  const { id } = useParams();
  const bike = bikes.find((b) => b._id === id);

  if (bikes.length === 0) {
    return (
      <div className="container my-4">
        <p className="mb-3">Loading...</p>
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          Back
        </Link>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="container my-4">
        <p className="mb-3">Bike not found.</p>
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          Back
        </Link>
      </div>
    );
  }
  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">{bike.name}</h2>
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          Back
        </Link>
      </div>

      <div className="card shadow-sm">
        <img
          src={`/bikes/${bike.imageKey}.jpeg`}
          alt={bike.name}
          className="card-img-top"
          style={{ height: 700, objectFit: "cover" }}
          loading="lazy"
          onError={(e) => (e.currentTarget.src = "/bikes/fallback-bike.jpeg")}
        />
        <div className="card-body">
          <p className="text-muted mb-2">{bike.manufacturer}</p>

          <div className="row g-3">
            <div className="col-md-6">
              <div>
                <strong>Motor:</strong> {bike.motor}
              </div>
              <div>
                <strong>Battery:</strong> {bike.battery}
              </div>
              <div>
                <strong>Year:</strong> {bike.modelYear}
              </div>
            </div>

            <div className="col-md-6">
              <div>
                <strong>Weight:</strong> {bike.weightKg}
              </div>
              <div>
                <strong>Price:</strong>US$ {bike.priceUsd}/ CA$ {bike.priceCad}
              </div>
            </div>
          </div>

          <hr />

          <div>
            <strong>Description:</strong>
            <p className="mb-0">{bike.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetailPage;
