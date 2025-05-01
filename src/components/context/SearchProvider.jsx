import { useState } from "react";
import { initialCategory } from "../../constants";
import { SearchContext } from "./SearchContext";

const SearchProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(query);
  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        search,
        setSearch,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
