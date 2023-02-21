import React from "react";
import { NavLink } from "react-router-dom";
//
import style from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = (props) => {
  return (
    <div className={style.navDiv}>
      <div className={style.divTitle}>
        <NavLink to="/home" className={style.titleLink}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/007/559/104/original/dog-dish-menu-logo-design-template-modern-animal-icon-label-for-store-veterinary-food-free-vector.jpg"
            alt="Logo Dog"
            className={style.logoDog}
          />
          <h3 className={style.title}>Mundo Perruno</h3>
        </NavLink>
      </div>

      <div>
        <SearchBar onSearch={props.onSearch} />
      </div>
    </div>
  );
};

export default Navbar;
