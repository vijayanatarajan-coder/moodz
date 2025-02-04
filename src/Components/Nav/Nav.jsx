import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const location = useLocation()
  const activeLink = location.pathname

<<<<<<< HEAD

=======
>>>>>>> main
  const getClassName = (path) => {
    if (activeLink === path) {
      return 'navItem underline'
    } else {
      return 'navItem'
    }
  }

  return (
    <nav className='nav' >
      <Link className={getClassName('/')} to="/">Home</Link>
      <Link className={getClassName('/Discover')} to="/Discover">Discover</Link>
      <Link className={getClassName('/MyPlayLists')} to="/MyPlayLists">My PlayLists</Link>
    </nav>
  );
};

export default Nav;
