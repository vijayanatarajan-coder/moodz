import React from "react";
import "./Header.css";
import logo from "../../Images/logo.png";

const Header = ({ title }) => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
