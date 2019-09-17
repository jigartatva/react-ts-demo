import React from "react";
import MagnifyIcon from "mdi-react/MagnifyIcon";

interface SearchProps {}

const Search = (props: SearchProps) => {
  return (
    <div className="chat__search">
      <input className="chat__search-input" placeholder="Search" />
      <MagnifyIcon />
    </div>
  );
};

export default Search;
