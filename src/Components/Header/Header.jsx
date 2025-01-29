import React from "react";
import "./Header.css";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";

const Header = ({ title }) => {
  return (
    <header className="header">
      <Logo />
      <Nav className="nav" />
    </header>
  );
};

export default Header;
