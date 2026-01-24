import './SearchBar.css';

export const SearchBar = ({
  onChange,
  value,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}) => {
  return (
    <div className="search-container" role="search">
      <input
        type="search"
        className="search-input"
        placeholder="Search for a smartphone..."
        aria-label="Search for smartphones"
        onChange={onChange}
        value={value}
        autoComplete="off"
      />
    </div>
  );
};
