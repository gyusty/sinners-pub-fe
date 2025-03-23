import React from "react";
import { NavLink } from "react-router";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="m-0 text-xl">Sinners Pub</h1>
      <nav className="flex gap-4">
        <NavLink className="text-white text-base hover:underline" to="/">
          Tables
        </NavLink>
        <NavLink className="text-white text-base hover:underline" to="/stock">
          Stock
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
