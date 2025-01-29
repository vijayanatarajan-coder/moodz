import React from "react";
import "./Header.css";
import Logo from "../Logo/Logo";

const Header = ({ title }) => {
  return (
    <header className="header">
      <Logo />
    </header>
  );
};

export default Header;
