import React from "react";
import { NavLink } from "react-router-dom";
//
import style from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ onSearch, refresh }) => {
  return (
    <div
      className={
        window.location.pathname === "/home" ? style.navDiv : style.navDetailDiv
      }
    >
      <div
        className={
          window.location.pathname === "/home"
            ? style.divTitle
            : style.divDetailTitle
        }
        onClick={window.location.pathname === "/home" ? refresh : null}
      >
        <NavLink
          to="/home"
          className={
            window.location.pathname === "/home"
              ? style.titleLink
              : style.titleDetailLink
          }
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/007/559/104/original/dog-dish-menu-logo-design-template-modern-animal-icon-label-for-store-veterinary-food-free-vector.jpg"
            alt="Logo Dog"
            className={
              window.location.pathname === "/home"
                ? style.logoDog
                : style.logoDetailDog
            }
          />
          <h3 className={style.title}>
            {window.location.pathname === "/home" ? "Mundo Perruno" : "Home"}
          </h3>
        </NavLink>
      </div>

      {window.location.pathname === "/home" ? (
        <div>
          <SearchBar onSearch={onSearch} />
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
