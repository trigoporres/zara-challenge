import './SearchBar.css';

export const SearchBar = ({
  onChange,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="search-container" role="search">
      <input
        type="search"
        className="search-input"
        placeholder="Search for a smartphone..."
        aria-label="Search for smartphones"
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
};
