import Star from "./Star";


interface Props {
  rating: number;
  totalRating: number;
  onRate: (value: number) => void;
}

const StarRating = ({ rating, totalRating, onRate }: Props) => {
  return (
    <div className="mb-2">
      {[...Array(totalRating)].map((_, i) => (
        <Star key={i} selected={i < rating} onRate={() => onRate(i + 1)} />
      ))}
    </div>
  );
};

export default StarRating;
