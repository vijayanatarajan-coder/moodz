import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/Discover">Discover</Link>
      <Link to="/MyPlayLists">MyPlayLists</Link>
    </nav>
  );
};

export default Nav;
