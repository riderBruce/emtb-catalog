import type { Bike } from "../types/bike.types";
import BikeCard, { type RateEvent } from "./BikeCard";
import SearchBox from "./SearchBox";
interface Props {
  bikes: Bike[];
  onSearch: (value: string) => void;
  onDelete: (_id: string) => void;
  onUpdate: (bike: Bike) => void;
  onRate: (event: RateEvent) => void;
}
const BikeList = ({
  bikes,
  onSearch,
  onDelete,
  onUpdate,
  onRate,
}: Props) => {
  return (
    <div className="container my-4">
      <SearchBox onSearch={onSearch} />

      <div className="row g-3">
        {bikes.map((bike) => (
          <div key={bike._id} className="col-12 col-sm-6 col-md-6 col-lg-4">
            <BikeCard
              bike={bike}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onRate={onRate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BikeList;
