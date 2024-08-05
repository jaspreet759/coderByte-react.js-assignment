import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("Title");

  const value = useMemo(
    () => ({ searchTerm, setSearchTerm, title, setTitle }),
    [searchTerm, title]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSearchContext = () => useContext(SearchContext);
