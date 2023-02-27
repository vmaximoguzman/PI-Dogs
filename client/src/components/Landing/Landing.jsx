import React from "react";
import { NavLink } from "react-router-dom";
//
import style from "./Landing.module.css";

const Home = () => {
  return (
    <div className={style.bg}>
      <NavLink to="/home">
        <button className={style.button}>Welcome to the Doggie World</button>
      </NavLink>
    </div>
  );
};

export default Home;
