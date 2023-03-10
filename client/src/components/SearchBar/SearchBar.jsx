import React, { useState } from "react";
//
import style from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [dog, setDog] = useState("");

  const handleChange = (event) => {
    setDog(event.target.value);
  };

  return (
    <div className={style.searchDiv}>
      <input
        type="search"
        className={style.searchInp}
        value={dog}
        onChange={handleChange}
      />
      <p className={style.searchBtn} onClick={() => onSearch(dog)}>
        SEARCH
      </p>
    </div>
  );
};

export default SearchBar;
