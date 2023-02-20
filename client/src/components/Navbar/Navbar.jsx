import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <h4>Soy el componente Navbar</h4>
      <NavLink to="/about">About |</NavLink>
      <NavLink to="/contact">| Contact</NavLink>
    </>
  );
};

export default Navbar;
