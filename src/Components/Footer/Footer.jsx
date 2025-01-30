import React from "react";
import "./Footer.css";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <div className="Footer">
      <Logo/>
      <div id='copyrightContainer'>
        <footer>© 2025 Moodz AB. All rights reserved.</footer>
      </div>
    </div >
  );
};

export default Footer;
