interface Props {
  onSearch: (value: string) => void;
}
const SearchBox = ({ onSearch }: Props) => {
  return (
    <div className="my-3">
      <label htmlFor="keyword" className="form-label">
        Find what you really want to ride!
      </label>
      <input
        id="keyword"
        type="text"
        className="form-control"
        placeholder="Input any keyword..."
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
};

export default SearchBox;
