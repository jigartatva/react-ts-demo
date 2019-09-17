import React from "react";
import MagnifyIcon from "mdi-react/MagnifyIcon";
import { useTranslation } from "react-i18next";

interface SearchProps { }

const Search = (props: SearchProps) => {
  const { t } = useTranslation();
  return (
    <div className="chat__search">
      <input className="chat__search-input" placeholder={t("users.Search")} />
      <MagnifyIcon />
    </div>
  );
};

export default Search;
