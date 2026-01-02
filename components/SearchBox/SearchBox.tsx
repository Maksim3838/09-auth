import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (value: string) => void;
  value: string;
}

function SearchBox({ onSearch, value }: SearchBoxProps) {
  return (
    <input
      onChange={(e) => onSearch(e.target.value)}
      value={value}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}

export default SearchBox;
