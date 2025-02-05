import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons
import "./Nav.css";

const Nav = () => {
  const location = useLocation();
  const activeLink = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const getClassName = (path) =>
    activeLink === path ? "navItem underline" : "navItem";

  return (
    <nav className="nav">
      {/* Menu Button - Visible only on Mobile */}
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      {/* Navigation Links - Show/Hide based on menuOpen */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link
          className={getClassName("/")}
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          className={getClassName("/Discover")}
          to="/Discover"
          onClick={() => setMenuOpen(false)}
        >
          Discover
        </Link>
        <Link
          className={getClassName("/MyPlayLists")}
          to="/MyPlayLists"
          onClick={() => setMenuOpen(false)}
        >
          My PlayLists
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
