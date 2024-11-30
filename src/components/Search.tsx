import { useEffect, useState } from "react";
import Input from "../ui/Input";
import { useDebounce } from "../utils/primary";

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

function Search({ onSearch }: SearchProps) {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500); // 500ms debounce

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return <Input onChange={handleChange} placeholder="Search your Pokemon" />;
}

export default Search;
