import { FaStar } from "react-icons/fa";

interface Props {
  selected: boolean;
  onRate: () => void;
}

const Star = ({ selected, onRate }: Props) => {
  return <FaStar color={selected ? "red" : "gray"} onClick={onRate} />;
};

export default Star;
